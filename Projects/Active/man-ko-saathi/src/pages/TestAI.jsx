
import { supabase } from "../lib/supabase";
import { useState } from "react";
import { FaRobot, FaPaperPlane } from "react-icons/fa";

function TestAI() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  async function testAI() {
    if (!message.trim()) return;

    setLoading(true);

    const { data, error } = await supabase.functions.invoke(
      "ai-companion",
      {
        body: {
          message,
        },
      }
    );

    console.log(data);
    console.log(error);

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    setReply(data.reply);
    setLoading(false);
  }

  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-6">
      <div className="pointer-events-none fixed left-10 top-24 -z-10 h-72 w-72 rounded-full bg-sky-300/30 blur-3xl" />
      <div className="pointer-events-none fixed right-0 top-96 -z-10 h-80 w-80 rounded-full bg-emerald-300/25 blur-3xl" />
      <div className="pointer-events-none fixed bottom-10 left-1/3 -z-10 h-72 w-72 rounded-full bg-purple-300/20 blur-3xl" />

      <div className="mx-auto max-w-3xl">
        <div className="rounded-[2rem] border border-white/60 bg-white/45 p-5 shadow-[0_18px_55px_rgba(15,23,42,0.10)] backdrop-blur-2xl sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-xl text-sky-600">
              <FaRobot />
            </div>

            <div>
              <h1 className="text-2xl font-extrabold text-slate-950 sm:text-3xl">
                AI Companion Test
              </h1>

              <p className="text-sm text-slate-500">
                Testing Supabase Edge Function + Gemini
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm text-amber-700">
              This is only a temporary testing page.
            </p>
          </div>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            placeholder="Type something like: I feel stressed about exams..."
            className="mt-5 w-full rounded-2xl border border-white/60 bg-white/70 p-4 text-sm outline-none backdrop-blur-xl focus:ring-2 focus:ring-sky-500"
          />

          <button
            onClick={testAI}
            disabled={loading}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-sky-600 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-sky-700 disabled:opacity-60"
          >
            <FaPaperPlane />
            {loading ? "Testing..." : "Send Test Message"}
          </button>

          {reply && (
            <div className="mt-6 rounded-3xl border border-white/60 bg-white/55 p-5 shadow-sm backdrop-blur-xl">
              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">
                AI Reply
              </p>

              <p className="whitespace-pre-wrap text-sm leading-7 text-slate-700">
                {reply}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TestAI;
