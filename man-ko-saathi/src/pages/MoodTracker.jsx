import { useEffect, useMemo, useState } from "react";
import {
  FaTrash,
  FaSmile,
  FaCloudSun,
  FaShieldAlt,
  FaCalendarAlt,
  FaPen,
  FaChartLine,
  FaBrain,
  FaFire,
} from "react-icons/fa";
import { supabase } from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";

const moodColors = {
  "😊 Happy": {
    bg: "bg-emerald-500",
    light: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
  },
  "🙂 Good": {
    bg: "bg-sky-500",
    light: "bg-sky-50",
    text: "text-sky-700",
    border: "border-sky-200",
  },
  "😐 Okay": {
    bg: "bg-slate-500",
    light: "bg-slate-50",
    text: "text-slate-700",
    border: "border-slate-200",
  },
  "😔 Sad": {
    bg: "bg-blue-500",
    light: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
  },
  "😰 Anxious": {
    bg: "bg-orange-500",
    light: "bg-orange-50",
    text: "text-orange-700",
    border: "border-orange-200",
  },
  "😡 Angry": {
    bg: "bg-red-500",
    light: "bg-red-50",
    text: "text-red-700",
    border: "border-red-200",
  },
  "😴 Tired": {
    bg: "bg-purple-500",
    light: "bg-purple-50",
    text: "text-purple-700",
    border: "border-purple-200",
  },
  "😢 Very Low": {
    bg: "bg-indigo-500",
    light: "bg-indigo-50",
    text: "text-indigo-700",
    border: "border-indigo-200",
  },
  "🫥 Lonely": {
    bg: "bg-cyan-500",
    light: "bg-cyan-50",
    text: "text-cyan-700",
    border: "border-cyan-200",
  },
};

function MoodTracker() {
  const { user } = useAuth();

  const moods = [
    { label: "Happy", emoji: "😊", value: "😊 Happy" },
    { label: "Good", emoji: "🙂", value: "🙂 Good" },
    { label: "Okay", emoji: "😐", value: "😐 Okay" },
    { label: "Sad", emoji: "😔", value: "😔 Sad" },
    { label: "Anxious", emoji: "😰", value: "😰 Anxious" },
    { label: "Angry", emoji: "😡", value: "😡 Angry" },
    { label: "Tired", emoji: "😴", value: "😴 Tired" },
    { label: "Very Low", emoji: "😢", value: "😢 Very Low" },
    { label: "Lonely", emoji: "🫥", value: "🫥 Lonely" },
  ];

  const [selectedMood, setSelectedMood] = useState("");
  const [note, setNote] = useState("");
  const [moodHistory, setMoodHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  async function fetchMoods() {
    if (!user) return;

    setFetching(true);

    const { data, error } = await supabase
      .from("moods")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      setFetching(false);
      return;
    }

    setMoodHistory(data || []);
    setFetching(false);
  }

  useEffect(() => {
    fetchMoods();
  }, [user]);

  async function saveMood(e) {
    e.preventDefault();

    if (!selectedMood) {
      alert("Please select your mood.");
      return;
    }

    if (!user) {
      alert("You must be logged in.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("moods").insert({
      user_id: user.id,
      mood: selectedMood,
      note: note.trim(),
    });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    setSelectedMood("");
    setNote("");
    await fetchMoods();
    setLoading(false);
  }

  async function deleteMood(id) {
    const confirmDelete = confirm("Delete this mood entry?");
    if (!confirmDelete) return;

    const { error } = await supabase
      .from("moods")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) {
      alert(error.message);
      return;
    }

    await fetchMoods();
  }

  const weeklyData = useMemo(() => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentMoods = moodHistory.filter(
      (item) => new Date(item.created_at) >= sevenDaysAgo
    );

    const counts = {};
    recentMoods.forEach((item) => {
      counts[item.mood] = (counts[item.mood] || 0) + 1;
    });

    const mostCommonMood = Object.entries(counts).sort(
      (a, b) => b[1] - a[1]
    )[0];

    return {
      total: recentMoods.length,
      mostCommon: mostCommonMood,
    };
  }, [moodHistory]);

  const streak = useMemo(() => {
    if (moodHistory.length === 0) return 0;

    const uniqueDates = [
      ...new Set(
        moodHistory.map((item) =>
          new Date(item.created_at).toISOString().split("T")[0]
        )
      ),
    ].sort((a, b) => new Date(b) - new Date(a));

    let count = 0;
    const todayDate = new Date();

    for (let i = 0; i < 30; i++) {
      const checkDate = new Date(todayDate);
      checkDate.setDate(todayDate.getDate() - i);
      const key = checkDate.toISOString().split("T")[0];

      if (uniqueDates.includes(key)) {
        count++;
      } else if (i === 0) {
        continue;
      } else {
        break;
      }
    }

    return count;
  }, [moodHistory]);

  const moodSummary = useMemo(() => {
    return Object.entries(
      moodHistory.reduce((acc, item) => {
        acc[item.mood] = (acc[item.mood] || 0) + 1;
        return acc;
      }, {})
    )
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  }, [moodHistory]);

  const heatmapDays = useMemo(() => {
    const days = [];

    for (let i = 27; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);

      const key = date.toISOString().split("T")[0];

      const entries = moodHistory.filter(
        (item) => new Date(item.created_at).toISOString().split("T")[0] === key
      );

      days.push({
        key,
        label: date.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
        }),
        count: entries.length,
      });
    }

    return days;
  }, [moodHistory]);

  const trendData = useMemo(() => {
    const lastSevenDays = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);

      const key = date.toISOString().split("T")[0];

      const count = moodHistory.filter(
        (item) => new Date(item.created_at).toISOString().split("T")[0] === key
      ).length;

      lastSevenDays.push({
        key,
        day: date.toLocaleDateString("en-GB", { weekday: "short" }),
        count,
      });
    }

    return lastSevenDays;
  }, [moodHistory]);

  const aiReflection = useMemo(() => {
    if (moodHistory.length === 0) {
      return "Your reflection will appear after you save a few mood check-ins. Start with one honest mood today.";
    }

    const lowMoods = ["😔 Sad", "😰 Anxious", "😡 Angry", "😢 Very Low", "🫥 Lonely"];
    const recent = moodHistory.slice(0, 5);
    const lowCount = recent.filter((item) => lowMoods.includes(item.mood)).length;

    if (lowCount >= 3) {
      return "You have recorded several difficult moods recently. Be gentle with yourself, take small steps, and consider reaching out to someone you trust. If there is immediate danger, use emergency support.";
    }

    if (weeklyData.total >= 5) {
      return "You are building a strong check-in habit. Keep noticing patterns without judging yourself.";
    }

    return "You have started tracking your emotions. Small, consistent check-ins can help you understand yourself better over time.";
  }, [moodHistory, weeklyData.total]);

  function getWeeklyInsight() {
    if (weeklyData.total === 0) {
      return "No mood recorded this week yet.";
    }

    return `This week you recorded ${weeklyData.mostCommon[0]} ${weeklyData.mostCommon[1]} time(s).`;
  }

  function getHeatmapColor(count) {
    if (count === 0) return "bg-white/70";
    if (count === 1) return "bg-sky-200";
    if (count === 2) return "bg-sky-400";
    return "bg-sky-600";
  }

  const maxTrendValue = Math.max(...trendData.map((item) => item.count), 1);

  return (
    <div className="relative min-h-screen overflow-hidden px-4 pb-10 pt-6 sm:px-6 lg:px-8">
      <div className="pointer-events-none fixed left-10 top-24 -z-10 h-72 w-72 rounded-full bg-sky-300/30 blur-3xl" />
      <div className="pointer-events-none fixed right-0 top-96 -z-10 h-80 w-80 rounded-full bg-emerald-300/25 blur-3xl" />
      <div className="pointer-events-none fixed bottom-10 left-1/3 -z-10 h-72 w-72 rounded-full bg-purple-300/20 blur-3xl" />

      <div className="mx-auto max-w-7xl">
        <section className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-white/45 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur-2xl sm:p-8">
          <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-sky-300/30 blur-3xl" />
          <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-emerald-300/30 blur-3xl" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/60 px-4 py-2 text-xs font-bold text-sky-700 shadow-sm backdrop-blur-xl">
                <FaSmile />
                Mood Tracker
              </div>

              <h1 className="mt-5 text-3xl font-extrabold text-slate-950 sm:text-4xl">
                How are you feeling today?
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                Track your mood, write a small note, and slowly understand your
                emotional patterns over time.
              </p>
            </div>

            <div className="rounded-3xl border border-white/60 bg-white/50 p-4 shadow-sm backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
                  <FaCalendarAlt />
                </div>

                <div>
                  <p className="text-xs font-bold text-slate-500">Today</p>
                  <p className="text-sm font-bold text-slate-900">{today}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-[2rem] border border-amber-200 bg-amber-50/80 p-5 shadow-lg backdrop-blur-2xl">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
              <FaShieldAlt />
            </div>

            <p className="text-sm leading-7 text-amber-800">
              Man Ko Saathi is not therapy, diagnosis, medical treatment,
              medication advice, a doctor, hospital, or emergency service.
            </p>
          </div>
        </section>

        <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <form
            onSubmit={saveMood}
            className="rounded-[2rem] border border-white/60 bg-white/45 p-5 shadow-[0_18px_55px_rgba(15,23,42,0.10)] backdrop-blur-2xl sm:p-6 lg:col-span-2"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
                <FaCloudSun />
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-slate-950">
                  Select your mood
                </h2>
                <p className="text-sm text-slate-500">
                  Choose the option closest to how you feel.
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
              {moods.map((mood) => {
                const color = moodColors[mood.value];

                return (
                  <button
                    type="button"
                    key={mood.value}
                    onClick={() => setSelectedMood(mood.value)}
                    className={`rounded-[1.3rem] border p-3 text-left shadow-sm backdrop-blur-xl transition hover:-translate-y-1 sm:p-4 ${
                      selectedMood === mood.value
                        ? `${color.bg} border-white text-white shadow-lg`
                        : `border-white/60 bg-white/50 text-slate-700 hover:bg-white/80`
                    }`}
                  >
                    <div className="text-2xl sm:text-3xl">{mood.emoji}</div>
                    <p className="mt-2 text-xs font-extrabold sm:text-sm">{mood.label}</p>
                  </button>
                );
              })}
            </div>

            <div className="mt-6">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                <FaPen className="text-sky-600" />
                Add a short note
              </label>

              <textarea
                rows="4"
                placeholder="What made you feel this way?"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="mt-3 w-full resize-none rounded-[1.5rem] border border-white/60 bg-white/60 p-4 text-sm text-slate-700 outline-none backdrop-blur-xl placeholder:text-slate-400 focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
              />
            </div>

            <button
              disabled={loading}
              className="mt-5 w-full rounded-[1.5rem] bg-sky-600 py-3 text-sm font-extrabold text-white shadow-lg shadow-sky-200 transition hover:-translate-y-1 hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save Mood"}
            </button>
          </form>

          <aside className="rounded-[2rem] border border-white/60 bg-white/45 p-5 shadow-[0_18px_55px_rgba(15,23,42,0.10)] backdrop-blur-2xl sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                <FaChartLine />
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-slate-950">
                  Weekly Insight
                </h2>
                <p className="text-sm text-slate-500">Last 7 days</p>
              </div>
            </div>

            <div className="mt-5 rounded-3xl border border-white/60 bg-white/50 p-4">
              <p className="text-sm leading-7 text-slate-600">
                {getWeeklyInsight()}
              </p>
            </div>

            <div className="mt-4 rounded-3xl border border-orange-100 bg-orange-50/90 p-4">
              <p className="flex items-center gap-2 text-sm font-bold text-orange-700">
                <FaFire />
                Current Streak: {streak} day(s)
              </p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-3xl border border-white/60 bg-white/50 p-4">
                <p className="text-2xl font-extrabold text-slate-950">
                  {weeklyData.total}
                </p>
                <p className="mt-1 text-xs font-bold text-slate-500">
                  This week
                </p>
              </div>

              <div className="rounded-3xl border border-white/60 bg-white/50 p-4">
                <p className="text-2xl font-extrabold text-slate-950">
                  {moodHistory.length}
                </p>
                <p className="mt-1 text-xs font-bold text-slate-500">
                  Total entries
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-3xl border border-white/60 bg-white/50 p-4">
              <h3 className="font-bold text-slate-900">Mood Summary</h3>

              {moodSummary.length === 0 ? (
                <p className="mt-3 text-sm text-slate-500">
                  No summary yet.
                </p>
              ) : (
                <div className="mt-3 space-y-2">
                  {moodSummary.map(([mood, count]) => (
                    <div
                      key={mood}
                      className="flex justify-between gap-3 text-sm"
                    >
                      <span
                        className={`rounded-full px-3 py-1 font-bold ${
                          moodColors[mood]?.light || "bg-slate-50"
                        } ${moodColors[mood]?.text || "text-slate-700"}`}
                      >
                        {mood}
                      </span>
                      <span className="font-extrabold text-slate-800">
                        {count}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-5 rounded-3xl border border-sky-100 bg-sky-50/80 p-4">
              <p className="text-sm leading-6 text-sky-700">
                This is only a reflection tool. It is not a mental health
                diagnosis.
              </p>
            </div>
          </aside>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-white/60 bg-white/45 p-5 shadow-[0_18px_55px_rgba(15,23,42,0.10)] backdrop-blur-2xl sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
                <FaCalendarAlt />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-slate-950">
                  Mood Calendar Heatmap
                </h2>
                <p className="text-sm text-slate-500">Last 28 days</p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-7 gap-2">
              {heatmapDays.map((day) => (
                <div
                  key={day.key}
                  title={`${day.label}: ${day.count} check-in(s)`}
                  className={`h-10 rounded-2xl border border-white/70 shadow-sm ${getHeatmapColor(
                    day.count
                  )}`}
                />
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between text-xs font-bold text-slate-500">
              <span>Less</span>
              <div className="flex gap-1">
                <span className="h-3 w-3 rounded bg-white/70" />
                <span className="h-3 w-3 rounded bg-sky-200" />
                <span className="h-3 w-3 rounded bg-sky-400" />
                <span className="h-3 w-3 rounded bg-sky-600" />
              </div>
              <span>More</span>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/60 bg-white/45 p-5 shadow-[0_18px_55px_rgba(15,23,42,0.10)] backdrop-blur-2xl sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                <FaChartLine />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-slate-950">
                  Mood Trend Chart
                </h2>
                <p className="text-sm text-slate-500">Check-ins this week</p>
              </div>
            </div>

            <div className="mt-6 flex h-52 items-end gap-3">
              {trendData.map((item) => (
                <div key={item.key} className="flex flex-1 flex-col items-center">
                  <div className="flex h-40 w-full items-end rounded-2xl bg-white/50 p-1">
                    <div
                      className="w-full rounded-xl bg-sky-500 transition-all"
                      style={{
                        height: `${Math.max(
                          (item.count / maxTrendValue) * 100,
                          item.count > 0 ? 12 : 4
                        )}%`,
                      }}
                    />
                  </div>
                  <p className="mt-2 text-xs font-bold text-slate-500">
                    {item.day}
                  </p>
                  <p className="text-xs font-extrabold text-slate-900">
                    {item.count}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-[2rem] border border-purple-200 bg-purple-50/80 p-5 shadow-lg backdrop-blur-2xl sm:p-6">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-purple-100 text-purple-700">
              <FaBrain />
            </div>

            <div>
              <h2 className="text-xl font-extrabold text-purple-950">
                AI Mood Reflection
              </h2>
              <p className="mt-2 text-sm leading-7 text-purple-800">
                {aiReflection}
              </p>
              <p className="mt-3 text-xs leading-6 text-purple-700">
                This reflection is only supportive guidance. It is not therapy,
                diagnosis, medical treatment, medication advice, or emergency
                support.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] border border-white/60 bg-white/45 p-5 shadow-[0_18px_55px_rgba(15,23,42,0.10)] backdrop-blur-2xl sm:p-6">
          <h2 className="text-xl font-extrabold text-slate-950">
            Mood History
          </h2>

          {fetching ? (
            <p className="mt-4 text-sm text-slate-500">
              Loading mood history...
            </p>
          ) : moodHistory.length === 0 ? (
            <div className="mt-5 rounded-3xl border border-white/60 bg-white/50 p-6 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-sky-100 text-3xl">
                😊
              </div>
              <p className="mt-4 text-sm font-bold text-slate-700">
                No mood entries yet.
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-500">
                Your saved moods will appear here after your first check-in.
              </p>
            </div>
          ) : (
            <div className="mt-5 space-y-4">
              {moodHistory.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start justify-between gap-4 rounded-3xl border border-white/60 bg-white/55 p-4 shadow-sm backdrop-blur-xl transition hover:bg-white/75"
                >
                  <div>
                    <div
                      className={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-bold ${
                        moodColors[item.mood]?.light || "bg-slate-50"
                      } ${moodColors[item.mood]?.text || "text-slate-700"} ${
                        moodColors[item.mood]?.border || "border-slate-200"
                      }`}
                    >
                      {item.mood}
                    </div>

                    {item.note && (
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {item.note}
                      </p>
                    )}

                    <p className="mt-3 text-xs font-medium text-slate-400">
                      {new Date(item.created_at).toLocaleString("en-GB")}
                    </p>
                  </div>

                  <button
                    onClick={() => deleteMood(item.id)}
                    className="rounded-2xl bg-red-50 p-3 text-red-500 transition hover:bg-red-100 hover:text-red-700"
                    aria-label="Delete mood entry"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default MoodTracker;