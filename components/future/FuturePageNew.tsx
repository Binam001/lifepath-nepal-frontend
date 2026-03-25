"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
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
  Target,
  Star,
  Wifi,
  type LucideIcon,
} from "lucide-react";
import { BarChart } from "@mui/x-charts";
import {
  sectorOptions,
  sectorPerformance,
  coreSkills,
  type FutureSectorKey,
} from "@/constants/future-infographics";
import { chartSx, chartPalette } from "./infographic/chart-config";
import { SectorVisuals } from "./infographic/SectorVisuals";

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

const SHIFT_STORIES = [
  {
    emoji: "🏛️",
    before: "Government job dreams",
    after: "Skill-based careers",
    beforeNote: "Everyone competed for a handful of government seats",
    afterNote:
      "Private sector, freelancing & remote jobs are multiplying fast",
    color: "blue",
  },
  {
    emoji: "🌾",
    before: "Agriculture economy",
    after: "Digital & service economy",
    beforeNote: "Nepal's economy was heavily agriculture-based",
    afterNote:
      "Services, tech, and remote work are now the real growth engine",
    color: "emerald",
  },
  {
    emoji: "📜",
    before: "Degree = guaranteed job",
    after: "Skills = real opportunities",
    beforeNote: "A certificate was enough to get hired",
    afterNote:
      "Portfolios, real projects, and measurable skills now carry more weight",
    color: "violet",
  },
];

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
    action: "Start building skills now — don't wait for graduation.",
    steps: [
      "Take one online course (coding, design, or marketing)",
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
    emoji: "🔄",
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

function getSectorHeat(
  key: FutureSectorKey
): "hot" | "growing" | "stable" | "shifting" {
  if (key === "all") return "growing";
  const sector = sectorPerformance[key];
  const total = sector.increasing.length + sector.declining.length;
  if (total === 0) return "stable";
  const ratio = sector.increasing.length / total;
  if (ratio >= 0.7) return "hot";
  if (ratio >= 0.55) return "growing";
  if (ratio >= 0.4) return "stable";
  return "shifting";
}

const HEAT_CONFIG = {
  hot: {
    label: "🔥 Hot",
    badge: "text-emerald-700 bg-emerald-50 border-emerald-200",
    activeBadge: "text-white bg-white/20 border-white/30",
  },
  growing: {
    label: "📈 Growing",
    badge: "text-blue-700 bg-blue-50 border-blue-200",
    activeBadge: "text-white bg-white/20 border-white/30",
  },
  stable: {
    label: "📊 Stable",
    badge: "text-amber-700 bg-amber-50 border-amber-200",
    activeBadge: "text-white bg-white/20 border-white/30",
  },
  shifting: {
    label: "⚠️ Shifting",
    badge: "text-rose-700 bg-rose-50 border-rose-200",
    activeBadge: "text-white bg-white/20 border-white/30",
  },
};

// ─── Section label ────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold tracking-widest text-blue-600 uppercase mb-3">
      {children}
    </p>
  );
}

// ─── Nepal shift section ──────────────────────────────────────────────────────

function ShiftSection() {
  return (
    <section className="py-20 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <SectionLabel>The Big Picture</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-900">
            Nepal&apos;s economy is shifting
          </h2>
          <p className="text-zinc-500 mt-3 max-w-xl mx-auto text-base leading-relaxed">
            Three big changes are reshaping what jobs exist, what they pay, and
            who gets hired.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {SHIFT_STORIES.map((shift, i) => (
            <motion.div
              key={shift.before}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-5">{shift.emoji}</div>

              <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 mb-3">
                <span className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase block mb-1">
                  Before
                </span>
                <span className="font-bold text-zinc-700 text-base">
                  {shift.before}
                </span>
                <p className="text-zinc-500 text-xs mt-1.5 leading-relaxed">
                  {shift.beforeNote}
                </p>
              </div>

              <div className="flex justify-center my-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-blue-600" />
                </div>
              </div>

              <div
                className={`border rounded-xl p-4 ${
                  shift.color === "blue"
                    ? "bg-blue-50 border-blue-200"
                    : shift.color === "emerald"
                      ? "bg-emerald-50 border-emerald-200"
                      : "bg-violet-50 border-violet-200"
                }`}
              >
                <span
                  className={`text-[10px] font-bold tracking-widest uppercase block mb-1 ${
                    shift.color === "blue"
                      ? "text-blue-500"
                      : shift.color === "emerald"
                        ? "text-emerald-500"
                        : "text-violet-500"
                  }`}
                >
                  Now
                </span>
                <span
                  className={`font-bold text-base ${
                    shift.color === "blue"
                      ? "text-blue-800"
                      : shift.color === "emerald"
                        ? "text-emerald-800"
                        : "text-violet-800"
                  }`}
                >
                  {shift.after}
                </span>
                <p
                  className={`text-xs mt-1.5 leading-relaxed ${
                    shift.color === "blue"
                      ? "text-blue-600"
                      : shift.color === "emerald"
                        ? "text-emerald-600"
                        : "text-violet-600"
                  }`}
                >
                  {shift.afterNote}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

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
      <div
        className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${
          active ? "bg-white/20" : "bg-zinc-100"
        }`}
      >
        <IconComponent
          className={`w-5 h-5 ${active ? "text-white" : "text-zinc-600"}`}
        />
      </div>
      <p
        className={`text-sm font-semibold leading-snug mb-2.5 ${
          active ? "text-white" : "text-zinc-800"
        }`}
      >
        {label}
      </p>
      <span
        className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border ${
          active ? heatCfg.activeBadge : heatCfg.badge
        }`}
      >
        {heatCfg.label}
      </span>
    </motion.button>
  );
}

// ─── Job card ─────────────────────────────────────────────────────────────────

interface JobCardProps {
  title: string;
  index: number;
  tone: "up" | "down";
}

function JobCard({ title, index, tone }: JobCardProps) {
  const isUp = tone === "up";
  const barWidth = Math.max(38, 98 - index * 13);

  return (
    <motion.div
      initial={{ opacity: 0, x: isUp ? -12 : 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      className={`rounded-xl border p-4 ${
        isUp ? "bg-emerald-50 border-emerald-100" : "bg-rose-50 border-rose-100"
      }`}
    >
      <div className="flex items-start gap-3">
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
            <span
              className={`text-xs font-bold ml-2 shrink-0 ${
                isUp ? "text-emerald-600" : "text-rose-500"
              }`}
            >
              {barWidth}%
            </span>
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
      </div>
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

  // Skill bars
  const skillsData = isAll
    ? coreSkills.map((s) => ({ label: s.label, score: s.value }))
    : sector.skills.map((skill, i) => ({
        label: skill.replace(/\s*\([^)]*\)/g, "").trim(),
        score: Math.max(52, 90 - i * 9),
      }));

  // Props for SectorVisuals
  const currentSkills = isAll
    ? coreSkills.map((s) => ({ label: s.label, score: s.value, note: s.note }))
    : sector.skills.map((skill, i) => ({
        label: skill.replace(/\s*\([^)]*\)/g, "").trim(),
        score: Math.max(58, 84 - i * 8),
        note: "sector-relevant leverage skill",
      }));

  const sectorComparison = sectorOptions
    .filter((s) => s.key !== "all")
    .map((s, idx) => {
      const current = sectorPerformance[s.key as FutureSectorKey];
      return {
        key: s.key,
        label: s.label,
        demandScore: Math.min(
          95,
          45 + current.increasing.length * 9 + current.skills.length * 4
        ),
        declineScore: Math.min(
          90,
          18 + current.declining.length * 14 + idx
        ),
      };
    });

  const sectorDemandDistribution = sectorComparison
    .slice()
    .sort((a, b) => b.demandScore - a.demandScore)
    .slice(0, 5)
    .map((s) => ({ id: s.key, value: s.demandScore, label: s.label }));

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
              <p className="text-blue-200 text-[10px] font-bold uppercase tracking-widest mb-2">
                {isAll ? "All Sectors Overview" : sector.title}
              </p>
              <p className="text-white text-base leading-relaxed">
                {sector.summary}
              </p>
            </div>
            {sector.stats.length > 0 && (
              <div className="grid grid-cols-2 gap-3 lg:min-w-[280px]">
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
              {sector.increasing.slice(0, 6).map((job, i) => (
                <JobCard key={job} title={job} index={i} tone="up" />
              ))}
            </div>
          </div>

          {/* Declining */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-rose-100 flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-rose-500" />
              </div>
              <div>
                <p className="font-bold text-zinc-900 text-sm">
                  Jobs to be aware of
                </p>
                <p className="text-zinc-400 text-xs">
                  Declining demand · Higher competition
                </p>
              </div>
            </div>
            <div className="space-y-2">
              {sector.declining.slice(0, 5).map((job, i) => (
                <JobCard key={job} title={job} index={i} tone="down" />
              ))}
            </div>

            <div className="mt-4 bg-amber-50 border border-amber-100 rounded-xl p-4">
              <p className="text-amber-800 text-xs font-bold mb-1">
                💡 Keep in mind
              </p>
              <p className="text-amber-700 text-xs leading-relaxed">
                A &quot;declining&quot; job doesn&apos;t disappear overnight.
                It means competition is rising or growth is slowing. Many skills
                from these roles transfer directly to growing ones.
              </p>
            </div>
          </div>
        </div>

        {/* Skills bar chart */}
        <div className="bg-white rounded-2xl border border-zinc-200 p-6 mb-8">
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
        </div>

        {/* Deep charts — SectorVisuals handles per-sector LineChart, PieChart, Gauge, Scatter, Evidence */}
        <div className="bg-white rounded-2xl border border-zinc-200 p-6">
          <p className="text-[11px] font-bold tracking-widest text-blue-600 uppercase mb-5">
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
          <p className="text-blue-400 text-xs font-bold tracking-widest uppercase mb-3">
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
          <a
            href="/personality-test"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded-full transition-colors text-sm shadow-lg shadow-blue-900/30"
          >
            Take the Personality Test
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function FuturePageNew() {
  const [activeSector, setActiveSector] = useState<FutureSectorKey>("all");

  // Memoize so SectorDeepDive doesn't recompute on every render
  const memoSector = useMemo(() => activeSector, [activeSector]);

  return (
    <div className="min-h-screen">
      <ShiftSection />

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

          {/* Sector grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 mb-8">
            {sectorOptions.map(({ key, label }) => (
              <SectorCard
                key={key}
                sectorKey={key}
                label={label}
                active={activeSector === key}
                onClick={() => setActiveSector(key)}
              />
            ))}
          </div>

          {/* Heat legend */}
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {(
              Object.entries(HEAT_CONFIG) as [
                keyof typeof HEAT_CONFIG,
                (typeof HEAT_CONFIG)[keyof typeof HEAT_CONFIG],
              ][]
            ).map(([, cfg]) => (
              <span
                key={cfg.label}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold ${cfg.badge}`}
              >
                {cfg.label}
              </span>
            ))}
          </div>

          {/* Deep dive panel */}
          <SectorDeepDive activeSector={memoSector} />
        </div>
      </section>

      <LeverageSection />
      <PathSection />
    </div>
  );
}
