"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import {
  changeSignals,
  coreSkills,
  marketPulse,
  sectorOptions,
  sectorPerformance,
  trendLines,
  type FutureSectorKey,
} from "@/constants/future-infographics";

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

function RankedList({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[];
  tone: "up" | "down";
}) {
  const barColor =
    tone === "up" ? "bg-blue-600" : "bg-zinc-900";
  const numberColor =
    tone === "up" ? "text-blue-600" : "text-zinc-900";

  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-6">
      <div className="flex items-center gap-3">
        {tone === "up" ? (
          <TrendingUp className="h-5 w-5 text-blue-600" />
        ) : (
          <TrendingDown className="h-5 w-5 text-zinc-900" />
        )}
        <h2 className="text-xl font-semibold tracking-[-0.03em] text-zinc-950">
          {title}
        </h2>
      </div>

      <div className="mt-6 space-y-4">
        {items.slice(0, 5).map((item, index) => {
          const width = Math.max(38, 100 - index * 14);

          return (
            <div key={item} className="grid grid-cols-[44px_1fr] gap-4">
              <div className={`text-2xl font-semibold ${numberColor}`}>
                0{index + 1}
              </div>
              <div>
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-medium text-zinc-900">{item}</p>
                  <span className="text-xs font-semibold tracking-[0.18em] text-zinc-400 uppercase">
                    {width}%
                  </span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-zinc-100">
                  <div
                    className={`h-2 rounded-full ${barColor}`}
                    style={{ width: `${width}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function MetricBars({
  title,
  items,
}: {
  title: string;
  items: Array<{ label: string; value: string; score: number; source?: string }>;
}) {
  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-6">
      <h2 className="text-xl font-semibold tracking-[-0.03em] text-zinc-950">
        {title}
      </h2>
      <div className="mt-6 space-y-5">
        {items.map((item) => (
          <div key={`${item.label}-${item.value}`}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-zinc-900">
                  {item.label}
                </p>
                {item.source ? (
                  <p className="mt-1 text-[11px] font-semibold tracking-[0.18em] text-zinc-400 uppercase">
                    {item.source}
                  </p>
                ) : null}
              </div>
              <div className="text-right">
                <p className="text-2xl font-semibold tracking-[-0.03em] text-zinc-950">
                  {item.value}
                </p>
              </div>
            </div>
            <div className="mt-3 h-2 rounded-full bg-zinc-100">
              <div
                className="h-2 rounded-full bg-blue-600"
                style={{ width: `${item.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function FutureJobsInfographic() {
  const [activeSector, setActiveSector] = useState<FutureSectorKey>("all");
  const selectedSector = sectorPerformance[activeSector];

  const sectorComparison = useMemo(
    () =>
      sectorOptions
        .filter((sector) => sector.key !== "all")
        .map((sector, index) => {
          const current = sectorPerformance[sector.key];
          const demandScore = Math.min(
            95,
            45 + current.increasing.length * 9 + current.skills.length * 4,
          );
          const declineScore = Math.min(
            90,
            18 + current.declining.length * 14 + index,
          );

          return {
            key: sector.key,
            label: sector.label,
            demandScore,
            declineScore,
          };
        })
        .sort((a, b) => b.demandScore - a.demandScore),
    [],
  );

  const currentMetrics = useMemo(() => {
    const stats = activeSector === "all" ? marketPulse : selectedSector.stats;

    return stats.map((item, index) => ({
      ...item,
      score: getScore(item.value, 84 - index * 10),
    }));
  }, [activeSector, selectedSector]);

  const currentSkills = useMemo(() => {
    if (activeSector === "all") {
      return coreSkills.map((skill) => ({
        label: skill.label,
        value: `${skill.value}%`,
        score: skill.value,
        source: skill.note,
      }));
    }

    return selectedSector.skills.map((skill, index) => ({
      label: skill,
      value: `${Math.max(58, 84 - index * 8)}%`,
      score: Math.max(58, 84 - index * 8),
      source: "sector-relevant leverage skill",
    }));
  }, [activeSector, selectedSector]);

  const demandItems =
    activeSector === "all"
      ? sectorPerformance.all.increasing
      : selectedSector.increasing;
  const declineItems =
    activeSector === "all"
      ? sectorPerformance.all.declining
      : selectedSector.declining;

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:px-0 md:py-16">
      <div className="mb-8 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="inline-flex min-w-max gap-2">
          {sectorOptions.map((sector) => (
            <button
              key={sector.key}
              type="button"
              onClick={() => setActiveSector(sector.key)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                activeSector === sector.key
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300"
              }`}
            >
              {sector.label}
            </button>
          ))}
        </div>
      </div>

      <section className="rounded-3xl border border-zinc-200 bg-white p-6 md:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-sm font-semibold tracking-[0.18em] text-blue-600 uppercase">
              {activeSector === "all" ? "All sectors" : selectedSector.title}
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-zinc-950 md:text-5xl">
              {activeSector === "all" ? "Where the market is moving" : selectedSector.title}
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-zinc-600">
              {selectedSector.summary}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {currentMetrics.slice(0, 3).map((metric) => (
              <div key={metric.label} className="rounded-2xl bg-zinc-50 p-4">
                <p className="text-3xl font-semibold tracking-[-0.04em] text-zinc-950">
                  {metric.value}
                </p>
                <p className="mt-2 text-sm font-medium text-zinc-700">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mt-8 grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <MetricBars title="Sector performance" items={currentMetrics} />
        </div>

        <div className="lg:col-span-5">
          <section className="rounded-3xl border border-zinc-200 bg-white p-6">
            <div className="flex items-center gap-3">
              <BriefcaseBusiness className="h-5 w-5 text-blue-600" />
              <h2 className="text-xl font-semibold tracking-[-0.03em] text-zinc-950">
                Sector comparison
              </h2>
            </div>

            <div className="mt-6 space-y-4">
              {sectorComparison.map((sector) => (
                <div key={sector.key}>
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-zinc-900">
                      {sector.label}
                    </p>
                    <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-zinc-400 uppercase">
                      <span>{sector.demandScore}% demand</span>
                    </div>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-zinc-100">
                    <div
                      className={`h-2 rounded-full ${
                        activeSector === sector.key ? "bg-zinc-950" : "bg-blue-600"
                      }`}
                      style={{ width: `${sector.demandScore}%` }}
                    />
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-zinc-100">
                    <div
                      className="h-2 rounded-full bg-zinc-300"
                      style={{ width: `${sector.declineScore}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="lg:col-span-6">
          <RankedList title="Top 5 demand" items={demandItems} tone="up" />
        </div>

        <div className="lg:col-span-6">
          <RankedList title="Top 5 declining" items={declineItems} tone="down" />
        </div>

        <div className="lg:col-span-7">
          <MetricBars title="Skills that matter" items={currentSkills} />
        </div>

        <div className="lg:col-span-5">
          <section className="rounded-3xl border border-zinc-200 bg-white p-6">
            <h2 className="text-xl font-semibold tracking-[-0.03em] text-zinc-950">
              What to notice
            </h2>
            <div className="mt-6 space-y-4">
              {(activeSector === "all" ? trendLines : trendLines.slice(0, 2)).map((trend) => (
                <div key={trend.title} className="rounded-2xl bg-zinc-50 p-4">
                  <div className="flex items-start gap-3">
                    <ArrowUpRight className="mt-0.5 h-4 w-4 text-blue-600" />
                    <div>
                      <p className="text-sm font-semibold text-zinc-900">
                        {trend.title}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-zinc-600">
                        {trend.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {activeSector === "all" && (
        <section className="mt-8 rounded-3xl border border-zinc-200 bg-white p-6">
          <h2 className="text-xl font-semibold tracking-[-0.03em] text-zinc-950">
            Labour pressure signals
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {changeSignals.map((signal, index) => (
              <div key={signal.label} className="rounded-2xl bg-zinc-50 p-4">
                <p className="text-3xl font-semibold tracking-[-0.04em] text-zinc-950">
                  {signal.value}
                </p>
                <p className="mt-2 text-sm font-medium text-zinc-900">
                  {signal.label}
                </p>
                <div className="mt-3 h-2 rounded-full bg-zinc-100">
                  <div
                    className="h-2 rounded-full bg-blue-600"
                    style={{ width: `${78 - index * 11}%` }}
                  />
                </div>
                <p className="mt-2 text-[11px] font-semibold tracking-[0.18em] text-zinc-400 uppercase">
                  {signal.source}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </section>
  );
}
