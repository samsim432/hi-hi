import {
  FaExclamationTriangle,
  FaPhoneAlt,
  FaHospital,
  FaUserFriends,
  FaCopy,
  FaShieldAlt,
  FaFireExtinguisher,
  FaAmbulance,
  FaCarCrash,
  FaChild,
  FaFemale,
  FaBrain,
} from "react-icons/fa";

function EmergencyHelp() {
  const urgentSteps = [
    {
      title: "Move away from danger",
      icon: <FaShieldAlt />,
      desc: "Put distance between yourself and anything that could harm you.",
    },
    {
      title: "Call emergency services",
      icon: <FaPhoneAlt />,
      desc: "Use the emergency numbers below if you are in immediate danger.",
    },
    {
      title: "Go to a safe place",
      icon: <FaHospital />,
      desc: "Go to a hospital, police station, shop, or trusted public place.",
    },
    {
      title: "Contact someone trusted",
      icon: <FaUserFriends />,
      desc: "Call a friend, family member, neighbour, teacher, or nearby person.",
    },
  ];

  const emergencyNumbers = [
    { name: "Police", number: "100", icon: <FaPhoneAlt /> },
    { name: "Fire", number: "101", icon: <FaFireExtinguisher /> },
    { name: "Ambulance", number: "102", icon: <FaAmbulance /> },
    { name: "Traffic", number: "103", icon: <FaCarCrash /> },
    { name: "Child Helpline", number: "1098", icon: <FaChild /> },
    { name: "Women Helpline", number: "1145", icon: <FaFemale /> },
    { name: "Mental Hospital Helpline", number: "1166", icon: <FaBrain /> },
  ];

  const message =
    "I am not feeling safe right now. Can you please call me or stay with me?";

  const copyMessage = () => {
    navigator.clipboard.writeText(message);
  };

  return (
    <div className="relative overflow-hidden px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-red-50 via-white to-amber-50" />
      <div className="absolute -left-24 top-20 -z-10 h-60 w-60 animate-pulse rounded-full bg-red-300/25 blur-3xl" />
      <div className="absolute -right-24 bottom-20 -z-10 h-72 w-72 animate-pulse rounded-full bg-amber-300/25 blur-3xl" />

      <div className="mx-auto max-w-6xl">
        <div className="rounded-[2rem] border border-red-200 bg-red-50/90 p-5 shadow-2xl backdrop-blur-xl sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-red-600 text-2xl text-white shadow-lg shadow-red-200">
              <FaExclamationTriangle />
            </div>

            <div>
              <p className="text-xs font-extrabold uppercase tracking-wide text-red-600">
                Emergency Alert
              </p>

              <h1 className="mt-2 text-3xl font-extrabold leading-tight text-red-700 sm:text-5xl">
                Need urgent help?
              </h1>

              <p className="mt-4 text-sm font-semibold leading-7 text-red-700 sm:text-lg sm:leading-8">
                If you are not feeling safe, may harm yourself, or someone else
                may be at risk, do not stay alone. Call emergency services or
                contact a trusted person right now.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {urgentSteps.map((step, index) => (
            <div
              key={step.title}
              style={{ animationDelay: `${index * 90}ms` }}
              className="animate-[fadeUp_0.6s_ease-out_both] rounded-3xl border border-white/60 bg-white/75 p-4 shadow-lg backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:bg-white/90 hover:shadow-xl sm:p-6"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-100 text-red-600 sm:h-12 sm:w-12">
                {step.icon}
              </div>

              <h2 className="mt-4 text-sm font-extrabold leading-snug text-slate-950 sm:text-lg">
                {step.title}
              </h2>

              <p className="mt-2 text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-[2rem] border border-white/60 bg-white/75 p-5 shadow-xl backdrop-blur-2xl sm:p-7">
          <h2 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
            Nepal Emergency Numbers
          </h2>

          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {emergencyNumbers.map((item) => (
              <a
                key={item.name}
                href={`tel:${item.number}`}
                className="rounded-3xl border border-red-100 bg-red-50/80 p-4 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:bg-red-100"
              >
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-red-600 shadow-sm">
                  {item.icon}
                </div>

                <p className="mt-3 text-xs font-bold text-slate-700 sm:text-sm">
                  {item.name}
                </p>

                <p className="mt-1 text-2xl font-extrabold text-red-600">
                  {item.number}
                </p>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 rounded-[2rem] border border-red-200 bg-red-50/90 p-5 shadow-xl backdrop-blur-xl sm:p-7">
          <h2 className="text-lg font-extrabold text-red-700 sm:text-2xl">
            Send this message to someone now
          </h2>

          <div className="mt-4 rounded-3xl border border-red-100 bg-white/80 p-4 shadow-sm">
            <p className="text-sm font-bold leading-7 text-slate-800 sm:text-base">
              “{message}”
            </p>
          </div>

          <button
            onClick={copyMessage}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-red-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-red-200 transition hover:-translate-y-1 hover:bg-red-700 sm:w-auto"
          >
            <FaCopy />
            Copy Message
          </button>
        </div>

        <div className="mt-8 rounded-[2rem] border border-amber-200 bg-amber-50/90 p-5 shadow-lg backdrop-blur-xl sm:p-6">
          <p className="text-sm font-semibold leading-7 text-amber-800 sm:text-base">
            Man Ko Saathi is not an emergency service. It cannot protect you in
            a crisis. Please contact real people and emergency support
            immediately.
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

export default EmergencyHelp;