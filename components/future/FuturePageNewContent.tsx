"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Info,
  Zap,
  Globe,
  Laptop,
  Heart,
  GraduationCap,
  Building2,
  Truck,
  Scale,
  Film,
  Factory,
  FlaskConical,
  Megaphone,
  ShieldCheck,
  Briefcase,
  ArrowRight,
  Star,
  Wifi,
  type LucideIcon,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import {
  sectorOptions,
  sectorPerformance,
  sectorRoleReasons,
  coreSkills,
  type FutureSectorKey,
  type FutureStat,
} from "@/constants/future-infographics";
import { SectorVisuals } from "./infographic/SectorVisuals";
import Link from "next/link";

// ─── Icon map ─────────────────────────────────────────────────────────────────

const SECTOR_ICONS: Record<string, LucideIcon> = {
  all: Globe,
  "banking-finance": Building2,
  technology: Laptop,
  education: GraduationCap,
  health: Heart,
  "tourism-hospitality": Globe,
  "sales-marketing": Megaphone,
  "engineering-construction": Building2,
  "transport-logistics": Truck,
  "manufacturing-production": Factory,
  "energy-hydropower": Zap,
  "legal-law": Scale,
  "media-entertainment": Film,
  "business-entrepreneurship": Briefcase,
  "freelancing-remote": Wifi,
  "research-development": FlaskConical,
  "security-services": ShieldCheck,
};

// ─── Static content ───────────────────────────────────────────────────────────

const LEVERAGE_POINTS: Array<{
  icon: LucideIcon;
  title: string;
  desc: string;
  color: string;
}> = [
  {
    icon: Wifi,
    title: "Internet = Global stage",
    desc: "With a laptop and internet, you can work for clients anywhere in the world — right from Nepal.",
    color: "blue",
  },
  {
    icon: GraduationCap,
    title: "English = Income multiplier",
    desc: "Strong English opens remote jobs that pay 3–5x more than most local positions.",
    color: "amber",
  },
  {
    icon: Star,
    title: "Portfolio = Fast track",
    desc: "Showing real work (projects, designs, code) gets you hired faster than waiting years for a degree.",
    color: "emerald",
  },
  {
    icon: Zap,
    title: "AI skills = Unfair edge",
    desc: "Knowing how to use AI tools for real work is a skill most people still don't have.",
    color: "violet",
  },
];

const PATH_CARDS = [
  {
    emoji: "📚",
    who: "Still in school?",
    action: "Don't wait for graduation - Start now",
    steps: [
      "Learn a skill",
      "Build a small project and share it publicly",
      "Find your personality & strengths first",
    ],
  },
  {
    emoji: "🔍",
    who: "Job hunting?",
    action: "Focus your energy on the fastest-growing sectors.",
    steps: [
      "Pick one sector from the explorer above",
      "Learn the top 2 skills listed for that sector",
      "Create proof of work — a portfolio or project",
    ],
  },
  {
    emoji: "⇄",
    who: "Want to switch careers?",
    action: "Your existing skills transfer more than you think.",
    steps: [
      "Map your current skills to growing roles above",
      "Add one new digital skill to your stack",
      "Start freelancing on the side to build proof",
    ],
  },
];

// ─── Heat scoring ─────────────────────────────────────────────────────────────

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function extractPercentSignals(stats: FutureStat[]) {
  return stats.flatMap((stat) => {
    const rawValue = String(stat.value);
    if (!rawValue.includes("%")) return [];

    const matches = rawValue.match(/-?\d+(?:\.\d+)?/g);
    return matches ? matches.map(Number) : [];
  });
}

function getSectorMomentum(key: FutureSectorKey) {
  if (key === "all") {
    return {
      demandScore: 74,
      declineScore: 28,
      momentumScore: 46,
      growthRatio: 0.63,
    };
  }

  const sector = sectorPerformance[key];
  const increasingCount = sector.increasing.length;
  const decliningCount = sector.declining.length;
  const totalRoles = increasingCount + decliningCount;
  const growthRatio = totalRoles > 0 ? increasingCount / totalRoles : 0.5;

  const percentSignals = extractPercentSignals(sector.stats);
  const averagePercent =
    percentSignals.length > 0
      ? percentSignals.reduce((sum, value) => sum + value, 0) /
        percentSignals.length
      : 0;
  const strongestPercent =
    percentSignals.length > 0 ? Math.max(...percentSignals) : 0;

  const evidenceBoost = Math.min(
    20,
    averagePercent * 1.1 +
      Math.max(0, strongestPercent - averagePercent) * 0.35,
  );
  const breadthBoost = increasingCount * 4 - decliningCount * 3;
  const skillBoost = Math.min(8, sector.skills.length);

  const demandScore = Math.round(
    clamp(40 + evidenceBoost + breadthBoost + skillBoost, 18, 95),
  );
  const declineScore = Math.round(
    clamp(
      52 + decliningCount * 7 - increasingCount * 4 - evidenceBoost * 0.8,
      10,
      88,
    ),
  );

  return {
    demandScore,
    declineScore,
    momentumScore: demandScore - declineScore,
    growthRatio,
  };
}

function getSectorHeat(
  key: FutureSectorKey,
): "hot" | "growing" | "stable" | "shifting" {
  const { momentumScore, growthRatio } = getSectorMomentum(key);

  if (momentumScore >= 38 || growthRatio >= 0.72) return "hot";
  if (momentumScore >= 22 || growthRatio >= 0.6) return "growing";
  if (momentumScore >= 8 || growthRatio >= 0.45) return "stable";
  return "shifting";
}

const HEAT_CONFIG = {
  hot: {
    label: "Hot",
    emoji: "🔥",
    short: "Fast momentum",
    description: "Strong upside with lots of rising roles.",
    badge: "text-emerald-700 bg-emerald-50 border-emerald-200",
    activeBadge: "text-white bg-white/20 border-white/30",
    dot: "bg-emerald-500",
  },
  growing: {
    label: "Growing",
    emoji: "📈",
    short: "Healthy demand",
    description: "More roles are rising than cooling.",
    badge: "text-blue-700 bg-blue-50 border-blue-200",
    activeBadge: "text-white bg-white/20 border-white/30",
    dot: "bg-blue-500",
  },
  stable: {
    label: "Stable",
    emoji: "📊",
    short: "Steady outlook",
    description: "Reliable sector with slower, steadier movement.",
    badge: "text-amber-700 bg-amber-50 border-amber-200",
    activeBadge: "text-white bg-white/20 border-white/30",
    dot: "bg-amber-500",
  },
  shifting: {
    label: "Shifting",
    emoji: "⚠️",
    short: "Mixed signals",
    description: "Opportunity exists, but the market is changing shape.",
    badge: "text-rose-700 bg-rose-50 border-rose-200",
    activeBadge: "text-white bg-white/20 border-white/30",
    dot: "bg-rose-500",
  },
};

// ─── Section label ────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-[13.5px] font-bold uppercase tracking-widest text-blue-600">
      {children}
    </p>
  );
}

// ─── Nepal shift section ──────────────────────────────────────────────────────

// function ShiftSection() {
//   return (
//     <section className="py-20 bg-zinc-50">
//       <div className="max-w-7xl mx-auto px-4">
//         {/* <div className="text-center mb-12">
//           <SectionLabel>The Big Picture</SectionLabel>
//           <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-900">
//             Nepal&apos;s economy is shifting
//           </h2>
//           <p className="text-zinc-500 mt-3 max-w-xl mx-auto text-base leading-relaxed">
//             Three big changes are reshaping what jobs exist, what they pay, and
//             who gets hired.
//           </p>
//         </div> */}

//         <div className="grid md:grid-cols-3 gap-6">
//           {SHIFT_STORIES.map((shift, i) => (
//             <motion.div
//               key={shift.before}
//               initial={{ opacity: 0, y: 24 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: i * 0.15, duration: 0.5 }}
//               className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm hover:shadow-md transition-shadow"
//             >
//               <div className="text-4xl mb-5">{shift.emoji}</div>

//               <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 mb-3">
//                 <span className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase block mb-1">
//                   Before
//                 </span>
//                 <span className="font-bold text-zinc-700 text-base">
//                   {shift.before}
//                 </span>
//                 <p className="text-zinc-500 text-xs mt-1.5 leading-relaxed">
//                   {shift.beforeNote}
//                 </p>
//               </div>

//               <div className="flex justify-center my-2">
//                 <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
//                   <ArrowRight className="w-4 h-4 text-blue-600" />
//                 </div>
//               </div>

//               <div
//                 className={`border rounded-xl p-4 ${
//                   shift.color === "blue"
//                     ? "bg-blue-50 border-blue-200"
//                     : shift.color === "emerald"
//                       ? "bg-emerald-50 border-emerald-200"
//                       : "bg-violet-50 border-violet-200"
//                 }`}
//               >
//                 <span
//                   className={`text-[10px] font-bold tracking-widest uppercase block mb-1 ${
//                     shift.color === "blue"
//                       ? "text-blue-500"
//                       : shift.color === "emerald"
//                         ? "text-emerald-500"
//                         : "text-violet-500"
//                   }`}
//                 >
//                   Now
//                 </span>
//                 <span
//                   className={`font-bold text-base ${
//                     shift.color === "blue"
//                       ? "text-blue-800"
//                       : shift.color === "emerald"
//                         ? "text-emerald-800"
//                         : "text-violet-800"
//                   }`}
//                 >
//                   {shift.after}
//                 </span>
//                 <p
//                   className={`text-xs mt-1.5 leading-relaxed ${
//                     shift.color === "blue"
//                       ? "text-blue-600"
//                       : shift.color === "emerald"
//                         ? "text-emerald-600"
//                         : "text-violet-600"
//                   }`}
//                 >
//                   {shift.afterNote}
//                 </p>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// ─── Sector card ──────────────────────────────────────────────────────────────

interface SectorCardProps {
  sectorKey: string;
  label: string;
  active: boolean;
  onClick: () => void;
}

function SectorCard({ sectorKey, label, active, onClick }: SectorCardProps) {
  const IconComponent: LucideIcon = SECTOR_ICONS[sectorKey] ?? Briefcase;
  const heat =
    sectorKey === "all"
      ? "growing"
      : getSectorHeat(sectorKey as FutureSectorKey);
  const heatCfg = HEAT_CONFIG[heat];

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`relative text-left w-full rounded-2xl border-2 p-4 transition-all duration-200 cursor-pointer ${
        active
          ? "border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-200"
          : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 hover:shadow-sm"
      }`}
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <div
          className={`w-9 h-9 rounded-xl flex items-center justify-center ${
            active ? "bg-white/20" : "bg-zinc-100"
          }`}
        >
          <IconComponent
            className={`w-5 h-5 ${active ? "text-white" : "text-zinc-600"}`}
          />
        </div>
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold ${
            active ? heatCfg.activeBadge : heatCfg.badge
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full ${active ? "bg-white" : heatCfg.dot}`}
          />
          <span>{heatCfg.label}</span>
        </span>
      </div>
      <p
        className={`text-sm font-semibold leading-snug mb-2.5 ${
          active ? "text-white" : "text-zinc-800"
        }`}
      >
        {label}
      </p>
    </motion.button>
  );
}

// ─── Job card ─────────────────────────────────────────────────────────────────

interface JobCardProps {
  title: string;
  index: number;
  tone: "up" | "down";
  reason: string;
}

function JobCard({ title, index, tone, reason }: JobCardProps) {
  const isUp = tone === "up";
  const barWidth = Math.max(38, 98 - index * 13);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: isUp ? -12 : 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      className={`rounded-xl border p-4 ${
        isUp ? "bg-emerald-50 border-emerald-100" : "bg-rose-50 border-rose-100"
      }`}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-start gap-3 text-left cursor-pointer"
        aria-expanded={isOpen}
      >
        <div
          className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
            isUp ? "bg-emerald-100" : "bg-rose-100"
          }`}
        >
          {isUp ? (
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          ) : (
            <TrendingDown className="w-4 h-4 text-rose-500" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <p
              className={`text-sm font-semibold leading-tight ${
                isUp ? "text-emerald-900" : "text-rose-900"
              }`}
            >
              {title}
            </p>
            <div className="ml-2 flex shrink-0 items-center gap-2">
              <span
                className={`text-xs font-bold ${
                  isUp ? "text-emerald-600" : "text-rose-500"
                }`}
              >
                {barWidth}%
              </span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  isOpen ? "rotate-180" : ""
                } ${isUp ? "text-emerald-600" : "text-rose-500"}`}
              />
            </div>
          </div>
          <div
            className={`h-1.5 rounded-full ${
              isUp ? "bg-emerald-200" : "bg-rose-200"
            }`}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${barWidth}%` }}
              transition={{
                delay: 0.25 + index * 0.07,
                duration: 0.7,
                ease: "easeOut",
              }}
              className={`h-1.5 rounded-full ${
                isUp ? "bg-emerald-500" : "bg-rose-400"
              }`}
            />
          </div>
        </div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div
              className={`mt-3 rounded-xl border px-4 py-3 text-sm leading-relaxed ${
                isUp
                  ? "border-emerald-200 bg-white/70 text-emerald-950"
                  : "border-rose-200 bg-white/70 text-rose-950"
              }`}
            >
              {reason}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Sector deep dive ─────────────────────────────────────────────────────────

interface SectorDeepDiveProps {
  activeSector: FutureSectorKey;
}

function SectorDeepDive({ activeSector }: SectorDeepDiveProps) {
  const sector = sectorPerformance[activeSector];
  const isAll = activeSector === "all";
  const [visibleGrowingJobCount, setVisibleGrowingJobCount] = useState(4);
  const [visibleDecliningJobCount, setVisibleDecliningJobCount] = useState(4);
  const [isAwarenessInfoOpen, setIsAwarenessInfoOpen] = useState(false);

  // Props for SectorVisuals
  const currentSkills = isAll
    ? coreSkills.map((s) => ({ label: s.label, score: s.value, note: s.note }))
    : sector.skills.map((skill, i) => ({
        label: skill.replace(/\s*\([^)]*\)/g, "").trim(),
        score: Math.max(58, 84 - i * 8),
        note: "sector-relevant leverage skill",
      }));

  const sectorComparison = useMemo(
    () =>
      sectorOptions
        .filter((sectorOption) => sectorOption.key !== "all")
        .map((sectorOption) => {
          const metrics = getSectorMomentum(sectorOption.key);

          return {
            key: sectorOption.key,
            label: sectorOption.label,
            demandScore: metrics.demandScore,
            declineScore: metrics.declineScore,
          };
        }),
    [],
  );

  const sectorDemandDistribution = sectorComparison
    .slice()
    .sort((a, b) => b.demandScore - a.demandScore)
    .slice(0, 5)
    .map((s) => ({ id: s.key, value: s.demandScore, label: s.label }));
  const visibleGrowingJobs = sector.increasing.slice(0, visibleGrowingJobCount);
  const visibleDecliningJobs = sector.declining.slice(
    0,
    visibleDecliningJobCount,
  );
  const canViewMoreGrowing = visibleGrowingJobCount < sector.increasing.length;
  const canViewMoreDeclining =
    visibleDecliningJobCount < sector.declining.length;
  const roleReasons = sectorRoleReasons[activeSector];

  const getRoleReason = (jobTitle: string, tone: "up" | "down") => {
    const reason =
      tone === "up"
        ? roleReasons?.increasing[jobTitle]
        : roleReasons?.declining[jobTitle];

    if (reason) return reason;

    return tone === "up"
      ? `${jobTitle} is gaining momentum because ${sector.summary.toLowerCase()}`
      : `${jobTitle} is under pressure because ${sector.summary.toLowerCase()}`;
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeSector}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.38 }}
      >
        {/* Summary banner */}
        <div className="bg-linear-to-r from-blue-600 to-blue-700 rounded-2xl p-6 mb-8 text-white">
          <div className="flex flex-col lg:flex-row lg:items-start lg:gap-8">
            <div className="flex-1 mb-5 lg:mb-0">
              <p className="mb-2 text-[11.5px] font-bold uppercase tracking-widest text-blue-200">
                {isAll ? "All Sectors Overview" : sector.title}
              </p>
              <p className="text-white text-base leading-relaxed">
                {sector.summary}
              </p>
            </div>
            {sector.stats.length > 0 && (
              <div className="grid grid-cols-2 gap-3 lg:min-w-70">
                {sector.stats.slice(0, 4).map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-white/10 backdrop-blur rounded-xl p-3"
                  >
                    <p className="text-white font-extrabold text-lg leading-tight">
                      {stat.value}
                    </p>
                    <p className="text-blue-200 text-xs mt-0.5 leading-tight">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Growing vs declining job cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Growing */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="font-bold text-zinc-900 text-sm">Growing jobs</p>
                <p className="text-zinc-400 text-xs">
                  High demand · More opportunities
                </p>
              </div>
            </div>
            <div className="space-y-2">
              {visibleGrowingJobs.map((job, i) => (
                <JobCard
                  key={job}
                  title={job}
                  index={i}
                  tone="up"
                  reason={getRoleReason(job, "up")}
                />
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

          {/* Declining */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-rose-100 flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-rose-500" />
              </div>
              <div className="relative flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-bold text-zinc-900 text-sm">
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
                <p className="text-zinc-400 text-xs">
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
                <JobCard
                  key={job}
                  title={job}
                  index={i}
                  tone="down"
                  reason={getRoleReason(job, "down")}
                />
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

        {/* Skills bar chart */}
        {/* <div className="bg-white rounded-2xl border border-zinc-200 p-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center">
              <Target className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="font-bold text-zinc-900 text-sm">
                Skills to develop
              </p>
              <p className="text-zinc-400 text-xs">
                These give you the best leverage in this sector
              </p>
            </div>
          </div>
          <BarChart
            height={Math.max(180, skillsData.length * 46)}
            layout="horizontal"
            yAxis={[
              { scaleType: "band", data: skillsData.map((s) => s.label) },
            ]}
            xAxis={[{ min: 0, max: 100 }]}
            series={[
              {
                data: skillsData.map((s) => s.score),
                color: chartPalette[0],
              },
            ]}
            grid={{ vertical: true }}
            sx={chartSx()}
          />
        </div> */}

        {/* Deep charts — SectorVisuals handles per-sector LineChart, PieChart, Gauge, Scatter, Evidence */}
        <div className="bg-white rounded-2xl border border-zinc-200 p-6">
          <p className="mb-5 text-[12.5px] font-bold uppercase tracking-widest text-blue-600">
            In-depth analysis
          </p>
          <SectorVisuals
            activeSector={activeSector}
            demandItems={sector.increasing}
            declineItems={sector.declining}
            currentSkills={currentSkills}
            sectorComparison={sectorComparison}
            sectorDemandDistribution={sectorDemandDistribution}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Leverage section ─────────────────────────────────────────────────────────

function LeverageSection() {
  const colorMap: Record<string, string> = {
    blue: "bg-blue-100 text-blue-600 border-blue-200",
    amber: "bg-amber-100 text-amber-600 border-amber-200",
    emerald: "bg-emerald-100 text-emerald-600 border-emerald-200",
    violet: "bg-violet-100 text-violet-600 border-violet-200",
  };

  return (
    <section className="py-20 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <SectionLabel>Your Advantages</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-900">
            Four things that change everything
          </h2>
          <p className="text-zinc-500 mt-3 max-w-xl mx-auto text-base leading-relaxed">
            If you have these, your location and background matter less than you
            think.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {LEVERAGE_POINTS.map((point, i) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-white rounded-2xl border border-zinc-200 p-6 hover:shadow-md transition-shadow"
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 border ${colorMap[point.color]}`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-zinc-900 mb-2">{point.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  {point.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Path / CTA section ───────────────────────────────────────────────────────

function PathSection() {
  return (
    <section className="py-20 bg-linear-to-br from-slate-900 to-blue-950 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="mb-3 text-[13.5px] font-bold uppercase tracking-widest text-blue-400">
            Your Next Step
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            Where are you right now?
          </h2>
          <p className="text-slate-400 mt-3 max-w-xl mx-auto text-base leading-relaxed">
            Pick the path that fits your situation and take one small step
            today.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {PATH_CARDS.map((path, i) => (
            <motion.div
              key={path.who}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/8 transition-colors"
            >
              <div className="text-4xl mb-4">{path.emoji}</div>
              <h3 className="text-lg font-bold text-white mb-2">{path.who}</h3>
              <p className="text-slate-300 text-sm mb-5 leading-relaxed">
                {path.action}
              </p>
              <div className="space-y-2.5">
                {path.steps.map((step, si) => (
                  <div key={step} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-white/10 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {si + 1}
                    </span>
                    <p className="text-slate-300 text-xs leading-relaxed">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-slate-400 text-sm mb-5">
            Not sure which sector fits you? Find your strengths first.
          </p>
          <Link
            href="/personality-test"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded-full transition-colors text-sm shadow-lg shadow-blue-900/30"
          >
            Take the Personality Test
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function FuturePageNew() {
  const [activeSector, setActiveSector] = useState<FutureSectorKey>("all");
  const [shouldScrollToDive, setShouldScrollToDive] = useState(false);
  const deepDiveRef = useRef<HTMLDivElement | null>(null);

  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const lastScrollY = lastScrollYRef.current;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Memoize so SectorDeepDive doesn't recompute on every render
  const memoSector = useMemo(() => activeSector, [activeSector]);

  useEffect(() => {
    if (!shouldScrollToDive) return;

    const frame = window.requestAnimationFrame(() => {
      deepDiveRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setShouldScrollToDive(false);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [memoSector, shouldScrollToDive]);

  return (
    <div className="min-h-screen">
      {/* <ShiftSection /> */}

      {/* Sector explorer */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <SectionLabel>Sector Explorer</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-900">
              What&apos;s happening in your world?
            </h2>
            <p className="text-zinc-500 mt-3 max-w-xl mx-auto text-base leading-relaxed">
              Tap a sector to see exactly which jobs are growing, which are
              fading, and what skills you should build — backed by real data.
            </p>
          </div>

          <div className="mb-6 lg:hidden">
            <label
              htmlFor="sector-selector-mobile"
              className="mb-2 block text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500"
            >
              Select a sector
            </label>
            <select
              id="sector-selector-mobile"
              value={activeSector}
              onChange={(event) => {
                setActiveSector(event.target.value as FutureSectorKey);
                setShouldScrollToDive(true);
              }}
              className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold text-zinc-800 shadow-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            >
              {sectorOptions.map(({ key, label }) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* Sector grid */}
          <div className="hidden gap-3 mb-8 sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {sectorOptions.map(({ key, label }) => (
              <SectorCard
                key={key}
                sectorKey={key}
                label={label}
                active={activeSector === key}
                onClick={() => {
                  setActiveSector(key);
                  setShouldScrollToDive(true);
                }}
              />
            ))}
          </div>

          {/* Heat legend */}
          <div className="mb-10 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 sm:p-5">
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-blue-600">
                  Heat Guide
                </p>
                <p className="mt-1 text-sm text-zinc-600">
                  Each sector gets a quick market signal based on rising versus
                  cooling roles.
                </p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-500">
                <Info className="h-3.5 w-3.5 text-blue-500" />
                Read the badge before you open a sector
              </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
              {(
                Object.entries(HEAT_CONFIG) as [
                  keyof typeof HEAT_CONFIG,
                  (typeof HEAT_CONFIG)[keyof typeof HEAT_CONFIG],
                ][]
              ).map(([, cfg]) => (
                <div
                  key={cfg.label}
                  className="rounded-xl border border-zinc-200 bg-white p-3"
                >
                  <div className="flex items-center gap-2.5">
                    {/* <span className="text-base leading-none">{cfg.emoji}</span> */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className={`h-2.5 w-2.5 rounded-full ${cfg.dot}`}
                        />
                        <p className="text-sm font-semibold text-zinc-900">
                          {cfg.label}
                        </p>
                      </div>
                      <p className="mt-1 text-xs font-medium text-zinc-500">
                        {cfg.short}
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-zinc-600">
                    {cfg.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`sticky z-20 mb-8 hidden lg:block transition-all duration-300 ${
              isHeaderVisible ? "top-16" : "top-0"
            }`}
          >
            <div className="rounded-2xl border border-zinc-200/80 bg-white/92 px-4 py-3 shadow-[0_12px_40px_rgba(15,23,42,0.08)] backdrop-blur">
              <div className="mb-2 flex items-center justify-between gap-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                  Quick Sector Nav
                </p>
              </div>
              <div className="overflow-x-auto pb-1">
                <div className="inline-flex min-w-full items-center gap-2 xl:min-w-0">
                  {sectorOptions.map(({ key, label }) => {
                    const isActive = activeSector === key;

                    return (
                      <button
                        key={`mini-${key}`}
                        type="button"
                        onClick={() => {
                          setActiveSector(key);
                          setShouldScrollToDive(true);
                        }}
                        className={`shrink-0 rounded-full border px-3.5 py-2 text-xs font-semibold transition-all ${
                          isActive
                            ? "border-blue-600 bg-blue-600 text-white shadow-sm shadow-blue-200"
                            : "border-zinc-200 bg-zinc-50 text-zinc-700 hover:border-zinc-300 hover:bg-white"
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Deep dive panel */}
          <div ref={deepDiveRef}>
            <SectorDeepDive key={memoSector} activeSector={memoSector} />
          </div>
        </div>
      </section>

      <LeverageSection />
      <PathSection />
    </div>
  );
}
