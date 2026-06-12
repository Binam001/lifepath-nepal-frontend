"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Brain,
  Compass,
  Sparkles,
  CheckCircle,
  Lock,
  ArrowRight,
  ArrowLeft,
  Code,
  Palette,
  Heart,
  Briefcase,
  BookOpen,
  Scale,
  Shield,
  Star,
  Activity,
} from "lucide-react";
import { personalityTypes } from "@/data/MBTI-data";
import { omegaverseTypes } from "@/data/omegaverse-data";
import { calculateArchetype } from "@/data/CareermatchingForOcean";
import {
  getCoreCareerCategory,
  getNatureSynthesis,
  coreCareerMetadata,
  type CoreCareerCategory,
} from "@/data/PersonalityAlignment";
import { type Trait } from "@/data/OCEAN-data";

export default function PersonalityComparisonPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [results, setResults] = useState<{
    mbti?: string;
    omegaverse?: string;
    ocean?: Record<string, number>;
  }>({});

  useEffect(() => {
    setIsMounted(true);
    // Load scores from localStorage safely on client side
    const mbti = localStorage.getItem("mbti_saved_result") || undefined;
    const omegaverse =
      localStorage.getItem("omegaverse_saved_result") || undefined;
    const oceanRaw = localStorage.getItem("ocean_saved_result");
    let ocean: Record<string, number> | undefined = undefined;

    if (oceanRaw) {
      try {
        ocean = JSON.parse(oceanRaw);
      } catch (e) {
        console.error("Error parsing ocean scores", e);
      }
    }

    setResults({
      mbti,
      omegaverse: omegaverse?.toUpperCase(),
      ocean,
    });
  }, []);

  if (!isMounted) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-zinc-50">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-zinc-500 font-semibold">Loading alignment...</p>
        </div>
      </div>
    );
  }

  // Determine completions
  const hasMbti = !!results.mbti && !!personalityTypes[results.mbti];
  const hasOmegaverse =
    !!results.omegaverse && !!omegaverseTypes[results.omegaverse];
  const hasOcean = !!results.ocean && Object.keys(results.ocean).length > 0;

  const completedCount = [hasMbti, hasOmegaverse, hasOcean].filter(
    Boolean,
  ).length;
  const isUnlocked = completedCount >= 2;

  // Archetype & careers extraction
  const mbtiDetail = hasMbti ? personalityTypes[results.mbti!] : null;
  const omegaverseDetail = hasOmegaverse
    ? omegaverseTypes[results.omegaverse!]
    : null;
  const oceanArchetype = hasOcean
    ? calculateArchetype(results.ocean as Record<Trait, number>)
    : null;

  // Careers compile
  const mbtiCareers = mbtiDetail?.careers || [];
  const omegaverseCareers = omegaverseDetail?.careers || [];
  const oceanCareers = oceanArchetype?.careers || [];

  // Map careers to Core Categories
  const categoryCounts: Record<CoreCareerCategory, number> = {
    software_and_tech: 0,
    creative_arts_design: 0,
    healthcare_and_caregiving: 0,
    leadership_and_management: 0,
    research_and_academia: 0,
    legal_and_compliance: 0,
  };

  const categorySourceTests: Record<CoreCareerCategory, string[]> = {
    software_and_tech: [],
    creative_arts_design: [],
    healthcare_and_caregiving: [],
    leadership_and_management: [],
    research_and_academia: [],
    legal_and_compliance: [],
  };

  const trackCareer = (careerName: string, sourceTest: string) => {
    const cat = getCoreCareerCategory(careerName);
    categoryCounts[cat] += 1;
    if (!categorySourceTests[cat].includes(sourceTest)) {
      categorySourceTests[cat].push(sourceTest);
    }
  };

  mbtiCareers.forEach((c) => trackCareer(c, "MBTI"));
  omegaverseCareers.forEach((c) => trackCareer(c, "Omegaverse"));
  oceanCareers.forEach((c) => trackCareer(c, "OCEAN"));

  // Sort categories by completed test overlaps
  const sortedCategories = (
    Object.keys(coreCareerMetadata) as CoreCareerCategory[]
  ).sort((a, b) => {
    // Priority: categories recommended by more tests
    const diff = categorySourceTests[b].length - categorySourceTests[a].length;
    if (diff !== 0) return diff;
    return categoryCounts[b] - categoryCounts[a];
  });

  // Profile synthesis
  const synthesis = getNatureSynthesis(
    results.mbti,
    results.omegaverse,
    results.ocean,
  );

  // Icon dynamic rendering map
  const iconComponents = {
    Code,
    Palette,
    Heart,
    Briefcase,
    BookOpen,
    Scale,
  };

  return (
    <div className="min-h-screen pt-16 pb-16 bg-zinc-50/70">
      <section
        className="bg-white border-b"
        style={{
          backgroundImage: "url(/404/404-img.webp)",
          backgroundPosition: "bottom",
          backgroundSize: "cover",
        }}
      >
        <div className="max-w-4xl mx-auto h-full min-h-[65vh] py-8 px-4 sm:px-6 flex flex-col">
          <div className="flex justify-between items-center">
            <Link href="/personality-test">
              <button className="px-4 py-2 bg-white/30 hover:bg-white/20 text-white border border-white/20 text-sm font-semibold rounded-full transition-all cursor-pointer flex items-center gap-2 w-fit">
                <ArrowLeft size={16} />
                Back to Assessments Catalog
              </button>
            </Link>
          </div>

          <div className="flex-1 flex items-center">
            <div className="flex items-start gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Multi-Framework Alignment
                </h1>
                <p className="text-lg text-white/70 leading-relaxed">
                  Synthesize your MBTI, Omegaverse, and OCEAN results. Identify
                  cross-assessment career paths and map your unified character
                  profile.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-8">
        {/* Assessments Progress Journey Card */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/80 shadow-xs mb-8">
          <div className="flex items-center justify-between border-b border-zinc-100 pb-4 mb-6">
            <h2 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
              <Activity size={18} className="text-blue-500" />
              Assessment Journey Status
            </h2>
            <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-600">
              {completedCount} / 3 COMPLETED
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {/* MBTI status */}
            <div className="border border-zinc-100 rounded-2xl p-4 flex flex-col justify-between hover:border-zinc-200 transition-all bg-zinc-50">
              <div className="flex items-start justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Brain size={18} />
                </div>
                {hasMbti ? (
                  <span className="text-xs font-black tracking-widest text-emerald-600 uppercase bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100/40">
                    Done
                  </span>
                ) : (
                  <span className="text-xs font-black tracking-widest text-amber-600 uppercase bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-100/40">
                    Pending
                  </span>
                )}
              </div>
              <div>
                <h3 className="font-extrabold text-zinc-800 text-base">
                  MBTI Assessment
                </h3>
                <p className="text-sm text-zinc-500 mt-1 mb-4 leading-relaxed">
                  {hasMbti
                    ? `Result: ${results.mbti} (${mbtiDetail?.name})`
                    : "Find your 16 personalities type and ideal working style."}
                </p>
                <Link href="/personality-test/mbti" className="block">
                  <button
                    className={`w-full py-2 px-3 font-bold rounded-lg text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      hasMbti
                        ? "bg-zinc-100 hover:bg-zinc-200 text-zinc-700"
                        : "bg-primary hover:bg-primary/80 text-white"
                    }`}
                  >
                    {hasMbti ? "See Result" : "Start Test"}
                    <ArrowRight size={12} />
                  </button>
                </Link>
              </div>
            </div>

            {/* Omegaverse status */}
            <div className="border border-zinc-100 rounded-2xl p-4 flex flex-col justify-between hover:border-zinc-200 transition-all bg-zinc-50">
              <div className="flex items-start justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Sparkles size={18} />
                </div>
                {hasOmegaverse ? (
                  <span className="text-xs font-black tracking-widest text-emerald-600 uppercase bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100/40">
                    Done
                  </span>
                ) : (
                  <span className="text-xs font-black tracking-widest text-amber-600 uppercase bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-100/40">
                    Pending
                  </span>
                )}
              </div>
              <div>
                <h3 className="font-extrabold text-zinc-800 text-base">
                  Omegaverse
                </h3>
                <p className="text-sm text-zinc-500 mt-1 mb-4 leading-relaxed">
                  {hasOmegaverse
                    ? `Result: ${omegaverseDetail?.name} Archetype`
                    : "Discover your group hierarchy mindset and compatibility."}
                </p>
                <Link href="/personality-test/omegaverse" className="block">
                  <button
                    className={`w-full py-2 px-3 font-bold rounded-lg text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      hasOmegaverse
                        ? "bg-zinc-100 hover:bg-zinc-200 text-zinc-700"
                        : "bg-primary hover:bg-primary/80 text-white"
                    }`}
                  >
                    {hasOmegaverse ? "See Result" : "Start Test"}
                    <ArrowRight size={12} />
                  </button>
                </Link>
              </div>
            </div>

            {/* OCEAN status */}
            <div className="border border-zinc-100 rounded-2xl p-4 flex flex-col justify-between hover:border-zinc-200 transition-all bg-zinc-50">
              <div className="flex items-start justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Compass size={18} />
                </div>
                {hasOcean ? (
                  <span className="text-xs font-black tracking-widest text-emerald-600 uppercase bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100/40">
                    Done
                  </span>
                ) : (
                  <span className="text-xs font-black tracking-widest text-amber-600 uppercase bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-100/40">
                    Pending
                  </span>
                )}
              </div>
              <div>
                <h3 className="font-extrabold text-zinc-800 text-base">
                  OCEAN
                </h3>
                <p className="text-sm text-zinc-500 mt-1 mb-4 leading-relaxed">
                  {hasOcean
                    ? `Result Archetype: ${oceanArchetype?.title}`
                    : "Benchmark your scores across openness, drive, and stability."}
                </p>
                <Link href="/personality-test/ocean" className="block">
                  <button
                    className={`w-full py-2 px-3 font-bold rounded-lg text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      hasOcean
                        ? "bg-zinc-100 hover:bg-zinc-200 text-zinc-700"
                        : "bg-primary hover:bg-primary/80 text-white"
                    }`}
                  >
                    {hasOcean ? "See Result" : "Start Test"}
                    <ArrowRight size={12} />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Main Visual Content */}
        {!isUnlocked ? (
          /* Locked State Banner */
          <div className="bg-white rounded-3xl p-8 border border-zinc-200/80 shadow-xs text-center flex flex-col items-center justify-center min-h-[340px]">
            <div className="w-14 h-14 rounded-full bg-zinc-100 flex items-center justify-center mb-4 border border-zinc-200/60 text-zinc-400">
              <Lock size={26} />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 mb-2">
              Cross-Framework Synthesis Locked
            </h3>
            <p className="text-sm text-zinc-500 max-w-md leading-relaxed mb-6">
              To unlock your synthesized nature advice, core career category
              overlaps, and cross-test trait comparative grid, you must complete{" "}
              <span className="font-semibold text-zinc-900">
                at least 2 out of the 3 available assessments.
              </span>
            </p>
            <div className="flex gap-4">
              <Link href="/personality-test">
                <button className="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl text-sm transition-all cursor-pointer inline-flex items-center gap-1.5 shadow-xs">
                  Browse Assessments
                  <ArrowRight size={16} />
                </button>
              </Link>
            </div>
          </div>
        ) : (
          /* Unlocked Dashboard Content */
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* 1. Synthesized Nature Profile Card */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/80 shadow-xs relative overflow-hidden">
              <div className="flex items-center gap-3 mb-4 relative z-10">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center border border-blue-100">
                  <Star size={20} className="fill-blue-100 text-blue-600" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">
                    Unified Nature Synthesis
                  </span>
                  <h2 className="text-2xl font-black text-zinc-900 mt-0.5">
                    {synthesis.title}
                  </h2>
                </div>
              </div>

              {/* Traits Tags */}
              <div className="flex flex-wrap gap-2 mb-4 relative z-10">
                {synthesis.commonTraits.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-extrabold px-3 py-1 bg-zinc-100 rounded-full text-zinc-700 uppercase tracking-wider"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <p className="text-zinc-600 leading-relaxed mb-6 relative z-10">
                {synthesis.description}
              </p>

              {/* Actionable Advice Box */}
              <div className="bg-blue-50/50 rounded-2xl p-5 border border-blue-100/50 relative z-10">
                <h4 className="text-xs font-black uppercase text-blue-700 tracking-wider mb-1">
                  Synthesized Career Growth Advice
                </h4>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  {synthesis.advice}
                </p>
              </div>
            </section>

            {/* 2. Golden Career Paths Section */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/80 shadow-xs">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-zinc-100">
                <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center border border-amber-100">
                  <Shield size={20} className="fill-amber-50 text-amber-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-zinc-950">
                    Golden Career Paths
                  </h2>
                  <p className="text-xs font-semibold text-zinc-400 mt-0.5">
                    Job sectors validated across multiple personality frameworks
                  </p>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {sortedCategories.map((catKey) => {
                  const info = coreCareerMetadata[catKey];
                  const Icon = iconComponents[info.iconName] || Briefcase;
                  const sources = categorySourceTests[catKey];
                  const count = categoryCounts[catKey];

                  // We skip rendering categories that have zero matches across the taken tests
                  if (sources.length === 0) return null;

                  const isGolden = sources.length >= 2;

                  return (
                    <div
                      key={catKey}
                      className={`rounded-2xl p-5 border transition-all ${
                        isGolden
                          ? "bg-amber-50/15 border-amber-200/60 shadow-xs hover:border-amber-300"
                          : "bg-white border-zinc-100 hover:border-zinc-200"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                            isGolden
                              ? "bg-amber-50 text-amber-600 border-amber-100"
                              : "bg-zinc-50 text-zinc-500 border-zinc-200/60"
                          }`}
                        >
                          <Icon size={20} />
                        </div>
                        {isGolden ? (
                          <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 flex items-center gap-1 border border-amber-200/30">
                            ★ Golden Match ({sources.length}/3)
                          </span>
                        ) : (
                          <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-500 border border-zinc-200/35">
                            Aligned (1 test)
                          </span>
                        )}
                      </div>

                      <h3 className="font-extrabold text-zinc-900 text-lg md:text-xl mb-1.5">
                        {info.title}
                      </h3>
                      <p className="text-sm text-zinc-500 leading-relaxed mb-4">
                        {info.description}
                      </p>

                      {info.jobExamples && info.jobExamples.length > 0 && (
                        <div className="mb-5">
                          <p className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-zinc-400 mb-2">
                            Common Roles:
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {info.jobExamples.map((job) => (
                              <span
                                key={job}
                                className={`text-xs font-bold px-3 py-1 rounded-full bg-primary/5 ${isGolden ? "text-primary" : "text-primary/70"} border border-zinc-200/60`}
                              >
                                {job}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="border-t border-zinc-100/80 pt-3 flex items-center justify-between">
                        <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-zinc-400">
                          Recommended By:
                        </span>
                        <div className="flex gap-1.5">
                          {sources.map((s) => (
                            <span
                              key={s}
                              className="text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-600 border border-zinc-200/50 uppercase"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* 3. Detailed Side-by-Side Traits Comparison Matrix */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/80 shadow-xs overflow-hidden">
              <div className="mb-6 pb-4 border-b border-zinc-100">
                <h2 className="text-xl font-bold text-zinc-950">
                  Cross-Framework Comparison
                </h2>
                <p className="text-xs font-semibold text-zinc-400 mt-0.5">
                  Understand your behaviors placed under different psychological
                  structures
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[1000px] text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-zinc-200 text-zinc-800 uppercase text-sm font-black tracking-wider">
                      <th className="py-3 px-4 w-1/4">Assessment Axis</th>
                      {hasMbti && (
                        <th className="py-3 px-4 w-1/4">
                          MBTI ({results.mbti})
                        </th>
                      )}
                      {hasOmegaverse && (
                        <th className="py-3 px-4 w-1/4">
                          Omegaverse ({results.omegaverse})
                        </th>
                      )}
                      {hasOcean && <th className="py-3 px-4 w-1/4">OCEAN</th>}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-zinc-100 hover:bg-zinc-50/40 transition-all">
                      <td className="py-4 px-4 font-bold text-zinc-800">
                        Primary Nature
                      </td>
                      {hasMbti && (
                        <td className="py-4 px-4 text-zinc-600">
                          {mbtiDetail?.name} ({mbtiDetail?.tagline})
                        </td>
                      )}
                      {hasOmegaverse && (
                        <td className="py-4 px-4 text-zinc-600">
                          {omegaverseDetail?.name} ({omegaverseDetail?.tagline})
                        </td>
                      )}
                      {hasOcean && (
                        <td className="py-4 px-4 text-zinc-600">
                          {oceanArchetype?.title} ({oceanArchetype?.subtitle})
                        </td>
                      )}
                    </tr>

                    <tr className="border-b border-zinc-100 hover:bg-zinc-50/40 transition-all">
                      <td className="py-4 px-4 font-bold text-zinc-800">
                        Work Style
                      </td>
                      {hasMbti && (
                        <td className="py-4 px-4 text-zinc-600 line-clamp-3">
                          {mbtiDetail?.workStyle}
                        </td>
                      )}
                      {hasOmegaverse && (
                        <td className="py-4 px-4 text-zinc-600">
                          {omegaverseDetail?.workStyle}
                        </td>
                      )}
                      {hasOcean && (
                        <td className="py-4 px-4 text-zinc-600">
                          Based on scores, matches a{" "}
                          {(results.ocean?.C ?? 50) > 55
                            ? "highly structured, plan-driven"
                            : "spontaneous, flexible"}{" "}
                          working method.
                        </td>
                      )}
                    </tr>

                    <tr className="border-b border-zinc-100 hover:bg-zinc-50/40 transition-all">
                      <td className="py-4 px-4 font-bold text-zinc-800">
                        Social & Communication
                      </td>
                      {hasMbti && (
                        <td className="py-4 px-4 text-zinc-600">
                          Prefers{" "}
                          {results.mbti?.startsWith("I")
                            ? "reflective, close-knit, deep conversation"
                            : "active, group networking and collaboration"}
                          .
                        </td>
                      )}
                      {hasOmegaverse && (
                        <td className="py-4 px-4 text-zinc-600">
                          Compatibility: Best match with{" "}
                          <span className="font-semibold text-black">
                            {omegaverseDetail?.compatibility.bestMatch}
                          </span>
                          .
                        </td>
                      )}
                      {hasOcean && (
                        <td className="py-4 px-4 text-zinc-600">
                          Extraversion score is{" "}
                          <span className="font-semibold text-black">
                            {results.ocean?.E ?? 50}%
                          </span>{" "}
                          and Agreeableness is{" "}
                          <span className="font-semibold text-black">
                            {results.ocean?.A ?? 50}%
                          </span>
                          .
                        </td>
                      )}
                    </tr>

                    <tr className="border-b border-zinc-100 hover:bg-zinc-50/40 transition-all">
                      <td className="py-4 px-4 font-bold text-zinc-800">
                        Core Strengths
                      </td>
                      {hasMbti && (
                        <td className="py-4 px-4 text-zinc-600">
                          <ul className="list-disc list-inside space-y-1">
                            {mbtiDetail?.strengths.slice(0, 2).map((s, idx) => (
                              <li key={idx}>{s}</li>
                            ))}
                          </ul>
                        </td>
                      )}
                      {hasOmegaverse && (
                        <td className="py-4 px-4 text-zinc-600">
                          <ul className="list-disc list-inside space-y-1">
                            {omegaverseDetail?.strengths
                              .slice(0, 2)
                              .map((s, idx) => (
                                <li key={idx}>{s}</li>
                              ))}
                          </ul>
                        </td>
                      )}
                      {hasOcean && (
                        <td className="py-4 px-4 text-zinc-600">
                          High scores on traits reflect:{" "}
                          {Object.entries(results.ocean || {})
                            .filter(([_, v]) => v > 60)
                            .map(([k]) => k)
                            .join(", ") || "Balanced profile"}{" "}
                          strengths.
                        </td>
                      )}
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
