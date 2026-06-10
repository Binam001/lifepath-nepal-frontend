"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Lock, Unlock, CheckCircle } from "lucide-react";
import { personalityTypes } from "@/data/MBTI-data";
import { omegaverseTypes } from "@/data/omegaverse-data";

interface TestDef {
  key: "mbti" | "ocean" | "omegaverse";
  name: string;
  url: string;
  colorClass: string;
  btnColor: string;
  desc: string;
}

const testDefinitions: TestDef[] = [
  {
    key: "mbti",
    name: "MBTI Personality Test",
    url: "/personality-test/mbti",
    colorClass: "bg-blue-50 text-blue-600 border-blue-100",
    btnColor: "bg-blue-500 hover:bg-blue-600 shadow-blue-500/10",
    desc: "Explore your cognitive processes and strategic strengths.",
  },
  {
    key: "ocean",
    name: "Big Five Traits (OCEAN)",
    url: "/personality-test/ocean",
    colorClass: "bg-purple-50 text-purple-600 border-purple-100",
    btnColor: "bg-purple-600 hover:bg-purple-700 shadow-purple-600/10",
    desc: "Benchmark your scores across openness, conscientiousness, and stability.",
  },
  {
    key: "omegaverse",
    name: "Omegaverse Classification",
    url: "/personality-test/omegaverse",
    colorClass: "bg-amber-50 text-amber-600 border-amber-100",
    btnColor: "bg-amber-500 hover:bg-amber-600 shadow-amber-500/10",
    desc: "Discover your instinctual mindset, compatibility, and social role.",
  },
];

export default function ComparisonCTA() {
  const [isMounted, setIsMounted] = useState(false);
  const [status, setStatus] = useState({
    hasMbti: false,
    hasOcean: false,
    hasOmegaverse: false,
  });

  useEffect(() => {
    setIsMounted(true);
    const mbti = localStorage.getItem("mbti_saved_result");
    const ocean = localStorage.getItem("ocean_saved_result");
    const omegaverse = localStorage.getItem("omegaverse_saved_result");

    setStatus({
      hasMbti: !!mbti && !!personalityTypes[mbti],
      hasOcean: !!ocean,
      hasOmegaverse:
        !!omegaverse && !!omegaverseTypes[omegaverse.toUpperCase()],
    });
  }, []);

  if (!isMounted) return null;

  const { hasMbti, hasOcean, hasOmegaverse } = status;
  const completedCount = [hasMbti, hasOcean, hasOmegaverse].filter(
    Boolean,
  ).length;
  const allCompleted = completedCount === 3;

  const untested = testDefinitions.filter((t) => {
    if (t.key === "mbti") return !hasMbti;
    if (t.key === "ocean") return !hasOcean;
    if (t.key === "omegaverse") return !hasOmegaverse;
    return false;
  });

  return (
    <div className="bg-linear-to-r from-blue-500/5 via-indigo-500/5 to-purple-500/5 border border-zinc-200/80 rounded-3xl p-6 sm:p-8 mb-6 shadow-xs relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

      {allCompleted ? (
        /* Case A: All tests completed (3/3) */
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
              <Unlock size={24} className="animate-bounce" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-950 mb-1 flex items-center gap-2">
                Triple Alignment Dashboard Unlocked
                <span className="text-xs font-black tracking-widest text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                  Ready
                </span>
              </h3>
              <p className="text-base text-zinc-500 max-w-xl leading-relaxed">
                Awesome! You have completed all 3 personality assessments. View
                your cross-framework alignment dashboard to identify overlapping
                Golden Careers.
              </p>
            </div>
          </div>
          <Link
            href="/personality-test/comparison"
            className="shrink-0 w-full md:w-auto"
          >
            <button className="w-full md:w-auto py-3.5 px-6 font-bold rounded-full bg-zinc-950 hover:bg-zinc-800 text-white text-base transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-xs hover:scale-[1.02] active:scale-[0.98]">
              View Alignment Dashboard
              <Sparkles size={16} />
            </button>
          </Link>
        </div>
      ) : (
        /* Case B: Untested tests remaining */
        <div className="relative z-10">
          <div className="flex items-start gap-4 mb-6">
            <div className="hidden md:flex size-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shrink-0 border border-blue-100">
              <Lock size={22} />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-950 mb-1">
                Synthesize Your Framework Alignments
              </h3>
              <p className="text-base text-zinc-500 max-w-xl leading-relaxed">
                You have completed {completedCount} / 3 assessments. Complete
                the remaining tests below to unlock your synthesized nature
                profile and cross-test career overlaps!
              </p>
            </div>
          </div>

          {/* List of Untested Tests */}
          <div
            className={`grid gap-4 grid-cols-1 w-full ${
              untested.length + (completedCount >= 2 ? 1 : 0) === 2
                ? "sm:grid-cols-2"
                : "sm:grid-cols-2 md:grid-cols-3"
            }`}
          >
            {untested.map((test) => (
              <div
                key={test.key}
                className="bg-white rounded-2xl p-5 border border-zinc-100 hover:border-zinc-200 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-zinc-400">
                    Untested Assessment
                  </span>
                  <h4 className="font-extrabold text-zinc-950 text-base mt-0.5">
                    {test.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-500 mt-1 mb-4 leading-relaxed">
                    {test.desc}
                  </p>
                </div>
                <Link href={test.url} className="block mt-auto">
                  <button
                    className={`w-full py-2.5 px-4 text-xs sm:text-sm font-bold text-white rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs hover:scale-[1.02] ${test.btnColor}`}
                  >
                    Start Test
                    <ArrowRight size={14} />
                  </button>
                </Link>
              </div>
            ))}

            {/* Link to partially unlocked comparison dashboard (requires at least 2 completed) */}
            {completedCount >= 2 && (
              <div className="bg-white border border-zinc-200 rounded-2xl p-5 flex flex-col justify-center items-center text-center">
                <span className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100/50 flex items-center justify-center mb-1 shadow-xs">
                  <CheckCircle size={16} />
                </span>
                <span className="text-base font-extrabold text-zinc-800">
                  Dashboard Unlocked (2/3)
                </span>
                <p className="text-xs sm:text-sm text-zinc-400 mt-0.5 mb-3">
                  Partial synthesis view is available.
                </p>
                <Link
                  href="/personality-test/comparison"
                  className="block w-full"
                >
                  <button className="w-full py-2.5 px-3 bg-zinc-900 hover:bg-zinc-800 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-1 cursor-pointer transition-all">
                    View Partial Dashboard
                    <Sparkles size={12} />
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
