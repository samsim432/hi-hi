import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FaBookOpen,
  FaTrash,
  FaPen,
  FaTimes,
  FaSearch,
  FaSave,
  FaMagic,
  FaFire,
  FaChartLine,
  FaFolderOpen,
  FaSmile,
} from "react-icons/fa";
import { supabase } from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";

function Journal() {
  const { user } = useAuth();

  const prompts = [
    "What happened today?",
    "What am I grateful for?",
    "What do I need tomorrow?",
    "What felt heavy today?",
  ];

  const moods = ["Calm", "Happy", "Okay", "Sad", "Anxious", "Tired"];
  const categories = ["Daily", "Gratitude", "Stress", "Family", "Study", "Work"];

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("Okay");
  const [category, setCategory] = useState("Daily");
  const [journals, setJournals] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const fetchJournals = useCallback(async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("journals")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    setJournals(data || []);
  }, [user]);

  useEffect(() => {
    fetchJournals();
  }, [fetchJournals]);

  const wordCount = useMemo(() => {
    return content.trim() ? content.trim().split(/\s+/).length : 0;
  }, [content]);

  const totalWords = useMemo(() => {
    return journals.reduce((total, item) => {
      const words = item.content?.trim()
        ? item.content.trim().split(/\s+/).length
        : 0;

      return total + words;
    }, 0);
  }, [journals]);

  const writingStreak = useMemo(() => {
    if (journals.length === 0) return 0;

    const dates = [
      ...new Set(
        journals.map((item) =>
          new Date(item.created_at).toISOString().split("T")[0]
        )
      ),
    ];

    return dates.length;
  }, [journals]);

  const weeklyEntries = useMemo(() => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    return journals.filter((item) => new Date(item.created_at) >= sevenDaysAgo)
      .length;
  }, [journals]);

  const topCategory = useMemo(() => {
    if (journals.length === 0) return "None";

    const count = {};

    journals.forEach((item) => {
      const key = item.category || "Daily";
      count[key] = (count[key] || 0) + 1;
    });

    return Object.keys(count).sort((a, b) => count[b] - count[a])[0];
  }, [journals]);

  const filteredJournals = useMemo(() => {
    return journals.filter((item) => {
      const text = search.toLowerCase();

      return (
        item.title?.toLowerCase().includes(text) ||
        item.content?.toLowerCase().includes(text) ||
        item.mood?.toLowerCase().includes(text) ||
        item.category?.toLowerCase().includes(text)
      );
    });
  }, [journals, search]);

  async function saveJournal(e) {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("Please add title and content.");
      return;
    }

    setLoading(true);

    const journalData = {
      title,
      content,
      mood,
      category,
    };

    if (editingId) {
      const { error } = await supabase
        .from("journals")
        .update(journalData)
        .eq("id", editingId)
        .eq("user_id", user.id);

      if (error) {
        alert(error.message);
        setLoading(false);
        return;
      }
    } else {
      const { error } = await supabase.from("journals").insert({
        user_id: user.id,
        ...journalData,
      });

      if (error) {
        alert(error.message);
        setLoading(false);
        return;
      }
    }

    setTitle("");
    setContent("");
    setMood("Okay");
    setCategory("Daily");
    setEditingId(null);
    await fetchJournals();
    setLoading(false);
  }

  async function deleteJournal(id) {
    const confirmDelete = confirm("Delete this journal entry?");
    if (!confirmDelete) return;

    const { error } = await supabase
      .from("journals")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) {
      alert(error.message);
      return;
    }

    await fetchJournals();
  }

  function startEdit(item) {
    setEditingId(item.id);
    setTitle(item.title || "");
    setContent(item.content || "");
    setMood(item.mood || "Okay");
    setCategory(item.category || "Daily");

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelEdit() {
    setEditingId(null);
    setTitle("");
    setContent("");
    setMood("Okay");
    setCategory("Daily");
  }

  function usePrompt(prompt) {
    setContent((prev) =>
      prev.trim() ? `${prev}\n\n${prompt}\n\n` : `${prompt}\n\n`
    );
  }

  const statCards = [
    {
      label: "Entries",
      value: journals.length,
      icon: <FaBookOpen />,
      color: "text-violet-600",
      bg: "bg-violet-50",
    },
    {
      label: "Streak",
      value: writingStreak,
      icon: <FaFire />,
      color: "text-orange-500",
      bg: "bg-orange-50",
    },
    {
      label: "Words",
      value: totalWords,
      icon: <FaChartLine />,
      color: "text-sky-600",
      bg: "bg-sky-50",
    },
    {
      label: "Category",
      value: topCategory,
      icon: <FaFolderOpen />,
      color: "text-rose-600",
      bg: "bg-rose-50",
    },
  ];

  return (
    <div className="relative mx-auto max-w-6xl px-2 pb-8 sm:px-4">
      <div className="pointer-events-none absolute -top-24 left-4 h-56 w-56 rounded-full bg-violet-200/30 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-40 h-56 w-56 rounded-full bg-sky-200/30 blur-3xl" />

      <div className="relative space-y-4">
        <section className="rounded-2xl border border-white/60 bg-white/60 p-4 shadow-sm backdrop-blur-2xl">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/80 text-base text-violet-600 shadow-sm">
              <FaBookOpen />
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-violet-600">
                Private Reflection
              </p>
              <h1 className="mt-0.5 text-2xl font-bold text-slate-950">
                Journal
              </h1>
              <p className="mt-0.5 text-sm text-slate-500">
                Write safely. Only you can view your entries.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-amber-200/70 bg-amber-50/80 p-3 backdrop-blur-xl">
          <p className="text-xs leading-5 text-amber-800 sm:text-sm">
            Man Ko Saathi is not therapy, diagnosis, medical treatment,
            medication advice, doctor, hospital, or emergency support.
          </p>
        </section>

        <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {statCards.map((card) => (
            <div
              key={card.label}
              className="rounded-2xl border border-white/60 bg-white/60 p-4 shadow-sm backdrop-blur-2xl"
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${card.bg} ${card.color} text-sm`}
              >
                {card.icon}
              </div>

              <p className="mt-3 truncate text-xl font-bold text-slate-950">
                {card.value}
              </p>
              <p className="mt-0.5 text-xs font-medium text-slate-500">
                {card.label}
              </p>
            </div>
          ))}
        </section>

        <section className="rounded-2xl border border-white/60 bg-white/60 p-4 shadow-sm backdrop-blur-2xl">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-slate-950">
                Weekly Progress
              </h2>
              <p className="text-sm text-slate-500">
                {weeklyEntries} entries this week
              </p>
            </div>

            <div className="rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700">
              {Math.min(weeklyEntries, 7)}/7
            </div>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-slate-900 transition-all"
              style={{ width: `${Math.min((weeklyEntries / 7) * 100, 100)}%` }}
            />
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <form
            onSubmit={saveJournal}
            className="rounded-2xl border border-white/60 bg-white/60 p-4 shadow-sm backdrop-blur-2xl lg:col-span-2"
          >
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-base font-bold text-slate-950">
                {editingId ? "Edit Entry" : "New Entry"}
              </h2>

              {editingId && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-sm text-slate-600 transition hover:bg-slate-200"
                >
                  <FaTimes />
                </button>
              )}
            </div>

            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-4 w-full rounded-2xl border border-slate-200/70 bg-white/70 px-4 py-3 text-sm text-slate-800 outline-none backdrop-blur-xl placeholder:text-slate-400 focus:border-violet-300 focus:ring-2 focus:ring-violet-100"
            />

            <textarea
              rows="8"
              placeholder="Write your thoughts..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="mt-3 w-full resize-none rounded-2xl border border-slate-200/70 bg-white/70 px-4 py-3 text-sm leading-6 text-slate-800 outline-none backdrop-blur-xl placeholder:text-slate-400 focus:border-violet-300 focus:ring-2 focus:ring-violet-100"
            />

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">
                  Mood
                </p>

                <div className="grid grid-cols-3 gap-2">
                  {moods.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setMood(item)}
                      className={`rounded-xl px-2.5 py-2 text-xs font-semibold transition ${
                        mood === item
                          ? "bg-slate-900 text-white shadow-sm"
                          : "bg-white/75 text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">
                  Category
                </p>

                <div className="grid grid-cols-3 gap-2">
                  {categories.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setCategory(item)}
                      className={`rounded-xl px-2.5 py-2 text-xs font-semibold transition ${
                        category === item
                          ? "bg-slate-900 text-white shadow-sm"
                          : "bg-white/75 text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs font-medium text-slate-500">
              <span>{wordCount} words</span>
              <span>
                {mood} • {category}
              </span>
            </div>

            <button
              disabled={loading}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FaSave className="text-xs" />
              {loading ? "Saving..." : editingId ? "Update Entry" : "Save Entry"}
            </button>
          </form>

          <aside className="rounded-2xl border border-white/60 bg-white/60 p-4 shadow-sm backdrop-blur-2xl">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-sm text-violet-600">
                <FaMagic />
              </div>

              <div>
                <h2 className="text-base font-bold text-slate-950">Prompts</h2>
                <p className="text-xs text-slate-500">Start gently.</p>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              {prompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => usePrompt(prompt)}
                  className="w-full rounded-2xl border border-slate-200/70 bg-white/70 p-3 text-left text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </aside>
        </section>

        <section className="rounded-2xl border border-white/60 bg-white/60 p-4 shadow-sm backdrop-blur-2xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-950">
                Journal History
              </h2>
              <p className="text-sm text-slate-500">
                Search and manage your entries.
              </p>
            </div>

            <div className="relative">
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400" />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-2xl border border-slate-200/70 bg-white/70 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-violet-300 focus:ring-2 focus:ring-violet-100 sm:w-72"
              />
            </div>
          </div>

          {filteredJournals.length === 0 ? (
            <div className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-white/50 p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-base text-violet-600">
                <FaSmile />
              </div>

              <h3 className="mt-3 text-base font-bold text-slate-800">
                No entries yet
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Start with one small thought.
              </p>
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              {filteredJournals.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-white/70 bg-white/70 p-4 shadow-sm backdrop-blur-2xl"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-base font-bold text-slate-950">
                        {item.title}
                      </h3>

                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="rounded-full bg-violet-50 px-2.5 py-1 text-[11px] font-bold text-violet-700">
                          {item.mood || "Okay"}
                        </span>

                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-700">
                          {item.category || "Daily"}
                        </span>
                      </div>

                      <p className="mt-2 text-[11px] font-medium text-slate-400">
                        {new Date(item.created_at).toLocaleString()}
                      </p>
                    </div>

                    <div className="flex shrink-0 gap-2">
                      <button
                        type="button"
                        onClick={() => startEdit(item)}
                        className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-xs text-sky-600 transition hover:bg-sky-100"
                      >
                        <FaPen />
                      </button>

                      <button
                        type="button"
                        onClick={() => deleteJournal(item.id)}
                        className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-xs text-red-500 transition hover:bg-red-100"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>

                  <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-600">
                    {item.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Journal;