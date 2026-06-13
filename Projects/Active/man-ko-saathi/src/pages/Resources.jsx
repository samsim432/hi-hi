import { useState } from "react";
import {
  FaMoon,
  FaCloud,
  FaUserFriends,
  FaGraduationCap,
  FaHome,
  FaLeaf,
  FaExclamationTriangle,
  FaTimes,
  FaHeart,
  FaBrain,
  FaBed,
  FaSmile,
  FaRunning,
  FaPen,
  FaStar,
  FaLightbulb,
  FaRocket,
  FaHandsHelping,
  FaAngry,
  FaMobileAlt,
  FaClock,
  FaUsers,
  FaShieldAlt,
  FaSun,
} from "react-icons/fa";

function Resources() {
  const [selectedTopic, setSelectedTopic] = useState(null);

  const topics = [
    {
      title: "Stress",
      icon: <FaCloud />,
      desc: "Understand stress and calm your mind.",
      content:
        "Stress is a normal reaction when life feels too heavy or overwhelming. It can happen because of study, work, money problems, relationships, or daily responsibilities. Small actions such as slow breathing, taking short breaks, writing your thoughts, drinking water, and focusing on one task at a time can help reduce stress.",
    },
    {
      title: "Anxiety",
      icon: <FaBrain />,
      desc: "Simple grounding ideas for busy thoughts.",
      content:
        "Anxiety can make your mind feel fast, worried, or unsafe even when there is no immediate danger. You may notice overthinking, restlessness, or difficulty concentrating. Grounding exercises, slow breathing, and focusing on the present moment can help you feel more settled.",
    },
    {
      title: "Sleep",
      icon: <FaMoon />,
      desc: "Build better sleep habits.",
      content:
        "Good sleep helps your mind and body recover. Try going to bed at the same time each night, reducing screen time before sleep, keeping your room quiet, and avoiding caffeine late in the day. Better sleep can improve mood, focus, and energy.",
    },
    {
      title: "Loneliness",
      icon: <FaUserFriends />,
      desc: "Reconnect with yourself and others.",
      content:
        "Loneliness can happen when you feel disconnected from others, even if people are around you. Try reaching out to someone you trust, spending time outside, joining a small activity, or writing about your feelings. Small connections can make a big difference.",
    },
    {
      title: "Exam Pressure",
      icon: <FaGraduationCap />,
      desc: "Study with less overwhelm.",
      content:
        "Exams can feel stressful when expectations are high. Break study sessions into small goals, take regular breaks, sleep well, and focus on progress instead of perfection. Remember that one exam does not define your worth.",
    },
    {
      title: "Family Pressure",
      icon: <FaHome />,
      desc: "Handle pressure with calm boundaries.",
      content:
        "Family expectations can sometimes feel heavy. Try writing your thoughts first, choosing the right time to talk, and speaking calmly. You can respect your family while also protecting your mental peace.",
    },
    {
      title: "Self-care",
      icon: <FaLeaf />,
      desc: "Small daily actions that support you.",
      content:
        "Self-care means looking after your physical, emotional, and mental wellbeing. It can be simple: drinking water, eating properly, resting, walking, praying, meditating, or talking with someone you trust.",
    },
    {
      title: "Mood Tracking",
      icon: <FaSmile />,
      desc: "Notice emotional patterns.",
      content:
        "Tracking your mood helps you understand what affects your emotions. Write how you feel daily and notice patterns related to sleep, food, study, work, social media, and relationships.",
    },
    {
      title: "Journaling",
      icon: <FaPen />,
      desc: "Write thoughts safely.",
      content:
        "Journaling helps you release thoughts from your mind. You can start with three simple questions: What am I feeling? What caused it? What do I need right now?",
    },
    {
      title: "Breathing",
      icon: <FaHeart />,
      desc: "A simple calming exercise.",
      content:
        "Slow breathing can help your body feel calmer. Try breathing in for 4 seconds, breathing out for 6 seconds, and repeating 5 times. Keep your shoulders relaxed and go slowly.",
    },
    {
      title: "Rest",
      icon: <FaBed />,
      desc: "Rest is part of wellbeing.",
      content:
        "Rest is not laziness. Your mind and body need recovery. Short breaks, quiet time, sleep, and screen-free moments can help you feel better and avoid burnout.",
    },
    {
      title: "Movement",
      icon: <FaRunning />,
      desc: "Use gentle movement.",
      content:
        "Gentle movement can reduce tension and improve your mood. You do not need hard exercise. Walking, stretching, dancing, or moving for 5 minutes can help you feel refreshed.",
    },
    {
      title: "Confidence",
      icon: <FaStar />,
      desc: "Build confidence step by step.",
      content:
        "Confidence grows through small actions. Celebrate small wins, learn from mistakes, and avoid comparing yourself with others. You do not need to be perfect to make progress.",
    },
    {
      title: "Overthinking",
      icon: <FaLightbulb />,
      desc: "Quiet a busy mind.",
      content:
        "Overthinking can make small problems feel bigger. Try writing your thoughts down, asking what is fact and what is fear, and taking one small action instead of thinking about every possibility.",
    },
    {
      title: "Motivation",
      icon: <FaRocket />,
      desc: "Keep moving forward.",
      content:
        "Motivation comes and goes, but small habits create progress. Set simple goals, start with 5 minutes, and celebrate small steps. Consistency matters more than feeling motivated every day.",
    },
    {
      title: "Mindfulness",
      icon: <FaHandsHelping />,
      desc: "Focus on the present moment.",
      content:
        "Mindfulness means paying attention to the present moment without judging yourself. Notice your breathing, body, surroundings, and thoughts. This can help you feel calmer and more aware.",
    },
    {
      title: "Anger",
      icon: <FaAngry />,
      desc: "Respond instead of reacting.",
      content:
        "Anger is a normal emotion, but it can hurt you or others if it controls your actions. Pause, breathe, drink water, or step away for a few minutes before speaking. Calm words are often more powerful than angry words.",
    },
    {
      title: "Social Media",
      icon: <FaMobileAlt />,
      desc: "Use social media mindfully.",
      content:
        "Social media can affect your mood, confidence, and sleep. Try taking small breaks, unfollowing accounts that make you feel bad, and avoiding phone use before bed. Your mind also needs quiet time.",
    },
    {
      title: "Time Management",
      icon: <FaClock />,
      desc: "Make life feel less rushed.",
      content:
        "Time management helps reduce stress. Write your tasks, choose the most important one, and break big work into small steps. You do not need to finish everything at once.",
    },
    {
      title: "Friendship",
      icon: <FaUsers />,
      desc: "Build healthier connections.",
      content:
        "Good friendships help you feel supported and understood. Try being honest, listening carefully, and spending time with people who respect you. Healthy friendship should not make you feel small.",
    },
    {
      title: "Self-esteem",
      icon: <FaShieldAlt />,
      desc: "Value yourself more kindly.",
      content:
        "Self-esteem means how you see and value yourself. Speak to yourself with kindness, remember your strengths, and avoid judging your whole life from one bad day or one mistake.",
    },
    {
      title: "Gratitude",
      icon: <FaSun />,
      desc: "Notice small good things.",
      content:
        "Gratitude means noticing what is still good, even during hard times. Write one thing you are thankful for each day. It can be a person, a meal, a peaceful moment, or something you learned.",
    },
  ];

  return (
    <div className="relative overflow-hidden px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-sky-50 via-white to-emerald-50" />
      <div className="absolute -left-24 top-20 -z-10 h-60 w-60 animate-pulse rounded-full bg-sky-300/30 blur-3xl" />
      <div className="absolute -right-24 bottom-20 -z-10 h-72 w-72 animate-pulse rounded-full bg-emerald-300/30 blur-3xl" />

      <div className="mx-auto max-w-7xl">
        <div className="text-left sm:text-center">
          <p className="inline-flex rounded-full border border-sky-100 bg-white/70 px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-sky-600 shadow-sm backdrop-blur-xl">
            Resources
          </p>

          <h1 className="mt-5 text-2xl font-extrabold leading-snug text-slate-950 sm:mx-auto sm:max-w-4xl sm:text-4xl md:text-5xl">
            Tap a topic to learn simple wellbeing steps
          </h1>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 sm:mx-auto sm:text-lg sm:leading-8">
            Choose a topic below and read short, simple self-help guidance.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {topics.map((topic, index) => (
            <button
              key={topic.title}
              onClick={() => setSelectedTopic(topic)}
              style={{ animationDelay: `${index * 70}ms` }}
              className="animate-[fadeUp_0.6s_ease-out_both] rounded-3xl border border-white/60 bg-white/70 p-4 text-left shadow-lg backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:bg-white/90 hover:shadow-xl sm:p-6"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-100 to-emerald-100 text-lg text-sky-700 sm:h-12 sm:w-12">
                {topic.icon}
              </div>

              <h2 className="mt-4 text-sm font-extrabold text-slate-950 sm:text-lg">
                {topic.title}
              </h2>

              <p className="mt-2 text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6">
                {topic.desc}
              </p>
            </button>
          ))}
        </div>

        <div className="mt-10 rounded-[2rem] border border-amber-200 bg-amber-50/90 p-5 shadow-lg backdrop-blur-xl sm:p-6">
          <div className="flex items-start gap-3">
            <FaExclamationTriangle className="mt-1 shrink-0 text-lg text-amber-600" />
            <p className="text-sm font-semibold leading-7 text-amber-700 sm:text-base">
              These resources are for general self-help education only. They are
              not therapy, diagnosis, medical treatment, or medical advice.
            </p>
          </div>
        </div>
      </div>

      {selectedTopic && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/60 px-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-[2rem] border border-white/60 bg-white/85 p-5 shadow-2xl backdrop-blur-2xl sm:p-7">
            <button
              onClick={() => setSelectedTopic(null)}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-white/80 text-slate-700 shadow-md transition hover:bg-white"
              aria-label="Close topic"
            >
              <FaTimes />
            </button>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-100 to-emerald-100 text-2xl text-sky-700">
              {selectedTopic.icon}
            </div>

            <h2 className="mt-5 pr-12 text-2xl font-extrabold text-slate-950">
              {selectedTopic.title}
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-600">
              {selectedTopic.content}
            </p>

            <div className="mt-6 rounded-3xl border border-amber-200 bg-amber-50/90 p-4">
              <p className="text-xs font-semibold leading-6 text-amber-700 sm:text-sm">
                This is general self-help information only. Man Ko Saathi is not
                a therapist, doctor, hospital, or emergency service.
              </p>
            </div>
          </div>
        </div>
      )}

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

export default Resources;