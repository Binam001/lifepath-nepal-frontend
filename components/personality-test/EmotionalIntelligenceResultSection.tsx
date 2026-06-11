"use client";

import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { BarChart } from "@mui/x-charts";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Brain,
  Sparkles,
  Zap,
  ShieldAlert,
  AlertCircle,
  Smile,
  Compass,
} from "lucide-react";
import Link from "next/link";
import {
  EIResult,
  selfReportQuestions,
  scenarioQuestions,
  EIDomain,
} from "@/data/EmotionalIntelligence-test";
import ComparisonCTA from "./components/ComparisonCTA";
import EIRadarChart from "./components/EIRadarChart";

interface EIResultSectionProps {
  result: EIResult;
  showConfetti: boolean;
  windowSize: { width: number; height: number };
  handleRetake: () => void;
  selfReportAnswers: Record<number, number>;
  scenarioAnswers: Record<number, string>;
}

const domainLabels: Record<EIDomain, string> = {
  "self-awareness": "Self-Awareness",
  "self-regulation": "Self-Regulation",
  motivation: "Motivation",
  empathy: "Empathy",
  "social-skills": "Social Skills",
};

const domainIcons: Record<EIDomain, React.ComponentType<any>> = {
  "self-awareness": Brain,
  "self-regulation": Zap,
  motivation: Sparkles,
  empathy: Smile,
  "social-skills": Compass,
};

const domainColors: Record<
  EIDomain,
  { primary: string; light: string; border: string; bg: string }
> = {
  "self-awareness": {
    primary: "#3b82f6", // Blue
    light: "#dbeafe",
    border: "border-blue-200",
    bg: "bg-blue-50/50",
  },
  "self-regulation": {
    primary: "#a855f7", // Purple
    light: "#f3e8ff",
    border: "border-purple-200",
    bg: "bg-purple-50/50",
  },
  motivation: {
    primary: "#eab308", // Yellow
    light: "#fef9c3",
    border: "border-amber-200",
    bg: "bg-amber-50/50",
  },
  empathy: {
    primary: "#ec4899", // Pink
    light: "#fce7f3",
    border: "border-pink-200",
    bg: "bg-pink-50/50",
  },
  "social-skills": {
    primary: "#10b981", // Emerald
    light: "#d1fae5",
    border: "border-emerald-200",
    bg: "bg-emerald-50/50",
  },
};

const domainLayerDescriptions: Record<
  EIDomain,
  { selfReport: string; scenario: string }
> = {
  "self-awareness": {
    selfReport:
      "Clarity in identifying your own emotions, stress, and impact on others.",
    scenario:
      "Recognizing stress signals and practicing self-reflection in tasks.",
  },
  "self-regulation": {
    selfReport:
      "Perceived capability to manage impulses, stay calm, and process reviews.",
    scenario: "Calmness and constructive action during unexpected work stress.",
  },
  motivation: {
    selfReport:
      "Inner drive to improve skills, track goals, and deliver quality.",
    scenario:
      "Self-direction in setting milestones and resolving quality bugs.",
  },
  empathy: {
    selfReport:
      "Perceived capacity to read body language and see others' viewpoints.",
    scenario: "Proactively supporting colleagues and handling anxious clients.",
  },
  "social-skills": {
    selfReport:
      "Self-rated ability to build relationships, solve disputes, and give feedback.",
    scenario: "Facilitating compromise, leading teams, and critiques.",
  },
};

export default function EmotionalIntelligenceResultSection({
  result,
  showConfetti,
  windowSize,
  handleRetake,
  selfReportAnswers,
  scenarioAnswers,
}: EIResultSectionProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const domainsList: EIDomain[] = [
    "self-awareness",
    "self-regulation",
    "motivation",
    "empathy",
    "social-skills",
  ];

  // Prepare chart data
  const chartXAxis = domainsList.map((d) =>
    isMobile ? d.split("-")[0] : domainLabels[d],
  );
  const selfReportData = domainsList.map(
    (d) => result.domains[d]?.selfReportScore ?? 0,
  );
  const scenarioData = domainsList.map(
    (d) => result.domains[d]?.scenarioScore ?? 0,
  );

  const chartStyles = {
    width: "100% !important",
    display: "block",
    "& svg": {
      width: "100% !important",
      display: "block",
    },
    "& .MuiChartsAxis-line, & .MuiChartsAxis-tick": { stroke: "#e4e4e7" },
    "& .MuiChartsAxis-tickLabel": {
      fill: "#71717a",
      fontSize: isMobile ? "10px" : "12px",
      fontWeight: 600,
    },
    "& .MuiChartsGrid-line": { stroke: "#f4f4f5" },
    "& .MuiBarLabel-root": {
      fill: "#18181b",
      fontWeight: 700,
      fontSize: "11px",
    },
  };

  const getEQDescription = (score: number) => {
    if (score >= 4.2)
      return "Exceptional Emotional Intelligence. You demonstrate deep emotional control, superior behavioral adaptation, and strong relationship dynamics.";
    if (score >= 3.5)
      return "High Emotional Intelligence. You have a solid grasp of your emotions, respond constructively to situations, and relate well to others.";
    if (score >= 2.8)
      return "Moderate Emotional Intelligence. You have good emotional capabilities but can sometimes act impulsively or misunderstand interpersonal cues under pressure.";
    return "Developing Emotional Intelligence. Work on connecting your self-perception with behavioral choices, active self-reflection, and managing emotional reactions.";
  };

  return (
    <div className="min-h-screen pt-16 pb-12 bg-zinc-50 animate-in fade-in duration-300">
      {showConfetti && (
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
          backgroundImage: "url(/404/404.png)",
          backgroundPosition: "bottom",
          backgroundSize: "cover",
        }}
      >
        <div className="max-w-6xl mx-auto h-full min-h-[65vh] py-8 px-4 sm:px-6 flex flex-col">
          <div>
            <button
              onClick={handleRetake}
              className="px-4 py-2 bg-white/30 hover:bg-white/20 text-white border border-white/20 text-sm font-semibold rounded-full transition-all cursor-pointer flex items-center gap-2 w-fit"
            >
              <ArrowLeft size={16} />
              Retake Test
            </button>
          </div>

          <div className="flex-1 flex items-center">
            <div className="mt-8 flex items-start gap-4">
              <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center shrink-0 backdrop-blur-md">
                <Brain size={32} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                  Emotional Intelligence Profile
                </h1>
                <p className="text-base md:text-lg text-zinc-200 mt-2 font-light leading-relaxed max-w-2xl">
                  A 3-layer synthesis combining self-perception and situational
                  behavioral choices to reveal your true capabilities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <article className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Total Score Summary Card */}
        <section className="bg-white rounded-3xl p-6 md:p-8 border border-zinc-200 shadow-sm flex flex-col md:flex-row items-center gap-6 md:gap-8">
          <div className="relative flex items-center justify-center shrink-0">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-linear-to-tr from-blue-600 to-purple-600 flex flex-col items-center justify-center text-white shadow-xl shadow-blue-500/10">
              <span className="text-xs uppercase font-black tracking-widest text-white/70">
                Total Score
              </span>
              <span className="text-4xl md:text-5xl font-extrabold mt-1">
                {result.totalTrueScore.toFixed(2)}
              </span>
              <span className="text-xs text-white/80 font-medium">max 5.0</span>
            </div>
          </div>

          <div className="space-y-3 text-center md:text-left flex-1">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-blue-50 border border-blue-100 rounded-full text-blue-700 text-xs font-bold uppercase tracking-wider">
              <Sparkles size={13} className="" />
              <span>Diagnostic Result</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-zinc-900">
              Your overall EQ is{" "}
              {result.totalTrueScore >= 4.0
                ? "Excellent"
                : result.totalTrueScore >= 3.2
                  ? "Strong"
                  : "Developing"}
            </h2>
            <p className="text-sm md:text-base text-zinc-650 leading-relaxed">
              {getEQDescription(result.totalTrueScore)}
            </p>
          </div>
        </section>

        {/* Grouped Bar Chart Card */}
        <section className="bg-white rounded-3xl p-6 md:p-8 border border-zinc-200 shadow-sm">
          <h2 className="text-xl font-bold text-zinc-900 mb-2">
            Perception vs. Performance
          </h2>
          <p className="text-sm text-zinc-600 mb-6 leading-relaxed">
            Compare how you rated your general abilities (Phase 1:
            Self-Perception) and how you performed in realistic situations
            (Phase 2: Situational Decisions) across domains.
          </p>

          <div
            className="w-full h-[320px] overflow-hidden"
            id="ei-chart-container"
          >
            {isMounted && (
              <BarChart
                height={300}
                xAxis={[
                  {
                    scaleType: "band",
                    data: chartXAxis,
                  },
                ]}
                yAxis={[{ min: 0, max: 5 }]}
                series={[
                  {
                    data: selfReportData,
                    label: "Self-Perception (Phase 1)",
                    color: "#3b82f6",
                    valueFormatter: (v) => `${v?.toFixed(2)} / 5`,
                  },
                  {
                    data: scenarioData,
                    label: "Situational Performance (Phase 2)",
                    color: "#10b981",
                    valueFormatter: (v) => `${v?.toFixed(2)} / 5`,
                  },
                ]}
                grid={{ horizontal: true }}
                sx={chartStyles}
                margin={{ left: 30, right: 10, top: 20, bottom: 40 }}
              />
            )}
          </div>

          {/* Radar Chart Section */}
          <div className="border-t border-zinc-100 pt-8 mt-6">
            <h3 className="text-xl font-bold text-zinc-900 mb-6 text-center md:text-left">
              Your Emotional Intelligence Shape
            </h3>
            <EIRadarChart result={result} />
          </div>
        </section>

        {/* Detailed Domain List */}
        <section className="space-y-6">
          <h2 className="text-2xl font-black text-zinc-900 px-1">
            Domain Insights & Self-Awareness Gap
          </h2>

          <div className="grid gap-6">
            {domainsList.map((domainKey) => {
              const domResult = result.domains[domainKey];
              if (!domResult) return null;

              const Icon = domainIcons[domainKey];
              const theme = domainColors[domainKey];

              return (
                <div
                  key={domainKey}
                  className={`bg-white rounded-3xl p-6 md:p-8 border border-zinc-200 shadow-xs transition-all hover:border-zinc-300 hover:shadow-sm`}
                >
                  {/* Header Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-200 pb-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{
                          backgroundColor: theme.light,
                          color: theme.primary,
                        }}
                      >
                        <Icon size={20} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-zinc-900">
                          {domainLabels[domainKey]}
                        </h3>
                        <p className="text-xs text-zinc-400 font-semibold tracking-wider uppercase">
                          True score: {domResult.trueScore.toFixed(2)} / 5
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 items-center">
                      <span className="text-xs font-semibold text-zinc-500">
                        Gap Penalty:
                      </span>
                      <span className="text-xs font-bold text-zinc-800 bg-zinc-100 px-2 py-0.5 rounded-full">
                        {domResult.gapPenalty.toFixed(2)}
                      </span>

                      {domResult.hasBlindSpot && (
                        <span className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                          Blind Spot
                        </span>
                      )}

                      {domResult.hasImposterSyndrome && (
                        <span className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200">
                          Imposter Syndrome
                        </span>
                      )}

                      {!domResult.hasBlindSpot &&
                        !domResult.hasImposterSyndrome && (
                          <span className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                            Aligned
                          </span>
                        )}
                    </div>
                  </div>

                  {/* Body Content */}
                  {(() => {
                    const descPair = domainLayerDescriptions[domainKey];
                    return (
                      <div className="grid md:grid-cols-3 gap-6">
                        <div className="space-y-1">
                          <p className="text-xs font-bold text-zinc-700 uppercase tracking-widest">
                            Self-Perception (Phase 1)
                          </p>
                          <div className="flex items-baseline gap-1.5 mt-1">
                            <span className="text-3xl font-extrabold text-blue-600">
                              {domResult.selfReportScore.toFixed(2)}
                            </span>
                            <span className="text-xs text-zinc-400 font-bold">
                              / 5.0
                            </span>
                          </div>
                          <p className="text-sm text-zinc-600 leading-relaxed mt-1.5">
                            {descPair.selfReport}
                          </p>
                        </div>

                        <div className="space-y-1">
                          <p className="text-xs font-bold text-zinc-700 uppercase tracking-widest">
                            Situational Performance (Phase 2)
                          </p>
                          <div className="flex items-baseline gap-1.5 mt-1">
                            <span className="text-3xl font-extrabold text-emerald-600">
                              {domResult.scenarioScore.toFixed(2)}
                            </span>
                            <span className="text-xs text-zinc-400 font-bold">
                              / 5.0
                            </span>
                          </div>
                          <p className="text-sm text-zinc-600 leading-relaxed mt-1.5">
                            {descPair.scenario}
                          </p>
                        </div>

                        <div className="space-y-1 md:border-l md:border-zinc-200 md:pl-6">
                          <p className="text-xs font-bold text-zinc-700 uppercase tracking-widest">
                            Self-Awareness Gap Analysis
                          </p>
                          <div className="mt-2 text-sm text-zinc-700 leading-relaxed">
                            {domResult.hasBlindSpot && (
                              <div className="text-amber-850 bg-amber-50/50 p-3.5 rounded-xl border border-amber-100 flex gap-2">
                                <ShieldAlert
                                  size={16}
                                  className="text-amber-600 shrink-0 mt-0.5"
                                />
                                <p className="text-sm leading-relaxed">
                                  <strong>Over-estimation:</strong> You rate
                                  yourself higher than scenario choices reflect.
                                  Consider requesting peer feedback.
                                </p>
                              </div>
                            )}
                            {domResult.hasImposterSyndrome && (
                              <div className="text-purple-850 bg-purple-50/50 p-3.5 rounded-xl border border-purple-100 flex gap-2">
                                <AlertCircle
                                  size={16}
                                  className="text-purple-600 shrink-0 mt-0.5"
                                />
                                <p className="text-sm leading-relaxed">
                                  <strong>Under-estimation:</strong> Your
                                  situational choices are stronger than you
                                  credit yourself. Trust your instincts!
                                </p>
                              </div>
                            )}
                            {!domResult.hasBlindSpot &&
                              !domResult.hasImposterSyndrome && (
                                <div className="text-emerald-850 bg-emerald-50/50 p-3.5 rounded-xl border border-emerald-100 flex gap-2">
                                  <CheckCircle
                                    size={16}
                                    className="text-emerald-600 shrink-0 mt-0.5"
                                  />
                                  <p className="text-sm leading-relaxed">
                                    <strong>Highly Aligned:</strong> You have an
                                    accurate assessment of your abilities. This
                                    indicates high metacognition.
                                  </p>
                                </div>
                              )}
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              );
            })}
          </div>
        </section>

        {/* Micro-Inconsistencies Diagnostic */}
        {result.microInconsistencies.length > 0 && (
          <section className="bg-white rounded-3xl p-6 md:p-8 border border-zinc-200 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-50 text-red-650 rounded-xl flex items-center justify-center shrink-0 border border-red-100">
                <ShieldAlert size={22} />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-zinc-900">
                  Self-Perception & Decision Alignment Gaps
                </h2>
                <p className="text-sm text-zinc-650 mt-1.5 leading-relaxed">
                  Moments where your general self-ratings differed significantly
                  from your actual decisions in realistic scenarios.
                </p>
              </div>
            </div>

            {/* Explanatory note */}
            <div className="bg-blue-50/40 border border-blue-100/60 rounded-2xl p-4 md:p-5 text-sm text-zinc-700 space-y-2">
              <p className="font-bold text-blue-900 text-sm">
                How to understand this feedback:
              </p>
              <p className="leading-relaxed">
                By comparing your responses across two different parts of the
                assessment, how you generally perceive your capabilities (Phase
                1) versus how you actually resolved real-world challenges (Phase
                2). We highlight key differences. We provide specific
                recommendations below to help you bridge the gap between how you
                think you react and how you make decisions under pressure.
              </p>
            </div>

            <div className="space-y-4">
              {result.microInconsistencies.map((inc, idx) => {
                const qObj = selfReportQuestions.find(
                  (q) => q.id === inc.linkedQuestionId,
                );
                const sObj = scenarioQuestions.find(
                  (s) => s.id === inc.scenarioId,
                );

                if (!qObj || !sObj) return null;

                const likertLabels: Record<number, string> = {
                  1: "Strong Disagree",
                  2: "Disagree",
                  3: "Neutral",
                  4: "Agree",
                  5: "Strong Agree",
                };

                const rawVal = selfReportAnswers[qObj.id] ?? 3;
                const userRatingLabel = likertLabels[rawVal] || `${rawVal}`;
                const normalizedVal = qObj.isReverse ? 6 - rawVal : rawVal;

                const userScenarioOptId = scenarioAnswers[sObj.id];
                const selectedOption = sObj.options.find(
                  (o) => o.id === userScenarioOptId,
                );
                const bestOption = sObj.options.find((o) => o.weight === 5);

                return (
                  <div
                    key={idx}
                    className="p-5 bg-zinc-50 rounded-2xl border border-zinc-200 space-y-4 hover:border-zinc-300 transition-all hover:shadow-xs"
                  >
                    {/* Header Row */}
                    <div className="flex items-center justify-between gap-4 border-b border-zinc-200 pb-2">
                      <span className="text-xs font-bold text-zinc-500 uppercase">
                        Domain: {domainLabels[sObj.domain]}
                      </span>
                      <span className="text-xs font-extrabold text-red-605 bg-red-50 border border-red-100 px-2.5 py-0.5 rounded-full">
                        Gap: {inc.difference.toFixed(1)}
                      </span>
                    </div>

                    {/* Dual Columns */}
                    <div className="grid md:grid-cols-2 gap-6 text-sm">
                      {/* Self-Report Box */}
                      <div className="space-y-2">
                        <p className="font-bold text-zinc-500 uppercase tracking-wider text-xs">
                          Phase 1: Self-Perception Statement
                        </p>
                        <p className="text-zinc-800 italic font-medium leading-relaxed bg-white p-3 rounded-xl border border-zinc-150">
                          &ldquo;{qObj.text}&rdquo;
                        </p>
                        <div className="bg-blue-50/50 text-blue-900 border border-blue-100/60 p-3 rounded-xl">
                          <p className="font-bold text-xs">
                            Your Perception Rating:
                          </p>
                          <p className="mt-0.5 text-zinc-850 font-semibold">
                            {userRatingLabel} ({rawVal} / 5)
                          </p>
                          {qObj.isReverse && (
                            <p className="text-[11px] text-zinc-500 mt-1 leading-normal">
                              (Reverse-scored. Normalized capability:{" "}
                              {normalizedVal}/5)
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Scenario Option Box */}
                      <div className="space-y-2">
                        <p className="font-bold text-zinc-500 uppercase tracking-wider text-xs">
                          Phase 2: Situational Scenario
                        </p>
                        <p className="text-zinc-850 italic font-medium leading-relaxed bg-white p-3 rounded-xl border border-zinc-150">
                          &ldquo;{sObj.text}&rdquo;
                        </p>
                        <div className="bg-emerald-50/50 text-emerald-950 border border-emerald-100/60 p-3 rounded-xl">
                          <p className="font-bold text-xs">
                            Your Action Choice:
                          </p>
                          <p className="mt-0.5 font-semibold leading-relaxed">
                            Option {userScenarioOptId?.toUpperCase()}: &ldquo;
                            {selectedOption?.text}&rdquo;
                          </p>
                          <p className="text-[11px] text-zinc-650 mt-1 leading-normal">
                            (Behavioral weight: {selectedOption?.weight} / 5)
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Path to Improvement */}
                    {bestOption && bestOption.id !== userScenarioOptId && (
                      <div className="bg-amber-50/60 border border-amber-200/50 p-4 rounded-xl text-sm space-y-1.5 animate-fade-in">
                        <div className="flex items-center gap-1.5 text-amber-850 font-bold">
                          <Sparkles
                            size={14}
                            className="text-amber-600 animate-pulse"
                          />
                          <span>Improvement Guidance</span>
                        </div>
                        <p className="text-zinc-700 leading-relaxed">
                          In this situation, choosing to{" "}
                          <strong>&ldquo;{bestOption.text}&rdquo;</strong>{" "}
                          matches a more balanced, high-EQ resolution (Weight:
                          5/5) and aligns better with your self-reported
                          baseline.
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Synthesis CTA */}
        <ComparisonCTA />

        {/* Back to Home CTA */}
        <section className="bg-linear-to-r from-blue-600 to-indigo-600 rounded-3xl p-6 md:p-8 text-center text-white shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-xl pointer-events-none"></div>
          <h2 className="text-xl md:text-2xl font-bold mb-2">
            Explore Your Personality Further
          </h2>
          <p className="text-sm text-zinc-100 mb-6 max-w-xl mx-auto">
            Take other assessments to unlock the ultimate Triple Alignment
            Comparison Dashboard.
          </p>
          <Link href="/personality-test">
            <button className="px-6 py-3 bg-white text-black font-bold text-sm rounded-full hover:bg-zinc-50 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer inline-flex items-center gap-2">
              View All Assessments
              <ArrowRight size={18} />
            </button>
          </Link>
        </section>
      </article>
    </div>
  );
}
