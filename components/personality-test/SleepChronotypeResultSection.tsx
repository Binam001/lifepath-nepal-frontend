"use client";

import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Clock,
  Sun,
  Moon,
  Briefcase,
  Compass,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { ChronotypeCode, chronotypeProfiles } from "@/data/SleepChonotype-test";
import ComparisonCTA from "./components/ComparisonCTA";
import ExploreCareerCTA from "./components/ExploreCareerCTA";

interface SleepChronotypeResultSectionProps {
  result: {
    resultCode: ChronotypeCode;
    resultName: string;
    breakdown: Record<ChronotypeCode, number>;
  };
  showConfetti: boolean;
  windowSize: { width: number; height: number };
  handleRetake: () => void;
}

export default function SleepChronotypeResultSection({
  result,
  showConfetti,
  windowSize,
  handleRetake,
}: SleepChronotypeResultSectionProps) {
  const [isMounted, setIsMounted] = useState(false);
  const activeProfile = chronotypeProfiles[result.resultCode];

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMounted(true);
  }, []);

  // Calculate percentages based on 24 questions
  const getPercentage = (count: number) => {
    return Math.round((count / 24) * 100);
  };

  const chronotypesList: { code: ChronotypeCode; name: string; icon: any }[] = [
    { code: "L", name: "Lion", icon: Sun },
    { code: "B", name: "Bear", icon: Compass },
    { code: "W", name: "Wolf", icon: Moon },
    { code: "D", name: "Dolphin", icon: Zap },
  ];

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
        <div className="max-w-6xl mx-auto h-full min-h-[60vh] py-8 px-4 sm:px-6 flex flex-col justify-between">
          <div>
            <button
              onClick={handleRetake}
              className="px-4 py-2 bg-white/30 hover:bg-white/20 text-white border border-white/20 text-sm font-semibold rounded-full transition-all cursor-pointer flex items-center gap-2 w-fit"
            >
              <ArrowLeft size={16} />
              Retake Test
            </button>
          </div>

          <div className="flex-1 flex items-center py-8">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center shrink-0 backdrop-blur-md">
                <Clock size={32} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                  Your Sleep Chronotype Profile
                </h1>
                <p className="text-base md:text-lg text-zinc-200 mt-2 font-light leading-relaxed max-w-2xl">
                  Unlock the biological rhythm driving your daily energy peaks,
                  focus blocks, and optimal rest schedules.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <article className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Spotlight Card */}
        <section
          className={`rounded-3xl p-6 md:p-8 border ${activeProfile.borderColor} ${activeProfile.bgColor} shadow-xs flex flex-col md:flex-row items-stretch gap-6 md:gap-8`}
        >
          <div className="flex flex-col items-center justify-center md:border-r border-zinc-200/50 md:pr-8 shrink-0">
            <div
              className={`w-28 h-28 md:w-36 md:h-36 rounded-full bg-white flex flex-col items-center justify-center border-2 ${activeProfile.borderColor} shadow-sm`}
            >
              <span
                className={`text-4xl md:text-5xl font-black ${activeProfile.color}`}
              >
                {activeProfile.name.charAt(0)}
              </span>
              <span className="text-xs text-zinc-400 font-bold uppercase tracking-widest mt-1">
                Chronotype
              </span>
            </div>
            <span
              className={`mt-4 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full ${activeProfile.badgeColor}`}
            >
              {activeProfile.name} Archetype
            </span>
            {/* <span className="text-[11px] font-extrabold text-zinc-500 mt-2 bg-zinc-200/50 px-2.5 py-0.5 rounded-full">
              {activeProfile.population}
            </span> */}
          </div>

          <div className="space-y-4 flex-1">
            <div>
              <h2
                className={`text-2xl md:text-3xl font-black ${activeProfile.color}`}
              >
                {activeProfile.name}
              </h2>
              <p className="text-base font-bold text-zinc-800 mt-1">
                {activeProfile.tagline}
              </p>
            </div>
            <p
              className={`text-base md:text-lg leading-relaxed font-bold border-l-4 pl-4 py-1 my-3 text-zinc-800 border-l-primary/60`}
            >
              {activeProfile.characteristics}
            </p>
            <p className="text-sm md:text-base text-zinc-650 leading-relaxed font-medium">
              {activeProfile.description}
            </p>
          </div>
        </section>

        {/* Deep Psychology */}
        <section className="bg-white rounded-xl p-6 md:p-8 border border-zinc-200 shadow-xs">
          <h2 className="text-2xl font-bold text-zinc-900 mb-4">
            Behavioral Mindset
          </h2>
          <p className="text-base text-zinc-700 leading-relaxed font-medium">
            {activeProfile.deepPsychology}
          </p>
        </section>

        {/* Chronotype Insights Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personality Traits */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-zinc-250/80 shadow-xs flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${activeProfile.borderColor} ${activeProfile.bgColor} ${activeProfile.color}`}
              >
                <Compass size={20} />
              </div>
              <h3 className="text-lg font-bold text-zinc-900">
                Personality Traits
              </h3>
            </div>
            <p className="text-sm md:text-base text-zinc-600 leading-relaxed font-medium">
              {activeProfile.traits}
            </p>
          </div>

          {/* Peak Productivity */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-zinc-250/80 shadow-xs flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${activeProfile.borderColor} ${activeProfile.bgColor} ${activeProfile.color}`}
              >
                <Zap size={20} />
              </div>
              <h3 className="text-lg font-bold text-zinc-900">
                Peak Productivity
              </h3>
            </div>
            <p className="text-sm md:text-base text-zinc-600 leading-relaxed font-medium">
              {activeProfile.peakProductivity}
            </p>
          </div>

          {/* The Challenge */}
          <div className="bg-red-50/20 rounded-3xl p-6 md:p-8 border border-red-100 shadow-xs flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-red-200 bg-red-50 text-red-750">
                <Clock size={20} />
              </div>
              <h3 className="text-lg font-bold text-zinc-900">The Challenge</h3>
            </div>
            <p className="text-sm md:text-base text-zinc-600 leading-relaxed font-medium">
              {activeProfile.challenge}
            </p>
          </div>

          {/* Ideal Sleep Schedule */}
          <div className="bg-blue-50/20 rounded-3xl p-6 md:p-8 border border-blue-100 shadow-xs flex flex-col gap-4 justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-blue-200 bg-blue-50 text-blue-700">
                  <Moon size={20} />
                </div>
                <h3 className="text-lg font-bold text-zinc-900">
                  Ideal Sleep Schedule
                </h3>
              </div>
              <p className="text-2xl md:text-3xl font-semibold text-zinc-900 tracking-tight">
                {activeProfile.idealSleepSchedule}
              </p>
            </div>
            <p className="text-xs text-zinc-450 font-semibold mt-2">
              Going to bed and waking up at consistent times maximizes sleep
              quality.
            </p>
          </div>
        </section>

        {/* Score Breakdown & Daily Rhythm Cards */}
        {/* <div className="grid grid-cols-1 md:grid-cols-1 gap-8"> */}
        {/* Text-Based Score Breakdown */}
        {/* <section className="bg-white rounded-3xl p-6 md:p-8 border border-zinc-250 shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="text-lg md:text-xl font-bold text-zinc-900 mb-2">
                Rhythm Affinity Score
              </h3>
              <p className="text-xs md:text-sm text-zinc-500 mb-6 leading-relaxed">
                Your answers match the habits of each animal archetype in the
                following proportions:
              </p>

              <div className="space-y-5">
                {chronotypesList.map(({ code, name, icon: IconComponent }) => {
                  const count = result.breakdown[code] ?? 0;
                  const percentage = getPercentage(count);
                  const isDominant = result.resultCode === code;
                  const profile = chronotypeProfiles[code];

                  return (
                    <div key={code} className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border ${profile.borderColor} ${profile.bgColor} ${profile.color}`}
                          >
                            <IconComponent size={14} />
                          </div>
                          <span
                            className={`font-bold ${isDominant ? "text-zinc-950" : "text-zinc-600"}`}
                          >
                            {name}
                          </span>
                          {isDominant && (
                            <span className="text-[10px] font-black uppercase tracking-widest bg-primary/10 text-primary px-2 py-0.5 rounded-md">
                              Dominant
                            </span>
                          )}
                        </div>
                        <span
                          className={`font-extrabold ${isDominant ? "text-primary" : "text-zinc-700"}`}
                        >
                          {percentage}%
                        </span>
                      </div>

                      <div className="w-full bg-zinc-100 rounded-full h-3.5 border border-zinc-200/40 relative">
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ${
                            code === "L"
                              ? "bg-amber-500 shadow-sm shadow-amber-500/20"
                              : code === "B"
                                ? "bg-blue-500 shadow-sm shadow-blue-500/20"
                                : code === "W"
                                  ? "bg-purple-500 shadow-sm shadow-purple-500/20"
                                  : "bg-teal-500 shadow-sm shadow-teal-500/20"
                          }`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-zinc-100 text-center">
              <p className="text-[11px] text-zinc-400 font-semibold leading-relaxed">
                A higher affinity score indicates a stronger alignment with that
                biological archetype&apos;s focus blocks and cycles.
              </p>
            </div>
          </section> */}

        {/* Daily Rhythm Recommendations */}
        {/* <section className="bg-white rounded-3xl p-6 md:p-8 border border-zinc-250 shadow-xs">
            <h3 className="text-lg md:text-xl font-bold text-zinc-900 mb-2 flex items-center gap-2">
              <Clock size={20} className="text-primary" />
              Optimal Daily Schedule
            </h3>
            <p className="text-xs md:text-sm text-zinc-500 mb-6 leading-relaxed">
              Aligning your daily tasks and sleep cycles to these timestamps
              maximizes energy and focus:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-4 p-3 bg-zinc-50 rounded-2xl border border-zinc-150">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
                  <Sun size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                    Wake Up Block
                  </p>
                  <p className="text-sm font-extrabold text-zinc-850">
                    {activeProfile.dailyRhythm.wake}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-3 bg-zinc-50 rounded-2xl border border-zinc-150">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                  <Briefcase size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                    Peak Productivity Focus
                  </p>
                  <p className="text-sm font-extrabold text-zinc-850">
                    {activeProfile.dailyRhythm.peakEnergy}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-3 bg-zinc-50 rounded-2xl border border-zinc-150">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-650 flex items-center justify-center shrink-0 border border-purple-100">
                  <Compass size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                    Wind Down Period
                  </p>
                  <p className="text-sm font-extrabold text-zinc-850">
                    {activeProfile.dailyRhythm.windDown}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-3 bg-zinc-50 rounded-2xl border border-zinc-150">
                <div className="w-10 h-10 rounded-xl bg-zinc-100 text-zinc-700 flex items-center justify-center shrink-0 border border-zinc-200">
                  <Moon size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                    Target Bedtime
                  </p>
                  <p className="text-sm font-extrabold text-zinc-850">
                    {activeProfile.dailyRhythm.bedtime}
                  </p>
                </div>
              </div>
            </div>
          </section> */}
        {/* </div> */}

        {/* Strengths Card */}
        <section className="bg-white rounded-xl p-6 md:p-8 border border-zinc-200 shadow-xs">
          <h2 className="text-2xl font-bold text-zinc-900 mb-4">
            Core Behavioral Strengths
          </h2>
          <div className="space-y-3">
            {activeProfile.strengths.map((strength, idx) => (
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
            Core Behavioral Weaknesses
          </h2>
          <div className="space-y-3">
            {activeProfile.weaknesses.map((weakness, idx) => (
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

        {/* Life Path Advice */}
        <section className="bg-white rounded-xl p-6 md:p-8 border border-zinc-200 shadow-xs">
          <h2 className="text-2xl font-bold text-zinc-900 mb-4">
            Life Path Advice
          </h2>
          <p className="text-base text-zinc-700 leading-relaxed font-medium">
            {activeProfile.lifePathAdvice}
          </p>
        </section>

        {/* Career Mappings */}
        {/* <section className="bg-white rounded-3xl p-6 md:p-8 border border-zinc-250 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0 text-primary border border-primary/20">
              <Briefcase size={20} />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-zinc-900">
                Rhythm-Aligned Career Mappings
              </h2>
              <p className="text-xs md:text-sm font-semibold text-zinc-500 mt-0.5">
                Careers that align with your biological peak times and working disposition:
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {activeProfile.careers.map((career, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 p-3.5 bg-zinc-50 rounded-2xl border border-zinc-200 hover:border-primary/30 transition-all shadow-xs"
              >
                <CheckCircle size={16} className="text-primary shrink-0" />
                <span className="text-sm font-semibold text-zinc-800">
                  {career}
                </span>
              </div>
            ))}
          </div>
        </section> */}

        {/* Comparison Dashboard Banner */}
        {/* <ComparisonCTA /> */}

        {/* Career Call to Action */}
        <ExploreCareerCTA
          title="Map Your Strengths to Real Career Paths"
          subtitle="Discover roadmaps, skills requirements, and active industries that align with your natural biological clock."
          buttonText="Explore Career Options"
          href="/future"
        />
      </article>
    </div>
  );
}
