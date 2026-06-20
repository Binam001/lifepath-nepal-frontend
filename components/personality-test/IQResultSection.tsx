"use client";

import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { ArrowLeft, CheckCircle, XCircle, Brain, Sparkles, BookOpen, Binary, Compass, ChevronDown, ChevronUp } from "lucide-react";
import { CognitiveQuestion, iqTestQuestions, calculatePercentile } from "@/data/IQ-test";
import ComparisonCTA from "./components/ComparisonCTA";
import ExploreCareerCTA from "./components/ExploreCareerCTA";

interface IQResultSectionProps {
  rawScore: number;
  iqScore: number;
  answers: Record<number, number>; // questionId -> selectedOptionIndex
  showConfetti: boolean;
  windowSize: { width: number; height: number };
  handleRetake: () => void;
}

const categoryMeta = {
  logic: {
    label: "Deductive Logic",
    description: "Evaluates deductive reasoning, logical flow, syllogisms, and rule-based statement analysis.",
    icon: Brain,
    color: "bg-blue-500",
    textClass: "text-blue-600",
    bgClass: "bg-blue-50 border-blue-100",
  },
  sequence: {
    label: "Quantitative & Sequence",
    description: "Measures pattern identification, numerical series, and logical number progression.",
    icon: Binary,
    color: "bg-purple-500",
    textClass: "text-purple-600",
    bgClass: "bg-purple-50 border-purple-100",
  },
  analogy: {
    label: "Word Analogies",
    description: "Measures verbal reasoning, relationship mappings, and vocabulary associations.",
    icon: BookOpen,
    color: "bg-amber-500",
    textClass: "text-amber-600",
    bgClass: "bg-amber-50 border-amber-100",
  },
  math: {
    label: "Applied Mental Arithmetic",
    description: "Measures applied arithmetic logic, rates, word problems, and mental math calculations.",
    icon: Compass,
    color: "bg-emerald-500",
    textClass: "text-emerald-600",
    bgClass: "bg-emerald-50 border-emerald-100",
  },
};

export default function IQResultSection({
  rawScore,
  iqScore,
  answers,
  showConfetti,
  windowSize,
  handleRetake,
}: IQResultSectionProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<"all" | "logic" | "sequence" | "analogy" | "math">("all");

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMounted(true);
  }, []);

  const percentile = calculatePercentile(iqScore);

  const getIQDescription = (score: number) => {
    if (score >= 130) {
      return {
        label: "Very Superior / Gifted",
        text: "Exceptional cognitive ability. You demonstrate superior pattern recognition, analytical reasoning, and complex problem-solving skills, putting you in the top 2% of the global population.",
        color: "text-purple-600 bg-purple-50 border-purple-200",
        pillColor: "bg-purple-600",
      };
    }
    if (score >= 120) {
      return {
        label: "Superior",
        text: "Superior cognitive ability. You are highly skilled at spotting patterns, logical reasoning, and solving numerical problems quickly and accurately.",
        color: "text-blue-600 bg-blue-50 border-blue-200",
        pillColor: "bg-blue-600",
      };
    }
    if (score >= 110) {
      return {
        label: "High Average",
        text: "High average cognitive ability. You show strong logical reasoning and arithmetic skills, solving most cognitive challenges efficiently.",
        color: "text-cyan-600 bg-cyan-50 border-cyan-200",
        pillColor: "bg-cyan-600",
      };
    }
    if (score >= 90) {
      return {
        label: "Average",
        text: "Average cognitive ability. You demonstrate solid, balanced problem-solving capabilities across logic, sequences, analogies, and arithmetic, matching the majority of the population.",
        color: "text-emerald-600 bg-emerald-50 border-emerald-200",
        pillColor: "bg-emerald-600",
      };
    }
    if (score >= 80) {
      return {
        label: "Low Average",
        text: "Low average cognitive ability. You have good practical reasoning skills but may take longer to recognize complex abstract sequences or math equations.",
        color: "text-amber-600 bg-amber-50 border-amber-200",
        pillColor: "bg-amber-600",
      };
    }
    return {
      label: "Borderline / Developing",
      text: "Developing cognitive ability. Focus on training abstract thinking, sequence solving, and mental arithmetic to sharpen logical processing speeds.",
      color: "text-rose-600 bg-rose-50 border-rose-200",
      pillColor: "bg-rose-600",
    };
  };

  const diag = getIQDescription(iqScore);

  // Grouped performance by category
  const categoriesList: Array<keyof typeof categoryMeta> = ["logic", "sequence", "analogy", "math"];
  const categoryScores = categoriesList.reduce((acc, cat) => {
    const catQuestions = iqTestQuestions.filter(q => q.category === cat);
    const total = catQuestions.length;
    const correct = catQuestions.filter(q => answers[q.id] === q.correctAnswerIndex).length;
    acc[cat] = { correct, total };
    return acc;
  }, {} as Record<string, { correct: number; total: number }>);

  const filteredQuestions = iqTestQuestions.filter(q => {
    if (activeFilter === "all") return true;
    return q.category === activeFilter;
  });

  const toggleQuestion = (id: number) => {
    setExpandedQuestion(expandedQuestion === id ? null : id);
  };

  return (
    <div className="min-h-screen pt-16 pb-12 bg-zinc-50 animate-in fade-in duration-300">
      {showConfetti && isMounted && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={400}
          gravity={0.25}
        />
      )}

      {/* Hero Banner */}
      <section
        className="bg-white border-b"
        style={{
          backgroundImage: "url(/404/404-img.webp)",
          backgroundPosition: "bottom",
          backgroundSize: "cover",
        }}
      >
        <div className="max-w-6xl mx-auto h-full min-h-[30vh] py-8 px-4 sm:px-6 flex flex-col justify-between">
          <div>
            <button
              onClick={handleRetake}
              className="px-4 py-2 bg-white/30 hover:bg-white/20 text-white border border-white/20 text-sm font-semibold rounded-full transition-all cursor-pointer flex items-center gap-2 w-fit"
            >
              <ArrowLeft size={16} />
              Retake Test
            </button>
          </div>

          <div className="mt-8 flex items-start gap-4">
            <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center shrink-0">
              <Brain size={28} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Your Cognitive Ability Profile (IQ)
              </h1>
              <p className="text-lg text-white/70 leading-relaxed max-w-2xl">
                A standardized analysis mapping your abstract logic, sequence patterning, verbal analogy, and arithmetic performance to a standard normal curve.
              </p>
            </div>
          </div>
        </div>
      </section>

      <article className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        
        {/* IQ Score Summary Card */}
        <section className="bg-white rounded-2xl p-6 md:p-8 border border-zinc-200 shadow-xs flex flex-col md:flex-row items-center gap-6 md:gap-8">
          <div className="relative flex items-center justify-center shrink-0">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-linear-to-tr from-blue-600 to-purple-600 flex flex-col items-center justify-center text-white shadow-xl shadow-blue-500/10">
              <span className="text-[10px] uppercase font-black tracking-widest text-white/75">
                IQ Score
              </span>
              <span className="text-4xl md:text-5xl font-extrabold mt-1">
                {iqScore}
              </span>
              <span className="text-[10px] text-white/75 font-semibold mt-1">
                Raw: {rawScore}/24
              </span>
            </div>
          </div>

          <div className="space-y-3 text-center md:text-left flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 rounded-full text-blue-700 text-xs font-bold uppercase tracking-wider">
              <Sparkles size={13} />
              <span>Assessment Diagnostic</span>
            </div>
            
            <h2 className="text-xl md:text-2xl font-bold text-zinc-900">
              Cognitive Class: <span className={diag.pillColor + " text-white px-2.5 py-0.5 rounded-full text-sm font-bold align-middle inline-block ml-1"}>{diag.label}</span>
            </h2>

            <p className="text-sm md:text-base text-zinc-600 leading-relaxed">
              {diag.text}
            </p>

            <div className="pt-2 flex flex-wrap gap-4 justify-center md:justify-start">
              <div className="bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2 text-center md:text-left">
                <span className="block text-[10px] text-zinc-400 font-bold uppercase">Percentile Rank</span>
                <span className="text-lg font-bold text-zinc-800">{percentile}%</span>
              </div>
              <div className="bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2 text-center md:text-left">
                <span className="block text-[10px] text-zinc-400 font-bold uppercase">Z-Score</span>
                <span className="text-lg font-bold text-zinc-800">
                  {((rawScore - 12) / 4).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Category Performance Breakdown */}
        <section className="bg-white rounded-2xl p-6 md:p-8 border border-zinc-200 shadow-xs space-y-6">
          <h2 className="text-xl font-bold text-zinc-900">
            Cognitive Dimension Breakdown
          </h2>
          <p className="text-sm text-zinc-500 leading-relaxed -mt-4">
            See how your cognitive abilities scale across separate domains. A standard IQ test assesses distinct areas of pattern construction and logic.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {categoriesList.map(cat => {
              const meta = categoryMeta[cat];
              const score = categoryScores[cat];
              const percent = Math.round((score.correct / score.total) * 100);
              const Icon = meta.icon;

              return (
                <div key={cat} className="p-5 border border-zinc-200 rounded-xl bg-zinc-50/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`p-2 rounded-lg text-white ${meta.color}`}>
                        <Icon size={18} />
                      </div>
                      <span className="font-bold text-zinc-800 text-sm md:text-base">{meta.label}</span>
                    </div>
                    <span className="text-xs font-bold text-zinc-600 bg-zinc-150 px-2 py-0.5 rounded-full">
                      {score.correct} / {score.total} Correct
                    </span>
                  </div>

                  <p className="text-xs text-zinc-500 leading-relaxed">
                    {meta.description}
                  </p>

                  <div className="space-y-1 pt-2">
                    <div className="flex justify-between items-center text-[10px] font-bold text-zinc-400">
                      <span>ACCURACY</span>
                      <span>{percent}%</span>
                    </div>
                    <div className="w-full bg-zinc-200 rounded-full h-2">
                      <div
                        className={`${meta.color} h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Detailed Question Review & Key */}
        <section className="bg-white rounded-2xl p-6 md:p-8 border border-zinc-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-zinc-900">Assessment Answer Key & Explanations</h2>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Review your responses, correct solutions, and full mathematical/logical explanations for every question.
              </p>
            </div>

            {/* Category Filter Badges */}
            <div className="flex flex-wrap gap-1.5 shrink-0">
              <button
                onClick={() => setActiveFilter("all")}
                className={`px-3 py-1 text-xs font-bold rounded-full border transition-all cursor-pointer ${
                  activeFilter === "all"
                    ? "bg-zinc-800 border-zinc-800 text-white"
                    : "bg-white border-zinc-200 text-zinc-650 hover:bg-zinc-50"
                }`}
              >
                All ({iqTestQuestions.length})
              </button>
              {categoriesList.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-3 py-1 text-xs font-bold rounded-full border transition-all cursor-pointer ${
                    activeFilter === cat
                      ? "bg-zinc-800 border-zinc-800 text-white"
                      : "bg-white border-zinc-200 text-zinc-650 hover:bg-zinc-50"
                  }`}
                >
                  {categoryMeta[cat].label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {filteredQuestions.map((q, idx) => {
              const selectedIdx = answers[q.id];
              const isCorrect = selectedIdx === q.correctAnswerIndex;
              const isExpanded = expandedQuestion === q.id;
              const meta = categoryMeta[q.category];

              return (
                <div
                  key={q.id}
                  className={`border rounded-xl transition-all overflow-hidden bg-white ${
                    isCorrect ? "border-zinc-200" : "border-rose-100 bg-rose-50/10"
                  }`}
                >
                  {/* Collapsible Header */}
                  <button
                    onClick={() => toggleQuestion(q.id)}
                    className="w-full p-4 flex items-center justify-between text-left cursor-pointer hover:bg-zinc-50/60 transition-all gap-4"
                  >
                    <div className="flex items-center gap-3">
                      {isCorrect ? (
                        <CheckCircle className="text-emerald-500 shrink-0" size={20} />
                      ) : (
                        <XCircle className="text-rose-500 shrink-0" size={20} />
                      )}
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-zinc-400">Question {q.id}</span>
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${meta.bgClass}`}>
                            {meta.label}
                          </span>
                        </div>
                        <p className="text-sm font-semibold text-zinc-800 mt-1 line-clamp-1">
                          {q.prompt}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`text-xs font-bold ${isCorrect ? "text-emerald-600" : "text-rose-600"}`}>
                        {isCorrect ? "Correct" : "Incorrect"}
                      </span>
                      {isExpanded ? <ChevronUp size={16} className="text-zinc-400" /> : <ChevronDown size={16} className="text-zinc-400" />}
                    </div>
                  </button>

                  {/* Collapsible Body */}
                  {isExpanded && (
                    <div className="p-4 border-t border-zinc-100 bg-zinc-50/30 space-y-4 text-sm">
                      <div className="font-semibold text-zinc-800">
                        {q.prompt}
                      </div>

                      {/* Options List */}
                      <div className="grid gap-2 max-w-xl">
                        {q.options.map((opt, optIdx) => {
                          const isSelected = selectedIdx === optIdx;
                          const isCorrectOpt = q.correctAnswerIndex === optIdx;

                          let optionStyles = "border-zinc-200 bg-white text-zinc-700";
                          if (isCorrectOpt) {
                            optionStyles = "border-emerald-500 bg-emerald-50/50 text-emerald-950 font-bold";
                          } else if (isSelected) {
                            optionStyles = "border-rose-500 bg-rose-50/50 text-rose-950 font-bold";
                          }

                          return (
                            <div
                              key={optIdx}
                              className={`flex items-center gap-3 p-3 rounded-lg border text-xs sm:text-sm ${optionStyles}`}
                            >
                              <div
                                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 border ${
                                  isCorrectOpt
                                    ? "bg-emerald-500 text-white border-emerald-500"
                                    : isSelected
                                      ? "bg-rose-500 text-white border-rose-500"
                                      : "bg-zinc-150 text-zinc-500 border-zinc-200"
                                }`}
                              >
                                {String.fromCharCode(65 + optIdx)}
                              </div>
                              <span className="flex-1">{opt}</span>
                              {isCorrectOpt && <CheckCircle size={14} className="text-emerald-600" />}
                              {!isCorrectOpt && isSelected && <XCircle size={14} className="text-rose-600" />}
                            </div>
                          );
                        })}
                      </div>

                      {/* Explanation Block */}
                      <div className="p-3.5 bg-blue-50/50 border border-blue-100 rounded-xl space-y-1">
                        <div className="flex items-center gap-1.5 text-blue-800 font-bold text-xs">
                          <Brain size={14} />
                          <span>EXPLANATION</span>
                        </div>
                        <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-medium">
                          {q.explanation}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <ComparisonCTA />

        <ExploreCareerCTA
          title="Explore Your Cognitive Strengths Further"
          subtitle="Match your analytical, logic, and verbal reasoning capabilities to suitable vocational lanes and technical roadmaps."
          buttonText="View All Assessments"
          href="/personality-test"
        />
      </article>
    </div>
  );
}
