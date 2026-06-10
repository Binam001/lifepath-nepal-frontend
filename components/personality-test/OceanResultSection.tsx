"use client";

import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { BarChart } from "@mui/x-charts";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Brain,
  Compass,
  Zap,
} from "lucide-react";
import Link from "next/link";
import {
  oceanDescriptions,
  getOceanTier,
  traitTierLabels,
  traitDetails,
  type Trait,
} from "@/data/OCEAN-data";
import { calculateArchetype } from "@/data/CareermatchingForOcean";
import OceanRadarChart from "./OceanRadarChart";
import ComparisonCTA from "./ComparisonCTA";

interface OceanResultSectionProps {
  scores: Record<string, number>;
  showConfetti: boolean;
  windowSize: { width: number; height: number };
  handleRetake: () => void;
}

export default function OceanResultSection({
  scores,
  showConfetti,
  windowSize,
  handleRetake,
}: OceanResultSectionProps) {
  const archetype = calculateArchetype(scores as Record<Trait, number>);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
      fontSize: isMobile ? "11px" : "12px",
      fontWeight: 600,
    },
    "& .MuiChartsGrid-line": { stroke: "#f4f4f5" },
    "& .MuiBarLabel-root": {
      fill: "#18181b",
      fontWeight: 700,
      fontSize: "11px",
    },
  };

  const yAxisLabels = isMobile
    ? ["O", "C", "E", "A", "N"]
    : [
        "Openness",
        "Conscientiousness",
        "Extraversion",
        "Agreeableness",
        "Neuroticism",
      ];

  const chartMargin = isMobile
    ? { left: 5, right: 20, top: 10, bottom: 30 }
    : { left: 5, right: 30, top: 10, bottom: 30 };

  return (
    <div className="min-h-screen pt-16 pb-12 bg-zinc-50 animate-in fade-in duration-300">
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
        <div className="max-w-4xl mx-auto h-full min-h-[65vh] py-8 px-4 sm:px-6 flex flex-col">
          <div className="flex justify-between items-center">
            <button
              onClick={handleRetake}
              className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-sm font-medium rounded-lg transition-all cursor-pointer flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Retake Test
            </button>
          </div>

          <div className="flex-1 flex items-center">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center shrink-0">
                <Compass size={28} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Your Big Five Personality Profile
                </h1>
                <p className="text-lg text-white/70 leading-relaxed">
                  Personality traits are continuous variables. Below is your
                  score breakdown across each dimension.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Chart Card */}
        {/* Chart Card */}
        <section className="bg-white rounded-2xl p-6 md:p-8 border border-zinc-200 shadow-sm space-y-8">
          {/* Bar Chart Section */}
          <div>
            <h2 className="text-xl font-bold text-zinc-900 mb-6 text-center sm:text-left">
              Trait Score Breakdown (%)
            </h2>

            {/* Custom Chart Legend */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mb-6 text-xs sm:text-sm font-bold text-zinc-600">
              <div className="flex items-center gap-1.5">
                <div className="w-3.5 h-3.5 rounded-sm bg-blue-500"></div>
                <span>Openness</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3.5 h-3.5 rounded-sm bg-green-500"></div>
                <span>Conscientiousness</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3.5 h-3.5 rounded-sm bg-amber-500"></div>
                <span>Extraversion</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3.5 h-3.5 rounded-sm bg-red-400"></div>
                <span>Agreeableness</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3.5 h-3.5 rounded-sm bg-purple-500"></div>
                <span>Neuroticism</span>
              </div>
            </div>

            {/* MUI Bar Chart */}
            <div
              id="ocean-chart-parent"
              className="w-full h-[320px] overflow-hidden"
            >
              {isMounted && (
                <BarChart
                  height={320}
                  layout="horizontal"
                  yAxis={[
                    {
                      scaleType: "band",
                      data: yAxisLabels,
                      width: isMobile ? 30 : 155,
                      colorMap: {
                        type: "ordinal",
                        colors: [
                          "#3b82f6",
                          "#22c55e",
                          "#eab308",
                          "#f87171",
                          "#a855f7",
                        ],
                      },
                    },
                  ]}
                  xAxis={[{ min: 0, max: 100 }]}
                  series={[
                    {
                      data: [
                        scores.O ?? 50,
                        scores.C ?? 50,
                        scores.E ?? 50,
                        scores.A ?? 50,
                        scores.N ?? 50,
                      ],
                      valueFormatter: (value) => `${value}%`,
                      barLabel: (item) =>
                        item && typeof item.value === "number"
                          ? `${item.value}%`
                          : "",
                    },
                  ]}
                  grid={{ vertical: true }}
                  sx={chartStyles}
                  margin={chartMargin}
                  slotProps={{ legend: { hidden: true } as any }}
                />
              )}
            </div>
          </div>

          {/* Radar Chart Section */}
          <div className="border-t border-zinc-100 pt-8">
            <h3 className="text-xl font-bold text-zinc-900 mb-6 text-center sm:text-left">
              Your Personality Shape
            </h3>
            <OceanRadarChart scores={scores} />
          </div>
        </section>

        {/* Detailed Trait Breakdown List */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-zinc-900 px-1">
            Detailed Dimension Analysis
          </h2>

          <div className="grid gap-6">
            {traitDetails.map((trait) => {
              const score = scores[trait.key] ?? 50;
              const tier = getOceanTier(score);
              const tierLabel = traitTierLabels[trait.key][tier];
              const tierData = oceanDescriptions[trait.key][tier];

              return (
                <div
                  key={trait.key}
                  className={`bg-white rounded-2xl p-6 border ${trait.border} shadow-xs transition-all hover:border-zinc-300`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-3.5 h-3.5 rounded-full ${trait.color}`}
                      ></div>
                      <h3 className="text-2xl font-bold text-zinc-900">
                        {trait.name}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-zinc-500">
                        Score:
                      </span>
                      <span
                        className={`text-sm font-extrabold ${trait.textColor}`}
                      >
                        {score}%
                      </span>
                      <span
                        className={`text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${trait.badge}`}
                      >
                        {tierLabel}
                      </span>
                    </div>
                  </div>

                  <p className="text-zinc-600 mb-4 leading-relaxed">
                    {trait.description}
                  </p>

                  <div className="border-t border-zinc-100 pt-4 mb-4">
                    <p className="font-bold text-zinc-800 mb-1">
                      {tierData.title}
                    </p>
                    <p className="text-zinc-600 leading-relaxed">
                      {tierData.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Archetype Card */}
        <section className="bg-white rounded-2xl p-6 md:p-8 border border-zinc-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center shrink-0">
              <Zap size={22} className="text-amber-600" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-zinc-900">
                {archetype.title}
              </h2>
              <p className="text-sm font-semibold text-zinc-500">
                {archetype.subtitle}
              </p>
            </div>
          </div>

          <p className="text-zinc-600 leading-relaxed mb-5">
            {archetype.description}
          </p>

          <div className="bg-zinc-50/50 rounded-xl p-4 border border-zinc-100">
            <p className="text-xs font-black uppercase text-zinc-400 tracking-wider mb-2">
              Best-Fit Career Paths
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {archetype.careers.map((career, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-3 bg-zinc-50 rounded-lg border border-zinc-200 hover:border-blue-300 transition-all"
                >
                  <CheckCircle size={16} className="text-blue-600 shrink-0" />
                  <span className="text-sm font-medium text-zinc-800">
                    {career}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison CTA Dashboard Banner */}
        <ComparisonCTA />

        {/* Global Action Banner */}
        <section className="bg-linear-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 md:p-8 text-center text-white shadow-md">
          <h2 className="text-xl md:text-2xl font-bold mb-3">
            Translate Your Trait Strengths to the Workplace
          </h2>
          <p className="text-base text-white/90 mb-6 max-w-xl mx-auto">
            Leverage your natural behaviors in team building, creative
            processes, and career pathways.
          </p>
          <Link href="/future">
            <button className="px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-zinc-50 transition-all cursor-pointer inline-flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]">
              Explore Career Options
              <ArrowRight size={18} />
            </button>
          </Link>
        </section>
      </article>
    </div>
  );
}
