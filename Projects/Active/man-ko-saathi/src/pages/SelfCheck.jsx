import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaClipboardCheck,
  FaTrash,
  FaShieldAlt,
  FaBrain,
  FaMoon,
  FaBolt,
  FaCloudSun,
  FaChartLine,
  FaExclamationTriangle,
  FaCheckCircle,
  FaHistory,
  FaBookOpen,
  FaSmile,
  FaHeart,
  FaHandsHelping,
} from "react-icons/fa";
import { supabase } from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";

const checks = {
  stress: {
    title: "Stress Check",
    shortTitle: "Stress",
    icon: <FaBolt />,
    accent: "text-orange-600",
    bg: "bg-orange-50",
    active: "bg-orange-600",
    description: "Reflect on how much pressure you have felt recently.",
    questions: [
      "I felt overwhelmed by daily tasks.",
      "I found it hard to relax.",
      "Small problems felt bigger than usual.",
      "I felt pressure from study, work, or family.",
      "I had difficulty focusing because of stress.",
      "I felt physically tense.",
      "I felt irritated more easily.",
      "I worried about too many things at once.",
      "I felt mentally tired.",
      "I needed a break but could not rest properly.",
    ],
  },
  anxiety: {
    title: "Anxiety Check",
    shortTitle: "Anxiety",
    icon: <FaBrain />,
    accent: "text-sky-600",
    bg: "bg-sky-50",
    active: "bg-sky-600",
    description: "Reflect on worry, nervousness, and busy thoughts.",
    questions: [
      "I felt nervous or uneasy.",
      "My thoughts felt too fast.",
      "I worried something bad might happen.",
      "I found it hard to calm down.",
      "I avoided things because of worry.",
      "I felt restless.",
      "I had difficulty sleeping because of worry.",
      "I felt tense in my body.",
      "I overthought small situations.",
      "I needed reassurance from others.",
    ],
  },
  lowMood: {
    title: "Low Mood Check",
    shortTitle: "Low Mood",
    icon: <FaCloudSun />,
    accent: "text-violet-600",
    bg: "bg-violet-50",
    active: "bg-violet-600",
    description: "Reflect on sadness, motivation, and emotional heaviness.",
    questions: [
      "I felt sad or low.",
      "I had less interest in things I usually enjoy.",
      "I felt emotionally heavy.",
      "I felt less motivated.",
      "I found it hard to start tasks.",
      "I felt lonely or disconnected.",
      "I judged myself harshly.",
      "I felt tired even after resting.",
      "I wanted to avoid people.",
      "I felt like the day was difficult to get through.",
    ],
  },
  sleep: {
    title: "Sleep Check",
    shortTitle: "Sleep",
    icon: <FaMoon />,
    accent: "text-indigo-600",
    bg: "bg-indigo-50",
    active: "bg-indigo-600",
    description: "Reflect on your recent sleep pattern.",
    questions: [
      "I found it hard to fall asleep.",
      "I woke up during the night.",
      "I felt tired after waking up.",
      "I used screens close to bedtime.",
      "I worried while trying to sleep.",
      "My sleep time was irregular.",
      "I had difficulty waking up.",
      "I felt sleepy during the day.",
      "I drank caffeine late in the day.",
      "My mind felt active at bedtime.",
    ],
  },
};

const answers = [
  { label: "Never", value: 0 },
  { label: "Sometimes", value: 1 },
  { label: "Often", value: 2 },
  { label: "Almost Always", value: 3 },
];

function SelfCheck() {
  const { user } = useAuth();

  const [selectedType, setSelectedType] = useState("stress");
  const [responses, setResponses] = useState({});
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const currentCheck = checks[selectedType];

  const fetchHistory = useCallback(async () => {
    if (!user) return;

    setFetching(true);

    const { data, error } = await supabase
      .from("assessments")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      setFetching(false);
      return;
    }

    setHistory(data || []);
    setFetching(false);
  }, [user]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const answeredCount = Object.keys(responses).length;
  const progress = Math.round(
    (answeredCount / currentCheck.questions.length) * 100
  );

  const weeklyChecks = useMemo(() => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    return history.filter((item) => new Date(item.created_at) >= sevenDaysAgo)
      .length;
  }, [history]);

  const latestResult = history[0];

  const averageScore = useMemo(() => {
    if (history.length === 0) return 0;

    const total = history.reduce(
      (sum, item) => sum + Number(item.score || 0),
      0
    );

    return Math.round(total / history.length);
  }, [history]);

  function calculateResult(score) {
    if (score <= 9) return "Low";
    if (score <= 19) return "Moderate";
    return "High";
  }

  function getResultStyle(level) {
    if (level === "Low") {
      return {
        badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
        text: "text-emerald-600",
        bar: "bg-emerald-500",
        soft: "bg-emerald-50/80 border-emerald-200 text-emerald-800",
      };
    }

    if (level === "Moderate") {
      return {
        badge: "bg-amber-50 text-amber-700 border-amber-200",
        text: "text-amber-600",
        bar: "bg-amber-500",
        soft: "bg-amber-50/80 border-amber-200 text-amber-800",
      };
    }

    return {
      badge: "bg-red-50 text-red-700 border-red-200",
      text: "text-red-600",
      bar: "bg-red-500",
      soft: "bg-red-50/80 border-red-200 text-red-800",
    };
  }

  function getResultMessage(level) {
    if (level === "Low") {
      return "Your responses suggest this area feels lighter right now. Keep noticing your patterns and continue healthy routines.";
    }

    if (level === "Moderate") {
      return "Your responses suggest this area may need gentle attention. Consider rest, journaling, breathing exercises, and talking to someone you trust.";
    }

    return "Your responses suggest this area feels heavy right now. Please do not ignore it. Consider talking to someone you trust or a qualified professional.";
  }

  function getNextSteps(level) {
    if (level === "Low") {
      return [
        "Continue your normal routine.",
        "Track your mood today.",
        "Write one small positive reflection.",
        "Check again after a few days.",
      ];
    }

    if (level === "Moderate") {
      return [
        "Take a short break.",
        "Try slow breathing for 2 minutes.",
        "Write what feels heavy in your Private Journal.",
        "Talk to someone you trust if this continues.",
      ];
    }

    return [
      "Do not stay alone if you feel unsafe.",
      "Tell someone you trust how you feel.",
      "Consider contacting a qualified professional.",
      "Use emergency support if there is immediate danger.",
    ];
  }

  function getActionButtons(level) {
    if (level === "High") {
      return [
        {
          label: "Emergency Help",
          path: "/emergency-help",
          icon: <FaExclamationTriangle />,
          className: "bg-red-600 text-white hover:bg-red-700",
        },
        {
          label: "Resources",
          path: "/resources",
          icon: <FaHeart />,
          className: "bg-white/70 text-red-700 hover:bg-white",
        },
        {
          label: "Private Journal",
          path: "/dashboard/journal",
          icon: <FaBookOpen />,
          className: "bg-white/70 text-slate-700 hover:bg-white",
        },
        {
          label: "Track Mood",
          path: "/dashboard/mood-tracker",
          icon: <FaSmile />,
          className: "bg-white/70 text-slate-700 hover:bg-white",
        },
      ];
    }

    if (level === "Moderate") {
      return [
        {
          label: "Private Journal",
          path: "/dashboard/journal",
          icon: <FaBookOpen />,
          className: "bg-slate-950 text-white hover:bg-slate-800",
        },
        {
          label: "Resources",
          path: "/resources",
          icon: <FaHeart />,
          className: "bg-white/70 text-slate-700 hover:bg-white",
        },
        {
          label: "Track Mood",
          path: "/dashboard/mood-tracker",
          icon: <FaSmile />,
          className: "bg-white/70 text-slate-700 hover:bg-white",
        },
        {
          label: "Emergency",
          path: "/emergency-help",
          icon: <FaExclamationTriangle />,
          className: "bg-red-50 text-red-700 hover:bg-red-100",
        },
      ];
    }

    return [
      {
        label: "Track Mood",
        path: "/dashboard/mood-tracker",
        icon: <FaSmile />,
        className: "bg-slate-950 text-white hover:bg-slate-800",
      },
      {
        label: "Private Journal",
        path: "/dashboard/journal",
        icon: <FaBookOpen />,
        className: "bg-white/70 text-slate-700 hover:bg-white",
      },
      {
        label: "Resources",
        path: "/resources",
        icon: <FaHeart />,
        className: "bg-white/70 text-slate-700 hover:bg-white",
      },
      {
        label: "Emergency",
        path: "/emergency-help",
        icon: <FaExclamationTriangle />,
        className: "bg-red-50 text-red-700 hover:bg-red-100",
      },
    ];
  }

  function handleAnswer(questionIndex, value) {
    setResponses((prev) => ({
      ...prev,
      [questionIndex]: value,
    }));
  }

  function changeCheckType(type) {
    setSelectedType(type);
    setResponses({});
    setResult(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!user) {
      alert("You must be logged in.");
      return;
    }

    if (answeredCount !== currentCheck.questions.length) {
      alert("Please answer all questions.");
      return;
    }

    const score = Object.values(responses).reduce(
      (total, value) => total + Number(value),
      0
    );

    const resultLevel = calculateResult(score);

    setResult({
      type: currentCheck.title,
      score,
      resultLevel,
    });

    setLoading(true);

    const { error } = await supabase.from("assessments").insert({
      user_id: user.id,
      type: currentCheck.title,
      score,
      result_level: resultLevel,
    });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    await fetchHistory();
    setLoading(false);

    setTimeout(() => {
      document
        .getElementById("self-check-result")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
  }

  async function deleteResult(id) {
    const confirmDelete = confirm("Delete this self-check result?");
    if (!confirmDelete) return;

    const { error } = await supabase
      .from("assessments")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) {
      alert(error.message);
      return;
    }

    await fetchHistory();
  }

  const actionPlan = [
    "Drink water.",
    "Take 5 slow breaths.",
    "Write one sentence in your Private Journal.",
    "Rest for 10 minutes.",
  ];

  return (
    <div className="relative min-h-screen overflow-hidden px-3 pb-8 pt-4 sm:px-6 lg:px-8">
      <div className="pointer-events-none fixed left-10 top-24 -z-10 h-72 w-72 rounded-full bg-sky-300/30 blur-3xl" />
      <div className="pointer-events-none fixed right-0 top-96 -z-10 h-80 w-80 rounded-full bg-emerald-300/25 blur-3xl" />
      <div className="pointer-events-none fixed bottom-10 left-1/3 -z-10 h-72 w-72 rounded-full bg-purple-300/20 blur-3xl" />

      <div className="mx-auto max-w-7xl">
        <section className="relative overflow-hidden rounded-2xl border border-white/60 bg-white/45 p-4 shadow-[0_18px_55px_rgba(15,23,42,0.10)] backdrop-blur-2xl sm:rounded-[2rem] sm:p-8">
          <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-emerald-300/30 blur-3xl" />
          <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-sky-300/30 blur-3xl" />

          <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/60 px-3 py-1.5 text-[11px] font-bold text-emerald-700 shadow-sm backdrop-blur-xl sm:px-4 sm:py-2 sm:text-xs">
                <FaClipboardCheck />
                Self Check
              </div>

              <h1 className="mt-4 text-2xl font-extrabold leading-tight text-slate-950 sm:text-4xl">
                Reflection Tool
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
                Reflect on stress, anxiety, low mood, and sleep. This is for
                self-help writing and emotional wellbeing support only.
              </p>
            </div>

            <div className="rounded-2xl border border-white/60 bg-white/50 p-3 shadow-sm backdrop-blur-xl sm:rounded-3xl sm:p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                  <FaChartLine />
                </div>

                <div>
                  <p className="text-xs font-bold text-slate-500">This week</p>
                  <p className="text-sm font-bold text-slate-900">
                    {weeklyChecks} self-check(s)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-4 rounded-2xl border border-amber-200 bg-amber-50/80 p-3 shadow-sm backdrop-blur-2xl sm:mt-6 sm:p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
              <FaShieldAlt />
            </div>

            <p className="text-xs leading-5 text-amber-800 sm:text-sm sm:leading-7">
              Man Ko Saathi is not therapy, diagnosis, medical treatment,
              medication advice, a doctor, hospital, or emergency service. This
              self-check is only a reflection tool.
            </p>
          </div>
        </section>

        <section className="mt-4 grid grid-cols-2 gap-2 sm:mt-6 sm:gap-3 lg:grid-cols-4">
          {Object.entries(checks).map(([key, item]) => (
            <button
              key={key}
              type="button"
              onClick={() => changeCheckType(key)}
              className={`rounded-2xl border p-3 text-left shadow-sm backdrop-blur-2xl transition hover:-translate-y-1 sm:p-4 ${
                selectedType === key
                  ? `${item.active} border-white text-white shadow-lg`
                  : "border-white/60 bg-white/45 text-slate-700 hover:bg-white/70"
              }`}
            >
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm sm:h-10 sm:w-10 sm:rounded-2xl ${
                  selectedType === key
                    ? "bg-white/20 text-white"
                    : `${item.bg} ${item.accent}`
                }`}
              >
                {item.icon}
              </div>

              <h2 className="mt-2 text-sm font-extrabold sm:mt-3 sm:text-base">
                {item.shortTitle}
              </h2>

              <p
                className={`mt-0.5 text-[11px] font-medium sm:text-xs ${
                  selectedType === key ? "text-white/80" : "text-slate-500"
                }`}
              >
                10 questions
              </p>
            </button>
          ))}
        </section>

        <section className="mt-4 grid grid-cols-1 gap-4 sm:mt-6 lg:grid-cols-3 lg:gap-6">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-white/60 bg-white/45 p-4 shadow-[0_18px_55px_rgba(15,23,42,0.10)] backdrop-blur-2xl sm:rounded-[2rem] sm:p-6 lg:col-span-2"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${currentCheck.bg} ${currentCheck.accent}`}
                >
                  {currentCheck.icon}
                </div>

                <div>
                  <h2 className="text-lg font-extrabold text-slate-950 sm:text-xl">
                    {currentCheck.title}
                  </h2>
                  <p className="mt-0.5 text-sm leading-5 text-slate-500 sm:leading-6">
                    {currentCheck.description}
                  </p>
                </div>
              </div>

              <div className="w-fit rounded-2xl border border-white/60 bg-white/60 px-3 py-2 text-xs font-bold text-slate-700 backdrop-blur-xl sm:text-sm">
                {answeredCount}/10 answered
              </div>
            </div>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/70 sm:mt-5">
              <div
                className={`h-full rounded-full ${currentCheck.active} transition-all`}
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="mt-4 space-y-3 sm:mt-6 sm:space-y-4">
              {currentCheck.questions.map((question, index) => (
                <div
                  key={question}
                  className="rounded-2xl border border-white/60 bg-white/50 p-3 shadow-sm backdrop-blur-xl sm:p-4"
                >
                  <div className="flex gap-3">
                    <div
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-xl text-xs font-extrabold sm:h-8 sm:w-8 ${
                        responses[index] !== undefined
                          ? `${currentCheck.active} text-white`
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {index + 1}
                    </div>

                    <p className="text-sm font-bold leading-5 text-slate-800 sm:leading-6">
                      {question}
                    </p>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2 sm:mt-4 sm:grid-cols-4">
                    {answers.map((answer) => (
                      <button
                        type="button"
                        key={answer.label}
                        onClick={() => handleAnswer(index, answer.value)}
                        className={`rounded-xl border px-2 py-2 text-[11px] font-bold transition sm:rounded-2xl sm:px-3 sm:py-2.5 sm:text-sm ${
                          responses[index] === answer.value
                            ? `${currentCheck.active} border-white text-white shadow-sm`
                            : "border-white/70 bg-white/70 text-slate-600 hover:bg-white"
                        }`}
                      >
                        {answer.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button
              disabled={loading}
              className={`mt-5 flex w-full items-center justify-center gap-2 rounded-2xl ${currentCheck.active} py-3 text-sm font-extrabold text-white shadow-lg transition hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-60 sm:mt-6`}
            >
              <FaCheckCircle />
              {loading ? "Saving..." : "Get Reflection Result"}
            </button>
          </form>

          <aside id="self-check-result" className="space-y-4 lg:space-y-5">
            <div className="rounded-2xl border border-white/60 bg-white/45 p-4 shadow-[0_18px_55px_rgba(15,23,42,0.10)] backdrop-blur-2xl sm:rounded-[2rem] sm:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                  <FaChartLine />
                </div>

                <div>
                  <h2 className="text-lg font-extrabold text-slate-950 sm:text-xl">
                    Your Result
                  </h2>
                  <p className="text-xs text-slate-500 sm:text-sm">
                    Reflection summary
                  </p>
                </div>
              </div>

              {!result ? (
                <div className="mt-4 rounded-2xl border border-white/60 bg-white/50 p-4 text-center sm:mt-5 sm:rounded-3xl">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-lg text-emerald-600">
                    <FaClipboardCheck />
                  </div>
                  <p className="mt-3 text-sm font-bold text-slate-700">
                    Complete all questions.
                  </p>
                  <p className="mt-1 text-sm leading-5 text-slate-500">
                    Your reflection result will appear here.
                  </p>
                </div>
              ) : (
                <div className="mt-4 sm:mt-5">
                  <p className="text-xs font-bold text-slate-500 sm:text-sm">
                    {result.type}
                  </p>

                  <h3
                    className={`mt-1 text-3xl font-extrabold sm:text-4xl ${
                      getResultStyle(result.resultLevel).text
                    }`}
                  >
                    {result.resultLevel}
                  </h3>

                  <div className="mt-3 sm:mt-4">
                    <div className="flex justify-between text-sm font-bold text-slate-700">
                      <span>Score</span>
                      <span>{result.score}/30</span>
                    </div>

                    <div className="mt-2 h-3 overflow-hidden rounded-full bg-white/70">
                      <div
                        className={`h-full rounded-full ${
                          getResultStyle(result.resultLevel).bar
                        }`}
                        style={{
                          width: `${Math.min((result.score / 30) * 100, 100)}%`,
                        }}
                      />
                    </div>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-slate-700 sm:mt-4">
                    {getResultMessage(result.resultLevel)}
                  </p>

                  <p className="mt-3 rounded-2xl border border-slate-200 bg-white/60 p-3 text-xs leading-5 text-slate-500">
                    This is not a diagnosis. It is only a reflection result
                    based on your answers.
                  </p>
                </div>
              )}
            </div>

            {result && (
              <div
                className={`rounded-2xl border p-4 shadow-lg backdrop-blur-2xl sm:rounded-[2rem] sm:p-5 ${
                  getResultStyle(result.resultLevel).soft
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/60">
                    <FaHandsHelping />
                  </div>

                  <div>
                    <h2 className="text-base font-extrabold">
                      Suggested Next Steps
                    </h2>
                    <p className="text-xs opacity-80">
                      Simple self-help suggestions
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  {getNextSteps(result.resultLevel).map((step, index) => (
                    <div
                      key={step}
                      className="flex gap-2 rounded-2xl bg-white/50 p-3 text-sm font-medium leading-5"
                    >
                      <span className="font-extrabold">{index + 1}.</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  {getActionButtons(result.resultLevel).map((button) => (
                    <Link
                      key={button.label}
                      to={button.path}
                      className={`flex items-center justify-center gap-2 rounded-2xl px-3 py-3 text-xs font-extrabold shadow-sm transition hover:-translate-y-0.5 ${button.className}`}
                    >
                      {button.icon}
                      {button.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {result && (
              <div className="rounded-2xl border border-white/60 bg-white/45 p-4 shadow-lg backdrop-blur-2xl sm:rounded-[2rem] sm:p-5">
                <h2 className="text-base font-extrabold text-slate-950">
                  Today’s Small Plan
                </h2>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  {actionPlan.map((item, index) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-white/60 bg-white/50 p-3"
                    >
                      <p className="text-xs font-extrabold text-slate-400">
                        0{index + 1}
                      </p>
                      <p className="mt-1 text-xs font-bold leading-5 text-slate-700">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="rounded-2xl border border-white/60 bg-white/45 p-4 shadow-lg backdrop-blur-2xl sm:rounded-[2rem] sm:p-5">
              <h2 className="text-base font-extrabold text-slate-950">
                Quick Stats
              </h2>

              <div className="mt-3 grid grid-cols-2 gap-2">
                <div className="rounded-2xl border border-white/60 bg-white/50 p-3">
                  <p className="text-xl font-extrabold text-slate-950">
                    {history.length}
                  </p>
                  <p className="mt-1 text-xs font-bold text-slate-500">
                    Total checks
                  </p>
                </div>

                <div className="rounded-2xl border border-white/60 bg-white/50 p-3">
                  <p className="text-xl font-extrabold text-slate-950">
                    {averageScore}
                  </p>
                  <p className="mt-1 text-xs font-bold text-slate-500">
                    Avg score
                  </p>
                </div>
              </div>

              {latestResult && (
                <div className="mt-2 rounded-2xl border border-white/60 bg-white/50 p-3">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500">
                    Latest
                  </p>
                  <p className="mt-1 text-sm font-extrabold text-slate-900">
                    {latestResult.type}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    {latestResult.result_level} • {latestResult.score}/30
                  </p>
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-red-200 bg-red-50/80 p-4 shadow-lg backdrop-blur-2xl sm:rounded-[2rem] sm:p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-red-700">
                  <FaExclamationTriangle />
                </div>

                <div>
                  <h2 className="font-extrabold text-red-900">
                    Safety Reminder
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-red-800">
                    If you feel unsafe or may harm yourself, do not stay alone.
                    Contact emergency services, go to the nearest hospital, or
                    call a trusted person now.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </section>

        <section className="mt-4 rounded-2xl border border-white/60 bg-white/45 p-4 shadow-[0_18px_55px_rgba(15,23,42,0.10)] backdrop-blur-2xl sm:mt-6 sm:rounded-[2rem] sm:p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
              <FaHistory />
            </div>

            <div>
              <h2 className="text-lg font-extrabold text-slate-950 sm:text-xl">
                Self Check History
              </h2>
              <p className="text-sm text-slate-500">
                Your saved reflection results.
              </p>
            </div>
          </div>

          {fetching ? (
            <p className="mt-4 text-sm text-slate-500">
              Loading self-check history...
            </p>
          ) : history.length === 0 ? (
            <div className="mt-4 rounded-2xl border border-white/60 bg-white/50 p-5 text-center sm:rounded-3xl">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-3xl bg-emerald-50 text-xl text-emerald-600">
                <FaClipboardCheck />
              </div>

              <p className="mt-3 text-sm font-bold text-slate-700">
                No self-check results yet.
              </p>

              <p className="mt-1 text-sm leading-5 text-slate-500">
                Complete your first reflection tool to see results here.
              </p>
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              {history.map((item) => {
                const style = getResultStyle(item.result_level);

                return (
                  <div
                    key={item.id}
                    className="flex items-start justify-between gap-3 rounded-2xl border border-white/60 bg-white/55 p-3 shadow-sm backdrop-blur-xl transition hover:bg-white/75 sm:rounded-3xl sm:p-4"
                  >
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-sm font-extrabold text-slate-950 sm:text-base">
                        {item.type}
                      </h3>

                      <div className="mt-2 flex flex-wrap gap-2">
                        <span
                          className={`rounded-full border px-2.5 py-1 text-[11px] font-bold sm:text-xs ${style.badge}`}
                        >
                          {item.result_level}
                        </span>

                        <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-bold text-slate-700 sm:text-xs">
                          Score: {item.score}/30
                        </span>
                      </div>

                      <p className="mt-2 text-xs font-medium text-slate-400">
                        {new Date(item.created_at).toLocaleString("en-GB")}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => deleteResult(item.id)}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-red-500 transition hover:bg-red-100 hover:text-red-700"
                      aria-label="Delete self-check result"
                    >
                      <FaTrash />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default SelfCheck;