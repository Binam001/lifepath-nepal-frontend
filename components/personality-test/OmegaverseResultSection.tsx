"use client";

import { useEffect } from "react";
import Confetti from "react-confetti";
import {
  ArrowRight,
  ArrowLeft,
  Sparkles,
  CheckCircle,
  Shield,
  Crown,
  Brain,
  ListChecks,
  Compass,
  User,
} from "lucide-react";
import Link from "next/link";
import { omegaverseTypes } from "@/data/omegaverse-data";
import ComparisonCTA from "./ComparisonCTA";

interface OmegaverseResultSectionProps {
  result: string;
  showConfetti: boolean;
  windowSize: { width: number; height: number };
  handleRetake: () => void;
  computedScores: Record<string, number>;
}

export default function OmegaverseResultSection({
  result,
  showConfetti,
  windowSize,
  handleRetake,
  computedScores,
}: OmegaverseResultSectionProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

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
        <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">
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
            <p className="text-base md:text-lg text-zinc-800 leading-relaxed">
              {profile.detailedDescription}
            </p>
          </div>
        </div>
      </section>

      <article className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <section className="bg-white rounded-xl p-6 md:p-8 border border-zinc-200 shadow-sm animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-zinc-900">
                Dynamic Scores Breakdown
              </h2>
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

        {/* <div className="grid md:grid-cols-2 gap-6 mb-6"> */}
        <section className="bg-white rounded-xl p-6 md:p-8 border border-zinc-200 shadow-xs">
          <h2 className="text-2xl font-bold text-zinc-900 mb-4">
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
          <h2 className="text-2xl font-bold text-zinc-900 mb-4">
            Key Weaknesses
          </h2>
          <div className="space-y-3">
            {profile.weaknesses.map((weakness, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                </div>
                <p className="text-base text-zinc-800 leading-relaxed">
                  {weakness}
                </p>
              </div>
            ))}
          </div>
        </section>
        {/* </div> */}

        <section className="bg-white rounded-xl p-6 md:p-8 border border-zinc-200 shadow-xs">
          <h2 className="text-2xl font-bold text-zinc-900 mb-4">
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
              <p className="text-lg font-bold text-red-600 mt-1">
                {profile.compatibility.challenging}
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-xl p-6 md:p-8 border border-zinc-200 shadow-xs">
          <h2 className="text-2xl font-bold text-zinc-900 mb-4">
            Ideal Work Style
          </h2>
          <p className="text-base text-zinc-700 leading-relaxed">
            {profile.workStyle}
          </p>
        </section>

        <section className="bg-white rounded-xl p-6 md:p-8 border border-zinc-200 shadow-xs">
          <h2 className="text-2xl font-bold text-zinc-900 mb-4">
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

        <section className="bg-white rounded-xl p-6 md:p-8 border border-zinc-200 shadow-xs">
          <h2 className="text-2xl font-bold text-zinc-900 mb-4">
            Life Path Advice
          </h2>
          <p className="text-base text-zinc-700 leading-relaxed">
            {profile.lifePathAdvice}
          </p>
        </section>

        {profile.popularPeople && profile.popularPeople.length > 0 && (
          <section className="bg-white rounded-xl p-6 md:p-8 border border-zinc-200 shadow-xs">
            <h2 className="text-2xl font-bold text-zinc-900 mb-1">
              Famous {profile.name}s
            </h2>
            <p className="text-sm text-zinc-500 mb-6 leading-relaxed">
              Get inspired by famous personalities who share the strengths and
              mindset of a {profile.name}.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {profile.popularPeople.map((person, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 bg-zinc-50 rounded-xl border border-zinc-200 hover:border-blue-300 hover:bg-white transition-all shadow-xs"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                    <User size={16} />
                  </div>
                  <div>
                    <span className="text-base font-bold text-zinc-800 block">
                      {person.name}
                    </span>
                    <span className="text-xs font-semibold text-zinc-500 block mt-0.5">
                      {person.profession}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        {/* Comparison CTA Dashboard Banner */}
        <ComparisonCTA />

        <section className="bg-linear-to-r from-blue-600 to-indigo-600 rounded-xl p-6 md:p-8 text-center text-white mb-6 shadow-md">
          <h2 className="text-xl md:text-2xl font-bold mb-3">
            Explore Careers aligned with your Dynamic
          </h2>
          <p className="text-base text-white/90 mb-6">
            Empower your career paths through optimized personality placement in
            the modern workforce.
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
