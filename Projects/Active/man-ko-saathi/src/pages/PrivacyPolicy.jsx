function PrivacyPolicy() {
  const sections = [
    {
      title: "1. Introduction",
      text: [
        "Man Ko Saathi is an AI-powered emotional wellbeing platform designed to provide self-help support tools such as journaling, mood tracking, wellbeing resources, and an AI wellness companion.",
        "This Privacy Policy explains how information may be collected, used, and protected when you use the platform.",
      ],
    },
    {
      title: "2. Information We May Collect",
      text: [
        "Depending on how you use the platform, we may collect account information such as name and email address, mood entries, journal entries, self-check results, AI conversation messages, and basic technical information such as browser or device data.",
      ],
    },
    {
      title: "3. How We Use Information",
      text: [
        "We may use information to provide platform features, improve user experience, maintain security, generate AI responses, and understand platform performance.",
      ],
    },
    {
      title: "4. Data Security",
      text: [
        "We use reasonable security measures to protect user information. However, no online service can guarantee complete security.",
        "Users should avoid sharing highly sensitive personal information through the platform.",
      ],
    },
    {
      title: "5. AI Services",
      text: [
        "Man Ko Saathi may use artificial intelligence services to provide responses and wellbeing guidance.",
        "AI responses may be inaccurate, incomplete, or unsuitable for some situations. Users should use their own judgment and seek real human help when needed.",
      ],
    },
    {
      title: "6. Third-Party Services",
      text: [
        "The platform may use third-party services such as authentication, cloud hosting, databases, analytics, and AI providers.",
        "These providers may process information according to their own privacy policies.",
      ],
    },
    {
      title: "7. User Rights",
      text: [
        "Users may request access to, correction of, or deletion of their account information where applicable.",
      ],
    },
    {
      title: "8. Children’s Privacy",
      text: [
        "The platform is not intended for children under 13 years of age. If information from a child is identified, reasonable steps may be taken to remove that information.",
      ],
    },
  ];

  return (
    <div className="relative overflow-hidden px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-sky-50 via-white to-emerald-50" />
      <div className="absolute -left-24 top-20 -z-10 h-60 w-60 animate-pulse rounded-full bg-sky-300/25 blur-3xl" />
      <div className="absolute -right-24 bottom-20 -z-10 h-72 w-72 animate-pulse rounded-full bg-emerald-300/25 blur-3xl" />

      <div className="mx-auto max-w-5xl">
        <div className="text-left sm:text-center">
          <p className="inline-flex rounded-full border border-sky-100 bg-white/70 px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-sky-600 shadow-sm backdrop-blur-xl">
            Legal
          </p>

          <h1 className="mt-5 text-3xl font-extrabold leading-tight text-slate-950 sm:mx-auto sm:text-5xl">
            Privacy Policy
          </h1>

          <p className="mt-3 text-sm font-semibold text-slate-500">
            Last Updated: June 2026
          </p>

          <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-600 sm:mx-auto sm:text-lg sm:leading-8">
            This page explains how Man Ko Saathi handles user information in a
            simple, transparent, and safety-focused way.
          </p>
        </div>

        <div className="mt-10 grid gap-4">
          {sections.map((section, index) => (
            <section
              key={section.title}
              style={{ animationDelay: `${index * 80}ms` }}
              className="animate-[fadeUp_0.6s_ease-out_both] rounded-[2rem] border border-white/60 bg-white/75 p-5 shadow-lg backdrop-blur-2xl sm:p-7"
            >
              <h2 className="text-lg font-extrabold text-slate-950 sm:text-xl">
                {section.title}
              </h2>

              <div className="mt-3 space-y-3">
                {section.text.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-sm leading-7 text-slate-600 sm:text-base"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-8 rounded-[2rem] border border-amber-200 bg-amber-50/90 p-5 shadow-lg backdrop-blur-xl sm:p-7">
          <h2 className="text-lg font-extrabold text-amber-800 sm:text-xl">
            Important Safety Notice
          </h2>

          <p className="mt-3 text-sm font-semibold leading-7 text-amber-700 sm:text-base">
            Man Ko Saathi is not a therapist, doctor, hospital, medical
            provider, crisis center, or emergency service.
          </p>

          <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-bold text-amber-700 sm:grid-cols-3 sm:text-sm">
            <span>• Not therapy</span>
            <span>• Not diagnosis</span>
            <span>• Not treatment</span>
            <span>• Not doctor</span>
            <span>• Not medical advice</span>
            <span>• Not emergency support</span>
          </div>
        </div>

        <div className="mt-6 rounded-[2rem] border border-white/60 bg-white/75 p-5 shadow-lg backdrop-blur-2xl sm:p-7">
          <h2 className="text-lg font-extrabold text-slate-950 sm:text-xl">
            Contact
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
            If you have questions about this Privacy Policy, please contact the
            Man Ko Saathi team through the platform contact page or official
            support channel.
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

export default PrivacyPolicy;