import { Link } from "react-router-dom";
import {
  FaSmile,
  FaBook,
  FaRobot,
  FaClipboardCheck,
  FaUser,
  FaHeart,
} from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";

function Dashboard() {
  const { user } = useAuth();

  const displayName =
    user?.user_metadata?.display_name ||
    user?.user_metadata?.first_name ||
    "friend";

  const cards = [
    {
      title: "Mood Tracker",
      icon: <FaSmile />,
      desc: "Track how you feel each day.",
      path: "/dashboard/mood-tracker",
    },
    {
      title: "Journal",
      icon: <FaBook />,
      desc: "Write private thoughts safely.",
      path: "/dashboard/journal",
    },
    {
      title: "AI Companion",
      icon: <FaRobot />,
      desc: "Talk with your AI wellness companion.",
      path: "/dashboard/ai-companion",
    },
    {
      title: "Self Check",
      icon: <FaClipboardCheck />,
      desc: "Understand your wellbeing patterns.",
      path: "/dashboard/self-check",
    },
    {
      title: "Resources",
      icon: <FaHeart />,
      desc: "Read simple wellbeing resources.",
      path: "/resources",
    },
    {
      title: "Profile",
      icon: <FaUser />,
      desc: "Manage your account settings.",
      path: "/dashboard/profile",
    },
  ];

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-3xl border border-white/60 bg-white/40 p-6 shadow-xl backdrop-blur-2xl">
          <h1 className="text-3xl font-bold text-slate-900">
            Welcome back, {displayName} 👋
          </h1>

          <p className="mt-2 text-slate-600">
            Your private emotional wellbeing space is ready.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-5">
          {cards.map((card) => (
            <Link
              to={card.path}
              key={card.title}
              className="rounded-3xl border border-white/60 bg-white/40 p-4 shadow-lg backdrop-blur-2xl transition hover:scale-105 hover:bg-white/60 sm:p-5"
            >
              <div className="text-2xl text-sky-600 sm:text-3xl">{card.icon}</div>
              <h2 className="mt-4 font-bold text-slate-900">{card.title}</h2>
              <p className="mt-2 text-sm text-slate-600">{card.desc}</p>
            </Link>
          ))}
        </div>

        <div className="mt-8 rounded-3xl border border-white/60 bg-white/40 p-5 shadow-lg backdrop-blur-2xl">
          <h3 className="font-bold text-slate-900">Recent Activity</h3>
          <p className="mt-2 text-sm text-slate-600">
            No recent activity yet. Your mood, journal, and self-check activity
            will appear here later.
          </p>
        </div>

        <div className="mt-8 rounded-3xl border border-amber-200 bg-amber-50/80 p-5 backdrop-blur-xl">
          <h3 className="font-bold text-amber-800">Important Reminder</h3>
          <p className="mt-2 text-sm text-amber-700">
            Man Ko Saathi is an AI Wellness Companion and self-help platform.
            It is not therapy, diagnosis, medical treatment, medication advice,
            a doctor, hospital, or emergency service.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;