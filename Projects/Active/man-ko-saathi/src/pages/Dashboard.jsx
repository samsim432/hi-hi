import { Link } from "react-router-dom";
import {
  FaSmile,
  FaBook,
  FaRobot,
  FaClipboardCheck,
  FaUser,
  FaHeart,
  FaArrowRight,
  FaShieldAlt,
  FaLeaf,
  FaCloudSun,
  FaWalking,
  FaTint,
  FaPenFancy,
  FaHandsHelping,
  FaExclamationTriangle,
} from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";

function Dashboard() {
  const { user } = useAuth();

  const displayName =
    user?.user_metadata?.display_name ||
    user?.user_metadata?.first_name ||
    "friend";

  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const cards = [
    {
      title: "Mood Tracker",
      icon: <FaSmile />,
      desc: "Check in with your emotions and notice your daily patterns.",
      path: "/dashboard/mood-tracker",
      image:
        "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Journal",
      icon: <FaBook />,
      desc: "Write private reflections, thoughts, and small daily notes.",
      path: "/dashboard/journal",
      image:
        "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "AI Companion",
      icon: <FaRobot />,
      desc: "Talk gently with an AI wellness companion when you need space.",
      path: "/dashboard/ai-companion",
      image:
        "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Self Check",
      icon: <FaClipboardCheck />,
      desc: "Use simple check-ins to understand your wellbeing better.",
      path: "/dashboard/self-check",
      image:
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Resources",
      icon: <FaHeart />,
      desc: "Read simple self-help resources for stress, sleep, and emotions.",
      path: "/resources",
      image:
        "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Profile",
      icon: <FaUser />,
      desc: "Manage your basic account and personal dashboard settings.",
      path: "/dashboard/profile",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    },
  ];

  const wellnessCards = [
    {
      title: "Journaling",
      desc: "Write one honest sentence about how you feel today.",
      image:
        "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Nature Walk",
      desc: "A short walk outside can help your mind slow down.",
      image:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Mindfulness",
      desc: "Pause, breathe slowly, and return to this moment.",
      image:
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80",
    },
  ];

  const tips = [
    { icon: <FaWalking />, text: "Take a short walk." },
    { icon: <FaTint />, text: "Drink a glass of water." },
    { icon: <FaPenFancy />, text: "Write one positive thing." },
    { icon: <FaLeaf />, text: "Take three slow breaths." },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden px-4 pb-10 pt-6 sm:px-6 lg:px-8">
      <div className="pointer-events-none fixed left-10 top-24 -z-10 h-72 w-72 rounded-full bg-sky-300/30 blur-3xl" />
      <div className="pointer-events-none fixed right-0 top-96 -z-10 h-80 w-80 rounded-full bg-emerald-300/25 blur-3xl" />
      <div className="pointer-events-none fixed bottom-10 left-1/3 -z-10 h-72 w-72 rounded-full bg-purple-300/20 blur-3xl" />

      <div className="mx-auto max-w-7xl">
        <section className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-white/45 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur-2xl sm:p-8 lg:p-10">
          <div className="absolute -right-20 -top-20 h-56 w-56 animate-pulse rounded-full bg-sky-300/30 blur-3xl" />
          <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-emerald-300/30 blur-3xl" />

          <div className="relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/60 px-4 py-2 text-xs font-bold text-sky-700 shadow-sm backdrop-blur-xl">
                <FaLeaf className="text-emerald-500" />
                Private wellbeing dashboard
              </div>

              <h1 className="mt-5 text-3xl font-extrabold leading-tight text-slate-950 sm:text-4xl lg:text-5xl">
                Welcome back, {displayName} 👋
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                Your calm space for mood tracking, journaling, self-checks, and
                gentle AI-supported reflection.
              </p>

              <div className="mt-5 rounded-3xl border border-white/60 bg-white/45 p-4 shadow-sm backdrop-blur-xl">
                <p className="text-sm font-bold text-slate-800">
                  “You do not need to fix everything today. Start with one small
                  check-in.”
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/dashboard/mood-tracker"
                  className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-sky-200 transition hover:-translate-y-1 hover:bg-sky-700"
                >
                  Start Mood Check
                  <FaArrowRight />
                </Link>

                <Link
                  to="/dashboard/journal"
                  className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-5 py-3 text-sm font-bold text-slate-700 shadow-sm backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white"
                >
                  Open Journal
                </Link>
              </div>
            </div>

            <div className="relative animate-float">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-sky-200/50 to-emerald-200/50 blur-2xl" />

              <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/50 shadow-2xl backdrop-blur-2xl">
                <img
                  src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80"
                  alt="Calm wellbeing dashboard"
                  className="h-56 w-full object-cover sm:h-72 lg:h-80"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-slate-950/10 to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 rounded-3xl border border-white/40 bg-white/25 p-4 text-white backdrop-blur-xl">
                  <p className="text-sm font-bold">Today’s gentle reminder</p>
                  <p className="mt-1 text-xs leading-5 text-white/85">
                    One small check-in is enough. You do not need to solve
                    everything at once.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-white/60 bg-white/45 p-5 shadow-lg backdrop-blur-2xl">
            <p className="text-xs font-bold uppercase tracking-wide text-sky-600">
              Today's Check-In
            </p>
            <h2 className="mt-2 text-2xl font-extrabold text-slate-950">
              How are you feeling today?
            </h2>
            <p className="mt-2 text-sm text-slate-500">{today}</p>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Take a moment to notice your mood. You do not need a perfect
              answer — just an honest one.
            </p>

            <Link
              to="/dashboard/mood-tracker"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-slate-800"
            >
              How are you feeling today?
              <FaArrowRight />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { name: "Mood Tracker", icon: <FaSmile />, path: "/dashboard/mood-tracker" },
              { name: "Journal", icon: <FaBook />, path: "/dashboard/journal" },
              { name: "AI Companion", icon: <FaRobot />, path: "/dashboard/ai-companion" },
              { name: "Self Check", icon: <FaClipboardCheck />, path: "/dashboard/self-check" },
            ].map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="rounded-[1.6rem] border border-white/60 bg-white/45 p-4 shadow-lg backdrop-blur-2xl transition hover:-translate-y-1 hover:bg-white/70"
              >
                <div className="text-2xl text-sky-600">{item.icon}</div>
                <p className="mt-3 text-sm font-extrabold text-slate-900">
                  {item.name}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          {wellnessCards.map((item) => (
            <div
              key={item.title}
              className="group relative h-64 overflow-hidden rounded-[2rem] border border-white/60 bg-white/40 shadow-xl backdrop-blur-2xl"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/15 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 rounded-3xl border border-white/30 bg-white/20 p-4 text-white backdrop-blur-xl">
                <h3 className="font-extrabold">{item.title}</h3>
                <p className="mt-1 text-xs leading-5 text-white/85">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </section>

        <section className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-5">
          {cards.map((card, index) => (
            <Link
              to={card.path}
              key={card.title}
              className="group relative overflow-hidden rounded-[1.8rem] border border-white/60 bg-white/45 p-4 shadow-[0_18px_55px_rgba(15,23,42,0.10)] backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:bg-white/70 hover:shadow-[0_24px_70px_rgba(15,23,42,0.16)] sm:p-5"
              style={{ animation: `fadeUp 0.55s ease ${index * 0.07}s both` }}
            >
              <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100">
                <img src={card.image} alt={card.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm" />
              </div>

              <div className="relative">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-100 text-xl text-sky-600 shadow-sm sm:h-12 sm:w-12 sm:text-2xl">
                  {card.icon}
                </div>

                <h2 className="mt-4 text-base font-extrabold text-slate-950 sm:text-lg">
                  {card.title}
                </h2>

                <p className="mt-2 text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6">
                  {card.desc}
                </p>

                <div className="mt-4 flex items-center gap-2 text-xs font-bold text-sky-700 opacity-0 transition group-hover:opacity-100">
                  Open <FaArrowRight />
                </div>
              </div>
            </Link>
          ))}
        </section>

        <section className="mt-6 grid gap-4 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-[2rem] border border-white/60 bg-white/45 p-5 shadow-lg backdrop-blur-2xl">
            <h3 className="text-lg font-extrabold text-slate-950">
              Weekly Progress Preview
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              This will connect to Supabase later.
            </p>

            {[
              ["Mood Check-ins", 0, "w-[0%]"],
              ["Journal Entries", 0, "w-[0%]"],
              ["Self Checks", 0, "w-[0%]"],
            ].map(([label, value, width]) => (
              <div key={label} className="mt-4">
                <div className="flex justify-between text-sm font-bold text-slate-700">
                  <span>{label}</span>
                  <span>{value}</span>
                </div>
                <div className="mt-2 h-3 overflow-hidden rounded-full bg-white/70">
                  <div className={`h-full rounded-full bg-sky-500 ${width}`} />
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-[2rem] border border-white/60 bg-white/45 p-5 shadow-lg backdrop-blur-2xl">
            <h3 className="text-lg font-extrabold text-slate-950">
              Wellness Tips
            </h3>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {tips.map((tip) => (
                <div
                  key={tip.text}
                  className="rounded-3xl border border-white/60 bg-white/50 p-4 backdrop-blur-xl"
                >
                  <div className="text-xl text-emerald-600">{tip.icon}</div>
                  <p className="mt-2 text-xs font-bold leading-5 text-slate-700">
                    {tip.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-4 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-[2rem] border border-white/60 bg-white/45 p-5 shadow-lg backdrop-blur-2xl">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                <FaCloudSun />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-950">Recent Activity</h3>
                <p className="text-xs text-slate-500">Your latest check-ins</p>
              </div>
            </div>

            <div className="mt-4 rounded-3xl border border-white/60 bg-white/50 p-5 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-sky-100 text-2xl text-sky-600">
                <FaHandsHelping />
              </div>
              <p className="mt-4 text-sm font-semibold text-slate-700">
                No recent activity yet.
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-500">
                Your mood, journal, and self-check activity will appear here
                after we build those features.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-red-200 bg-red-50/80 p-5 shadow-lg backdrop-blur-2xl">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-100 text-red-700">
                <FaExclamationTriangle />
              </div>
              <div>
                <h3 className="font-extrabold text-red-900">Need urgent help?</h3>
                <p className="text-xs text-red-700">Emergency support shortcut</p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-7 text-red-800">
              If someone may be in immediate danger, contact local emergency
              services now. Man Ko Saathi is not an emergency service.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                to="/emergency-help"
                className="rounded-full bg-red-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-red-200 transition hover:-translate-y-1 hover:bg-red-700"
              >
                Emergency Help
              </Link>

              <Link
                to="/resources"
                className="rounded-full border border-red-200 bg-white/70 px-5 py-3 text-sm font-bold text-red-700 backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white"
              >
                Crisis Resources
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-[2rem] border border-amber-200 bg-amber-50/80 p-5 shadow-lg backdrop-blur-2xl">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
              <FaShieldAlt />
            </div>
            <div>
              <h3 className="font-extrabold text-amber-900">
                Important Reminder
              </h3>
              <p className="text-xs text-amber-700">Safety first</p>
            </div>
          </div>

          <p className="mt-4 text-sm leading-7 text-amber-800">
            Man Ko Saathi is an AI Wellness Companion and self-help platform. It
            is not therapy, diagnosis, medical treatment, medication advice, a
            doctor, hospital, or emergency service.
          </p>
        </section>
      </div>

      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default Dashboard;