"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronUp, Info, TrendingDown, TrendingUp } from "lucide-react";
import {
  coreSkills,
  sectorPerformance,
  type FutureSectorKey,
} from "@/constants/future-infographics";
import { SectorVisuals } from "@/components/future/infographic/SectorVisuals";
import {
  SECTOR_COMPARISON,
} from "@/components/future/future-page/config";
import { JobCard } from "@/components/future/future-page/JobCard";

interface SectorDeepDiveProps {
  activeSector: FutureSectorKey;
}

export function SectorDeepDive({ activeSector }: SectorDeepDiveProps) {
  const sector = sectorPerformance[activeSector];
  const isAll = activeSector === "all";
  const [visibleGrowingJobCount, setVisibleGrowingJobCount] = useState(4);
  const [visibleDecliningJobCount, setVisibleDecliningJobCount] = useState(4);
  const [isAwarenessInfoOpen, setIsAwarenessInfoOpen] = useState(false);

  const currentSkills = isAll
    ? coreSkills.map((skill) => ({
        label: skill.label,
        score: skill.value,
        note: skill.note,
      }))
    : sector.skills.map((skill, i) => ({
        label: skill.replace(/\s*\([^)]*\)/g, "").trim(),
        score: Math.max(58, 84 - i * 8),
        note: "sector-relevant leverage skill",
      }));

  const sectorDemandDistribution = useMemo(
    () =>
      SECTOR_COMPARISON.slice()
        .sort((a, b) => b.demandScore - a.demandScore)
        .slice(0, 5)
        .map((item) => ({
          id: item.key,
          value: item.demandScore,
          label: item.label,
        })),
    [],
  );

  const visibleGrowingJobs = sector.increasing.slice(0, visibleGrowingJobCount);
  const visibleDecliningJobs = sector.declining.slice(
    0,
    visibleDecliningJobCount,
  );
  const canViewMoreGrowing = visibleGrowingJobCount < sector.increasing.length;
  const canViewMoreDeclining =
    visibleDecliningJobCount < sector.declining.length;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeSector}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.38 }}
      >
        <div className="mb-8 rounded-2xl bg-linear-to-r from-blue-600 to-blue-700 p-6 text-white">
          <div className="flex flex-col lg:flex-row lg:items-start lg:gap-8">
            <div className="mb-5 flex-1 lg:mb-0">
              <p className="mb-2 text-[11.5px] font-bold uppercase tracking-widest text-blue-200">
                {isAll ? "All Sectors Overview" : sector.title}
              </p>
              <p className="text-base leading-relaxed text-white">
                {sector.summary}
              </p>
            </div>
            {sector.stats.length > 0 && (
              <div className="grid grid-cols-2 gap-3 lg:min-w-[280px]">
                {sector.stats.slice(0, 4).map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl bg-white/10 p-3 backdrop-blur"
                  >
                    <p className="text-lg font-extrabold leading-tight text-white">
                      {stat.value}
                    </p>
                    <p className="mt-0.5 text-xs leading-tight text-blue-200">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mb-8 grid gap-6 md:grid-cols-2">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100">
                <TrendingUp className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-zinc-900">Growing jobs</p>
                <p className="text-xs text-zinc-400">
                  High demand · More opportunities
                </p>
              </div>
            </div>
            <div className="space-y-2">
              {visibleGrowingJobs.map((job, i) => (
                <JobCard key={job} title={job} index={i} tone="up" />
              ))}
            </div>
            {sector.increasing.length > 4 && (
              <div className="mt-4 flex flex-wrap items-center gap-3">
                {canViewMoreGrowing && (
                  <button
                    type="button"
                    onClick={() =>
                      setVisibleGrowingJobCount((prev) =>
                        Math.min(prev + 3, sector.increasing.length),
                      )
                    }
                    className="inline-flex cursor-pointer rounded-full border border-emerald-200 bg-emerald-50 px-5 py-2.5 text-sm font-semibold text-emerald-700 transition-colors hover:bg-emerald-100"
                  >
                    View more
                  </button>
                )}
                {visibleGrowingJobCount > 4 && (
                  <button
                    type="button"
                    onClick={() => setVisibleGrowingJobCount(4)}
                    className="inline-flex cursor-pointer rounded-full border border-zinc-200 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-100"
                  >
                    <ChevronUp size={20} />
                  </button>
                )}
              </div>
            )}
          </div>

          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-100">
                <TrendingDown className="h-5 w-5 text-rose-500" />
              </div>
              <div className="relative flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-zinc-900">
                    Declining jobs
                  </p>
                  <div className="group/info relative">
                    <button
                      type="button"
                      onClick={() => setIsAwarenessInfoOpen((prev) => !prev)}
                      className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-amber-200 bg-amber-50 text-amber-700 transition-colors hover:bg-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                      aria-label="Keep in mind"
                      aria-expanded={isAwarenessInfoOpen}
                    >
                      <Info className="h-3 w-3" />
                    </button>
                    <div className="pointer-events-none absolute right-0 top-7 z-20 hidden w-72 rounded-2xl border border-amber-100 bg-amber-50 p-4 text-left shadow-lg md:block md:opacity-0 md:transition-opacity md:group-hover/info:opacity-100 md:group-focus-within/info:opacity-100">
                      <p className="mb-1 text-xs font-bold text-amber-800">
                        Keep in mind
                      </p>
                      <p className="text-xs leading-relaxed text-amber-700">
                        A &quot;declining&quot; job doesn&apos;t disappear
                        overnight. It means competition is rising or growth is
                        slowing. Many skills from these roles transfer directly
                        to growing ones.
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-zinc-400">
                  Declining demand · Higher competition
                </p>
                {isAwarenessInfoOpen && (
                  <div className="mt-3 rounded-2xl border border-amber-100 bg-amber-50 p-4 md:hidden">
                    <p className="mb-1 text-xs font-bold text-amber-800">
                      Keep in mind
                    </p>
                    <p className="text-xs leading-relaxed text-amber-700">
                      A &quot;declining&quot; job doesn&apos;t disappear
                      overnight. It means competition is rising or growth is
                      slowing. Many skills from these roles transfer directly to
                      growing ones.
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-2">
              {visibleDecliningJobs.map((job, i) => (
                <JobCard key={job} title={job} index={i} tone="down" />
              ))}
            </div>
            {sector.declining.length > 4 && (
              <div className="mt-4 flex flex-wrap items-center gap-3">
                {canViewMoreDeclining && (
                  <button
                    type="button"
                    onClick={() =>
                      setVisibleDecliningJobCount((prev) =>
                        Math.min(prev + 3, sector.declining.length),
                      )
                    }
                    className="inline-flex cursor-pointer rounded-full border border-rose-200 bg-rose-50 px-5 py-2.5 text-sm font-semibold text-rose-700 transition-colors hover:bg-rose-100"
                  >
                    View more
                  </button>
                )}
                {visibleDecliningJobCount > 4 && (
                  <button
                    type="button"
                    onClick={() => setVisibleDecliningJobCount(4)}
                    className="inline-flex cursor-pointer rounded-full border border-zinc-200 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-100"
                  >
                    <ChevronUp size={20} />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <p className="mb-5 text-[12.5px] font-bold uppercase tracking-widest text-blue-600">
            In-depth analysis
          </p>
          <SectorVisuals
            activeSector={activeSector}
            demandItems={sector.increasing}
            declineItems={sector.declining}
            currentSkills={currentSkills}
            sectorComparison={SECTOR_COMPARISON}
            sectorDemandDistribution={sectorDemandDistribution}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
