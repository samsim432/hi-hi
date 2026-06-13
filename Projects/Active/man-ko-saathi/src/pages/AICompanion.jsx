import { useCallback, useEffect, useRef, useState } from "react";
import {
  FaRobot,
  FaPaperPlane,
  FaTrash,
  FaExclamationTriangle,
  FaCheckCircle,
  FaShieldAlt,
  FaLock,
} from "react-icons/fa";
import { supabase } from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";

function AICompanion() {
  const { user } = useAuth();
  const bottomRef = useRef(null);

  const quickPrompts = [
    "I feel stressed",
    "I feel anxious",
    "I feel lonely",
    "I cannot sleep",
    "Exam pressure",
    "Family pressure",
  ];

  const crisisPhrases = [
    "i want to die",
    "i want to kill myself",
    "i will kill myself",
    "i will harm myself",
    "i am not safe",
    "i cannot stay alive",
    "suicide",
    "kill myself",
    "harm myself",
  ];

  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [showNotice, setShowNotice] = useState(true);

  const fetchChats = useCallback(async () => {
    if (!user) return;

    setFetching(true);

    const { data, error } = await supabase
      .from("ai_chats")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: true });

    if (error) {
      console.log(error);
      setFetching(false);
      return;
    }

    setChats(data || []);
    setFetching(false);
  }, [user]);

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats, loading]);

  function detectCrisis(text) {
    const lower = text.toLowerCase();
    return crisisPhrases.some((phrase) => lower.includes(phrase));
  }

  async function saveChat(userMessage, aiResponse, riskLevel = "low") {
    const { error } = await supabase.from("ai_chats").insert({
      user_id: user.id,
      user_message: userMessage,
      ai_response: aiResponse,
      risk_level: riskLevel,
    });

    if (error) {
      alert(error.message);
      return false;
    }

    return true;
  }

  async function sendMessage(e) {
    e.preventDefault();

    if (!message.trim() || loading) return;

    if (!user) {
      alert("You must be logged in.");
      return;
    }

    const userMessage = message.trim();
    setMessage("");

    if (detectCrisis(userMessage)) {
      const emergencyReply =
        "I'm really sorry you're feeling this way. I cannot provide emergency help. Please contact emergency services, go to the nearest hospital, or call someone you trust right now. Do not stay alone.";

      await saveChat(userMessage, emergencyReply, "high");
      await fetchChats();
      return;
    }

    setLoading(true);

const { data, error } = await supabase.functions.invoke("ai-companion", {
  body: {
    message: userMessage,
    history: chats.slice(-10),
  },
});

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    await saveChat(
      userMessage,
      data?.reply ||
        "I'm here with you. Can you tell me a little more about what you are feeling right now?",
      data?.risk_level || "low"
    );

    await fetchChats();
    setLoading(false);
  }

  async function deleteChat(id) {
    const confirmDelete = confirm("Delete this message?");
    if (!confirmDelete) return;

    const { error } = await supabase
      .from("ai_chats")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) {
      alert(error.message);
      return;
    }

    await fetchChats();
  }

  function usePrompt(prompt) {
    setMessage(prompt);
  }

  return (
    <div className="relative h-[calc(100vh-96px)] overflow-hidden bg-transparent px-2 pb-3 pt-2 sm:px-4">
      {showNotice && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/60 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white p-5 shadow-2xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
              <FaExclamationTriangle className="text-xl" />
            </div>

            <h2 className="mt-4 text-center text-xl font-extrabold text-slate-900">
              Safety, Privacy & Disclaimer
            </h2>

            <div className="mt-4 space-y-3">
              <div className="rounded-2xl bg-amber-50 p-3 text-sm text-amber-900">
                <p className="font-bold">Safety Notice</p>
                <p className="mt-1 text-xs leading-5">
                  Man Ko Saathi is not emergency support. If you are in danger,
                  contact emergency services or a trusted person now.
                </p>
              </div>

              <div className="rounded-2xl bg-sky-50 p-3 text-sm text-sky-900">
                <p className="flex items-center gap-2 font-bold">
                  <FaLock /> Privacy Notice
                </p>
                <p className="mt-1 text-xs leading-5">
                  Your chat is connected to your account. You can delete saved
                  messages anytime.
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">
                <p className="flex items-center gap-2 font-bold">
                  <FaShieldAlt /> Disclaimer
                </p>
                <p className="mt-1 text-xs leading-5">
                  This is not therapy, diagnosis, medical treatment, medication
                  advice, a doctor, hospital, or emergency service.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowNotice(false)}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-sky-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-sky-700"
            >
              <FaCheckCircle />
              OK, I Understand
            </button>
          </div>
        </div>
      )}

      <div className="mx-auto flex h-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-white/60 bg-white/55 shadow-[0_18px_55px_rgba(15,23,42,0.10)] backdrop-blur-2xl">
        <header className="flex items-center justify-between border-b border-white/60 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
              <FaRobot />
            </div>

            <div>
              <h1 className="text-base font-extrabold text-slate-950">
                AI Companion
              </h1>
              <p className="text-xs text-slate-500">Private conversation</p>
            </div>
          </div>
        </header>

        <div className="flex gap-2 overflow-x-auto border-b border-white/60 px-3 py-3">
          {quickPrompts.map((prompt) => (
            <button
              key={prompt}
              onClick={() => usePrompt(prompt)}
              className="shrink-0 rounded-full border border-white/70 bg-white/70 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-sky-50 hover:text-sky-700"
            >
              {prompt}
            </button>
          ))}
        </div>

        <main className="flex-1 overflow-y-auto px-3 py-4">
          {fetching ? (
            <p className="text-center text-sm text-slate-500">
              Loading chat...
            </p>
          ) : chats.length === 0 ? (
            <div className="flex h-full items-center justify-center text-center">
              <div>
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-3xl bg-sky-100 text-2xl text-sky-600">
                  <FaRobot />
                </div>

                <p className="mt-4 text-sm font-bold text-slate-700">
                  Start a private chat.
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Write how you feel or choose a prompt.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {chats.map((chat) => (
                <div key={chat.id} className="space-y-2">
                  <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-sky-600 px-4 py-3 text-sm leading-6 text-white">
                    {chat.user_message}
                  </div>

                  <div
                    className={`max-w-[88%] rounded-2xl rounded-bl-md border px-4 py-3 text-sm leading-6 shadow-sm ${
                      chat.risk_level === "high"
                        ? "border-red-200 bg-red-50 text-red-800"
                        : "border-white/70 bg-white/85 text-slate-700"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{chat.ai_response}</p>

                    <button
                      onClick={() => deleteChat(chat.id)}
                      className="mt-2 text-xs font-bold text-red-500"
                    >
                      <FaTrash className="inline" /> Delete
                    </button>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="max-w-[80%] rounded-2xl rounded-bl-md bg-white/85 px-4 py-3 text-sm text-slate-500">
                  Man Ko Saathi is typing...
                </div>
              )}

              <div ref={bottomRef} />
            </div>
          )}
        </main>

        <form
          onSubmit={sendMessage}
          className="border-t border-white/60 bg-white/60 p-3 backdrop-blur-xl"
        >
          <div className="flex items-center gap-2">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Message Man Ko Saathi..."
              className="min-w-0 flex-1 rounded-2xl border border-white/70 bg-white/80 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-sky-300"
            />

            <button
              disabled={loading || !message.trim()}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sky-600 text-white shadow-lg shadow-sky-200 transition hover:bg-sky-700 disabled:opacity-50"
            >
              <FaPaperPlane />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AICompanion;