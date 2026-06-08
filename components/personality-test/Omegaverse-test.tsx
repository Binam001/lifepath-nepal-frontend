"use client";

import { useState, useEffect, useMemo } from "react";
import Confetti from "react-confetti";
import {
  ArrowRight,
  ArrowLeft,
  Sparkles,
  CheckCircle,
  Clock,
  Shield,
  Crown,
  Layers,
  Brain,
  ListChecks,
  Compass,
  BookMarked,
} from "lucide-react";
import Link from "next/link";
import { omegaverseQuestions, TraitScores } from "@/data/omegaverse-test";
import { OmegaverseType, omegaverseTypes } from "@/data/omegaverse-data";

export default function OmegaverseTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{
    [key: number]: "A" | "B" | "C" | "D";
  }>({});
  const [result, setResult] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [isInitialized, setIsInitialized] = useState(false);

  const computedScores = useMemo(() => {
    const totals = {
      ALPHA: 0,
      BETA: 0,
      OMEGA: 0,
      SIGMA: 0,
      DELTA: 0,
      GAMMA: 0,
    };

    omegaverseQuestions.forEach((q) => {
      const selectedOption = answers[q.id];
      if (selectedOption && q.scoreMap[selectedOption]) {
        const scores = q.scoreMap[selectedOption];
        totals.ALPHA += scores.ALPHA;
        totals.BETA += scores.BETA;
        totals.OMEGA += scores.OMEGA;
        totals.SIGMA += scores.SIGMA;
        totals.DELTA += scores.DELTA;
        totals.GAMMA += scores.GAMMA;
      }
    });

    return totals;
  }, [answers]);

  useEffect(() => {
    const savedAnswers = localStorage.getItem("omegaverse_answers");
    const savedQuestion = localStorage.getItem("omegaverse_current_question");
    const savedResult = localStorage.getItem("omegaverse_result");
    const savedShowResult = localStorage.getItem("omegaverse_show_result");

    if (savedAnswers) {
      try {
        setAnswers(JSON.parse(savedAnswers));
      } catch (e) {
        console.error("Failed to parse saved answers:", e);
      }
    }
    if (savedQuestion) {
      const qIndex = parseInt(savedQuestion, 10);
      if (
        !isNaN(qIndex) &&
        qIndex >= 0 &&
        qIndex < omegaverseQuestions.length
      ) {
        setCurrentQuestion(qIndex);
      }
    }
    if (savedResult) {
      setResult(savedResult);
    }
    if (savedShowResult === "true") {
      setShowResult(true);
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    updateWindowSize();
    window.addEventListener("resize", updateWindowSize);
    return () => window.removeEventListener("resize", updateWindowSize);
  }, []);

  useEffect(() => {
    if (!showConfetti) return;
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, [showConfetti]);

  const handleAnswer = (option: "A" | "B" | "C" | "D") => {
    const updatedAnswers = {
      ...answers,
      [omegaverseQuestions[currentQuestion].id]: option,
    };
    setAnswers(updatedAnswers);
    localStorage.setItem("omegaverse_answers", JSON.stringify(updatedAnswers));
  };

  const handleNext = () => {
    if (currentQuestion < omegaverseQuestions.length - 1) {
      const nextQuestion = currentQuestion + 1;
      setCurrentQuestion(nextQuestion);
      localStorage.setItem(
        "omegaverse_current_question",
        nextQuestion.toString(),
      );
    } else {
      calculateResult();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      const prevQuestion = currentQuestion - 1;
      setCurrentQuestion(prevQuestion);
      localStorage.setItem(
        "omegaverse_current_question",
        prevQuestion.toString(),
      );
    }
  };

  const calculateResult = () => {
    const totals = {
      ALPHA: 0,
      BETA: 0,
      OMEGA: 0,
      SIGMA: 0,
      DELTA: 0,
      GAMMA: 0,
    };

    omegaverseQuestions.forEach((q) => {
      const selectedOption = answers[q.id];
      if (selectedOption && q.scoreMap[selectedOption]) {
        const scores = q.scoreMap[selectedOption];
        totals.ALPHA += scores.ALPHA;
        totals.BETA += scores.BETA;
        totals.OMEGA += scores.OMEGA;
        totals.SIGMA += scores.SIGMA;
        totals.DELTA += scores.DELTA;
        totals.GAMMA += scores.GAMMA;
      }
    });

    // Determine highest scoring dynamic
    const type = Object.keys(totals).reduce((a, b) =>
      totals[a as keyof typeof totals] > totals[b as keyof typeof totals]
        ? a
        : b,
    ) as keyof typeof totals;

    setResult(type);
    setShowConfetti(true);
    setShowResult(true);
    localStorage.setItem("omegaverse_result", type);
    localStorage.setItem("omegaverse_show_result", "true");
  };

  const progress = ((currentQuestion + 1) / omegaverseQuestions.length) * 100;
  const currentAnswer = answers[omegaverseQuestions[currentQuestion]?.id];
  const isAnswered = currentAnswer !== undefined;

  const handleRetake = () => {
    setShowConfetti(false);
    setShowResult(false);
    setCurrentQuestion(0);
    setAnswers({});
    setResult(null);
    localStorage.removeItem("omegaverse_answers");
    localStorage.removeItem("omegaverse_current_question");
    localStorage.removeItem("omegaverse_result");
    localStorage.removeItem("omegaverse_show_result");
  };

  if (!isInitialized) {
    return (
      <div className="min-h-screen pt-16 bg-zinc-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 bg-white p-8 rounded-2xl border border-zinc-200 shadow-md">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-zinc-700 font-semibold text-lg animate-pulse">
            Loading your test progress...
          </p>
        </div>
      </div>
    );
  }

  if (showResult && result) {
    const profile = omegaverseTypes[result];
    if (!profile) return null;

    // Style values based on classification (Alpha, Beta, Omega, Sigma, Delta, Gamma)
    const ResultIcon =
      {
        ALPHA: Crown,
        BETA: Shield,
        OMEGA: Sparkles,
        SIGMA: Brain,
        DELTA: ListChecks,
        GAMMA: Compass,
      }[result] || Sparkles;

    const traitInfo = [
      {
        key: "ALPHA",
        name: "Alpha",
        color: "bg-red-600",
        text: "text-red-700",
        border: "border-red-200",
        bgLight: "bg-red-50/50",
        ring: "ring-red-500/30",
        badge: "bg-red-100 text-red-800",
      },
      {
        key: "BETA",
        name: "Beta",
        color: "bg-teal-600",
        text: "text-teal-700",
        border: "border-teal-200",
        bgLight: "bg-teal-50/50",
        ring: "ring-teal-500/30",
        badge: "bg-teal-100 text-teal-800",
      },
      {
        key: "OMEGA",
        name: "Omega",
        color: "bg-purple-600",
        text: "text-purple-700",
        border: "border-purple-200",
        bgLight: "bg-purple-50/50",
        ring: "ring-purple-500/30",
        badge: "bg-purple-100 text-purple-800",
      },
      {
        key: "SIGMA",
        name: "Sigma",
        color: "bg-amber-600",
        text: "text-amber-700",
        border: "border-amber-200",
        bgLight: "bg-amber-50/50",
        ring: "ring-amber-500/30",
        badge: "bg-amber-100 text-amber-800",
      },
      {
        key: "DELTA",
        name: "Delta",
        color: "bg-blue-600",
        text: "text-blue-700",
        border: "border-blue-200",
        bgLight: "bg-blue-50/50",
        ring: "ring-blue-500/30",
        badge: "bg-blue-100 text-blue-800",
      },
      {
        key: "GAMMA",
        name: "Gamma",
        color: "bg-emerald-600",
        text: "text-emerald-700",
        border: "border-emerald-200",
        bgLight: "bg-emerald-50/50",
        ring: "ring-emerald-500/30",
        badge: "bg-emerald-100 text-emerald-800",
      },
    ];

    const sortedTraits = traitInfo
      .map((t) => ({
        ...t,
        score: computedScores[t.key as keyof typeof computedScores] || 0,
      }))
      .sort((a, b) => b.score - a.score);

    return (
      <div className="min-h-screen pt-16 pb-12 bg-zinc-50">
        {showConfetti && (
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            recycle={false}
            numberOfPieces={500}
            gravity={0.3}
          />
        )}

        <section
          className="bg-white border-b"
          style={{
            backgroundImage: "url(/404/404.png)",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
          }}
        >
          <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={handleRetake}
                className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-sm font-medium rounded-lg transition-all cursor-pointer flex items-center gap-2"
              >
                <ArrowLeft size={16} />
                Retake Test
              </button>
            </div>

            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                <ResultIcon size={24} strokeWidth={2.5} />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl md:text-4xl font-bold text-zinc-100">
                    {profile.name}
                  </h1>
                  {/* <div
                    className={`px-4 py-1.5 ${styleConfig.badgeBg} text-lg sm:text-xl font-bold rounded-lg animate-pulse`}
                  >
                    {profile.code}
                  </div> */}
                </div>
                <p className="text-lg text-zinc-50 leading-relaxed font-medium">
                  {profile.tagline}
                </p>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-2xl rounded-xl p-6 md:p-8 mb-6 border border-zinc-200">
              <p className="text-lg md:text-2xl text-zinc-800 font-semibold mb-4">
                {profile.description}
              </p>
              <p className="text-base md:text-lg text-zinc-700 leading-relaxed">
                {profile.detailedDescription}
              </p>
            </div>
          </div>
        </section>

        <article className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <section className="bg-white rounded-xl p-6 md:p-8 mb-6 border border-zinc-200 shadow-sm animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-bold text-zinc-900">
                  Dynamic Scores Breakdown
                </h2>
                {/* <p className="text-xs text-zinc-500 mt-1">
                  Scores calculated dynamically from your answers, sorted by
                  compatibility.
                </p> */}
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-600 bg-zinc-50 border border-zinc-200 px-3.5 py-2 rounded-lg shrink-0 w-fit">
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-400 animate-pulse"></span>
                <span>
                  Dominant:{" "}
                  <strong className="text-zinc-900 font-extrabold">
                    {sortedTraits[0].name}
                  </strong>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4">
              {sortedTraits.map((trait, index) => {
                const radius = 22;
                const strokeWidth = 3.5;
                const circumference = 2 * Math.PI * radius; // ~138.23
                const maxScore = Math.max(...Object.values(computedScores));
                const percentage =
                  maxScore > 0 ? (trait.score / maxScore) * 100 : 0;
                const isHighest = index === 0;
                const strokeDashoffset =
                  circumference - (percentage / 100) * circumference;

                return (
                  <div
                    key={trait.key}
                    className={`flex flex-col items-center p-3 rounded-xl border transition-all ${
                      isHighest
                        ? `${trait.bgLight} ${trait.border} ring-2 ring-offset-1 ${trait.ring}`
                        : "bg-white border-zinc-100 hover:border-zinc-200"
                    }`}
                  >
                    <div className="relative w-16 h-16 flex items-center justify-center mb-2.5">
                      <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                        {/* Background circle */}
                        <circle
                          cx="32"
                          cy="32"
                          r={radius}
                          className="stroke-zinc-100 fill-transparent"
                          strokeWidth={strokeWidth}
                        />
                        {/* Foreground circle */}
                        <circle
                          cx="32"
                          cy="32"
                          r={radius}
                          className="fill-transparent transition-all duration-500 ease-out"
                          strokeWidth={strokeWidth}
                          strokeDasharray={circumference}
                          strokeDashoffset={strokeDashoffset}
                          strokeLinecap="round"
                          style={{
                            stroke:
                              trait.key === "ALPHA"
                                ? "#ef4444"
                                : trait.key === "BETA"
                                  ? "#14b8a6"
                                  : trait.key === "OMEGA"
                                    ? "#a855f7"
                                    : trait.key === "SIGMA"
                                      ? "#f59e0b"
                                      : trait.key === "DELTA"
                                        ? "#3b82f6"
                                        : "#10b981",
                          }}
                        />
                      </svg>
                      <span className="text-sm font-extrabold text-zinc-850">
                        {trait.score}
                      </span>
                    </div>
                    <span
                      className={`text-xs font-extrabold ${isHighest ? trait.text : "text-zinc-700"} text-center mb-1`}
                    >
                      {trait.name}
                    </span>
                    {isHighest && (
                      <span
                        className={`text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full ${trait.badge}`}
                      >
                        Dominant
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <section className="bg-white rounded-xl p-6 md:p-8 border border-zinc-200 shadow-xs">
              <h2 className="text-xl font-bold text-zinc-900 mb-4">
                Key Strengths
              </h2>
              <div className="space-y-3">
                {profile.strengths.map((strength, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle
                      size={20}
                      className="text-green-600 shrink-0 mt-0.5"
                      strokeWidth={2}
                    />
                    <p className="text-base text-zinc-800 leading-relaxed">
                      {strength}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white rounded-xl p-6 md:p-8 border border-zinc-200 shadow-xs">
              <h2 className="text-xl font-bold text-zinc-900 mb-4">
                Growth Challenges
              </h2>
              <div className="space-y-3">
                {profile.weaknesses.map((weakness, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-zinc-100 flex items-center justify-center shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-zinc-600"></div>
                    </div>
                    <p className="text-base text-zinc-800 leading-relaxed">
                      {weakness}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <section className="bg-white rounded-xl p-6 md:p-8 mb-6 border border-zinc-200 shadow-xs">
            <h2 className="text-xl font-bold text-zinc-900 mb-4">
              Dynamic Compatibility
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-4 bg-zinc-50 rounded-lg border border-zinc-200 text-center">
                <span className="text-xs font-semibold text-zinc-500 uppercase">
                  Ideal Match
                </span>
                <p className="text-lg font-bold text-blue-600 mt-1">
                  {profile.compatibility.bestMatch}
                </p>
              </div>
              <div className="p-4 bg-zinc-50 rounded-lg border border-zinc-200 text-center">
                <span className="text-xs font-semibold text-zinc-500 uppercase">
                  Good Match
                </span>
                <p className="text-lg font-bold text-zinc-800 mt-1">
                  {profile.compatibility.goodMatch}
                </p>
              </div>
              <div className="p-4 bg-zinc-50 rounded-lg border border-zinc-200 text-center">
                <span className="text-xs font-semibold text-zinc-500 uppercase">
                  Challenging
                </span>
                <p className="text-lg font-bold text-zinc-600 mt-1">
                  {profile.compatibility.challenging}
                </p>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-xl p-6 md:p-8 mb-6 border border-zinc-200 shadow-xs">
            <h2 className="text-xl font-bold text-zinc-900 mb-4">
              Ideal Work Style
            </h2>
            <p className="text-base text-zinc-700 leading-relaxed">
              {profile.workStyle}
            </p>
          </section>

          <section className="bg-white rounded-xl p-6 md:p-8 mb-6 border border-zinc-200 shadow-xs">
            <h2 className="text-xl font-bold text-zinc-900 mb-4">
              Recommended Careers
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {profile.careers.map((career, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-3 bg-zinc-50 rounded-lg border border-zinc-200 hover:border-blue-300 transition-all"
                >
                  <CheckCircle size={16} className="text-blue-600 shrink-0" />
                  <span className="text-sm font-medium text-zinc-800">
                    {career}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 md:p-8 text-center text-white mb-6 shadow-md">
            <h2 className="text-xl md:text-2xl font-bold mb-3">
              Explore Careers aligned with your Dynamic
            </h2>
            <p className="text-base text-white/90 mb-6">
              Empower your career paths through optimized personality placement
              in the modern workforce.
            </p>
            <Link href="/future">
              <button className="px-6 py-3 bg-white text-zinc-900 font-semibold rounded-lg hover:bg-zinc-50 transition-all cursor-pointer inline-flex items-center gap-2">
                Discover Career Paths
                <ArrowRight size={18} />
              </button>
            </Link>
          </section>
        </article>
      </div>
    );
  }

  const q = omegaverseQuestions[currentQuestion];
  const options = [
    { key: "A" as const, text: q.optionA },
    { key: "B" as const, text: q.optionB },
    { key: "C" as const, text: q.optionC },
    { key: "D" as const, text: q.optionD },
  ];

  return (
    <div className="min-h-screen pt-16 bg-zinc-100 overflow-hidden flex flex-col justify-between">
      <div>
        <section className="bg-gradient-to-l from-blue-700 to-black text-white">
          <div className="max-w-6xl mx-auto py-8 md:py-12 px-4 relative">
            <div className="text-center max-w-3xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-xs">
                  <Sparkles size={32} className="text-white animate-pulse" />
                </div>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 tracking-tight">
                Omegaverse Classification Test
              </h1>
              <p className="text-base md:text-lg text-zinc-200 mb-4 font-light">
                Determine your dynamic archetype (Alpha, Beta, Omega, Sigma,
                Delta, or Gamma)
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-white/95 font-medium">
                <span className="flex items-center gap-2">
                  <CheckCircle size={16} />
                  100% Free
                </span>
                <span className="text-white/40">•</span>
                <span className="flex items-center gap-2">
                  <Clock size={16} />3 Minutes
                </span>
                <span className="text-white/40">•</span>
                <span>Instant Results</span>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
          {/* Progress Bar */}
          <div className="mb-8 max-w-2xl mx-auto w-full">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-semibold text-zinc-700">
                Question {currentQuestion + 1} of {omegaverseQuestions.length}
              </span>
              <span className="text-sm font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full bg-zinc-200 rounded-full h-2.5 shadow-inner">
              <div
                className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2.5 rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white rounded-[24px] p-6 md:p-8 border border-zinc-200 shadow-md">
            <h2 className="text-lg md:text-2xl font-bold text-zinc-900 text-center leading-relaxed mb-8">
              {q.question}
            </h2>

            {/* Multiple Choice Options List */}
            <div className="space-y-4 max-w-2xl mx-auto mb-8">
              {options.map((opt) => {
                const isSelected = currentAnswer === opt.key;
                return (
                  <button
                    key={opt.key}
                    onClick={() => handleAnswer(opt.key)}
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 text-left cursor-pointer w-full transition-all duration-200 ${
                      isSelected
                        ? "border-blue-600 bg-blue-50/50 text-blue-950 font-bold shadow-xs"
                        : "border-zinc-200 bg-white hover:border-blue-300 hover:bg-blue-50/10 text-zinc-700 font-medium"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 border transition-all ${
                        isSelected
                          ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                          : "bg-zinc-50 text-zinc-500 border-zinc-200 group-hover:bg-zinc-100"
                      }`}
                    >
                      {opt.key}
                    </div>
                    <span className="text-sm sm:text-base leading-snug">
                      {opt.text}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Navigation Controls */}
            <div className="flex justify-between items-center border-t border-zinc-100 pt-6 max-w-2xl mx-auto">
              <button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  currentQuestion === 0
                    ? "bg-zinc-100 text-zinc-400 cursor-not-allowed"
                    : "bg-white border-2 border-zinc-200 text-zinc-700 hover:bg-zinc-50 hover:border-zinc-300 hover:shadow-xs cursor-pointer"
                }`}
              >
                <ArrowLeft size={18} />
                <span>Previous</span>
              </button>

              <div className="flex items-center gap-2">
                {isAnswered && (
                  <div className="flex items-center gap-1.5 text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-100">
                    <CheckCircle size={14} />
                    <span>Selected</span>
                  </div>
                )}
              </div>

              <button
                onClick={handleNext}
                disabled={!isAnswered}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 hover:shadow-lg cursor-pointer"
              >
                <span>
                  {currentQuestion === omegaverseQuestions.length - 1
                    ? "Finish"
                    : "Next"}
                </span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </section>
      </div>

      <div className="flex flex-col items-center justify-center w-full pb-8 bg-zinc-100 border-t border-zinc-200/50 pt-4">
        <Link
          href="/omegaverse-book"
          className="px-5 py-2 bg-amber-400 hover:bg-amber-500 text-black text-sm font-bold rounded-full transition-all shadow-md inline-flex items-center gap-1.5 hover:scale-105"
        >
          <BookMarked size={16} />
          Learn more about Omegaverse types
        </Link>
      </div>
    </div>
  );
}
