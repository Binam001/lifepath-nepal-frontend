"use client";

import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import {
  ArrowLeft,
  Brain,
  Sparkles,
  BookOpen,
  Binary,
  Compass,
  Users,
  Target,
  ClipboardList,
  CheckCircle,
  MapPin,
} from "lucide-react";
import { RiasecCategory } from "@/data/RIASEC-test";
import {
  riasecThemes,
  getHollandCareerRecommendations,
  getBlendedEnvironment,
  type HollandCareer,
} from "@/data/RIASEC-data";
import ComparisonCTA from "./components/ComparisonCTA";
import ExploreCareerCTA from "./components/ExploreCareerCTA";

interface RiasecResultSectionProps {
  hollandCode: string;
  scores: Record<string, number>; // R, I, A, S, E, C -> total score (5 to 25)
  answers: Record<number, number>; // questionId -> Likert scale value (1 to 5)
  showConfetti: boolean;
  windowSize: { width: number; height: number };
  handleRetake: () => void;
}

const layoutMeta = {
  R: {
    icon: Compass,
    color: "bg-blue-500",
    textClass: "text-blue-600",
    bgClass: "bg-blue-50 border-blue-100",
  },
  I: {
    icon: Binary,
    color: "bg-purple-500",
    textClass: "text-purple-600",
    bgClass: "bg-purple-50 border-purple-100",
  },
  A: {
    icon: BookOpen,
    color: "bg-pink-500",
    textClass: "text-pink-600",
    bgClass: "bg-pink-50 border-pink-100",
  },
  S: {
    icon: Users,
    color: "bg-emerald-500",
    textClass: "text-emerald-600",
    bgClass: "bg-emerald-50 border-emerald-100",
  },
  E: {
    icon: Target,
    color: "bg-amber-500",
    textClass: "text-amber-600",
    bgClass: "bg-amber-50 border-amber-100",
  },
  C: {
    icon: ClipboardList,
    color: "bg-cyan-500",
    textClass: "text-cyan-600",
    bgClass: "bg-cyan-50 border-cyan-100",
  },
};

export default function RiasecResultSection({
  hollandCode,
  scores,
  answers,
  showConfetti,
  windowSize,
  handleRetake,
}: RiasecResultSectionProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMounted(true);
  }, []);

  const categoriesList: RiasecCategory[] = ["R", "I", "A", "S", "E", "C"];

  // Normalize hollandCode safely in case an old cached object is loaded from browser localStorage
  const code =
    typeof hollandCode === "string"
      ? hollandCode
      : hollandCode &&
          typeof hollandCode === "object" &&
          (hollandCode as any).code
        ? (hollandCode as any).code
        : "";

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
                Your Career Interests Profile (Holland Code)
              </h1>
              <p className="text-lg text-white/70 leading-relaxed max-w-2xl">
                The Holland Occupational Themes model represents six interest
                dimensions that map your preferences directly to satisfying work
                and studies.
              </p>
            </div>
          </div>
        </div>
      </section>

      <article className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Holland Code Summary Card */}
        <section className="bg-white rounded-2xl p-6 md:p-8 border border-zinc-200 shadow-xs flex flex-col md:flex-row items-center gap-6 md:gap-8">
          <div className="relative flex items-center justify-center shrink-0">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-linear-to-tr from-emerald-600 to-teal-600 flex flex-col items-center justify-center text-white shadow-xl shadow-emerald-500/10">
              <span className="text-[10px] uppercase font-black tracking-widest text-white/75">
                Holland Code
              </span>
              <span className="text-4xl md:text-5xl font-extrabold mt-1 tracking-wider">
                {code}
              </span>
            </div>
          </div>

          <div className="space-y-3 text-center md:text-left flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-full text-emerald-700 text-xs font-bold uppercase tracking-wider">
              <Sparkles size={13} />
              <span>Vocational Alignment</span>
            </div>

            <h2 className="text-xl md:text-2xl font-bold text-zinc-900">
              Your Primary Code is{" "}
              <span className="text-emerald-600 font-extrabold">{code}</span>
            </h2>

            <p className="text-sm md:text-base text-zinc-650 leading-relaxed">
              This code signifies that your strongest career interests align
              with the themes of{" "}
              {code.split("").map((letter: string, idx: number) => {
                const name = riasecThemes[letter as RiasecCategory]?.name;
                return (
                  <span key={letter} className="font-semibold text-zinc-800">
                    {name}
                    {idx < 2 ? ", " : ""}
                  </span>
                );
              })}
              . These combined themes dictate what kind of work environments,
              job responsibilities, and tasks you find most rewarding.
            </p>
          </div>
        </section>

        {/* Section 1 & 2: The Personality Profile & Supporting Traits */}
        {code &&
          code.length > 0 &&
          (() => {
            const primaryLetter = code.charAt(0) as RiasecCategory;
            const primaryTheme = riasecThemes[primaryLetter];
            const primaryLayout = layoutMeta[primaryLetter];
            const PrimaryIcon = primaryLayout?.icon || Compass;

            // Second and third letters
            const secondaryLetters = code
              .slice(1)
              .split("") as RiasecCategory[];

            // Combined strengths and weaknesses for all 3 themes
            const combinedStrengths = [
              ...primaryTheme.strengths.map((str) => ({
                text: str,
                themeName: primaryTheme.name,
                themeLetter: primaryLetter,
                layout: primaryLayout,
              })),
              ...secondaryLetters.flatMap((letter) => {
                const theme = riasecThemes[letter];
                const layout = layoutMeta[letter];
                return theme.strengths.map((str) => ({
                  text: str,
                  themeName: theme.name,
                  themeLetter: letter,
                  layout,
                }));
              }),
            ];

            const combinedWeaknesses = [
              ...primaryTheme.weaknesses.map((weak) => ({
                text: weak,
                themeName: primaryTheme.name,
                themeLetter: primaryLetter,
                layout: primaryLayout,
              })),
              ...secondaryLetters.flatMap((letter) => {
                const theme = riasecThemes[letter];
                const layout = layoutMeta[letter];
                return theme.weaknesses.map((weak) => ({
                  text: weak,
                  themeName: theme.name,
                  themeLetter: letter,
                  layout,
                }));
              }),
            ];

            return (
              <div className="space-y-6">
                <section className="bg-white rounded-2xl p-6 md:p-8 border border-zinc-200 shadow-xs space-y-6">
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-100 pb-5">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-14 h-14 rounded-2xl text-white flex items-center justify-center shrink-0 ${primaryLayout?.color || "bg-emerald-500"}`}
                      >
                        <PrimaryIcon size={32} />
                      </div>
                      <div>
                        <span className="text-xs uppercase font-extrabold text-zinc-400 tracking-wider">
                          Primary Interest Type
                        </span>
                        <h2 className="text-2xl md:text-3xl font-black text-zinc-900">
                          You are{" "}
                          <span className={primaryLayout?.textClass}>
                            "{primaryTheme?.label}"
                          </span>
                        </h2>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-sm font-semibold text-zinc-500">
                        Primary Code:
                      </span>
                      <span
                        className={`ml-2 text-2xl font-black px-3.5 py-1.5 rounded-lg inline-block ${primaryLayout?.bgClass || "bg-zinc-100"} ${primaryLayout?.textClass || "text-zinc-800"}`}
                      >
                        {primaryLetter}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider">
                      Who are "{primaryTheme?.name}"?
                    </h3>
                    <p className="text-sm md:text-base text-zinc-700 leading-relaxed">
                      {primaryTheme?.description}
                    </p>
                  </div>

                  {/* Section 2: Supporting Traits (Shown Above Strengths & Weaknesses) */}
                  {secondaryLetters.length > 0 && (
                    <div className="border-t border-zinc-100 pt-6 space-y-4">
                      <h4 className="text-sm font-bold text-zinc-400 uppercase tracking-wider">
                        Supporting Traits
                      </h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {secondaryLetters.map((letter) => {
                          const theme = riasecThemes[letter];
                          const layout = layoutMeta[letter];
                          const Icon = layout?.icon || Compass;

                          return (
                            <div
                              key={letter}
                              className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 flex gap-3 items-start"
                            >
                              <div
                                className={`p-2 rounded-lg text-white shrink-0 ${layout?.color || "bg-zinc-400"}`}
                              >
                                <Icon size={16} />
                              </div>
                              <div className="space-y-1">
                                <h5 className="font-bold text-sm text-zinc-900">
                                  {theme?.name} ({letter}) — {theme?.label}
                                </h5>
                                <p className="text-xs text-zinc-550 leading-relaxed">
                                  {theme?.description}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Section 1: Combined Strengths & Blind Spots (Shown Below Supporting Traits) */}
                  <div className="border-t border-zinc-100 pt-6 space-y-4">
                    <h4 className="text-sm font-bold text-zinc-400 uppercase tracking-wider">
                      Profile Strengths & Weaknesses
                    </h4>
                    <div className="flex flex-col gap-6">
                      {/* Combined Strengths */}
                      <div className="bg-emerald-50/20 border border-emerald-150 rounded-xl p-5 md:p-6 space-y-4">
                        <div className="flex items-center gap-2 border-b border-emerald-100 pb-3">
                          <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center shrink-0 text-emerald-700">
                            <CheckCircle size={14} />
                          </div>
                          <h4 className="font-bold text-emerald-950 text-sm md:text-base">
                            Key Strengths
                          </h4>
                        </div>
                        <ul className="space-y-3">
                          {combinedStrengths.map((item, idx: number) => (
                            <li
                              key={idx}
                              className="flex items-start gap-3 text-sm md:text-base text-zinc-700 leading-relaxed"
                            >
                              <span
                                className={`size-6 rounded-full flex items-center justify-center text-xs font-black text-white shrink-0 uppercase tracking-wide select-none ${item.layout?.color || "bg-zinc-400"}`}
                                title={item.themeName}
                              >
                                {item.themeLetter}
                              </span>
                              <span className="">{item.text}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Combined Weaknesses */}
                      <div className="bg-amber-50/20 border border-amber-150 rounded-xl p-5 md:p-6 space-y-4">
                        <div className="flex items-center gap-2 border-b border-amber-100 pb-3">
                          <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center shrink-0 text-amber-700">
                            <Sparkles size={14} />
                          </div>
                          <h4 className="font-bold text-amber-950 text-sm md:text-base">
                            Key Weaknesses
                          </h4>
                        </div>
                        <ul className="space-y-3">
                          {combinedWeaknesses.map((item, idx: number) => (
                            <li
                              key={idx}
                              className="flex items-start gap-3 text-sm md:text-base text-zinc-700 leading-relaxed"
                            >
                              <span
                                className={`size-6 rounded-full flex items-center justify-center text-xs font-black text-white shrink-0 uppercase tracking-wide select-none ${item.layout?.color || "bg-zinc-400"}`}
                                title={item.themeName}
                              >
                                {item.themeLetter}
                              </span>
                              <span className="">{item.text}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Full-Width Banner: Where You Thrive (Ideal Workspace) */}
                  <div className="border-t border-zinc-100 pt-6 space-y-4">
                    <h4 className="text-sm font-bold text-zinc-400 uppercase tracking-wider">
                      Your Ideal Workspace
                    </h4>
                    <div className="bg-linear-to-r from-emerald-50/30 to-teal-50/30 border border-emerald-100/80 rounded-xl p-5 md:p-6 space-y-4 shadow-2xs">
                      <div className="flex items-center gap-2 pb-2 border-b border-emerald-100/60">
                        <MapPin
                          size={18}
                          className="text-emerald-600 shrink-0"
                        />
                        <span className="font-extrabold text-zinc-800 text-sm md:text-base">
                          Blended Work Environment Profile
                        </span>
                      </div>
                      <ul className="space-y-4">
                        {getBlendedEnvironment(code).map((envText, idx: number) => {
                          const sourceLetter = code.charAt(
                            idx,
                          ) as RiasecCategory;
                          const sourceTheme = riasecThemes[sourceLetter];
                          const sourceLayout = layoutMeta[sourceLetter];

                          return (
                            <li
                              key={idx}
                              className="flex items-start gap-4 text-sm md:text-base text-zinc-700 leading-relaxed animate-in fade-in slide-in-from-left-2 duration-300"
                            >
                              <span
                                className={`size-6 rounded-full flex items-center justify-center text-xs font-black text-white shrink-0 uppercase tracking-wide select-none ${sourceLayout?.color || "bg-zinc-400"}`}
                                title={sourceTheme?.name}
                              >
                                {sourceLetter}
                              </span>
                              <span className="pt-0.5 font-medium">
                                {envText}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </section>
              </div>
            );
          })()}

        {/* All Six Categories Score Breakdown */}
        <section className="bg-white rounded-2xl p-6 md:p-8 border border-zinc-200 shadow-xs space-y-6">
          <h2 className="text-xl font-bold text-zinc-900 font-sans">
            Holland Theme Score Breakdown
          </h2>
          <p className="text-sm text-zinc-500 leading-relaxed -mt-4">
            Holland codes measure interests across six distinct dimensions. A
            score of 5 represents the minimum interest level, while 25
            represents the maximum.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {categoriesList.map((cat) => {
              const themeData = riasecThemes[cat];
              const layout = layoutMeta[cat];
              const score = scores[cat] || 5;
              const percent = Math.round(((score - 5) / 20) * 100);
              const Icon = layout.icon;
              const isTopThree = code.includes(cat);

              return (
                <div
                  key={cat}
                  className={`p-5 border rounded-xl space-y-3 transition-all ${isTopThree ? "bg-emerald-50/5 border-emerald-100" : "bg-zinc-50/50 border-zinc-200"}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className={`p-2 rounded-lg text-white ${layout.color}`}
                      >
                        <Icon size={18} />
                      </div>
                      <span className="font-bold text-zinc-800 text-sm md:text-base">
                        {themeData.name} ({cat})
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {isTopThree && (
                        <span className="text-[9px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full">
                          Top Theme
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-zinc-500 leading-relaxed">
                    {themeData.description}
                  </p>

                  <div className="space-y-1 pt-2">
                    <div className="flex justify-between items-center text-[10px] font-bold text-zinc-600">
                      <span>INTEREST STRENGTH</span>
                      <span>{Math.max(0, percent)}%</span>
                    </div>
                    <div className="w-full bg-zinc-200 rounded-full h-2">
                      <div
                        className={`${layout.color} h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${Math.max(0, percent)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* career paths based on Holland code */}
        <section className="bg-white rounded-2xl p-6 md:p-8 border border-zinc-200 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
              <Compass size={22} className="text-emerald-600" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-zinc-900">
                Recommended Career Fields
              </h2>
              <p className="text-sm font-semibold text-zinc-500">
                Best-fit vocational directions based on your Holland Code (
                {code})
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {getHollandCareerRecommendations(code).map((career, idx: number) => (
              <div
                key={idx}
                className="bg-zinc-50/30 hover:bg-white rounded-xl p-5 border border-zinc-200 hover:border-emerald-200 hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4 transform hover:-translate-y-0.5"
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h3 className="font-bold text-zinc-900 text-base md:text-lg">
                      {career.title}
                    </h3>
                    <span className="text-[10px] font-black uppercase tracking-wider bg-zinc-100 text-zinc-600 border border-zinc-200 px-2 py-0.5 rounded-full shrink-0">
                      {career.field}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    {career.description}
                  </p>
                </div>

                <div className="border-t border-zinc-100 pt-3 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                    Required Profile
                  </span>
                  <div className="flex items-center gap-1">
                    {career.code.split("").map((letter: string) => {
                      const layout = layoutMeta[letter as RiasecCategory];
                      return (
                        <span
                          key={letter}
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black text-white shrink-0 ${layout?.color || "bg-zinc-400"}`}
                          title={`${riasecThemes[letter as RiasecCategory]?.name} (${letter})`}
                        >
                          {letter}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <ComparisonCTA />

        <ExploreCareerCTA
          title="Explore Career Paths Based on Your Code"
          subtitle="Leverage your Holland Code to find matching vocational tracks, university fields, and practical courses."
          buttonText="View All Assessments"
          href="/personality-test"
        />
      </article>
    </div>
  );
}
