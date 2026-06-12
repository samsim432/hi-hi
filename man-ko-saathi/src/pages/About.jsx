import {
  FaHeart,
  FaShieldAlt,
  FaLeaf,
  FaUsers,
  FaCheckCircle,
} from "react-icons/fa";

function About() {
  const cards = [
    {
      title: "Our Mission",
      icon: <FaHeart />,
      desc: "A calm, supportive, and private space for Nepali users.",
    },
    {
      title: "Why We Built This",
      icon: <FaUsers />,
      desc: "For stress, loneliness, exam pressure, family pressure, and sleep challenges.",
    },
    {
      title: "What We Offer",
      icon: <FaLeaf />,
      desc: "AI wellness companion, mood tracking, journaling, and self-check tools.",
    },
    {
      title: "Safety First",
      icon: <FaShieldAlt />,
      desc: "Clear limits, responsible guidance, and safer wellbeing support.",
    },
  ];

  const users = [
    "Students",
    "Professionals",
    "Parents",
    "Young Adults",
    "Job Seekers",
    "Remote Workers",
    "University Students",
    "Anyone Seeking Support",
  ];

  return (
    <div className="relative overflow-hidden px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-sky-50 via-white to-emerald-50" />
      <div className="absolute -left-24 top-20 -z-10 h-60 w-60 animate-pulse rounded-full bg-sky-300/30 blur-3xl" />
      <div className="absolute -right-24 bottom-20 -z-10 h-72 w-72 animate-pulse rounded-full bg-emerald-300/30 blur-3xl" />

      <div className="mx-auto max-w-6xl">
        <div className="animate-[fadeUp_0.7s_ease-out] text-left sm:text-center">
          <p className="inline-flex rounded-full border border-sky-100 bg-white/70 px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-sky-600 shadow-sm backdrop-blur-xl">
            About Man Ko Saathi
          </p>

          <h1 className="mt-5 text-2xl font-extrabold leading-snug text-slate-950 sm:mx-auto sm:max-w-4xl sm:text-4xl md:text-5xl">
            A gentle emotional wellbeing platform for Nepali users
          </h1>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 sm:mx-auto sm:text-lg sm:leading-8">
            Man Ko Saathi helps people reflect on emotions, write private
            journals, and access simple self-help tools in a safe space.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {cards.map((card, index) => (
            <div
              key={card.title}
              style={{ animationDelay: `${index * 120}ms` }}
              className="animate-[fadeUp_0.7s_ease-out_both] rounded-3xl border border-white/60 bg-white/70 p-4 shadow-lg backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:bg-white/85 hover:shadow-xl sm:p-6"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-100 to-emerald-100 text-base text-sky-700 transition duration-300 group-hover:scale-110 sm:h-12 sm:w-12 sm:text-lg">
                {card.icon}
              </div>

              <h2 className="mt-3 text-sm font-extrabold leading-snug text-slate-950 sm:mt-4 sm:text-xl">
                {card.title}
              </h2>

              <p className="mt-2 text-xs leading-5 text-slate-600 sm:mt-3 sm:text-base sm:leading-7">
                {card.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 animate-[fadeUp_0.8s_ease-out_both] rounded-[2rem] border border-white/60 bg-white/70 p-5 shadow-lg backdrop-blur-2xl sm:p-8">
          <h2 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
            Why Man Ko Saathi Exists
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            Many people experience stress, loneliness, exam pressure, family
            challenges, sleep difficulties, and emotional ups and downs.
            Unfortunately, not everyone feels comfortable talking about these
            feelings openly.
          </p>

          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            Man Ko Saathi was created to provide a simple digital space where
            people can reflect on their emotions, build healthy habits, and
            access supportive wellbeing tools.
          </p>
        </div>

        <div className="mt-6 animate-[fadeUp_0.9s_ease-out_both] rounded-[2rem] border border-white/60 bg-white/70 p-5 shadow-lg backdrop-blur-2xl sm:p-8">
          <h2 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
            Who Can Use Man Ko Saathi?
          </h2>

          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {users.map((item, index) => (
              <div
                key={item}
                style={{ animationDelay: `${index * 80}ms` }}
                className="animate-[fadeUp_0.6s_ease-out_both] rounded-2xl border border-slate-100 bg-slate-50 p-3 text-center text-xs font-bold text-slate-700 transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-md sm:text-sm"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 animate-[fadeUp_1s_ease-out_both] rounded-[2rem] border border-sky-100 bg-gradient-to-br from-sky-50 to-emerald-50 p-5 shadow-lg backdrop-blur-2xl sm:p-8">
          <h2 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
            Our Vision
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            We want to make emotional wellbeing support more accessible,
            approachable, and understandable for people across Nepal.
          </p>

          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            Future versions of Man Ko Saathi may include improved wellbeing
            resources, personalized insights, habit-building tools, and
            community-focused support features while maintaining strong safety
            boundaries.
          </p>
        </div>

        <div className="mt-10 animate-[fadeUp_1.1s_ease-out_both] rounded-[2rem] border border-amber-200 bg-amber-50/90 p-5 shadow-lg backdrop-blur-xl sm:p-6">
          <div className="flex items-start gap-3">
            <FaCheckCircle className="mt-1 shrink-0 text-lg text-amber-600 sm:text-xl" />

            <div>
              <h2 className="text-lg font-extrabold text-amber-800 sm:text-xl">
                Important Safety Notice
              </h2>

              <p className="mt-2 text-sm leading-6 text-amber-700 sm:text-base sm:leading-7">
                Man Ko Saathi is not a therapist, doctor, hospital, or emergency
                service.
              </p>

              <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-bold text-amber-700 sm:text-sm">
                <span>• Not therapy</span>
                <span>• Not diagnosis</span>
                <span>• Not treatment</span>
                <span>• Not doctor</span>
                <span>• Not medical advice</span>
                <span>• Not emergency support</span>
              </div>
            </div>
          </div>
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

export default About;