"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Gauge,
  BarChart,
  LineChart,
  PieChart,
  ScatterChart,
} from "@mui/x-charts";
import {
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  TrendingDown,
  Target,
  Info,
  Zap,
  Bot,
  Globe,
  Activity,
  GraduationCap,
  Construction,
  Layers,
  Cpu,
} from "lucide-react";
import {
  sectorOptions,
  sectorPerformance,
  sectorNotices,
  changeSignals,
  trendLines,
  marketPulse,
  coreSkills,
  technologyEvidence,
  designEvidence,
  marketingEvidence,
  businessEvidence,
  healthEvidence,
  type FutureSectorKey,
} from "@/constants/future-infographics";

const chartPalette = [
  "#165DFF",
  "#00B8D9",
  "#36B37E",
  "#FF8B00",
  "#6554C0",
  "#FF5630",
];

const qualitativeScoreMap: Record<string, number> = {
  high: 90,
  fast: 88,
  global: 86,
  rising: 82,
  growing: 78,
  strong: 76,
  steady: 68,
  stable: 66,
  hybrid: 64,
  trusted: 62,
  competitive: 58,
  networked: 56,
  variable: 52,
  local: 48,
  mixed: 46,
  projectled: 54,
  longterm: 60,
  fragmented: 42,
  niche: 50,
  flexible: 57,
  remote: 72,
  portfolio: 69,
};

function normalizeValue(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9+]/g, "");
}

function getScore(value: string, fallback: number) {
  return qualitativeScoreMap[normalizeValue(value)] ?? fallback;
}

function formatStatScore(index: number, value: string) {
  return getScore(value, 84 - index * 10);
}

function chartSx() {
  return {
    "& .MuiChartsAxis-line, & .MuiChartsAxis-tick": { stroke: "#d4d4d8" },
    "& .MuiChartsAxis-tickLabel, & .MuiChartsLegend-label, & .MuiChartsTooltip-root":
      {
        fill: "#52525b",
      },
    "& .MuiChartsGrid-line": { stroke: "#f4f4f5" },
  };
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

type EvidenceItem = {
  title: string;
  text: string;
  source: string;
};

function ChartCard({
  title,
  subtitle,
  children,
  className = "",
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-white rounded-3xl p-8 border border-zinc-100 shadow-sm hover:shadow-md transition-shadow ${className}`}
    >
      <p className="text-[12px] font-bold tracking-[0.18em] text-blue-600 uppercase">
        {title}
      </p>
      {subtitle ? (
        <p className="mt-2 text-sm leading-relaxed text-zinc-500">{subtitle}</p>
      ) : null}
      <div className="mt-6">{children}</div>
    </div>
  );
}

function EvidenceList({ items }: { items: EvidenceItem[] }) {
  return (
    <div className="space-y-4 mt-8">
      <h4 className="text-sm font-bold text-zinc-900 uppercase tracking-wider underline decoration-blue-500 underline-offset-8">
        Research Evidence
      </h4>
      <div className="grid md:grid-cols-2 gap-4">
        {items.map((item, i) => (
          <div
            key={i}
            className="p-4 rounded-xl bg-zinc-50 border border-zinc-100"
          >
            <p className="text-xs font-bold text-blue-600 mb-1">{item.title}</p>
            <p className="text-[13px] text-zinc-600 leading-relaxed mb-2">
              {item.text}
            </p>
            <p className="text-[10px] text-zinc-400 font-medium uppercase tracking-tight">
              {item.source}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FutureExplorer() {
  const [activeSector, setActiveSector] = useState<FutureSectorKey>("all");
  const sectorData = sectorPerformance[activeSector];
  const notices = sectorNotices[activeSector];

  const currentMetrics = useMemo(() => {
    const stats = activeSector === "all" ? marketPulse : sectorData.stats;
    return stats.map((item, index) => ({
      ...item,
      score: formatStatScore(index, item.value),
    }));
  }, [activeSector, sectorData]);

  const currentSkills = useMemo(() => {
    if (activeSector === "all") {
      return coreSkills.map((skill) => ({
        label: skill.label,
        score: skill.value,
        note: skill.note,
      }));
    }

    return sectorData.skills.map((skill, index) => ({
      label: skill,
      score: Math.max(58, 84 - index * 8),
      note: "sector-relevant leverage skill",
    }));
  }, [activeSector, sectorData]);

  const sectorComparison = useMemo(
    () =>
      sectorOptions
        .filter((sector) => sector.key !== "all")
        .map((sector, index) => {
          const current = sectorPerformance[sector.key];

          return {
            key: sector.key,
            label: sector.label,
            demandScore: Math.min(
              95,
              45 + current.increasing.length * 9 + current.skills.length * 4,
            ),
            declineScore: Math.min(
              90,
              18 + current.declining.length * 14 + index,
            ),
          };
        }),
    [],
  );

  const sectorDemandDistribution = useMemo(
    () =>
      sectorComparison
        .slice()
        .sort((a, b) => b.demandScore - a.demandScore)
        .map((sector) => ({
          id: sector.key,
          value: sector.demandScore,
          label: sector.label,
        })),
    [sectorComparison],
  );

  const renderVisuals = () => {
    switch (activeSector) {
      case "all":
        return (
          <div className="grid gap-6 lg:grid-cols-12">
            <ChartCard
              title="Sector comparison"
              subtitle="Demand vs Decline Pressure"
              className="lg:col-span-8"
            >
              <BarChart
                height={350}
                dataset={sectorComparison}
                xAxis={[{ scaleType: "band" }]}
                series={[
                  {
                    dataKey: "demandScore",
                    label: "Demand",
                    color: chartPalette[0],
                  },
                  {
                    dataKey: "declineScore",
                    label: "Decline",
                    color: chartPalette[5],
                  },
                ]}
                yAxis={[{ min: 0, max: 100 }]}
                grid={{ horizontal: true }}
                sx={chartSx()}
              />
            </ChartCard>
            <ChartCard title="Demand distribution" className="lg:col-span-4">
              <PieChart
                height={350}
                colors={chartPalette}
                series={[
                  {
                    innerRadius: 60,
                    outerRadius: 110,
                    data: sectorDemandDistribution,
                  },
                ]}
                sx={chartSx()}
              />
            </ChartCard>
            <ChartCard
              title="Market shift"
              subtitle="Remote leverage vs Routine work"
              className="lg:col-span-12"
            >
              <LineChart
                height={350}
                xAxis={[
                  {
                    scaleType: "point",
                    data: ["2022", "2023", "2024", "2025", "2026"],
                  },
                ]}
                series={[
                  {
                    data: [44, 51, 63, 71, 82],
                    label: "Skill-led demand",
                    color: chartPalette[0],
                  },
                  {
                    data: [26, 31, 39, 52, 68],
                    label: "Remote leverage",
                    color: chartPalette[2],
                  },
                  {
                    data: [64, 59, 51, 43, 36],
                    label: "Routine work resilience",
                    color: chartPalette[5],
                  },
                ]}
                grid={{ horizontal: true }}
                sx={chartSx()}
              />
            </ChartCard>
          </div>
        );
      case "technology":
        return (
          <div className="grid gap-6 lg:grid-cols-12">
            <ChartCard
              title="Technology demand curve"
              className="lg:col-span-8"
            >
              <LineChart
                height={350}
                xAxis={[
                  {
                    scaleType: "point",
                    data: ["2022", "2023", "2024", "2025", "2026"],
                  },
                ]}
                series={[
                  {
                    data: [48, 58, 67, 79, 90],
                    label: "Software + AI",
                    color: chartPalette[0],
                  },
                  {
                    data: [34, 41, 52, 63, 74],
                    label: "Electrical / Energy",
                    color: chartPalette[2],
                  },
                  {
                    data: [61, 52, 42, 30, 21],
                    label: "Routine digital",
                    color: chartPalette[5],
                  },
                ]}
                grid={{ horizontal: true }}
                sx={chartSx()}
              />
            </ChartCard>
            <ChartCard title="Global reach" className="lg:col-span-4">
              <div className="flex flex-col items-center justify-center pt-8">
                <Gauge
                  width={240}
                  height={200}
                  value={86}
                  startAngle={-110}
                  endAngle={110}
                />
                <p className="text-center text-xs text-zinc-500 mt-4 leading-relaxed px-4">
                  Software travels fast globally; infra stays
                  location-dependent.
                </p>
              </div>
            </ChartCard>
            <div className="lg:col-span-12">
              <EvidenceList items={technologyEvidence} />
            </div>
          </div>
        );
      case "design":
        return (
          <div className="grid gap-6 lg:grid-cols-12">
            <ChartCard title="Design work mix" className="lg:col-span-6">
              <PieChart
                height={320}
                colors={chartPalette}
                series={[
                  {
                    innerRadius: 50,
                    outerRadius: 120,
                    data: [
                      { id: 0, value: 34, label: "UI/UX + digital" },
                      { id: 1, value: 24, label: "Brand systems" },
                      { id: 2, value: 18, label: "Motion / animation" },
                      { id: 3, value: 14, label: "Industrial / product" },
                      { id: 4, value: 10, label: "Print legacy" },
                    ],
                  },
                ]}
                sx={chartSx()}
              />
            </ChartCard>
            <ChartCard
              title="Portfolio vs remote fit"
              className="lg:col-span-6"
            >
              <ScatterChart
                height={320}
                series={[
                  {
                    label: "Roles",
                    data: [
                      { id: 0, x: 92, y: 81 },
                      { id: 1, x: 84, y: 73 },
                      { id: 2, x: 76, y: 62 },
                      { id: 3, x: 68, y: 44 },
                      { id: 4, x: 42, y: 20 },
                    ],
                    color: chartPalette[0],
                  },
                ]}
                xAxis={[{ min: 0, max: 100, label: "Portfolio weight" }]}
                yAxis={[{ min: 0, max: 100, label: "Remote suitability" }]}
                sx={chartSx()}
              />
            </ChartCard>
            <div className="lg:col-span-12">
              <EvidenceList items={designEvidence} />
            </div>
          </div>
        );
      case "marketing":
        return (
          <div className="grid gap-6 lg:grid-cols-12">
            <ChartCard title="Channel momentum" className="lg:col-span-8">
              <LineChart
                height={350}
                xAxis={[
                  {
                    scaleType: "point",
                    data: ["2022", "2023", "2024", "2025", "2026"],
                  },
                ]}
                series={[
                  {
                    data: [38, 49, 61, 74, 86],
                    label: "Performance / Acq",
                    color: chartPalette[0],
                  },
                  {
                    data: [24, 36, 49, 66, 82],
                    label: "Creator / content",
                    color: chartPalette[3],
                  },
                  {
                    data: [69, 60, 51, 42, 34],
                    label: "Traditional campaigns",
                    color: chartPalette[5],
                  },
                ]}
                grid={{ horizontal: true }}
                sx={chartSx()}
              />
            </ChartCard>
            <ChartCard title="Skill mix" className="lg:col-span-4">
              <PieChart
                height={350}
                colors={chartPalette}
                series={[
                  {
                    innerRadius: 50,
                    outerRadius: 120,
                    data: currentSkills.slice(0, 4).map((s, i) => ({
                      id: i,
                      value: s.score,
                      label: s.label,
                    })),
                  },
                ]}
                sx={chartSx()}
              />
            </ChartCard>
            <div className="lg:col-span-12">
              <EvidenceList items={marketingEvidence} />
            </div>
          </div>
        );
      case "business":
        return (
          <div className="grid gap-6 lg:grid-cols-12">
            <ChartCard title="Operating leverage" className="lg:col-span-4">
              <div className="flex flex-col items-center justify-center pt-8">
                <Gauge
                  width={240}
                  height={200}
                  value={72}
                  startAngle={-110}
                  endAngle={110}
                />
                <p className="text-center text-xs text-zinc-500 mt-4 leading-relaxed px-4 text-balance">
                  Execution quality is becoming a stronger filter than reach.
                </p>
              </div>
            </ChartCard>
            <ChartCard title="Stability curve" className="lg:col-span-8">
              <LineChart
                height={350}
                xAxis={[
                  {
                    scaleType: "point",
                    data: ["Entry", "Year 1", "Year 2", "Year 3", "Year 4"],
                  },
                ]}
                series={[
                  {
                    data: [41, 52, 63, 72, 79],
                    label: "Ops / analysis",
                    color: chartPalette[2],
                  },
                  {
                    data: [33, 37, 43, 48, 56],
                    label: "Generalist",
                    color: chartPalette[3],
                  },
                ]}
                grid={{ horizontal: true }}
                sx={chartSx()}
              />
            </ChartCard>
            <div className="lg:col-span-12">
              <EvidenceList items={businessEvidence} />
            </div>
          </div>
        );
      case "health":
        return (
          <div className="grid gap-6 lg:grid-cols-12">
            <ChartCard title="Demand leaders" className="lg:col-span-12">
              <BarChart
                height={350}
                xAxis={[
                  {
                    scaleType: "band",
                    data: sectorData.increasing.slice(0, 5),
                  },
                ]}
                series={[
                  { data: [94, 84, 76, 69, 63], color: chartPalette[2] },
                ]}
                yAxis={[{ min: 0, max: 100 }]}
                grid={{ horizontal: true }}
                sx={chartSx()}
              />
            </ChartCard>
            <div className="lg:col-span-12">
              <EvidenceList items={healthEvidence} />
            </div>
          </div>
        );
      default:
        return (
          <div className="grid gap-6 lg:grid-cols-12">
            <ChartCard title="Market focus" className="lg:col-span-12">
              <PieChart
                height={400}
                colors={chartPalette}
                series={[
                  {
                    innerRadius: 60,
                    outerRadius: 150,
                    data: sectorData.increasing.slice(0, 5).map((r, i) => ({
                      id: i,
                      value: 100 - i * 15,
                      label: r,
                    })),
                  },
                ]}
                sx={chartSx()}
              />
            </ChartCard>
          </div>
        );
    }
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Improved Sector Selector (Top Bar) */}
        <div className="flex justify-center mb-16 sticky top-4 z-50">
          <div className="inline-flex p-1.5 bg-zinc-100/80 backdrop-blur-xl rounded-full border border-white/20 shadow-xl shadow-zinc-200/50 overflow-x-auto max-w-full no-scrollbar">
            {sectorOptions.map((sector) => {
              const isActive = activeSector === sector.key;
              return (
                <button
                  key={sector.key}
                  onClick={() => setActiveSector(sector.key)}
                  className={`relative flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-colors duration-300 whitespace-nowrap z-10 ${
                    isActive
                      ? "text-white"
                      : "text-zinc-500 hover:text-zinc-800"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeSector"
                      className="absolute inset-0 bg-blue-600 rounded-full shadow-lg shadow-blue-200"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                      style={{ zIndex: -1 }}
                    />
                  )}
                  <span className="relative flex items-center gap-2">
                    {sector.key === "all" && <Globe className="w-4 h-4" />}
                    {sector.key === "technology" && <Cpu className="w-4 h-4" />}
                    {sector.key === "design" && <Zap className="w-4 h-4" />}
                    {sector.key === "marketing" && <Bot className="w-4 h-4" />}
                    {sector.key === "business" && (
                      <Target className="w-4 h-4" />
                    )}
                    {sector.key === "health" && (
                      <Activity className="w-4 h-4" />
                    )}
                    {sector.key === "education" && (
                      <GraduationCap className="w-4 h-4" />
                    )}
                    {sector.key === "infrastructure" && (
                      <Construction className="w-4 h-4" />
                    )}
                    {sector.key === "other" && <Layers className="w-4 h-4" />}
                    {sector.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeSector}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -20 }}
            variants={containerVariants}
            className="space-y-16"
          >
            {/* Sector Hero */}
            <motion.div
              variants={itemVariants}
              className="grid lg:grid-cols-12 gap-12 items-start"
            >
              <div className="lg:col-span-7">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-blue-600 uppercase tracking-[0.2em] mb-6">
                  Sector Insight
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-zinc-900 mb-8 leading-[1.1] tracking-tighter">
                  {sectorData.title}
                </h2>
                <p className="text-xl text-zinc-600 leading-relaxed font-normal max-w-2xl">
                  {sectorData.summary}
                </p>

                <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-10 border-t border-zinc-100 pt-10">
                  {currentMetrics.slice(0, 3).map((stat, i) => (
                    <div key={i} className="flex flex-col">
                      <span className="text-4xl font-black text-zinc-950 mb-1">
                        {stat.value}
                      </span>
                      <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-[0.2em] whitespace-nowrap">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 grid gap-4">
                {notices.map((notice, i) => (
                  <div
                    key={i}
                    className={`p-8 rounded-3xl ${i === 0 ? "bg-zinc-900 text-white" : "bg-zinc-50 border border-zinc-100"}`}
                  >
                    <div className="flex items-start gap-4">
                      {i === 0 ? (
                        <Zap className="w-5 h-5 text-blue-400 shrink-0 mt-1" />
                      ) : (
                        <Info className="w-5 h-5 text-zinc-400 shrink-0 mt-1" />
                      )}
                      <div>
                        <h4
                          className={`text-lg font-bold mb-3 ${i === 0 ? "text-white" : "text-zinc-900"}`}
                        >
                          {notice.title}
                        </h4>
                        <p
                          className={`text-sm leading-relaxed ${i === 0 ? "text-zinc-400" : "text-zinc-500"}`}
                        >
                          {notice.text}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Visual Analytics Grid */}
            <motion.div variants={itemVariants} className="space-y-12">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-px flex-1 bg-zinc-100" />
                <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-[0.3em]">
                  Data & Visualizations
                </h3>
                <div className="h-px flex-1 bg-zinc-100" />
              </div>

              <div className="lg:grid lg:grid-cols-12 gap-8 items-start">
                {/* Sidebar - Roles & Skills */}
                <div className="lg:col-span-4 space-y-6 lg:order-2">
                  <div className="bg-zinc-50 rounded-3xl p-8 border border-zinc-100">
                    <h3 className="text-sm font-bold text-zinc-900 flex items-center gap-2 mb-8 uppercase tracking-widest">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      Rising Roles
                    </h3>
                    <div className="space-y-6">
                      {sectorData.increasing.map((role, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between"
                        >
                          <span className="text-[13px] font-bold text-zinc-900 uppercase tracking-tight">
                            {role}
                          </span>
                          <ArrowUpRight className="w-4 h-4 text-zinc-300" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-zinc-50 rounded-3xl p-8 border border-zinc-100">
                    <h3 className="text-sm font-bold text-zinc-900 flex items-center gap-2 mb-8 uppercase tracking-widest">
                      <TrendingDown className="w-4 h-4 text-red-500" />
                      Declining Roles
                    </h3>
                    <div className="space-y-6">
                      {sectorData.declining.slice(0, 4).map((role, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between"
                        >
                          <span className="text-[13px] font-bold text-zinc-400 uppercase tracking-tight line-through decoration-zinc-200">
                            {role}
                          </span>
                          <ArrowDownRight className="w-4 h-4 text-zinc-300" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-blue-600 rounded-3xl p-8 text-white shadow-2xl shadow-blue-100">
                    <h3 className="text-sm font-bold flex items-center gap-2 mb-8 uppercase tracking-widest">
                      <Target className="w-4 h-4" />
                      Skill Matrix
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {sectorData.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="px-3 py-2 rounded-xl bg-white/10 text-white text-[11px] font-bold border border-white/10"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Main Content - Visuals */}
                <div className="lg:col-span-8 lg:order-1">
                  {renderVisuals()}
                </div>
              </div>
            </motion.div>

            {/* Macro Trends (Always visible at bottom or for "All") */}
            <motion.div
              variants={itemVariants}
              className="pt-24 border-t border-zinc-100"
            >
              <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
                <div>
                  <h3 className="text-3xl md:text-5xl font-black text-zinc-900 mb-6 tracking-tighter">
                    Nepal Market Pulse
                  </h3>
                  <p className="text-zinc-600 leading-relaxed font-light text-lg">
                    Macro indicators shaping the labor market landscape in Nepal
                    for the coming decade.
                  </p>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {changeSignals.map((signal, i) => (
                    <div
                      key={i}
                      className="p-6 rounded-3xl bg-zinc-50 border border-zinc-100"
                    >
                      <p className="text-2xl font-black text-zinc-900 mb-1">
                        {signal.value}
                      </p>
                      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                        {signal.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {trendLines.map((line, i) => (
                  <div
                    key={i}
                    className="group p-10 rounded-3xl border border-zinc-100 bg-white hover:border-blue-200 transition-all hover:shadow-xl hover:shadow-blue-50"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-colors text-blue-600">
                      <line.icon className="w-7 h-7" />
                    </div>
                    <h4 className="text-xl font-bold text-zinc-900 mb-4">
                      {line.title}
                    </h4>
                    <p className="text-zinc-500 text-sm leading-relaxed">
                      {line.text}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
