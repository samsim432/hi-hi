import {
  FaExclamationTriangle,
  FaShieldAlt,
  FaRobot,
  FaHeart,
  FaUserCheck,
  FaBan,
  FaClock,
  FaLock,
} from "react-icons/fa";

function Terms() {
  const terms = [
    {
      title: "Not Medical Advice",
      icon: <FaShieldAlt />,
      desc: "Man Ko Saathi does not provide medical advice, diagnosis, treatment, therapy, or medication guidance.",
    },
    {
      title: "AI Limitations",
      icon: <FaRobot />,
      desc: "AI responses may be inaccurate, incomplete, or unsuitable. They should not replace real human support or professional help.",
    },
    {
      title: "User Responsibility",
      icon: <FaHeart />,
      desc: "Users are responsible for their own decisions and actions while using this self-help support tool.",
    },
    {
      title: "Age Guidance",
      icon: <FaUserCheck />,
      desc: "This platform is not intended for children under 13 years of age.",
    },
    {
      title: "Acceptable Use",
      icon: <FaBan />,
      desc: "Users must not misuse the platform, attack the service, or use it to harm, harass, or threaten others.",
    },
    {
      title: "Service Availability",
      icon: <FaClock />,
      desc: "The platform may be updated, changed, paused, or discontinued at any time.",
    },
    {
      title: "Privacy",
      icon: <FaLock />,
      desc: "Your use of the platform is also connected to our Privacy Policy and how we handle user information.",
    },
    {
      title: "Emergency Situations",
      icon: <FaExclamationTriangle />,
      desc: "If you feel unsafe or are in immediate danger, contact emergency services, a hospital, or a trusted person immediately.",
    },
  ];

  return (
    <div className="relative overflow-hidden px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-sky-50 via-white to-emerald-50" />
      <div className="absolute -left-24 top-20 -z-10 h-60 w-60 animate-pulse rounded-full bg-sky-300/25 blur-3xl" />
      <div className="absolute -right-24 bottom-20 -z-10 h-72 w-72 animate-pulse rounded-full bg-emerald-300/25 blur-3xl" />

      <div className="mx-auto max-w-6xl">
        <div className="text-left sm:text-center">
          <p className="inline-flex rounded-full border border-sky-100 bg-white/70 px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-sky-600 shadow-sm backdrop-blur-xl">
            Terms & Disclaimer
          </p>

          <h1 className="mt-5 text-3xl font-extrabold leading-tight text-slate-950 sm:mx-auto sm:max-w-4xl sm:text-5xl">
            Terms of Use
          </h1>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 sm:mx-auto sm:text-lg sm:leading-8">
            By using Man Ko Saathi, you understand that this platform is an
            emotional wellbeing and self-help support tool with clear safety
            limits.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {terms.map((item, index) => (
            <div
              key={item.title}
              style={{ animationDelay: `${index * 80}ms` }}
              className="animate-[fadeUp_0.6s_ease-out_both] rounded-3xl border border-white/60 bg-white/75 p-4 shadow-lg backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:bg-white/90 hover:shadow-xl sm:p-6"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-100 to-emerald-100 text-sky-700">
                {item.icon}
              </div>

              <h2 className="mt-4 text-sm font-extrabold leading-snug text-slate-950 sm:text-lg">
                {item.title}
              </h2>

              <p className="mt-2 text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-[2rem] border border-red-200 bg-red-50/90 p-5 shadow-lg backdrop-blur-xl sm:p-7">
          <div className="flex items-start gap-3">
            <FaExclamationTriangle className="mt-1 shrink-0 text-xl text-red-600" />

            <div>
              <h2 className="text-lg font-extrabold text-red-700 sm:text-2xl">
                Crisis Disclaimer
              </h2>

              <p className="mt-3 text-sm font-semibold leading-7 text-red-600 sm:text-base">
                If you are thinking about harming yourself or someone else, do
                not rely on this platform. Contact emergency services, a trusted
                friend, family member, healthcare professional, or local crisis
                support immediately.
              </p>

              <p className="mt-3 text-sm font-semibold leading-7 text-red-600 sm:text-base">
                Man Ko Saathi cannot monitor users in real time, cannot contact
                emergency services on a user's behalf, and cannot determine a
                user's physical location during a crisis.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-[2rem] border border-amber-200 bg-amber-50/90 p-5 shadow-lg backdrop-blur-xl sm:p-7">
          <h2 className="text-lg font-extrabold text-amber-800 sm:text-xl">
            No Guarantee
          </h2>

          <p className="mt-3 text-sm font-semibold leading-7 text-amber-700 sm:text-base">
            Man Ko Saathi does not guarantee emotional improvement, stress
            reduction, personal results, safety outcomes, or any medical or
            mental health outcome.
          </p>
        </div>
      </div>

      <style>
        {`
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
        `}
      </style>
    </div>
  );
}

export default Terms;