"use client";

import { type FutureSectorKey } from "@/constants/future-infographics";

type Metric = {
  label: string;
  value: string;
  source?: string;
};

export function OverviewSection({
  activeSector,
  sectorTitle,
  summary,
  leadDemandItems,
  leadDeclineItems,
  leadSkillItems,
  currentMetrics,
}: {
  activeSector: FutureSectorKey;
  sectorTitle: string;
  summary: string;
  leadDemandItems: string[];
  leadDeclineItems: string[];
  leadSkillItems: string[];
  currentMetrics: Metric[];
}) {
  return (
    <section className="border-b border-zinc-200 pb-8 md:pb-10">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-sm font-semibold tracking-[0.18em] text-blue-600 uppercase">
            {activeSector === "all" ? "All sectors" : sectorTitle}
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-zinc-950 md:text-5xl">
            {activeSector === "all" ? "Where the market is moving" : sectorTitle}
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-zinc-600">
            {summary}
          </p>

          <div className="mt-6 grid gap-4">
            <div className="border-t border-zinc-200 pt-4">
              <p className="text-[11px] font-semibold tracking-[0.18em] text-blue-600 uppercase">
                Opportunity focus
              </p>
              <p className="mt-3 text-sm leading-6 text-zinc-700">
                {leadDemandItems.join(", ")} are the clearest upside signals in{" "}
                {activeSector === "all" ? "the market" : sectorTitle.toLowerCase()}.
              </p>
            </div>
            <div className="border-t border-zinc-200 pt-4">
              <p className="text-[11px] font-semibold tracking-[0.18em] text-blue-600 uppercase">
                Pressure points
              </p>
              <p className="mt-3 text-sm leading-6 text-zinc-700">
                {leadDeclineItems.join(" and ")} show where repetitive, lower-signal work is weakening.
              </p>
            </div>
            <div className="border-t border-zinc-200 pt-4">
              <p className="text-[11px] font-semibold tracking-[0.18em] text-blue-600 uppercase">
                Skill shift
              </p>
              <p className="mt-3 text-sm leading-6 text-zinc-700">
                {leadSkillItems.join(", ")} are carrying the most leverage for movement and income growth.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 rounded-3xl bg-blue-50/45 p-5 md:p-6">
          {currentMetrics.slice(0, 3).map((metric) => (
            <div key={metric.label} className="border-t border-zinc-200 pt-4">
              <p className="text-3xl font-semibold tracking-[-0.04em] text-zinc-950">
                {metric.value}
              </p>
              <p className="mt-2 text-sm font-medium text-zinc-700">
                {metric.label}
              </p>
              {metric.source ? (
                <p className="mt-2 text-[11px] font-semibold tracking-[0.18em] text-zinc-400 uppercase">
                  {metric.source}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
