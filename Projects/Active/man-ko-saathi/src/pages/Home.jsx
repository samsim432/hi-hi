import { Link } from "react-router-dom";

import {
  FaRobot,
  FaSmile,
  FaBookOpen,
  FaClipboardCheck,
  FaShieldAlt,
  FaLock,
  FaHeart,
  FaMoon,
  FaCloud,
  FaUserFriends,
  FaExclamationTriangle,
  FaArrowRight,
  FaLeaf,
  FaCheckCircle,
} from "react-icons/fa";

function Home() {
  const feelings = [
    { title: "Stress", icon: <FaCloud /> },
    { title: "Loneliness", icon: <FaUserFriends /> },
    { title: "Anxiety", icon: <FaHeart /> },
    { title: "Exam Pressure", icon: <FaClipboardCheck /> },
    { title: "Family Pressure", icon: <FaShieldAlt /> },
    { title: "Sleep Problems", icon: <FaMoon /> },
  ];

  const helpItems = [
    {
      title: "AI Wellness Companion",
      icon: <FaRobot />,
      desc: "Share your feelings with a gentle AI companion designed for emotional wellbeing support.",
    },
    {
      title: "Mood Tracker",
      icon: <FaSmile />,
      desc: "Track your daily mood and understand your emotional patterns over time.",
    },
    {
      title: "Private Journal",
      icon: <FaBookOpen />,
      desc: "Write your thoughts safely in a calm and private digital space.",
    },
    {
      title: "Self-check Tools",
      icon: <FaClipboardCheck />,
      desc: "Reflect on stress, sleep, mood, and personal wellbeing using simple tools.",
    },
  ];

  const safetyItems = [
    {
      title: "Private by design",
      desc: "Your wellbeing space should feel calm, respectful, and safe.",
      icon: <FaLock />,
    },
    {
      title: "Clear boundaries",
      desc: "Man Ko Saathi does not diagnose, treat, or replace professionals.",
      icon: <FaShieldAlt />,
    },
    {
      title: "Emergency guidance",
      desc: "If someone is in danger, the platform guides them to urgent help.",
      icon: <FaExclamationTriangle />,
    },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-slate-50">
      {/* HERO */}
     <section className="relative overflow-hidden px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
  <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-emerald-50" />

  <div className="absolute -left-20 top-16 h-56 w-56 animate-pulse rounded-full bg-sky-300/30 blur-3xl sm:h-72 sm:w-72" />
  <div className="absolute -right-20 bottom-10 h-60 w-60 animate-pulse rounded-full bg-emerald-300/30 blur-3xl sm:h-80 sm:w-80" />
  <div className="absolute left-1/2 top-20 h-40 w-40 -translate-x-1/2 animate-bounce rounded-full bg-white/50 blur-2xl sm:h-56 sm:w-56" />

  <div className="relative mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-2 lg:gap-12">
    <div className="text-center lg:text-left">
      <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/75 px-4 py-2 text-xs font-bold text-sky-700 shadow-lg backdrop-blur-2xl sm:mb-5 sm:text-sm lg:mx-0">
        <FaLeaf className="text-emerald-500" />
        AI Wellness Companion for Nepali Users
      </div>

      <h1 className="text-3xl font-extrabold leading-tight text-slate-950 sm:text-4xl md:text-5xl lg:text-6xl">
        A calm space to understand your feelings better.
      </h1>

      <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:mt-5 sm:text-lg sm:leading-8 lg:mx-0">
        Man Ko Saathi is an emotional wellbeing platform where Nepali users can
        talk with an AI wellness companion, track mood, write private journals,
        and read simple self-help resources.
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:justify-center lg:justify-start">
        <Link
          to="/register"
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-sky-600 px-6 py-3 text-sm font-bold text-white shadow-xl shadow-sky-200 transition duration-300 hover:-translate-y-1 hover:bg-sky-700"
        >
          Start Free <FaArrowRight />
        </Link>

        <Link
          to="/about"
          className="inline-flex items-center justify-center rounded-2xl border border-white/70 bg-white/75 px-6 py-3 text-sm font-bold text-slate-700 shadow-lg backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:bg-white"
        >
          Learn More
        </Link>
      </div>

      <p className="mt-4 rounded-2xl border border-amber-200 bg-amber-50/90 px-4 py-3 text-xs font-semibold leading-5 text-amber-800 backdrop-blur-xl sm:mt-5 sm:text-sm">
        Man Ko Saathi is not a therapist, doctor, hospital, or emergency service.
      </p>
    </div>

<div className="relative mx-auto w-full max-w-md lg:max-w-none">
  <div className="rounded-[2rem] border border-white/60 bg-white/50 p-2 shadow-2xl shadow-slate-300/50 backdrop-blur-2xl sm:rounded-[2.5rem] sm:p-3">
    <img
      src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80"
      alt="Calm emotional wellbeing"
      className="h-[230px] w-full rounded-[1.5rem] object-cover sm:h-[360px] sm:rounded-[2rem] lg:h-[430px]"
    />
  </div>

  <div className="absolute -bottom-5 left-3 right-3 rounded-3xl border border-white/70 bg-white/85 p-4 shadow-2xl backdrop-blur-2xl sm:-bottom-6 sm:left-8 sm:right-auto sm:w-80">
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 sm:h-12 sm:w-12">
        <FaHeart />
      </div>

      <div>
        <h3 className="text-sm font-bold text-slate-900 sm:text-base">
          Gentle Support
        </h3>

        <p className="text-xs text-slate-500 sm:text-sm">
          Reflect, write, track, and learn.
        </p>
      </div>
    </div>
  </div>
</div>
  </div>
</section>

      {/* FEELINGS */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-wide text-sky-600">
              Everyday Challenges
            </p>
            <h2 className="mt-2 text-2xl font-extrabold text-slate-950 sm:text-3xl">
              Common feelings people face
            </h2>
            <p className="mt-3 text-slate-600">
              Many people silently deal with pressure, stress, and emotional
              heaviness. Man Ko Saathi gives a simple space to reflect.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
            {feelings.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-white/70 bg-white/70 p-5 text-center shadow-lg backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-600">
                  {item.icon}
                </div>
                <h3 className="mt-3 text-sm font-bold text-slate-800 sm:text-base">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMAGE + FEATURES */}
      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <img
              src="https://images.unsplash.com/photo-1493836512294-502baa1986e2?auto=format&fit=crop&w=800&q=80"
              alt="Peaceful journaling"
              className="h-56 w-full rounded-[2rem] object-cover shadow-xl sm:h-72"
            />
            <img
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80"
              alt="Calm support"
              className="mt-8 h-56 w-full rounded-[2rem] object-cover shadow-xl sm:h-72"
            />
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-emerald-600">
              Support Tools
            </p>
            <h2 className="mt-2 text-2xl font-extrabold text-slate-950 sm:text-3xl">
              How Man Ko Saathi helps
            </h2>
            <p className="mt-4 leading-8 text-slate-600">
              The platform gives users simple emotional wellbeing tools in one
              place. It is designed for reflection, self-help, and gentle daily
              support.
            </p>

<div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4">
  {helpItems.map((item) => (
    <div
      key={item.title}
      className="rounded-3xl border border-slate-200 bg-slate-50 p-4 transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl sm:p-5"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-100 to-emerald-100 text-base text-sky-700 sm:h-12 sm:w-12 sm:text-lg">
        {item.icon}
      </div>

      <h3 className="mt-3 text-sm font-extrabold text-slate-950 sm:mt-4 sm:text-base">
        {item.title}
      </h3>

      <p className="mt-2 text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6">
        {item.desc}
      </p>
    </div>
  ))}
</div>
          </div>
        </div>
      </section>

      {/* SAFETY */}
      <section className="relative overflow-hidden px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
  <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-emerald-50" />

  <div className="relative mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-2">
    <div className="text-center lg:text-left">
      <p className="text-xs font-bold uppercase tracking-wide text-sky-600 sm:text-sm">
        Safety and Privacy
      </p>

      <h2 className="mt-2 text-2xl font-extrabold leading-tight text-slate-950 sm:text-3xl">
        Built with clear limits and user safety in mind.
      </h2>

      <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
        Man Ko Saathi is a self-help support tool. It can help users reflect,
        write, and learn, but it should never be treated as medical care,
        therapy, diagnosis, or emergency support.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1">
        {["No diagnosis", "No medical treatment", "No emergency service"].map(
          (text) => (
            <div
              key={text}
              className="flex items-center justify-center gap-3 rounded-2xl border border-emerald-100 bg-white/80 px-4 py-3 shadow-sm lg:justify-start"
            >
              <FaCheckCircle className="shrink-0 text-emerald-500" />
              <span className="text-sm font-bold text-slate-700">{text}</span>
            </div>
          )
        )}
      </div>
    </div>

    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1 lg:gap-4">
      {safetyItems.map((item) => (
        <div
          key={item.title}
          className="rounded-3xl border border-white/70 bg-white/80 p-4 shadow-lg backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-5"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 sm:h-12 sm:w-12">
            {item.icon}
          </div>

          <h3 className="mt-4 text-sm font-extrabold text-slate-950 sm:text-base">
            {item.title}
          </h3>

          <p className="mt-2 text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6">
            {item.desc}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* EMERGENCY NOTICE */}
      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-amber-200 bg-amber-50/90 p-6 text-center shadow-xl backdrop-blur-xl sm:p-10">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
            <FaExclamationTriangle />
          </div>

          <h2 className="mt-5 text-2xl font-extrabold text-amber-900">
            Important Safety Notice
          </h2>

          <p className="mx-auto mt-3 max-w-3xl leading-8 text-amber-800">
            Man Ko Saathi is not a therapist, doctor, hospital, or emergency
            service. If you are in immediate danger, thinking about harming
            yourself, or someone else may be at risk, contact local emergency
            services or a trusted person immediately.
          </p>

          <Link
            to="/emergency-help"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-700 px-6 py-3 text-sm font-bold text-white transition duration-300 hover:-translate-y-1 hover:bg-amber-800"
          >
            View Emergency Help <FaArrowRight />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-sky-600 to-emerald-600 p-8 text-white shadow-2xl shadow-sky-200 sm:p-12">
          <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/20 blur-2xl" />
          <div className="absolute -bottom-10 -right-10 h-44 w-44 rounded-full bg-white/20 blur-2xl" />

          <div className="relative">
            <h2 className="text-2xl font-extrabold sm:text-4xl">
              Start your emotional wellbeing journey.
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-sky-50 sm:text-base">
              Create a free account and begin with mood tracking, journaling,
              resources, and AI-powered self-help support.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/register"
                className="rounded-2xl bg-white px-6 py-3 text-sm font-bold text-sky-700 transition duration-300 hover:-translate-y-1 hover:bg-slate-50"
              >
                Create Free Account
              </Link>

              <Link
                to="/resources"
                className="rounded-2xl border border-white/40 px-6 py-3 text-sm font-bold text-white transition duration-300 hover:-translate-y-1 hover:bg-white/10"
              >
                Explore Resources
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;