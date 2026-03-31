"use client";

import { useMemo, useState } from "react";
import { BarChart } from "@mui/x-charts";
import {
  coreSkills,
  marketPulse,
  sectorNotices,
  sectorOptions,
  sectorPerformance,
  type FutureSectorKey,
} from "@/constants/future-infographics";
import {
  chartPalette,
  chartSx,
  formatStatScore,
} from "@/components/future/infographic/chart-config";
import { SectorSelector } from "@/components/future/infographic/SectorSelector";
import { OverviewSection } from "@/components/future/infographic/OverviewSection";
import {
  Card,
  InsightList,
  RankedList,
} from "@/components/future/infographic/Primitives";
import { SectorVisuals } from "@/components/future/infographic/SectorVisuals";
import { SimpleExplanationSection } from "@/components/future/infographic/SimpleExplanationSection";

export default function FutureJobsInfographic() {
  const [activeSector, setActiveSector] = useState<FutureSectorKey>("all");
  const selectedSector = sectorPerformance[activeSector];

  const currentMetrics = useMemo(() => {
    const stats = activeSector === "all" ? marketPulse : selectedSector.stats;

    return stats.map((item, index) => ({
      ...item,
      score: formatStatScore(index, item.value),
    }));
  }, [activeSector, selectedSector]);

  const currentSkills = useMemo(() => {
    if (activeSector === "all") {
      return coreSkills.map((skill) => ({
        label: skill.label,
        score: skill.value,
        note: skill.note,
      }));
    }

    return selectedSector.skills.map((skill, index) => ({
      label: skill,
      score: Math.max(58, 84 - index * 8),
      note: "sector-relevant leverage skill",
    }));
  }, [activeSector, selectedSector]);

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

  const demandItems =
    activeSector === "all"
      ? sectorPerformance.all.increasing
      : selectedSector.increasing;
  const declineItems =
    activeSector === "all"
      ? sectorPerformance.all.declining
      : selectedSector.declining;
  const sectorDemandDistribution = sectorComparison
    .slice()
    .sort((a, b) => b.demandScore - a.demandScore)
    .slice(0, 5)
    .map((sector) => ({
      id: sector.key,
      value: sector.demandScore,
      label: sector.label,
    }));

  const leadDemandItems = demandItems.slice(0, 3);
  const leadDeclineItems = declineItems.slice(0, 2);
  const leadSkillItems = currentSkills.slice(0, 3).map((item) => item.label);

  const simpleExplanation =
    activeSector === "all"
      ? {
          title: "Key Takeaways",
          points: [
            " Tech jobs (software, AI, web development) are growing VERY FAST - highest salaries and global opportunities",
            " Healthcare, tourism, and energy jobs are GROWING - stable and increasing demand",
            " Education, government, and banking jobs are STABLE - still important but high competition",
            " Low-skill jobs, farming, and repetitive work are DECLINING - automation and low pay",
            " KEY INSIGHT: Learn digital skills + English = More opportunities + Higher income",
          ],
        }
      : null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:px-0 md:py-16">
      <SectorSelector activeSector={activeSector} onSelect={setActiveSector} />

      <OverviewSection
        activeSector={activeSector}
        sectorTitle={selectedSector.title}
        summary={selectedSector.summary}
        leadDemandItems={leadDemandItems}
        leadDeclineItems={leadDeclineItems}
        leadSkillItems={leadSkillItems}
        currentMetrics={currentMetrics}
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <RankedList title="Top 5 growing" items={demandItems} tone="up" />
        </div>
        <div className="lg:col-span-6">
          <RankedList title="Top 5 declining" items={declineItems} tone="down" />
        </div>
      </div>

      <div className="mt-8">
        <SectorVisuals
          activeSector={activeSector}
          demandItems={demandItems}
          declineItems={declineItems}
          currentSkills={currentSkills}
          sectorComparison={sectorComparison}
          sectorDemandDistribution={sectorDemandDistribution}
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-12">
        <Card
          title="Skills that matter"
          subtitle="This keeps a consistent view of what the sector is rewarding."
          className="lg:col-span-7"
        >
          <BarChart
            height={300}
            layout="horizontal"
            yAxis={[
              {
                scaleType: "band",
                data: currentSkills.map((skill) => skill.label),
              },
            ]}
            xAxis={[{ min: 0, max: 100 }]}
            series={[
              {
                data: currentSkills.map((skill) => skill.score),
                color: chartPalette[0],
              },
            ]}
            grid={{ vertical: true }}
            sx={chartSx()}
          />
        </Card>
        <Card
          title="What to notice"
          subtitle="A few stable takeaways that stay useful across the page."
          className="lg:col-span-5"
        >
          <InsightList items={sectorNotices[activeSector]} />
        </Card>
      </div>

      {simpleExplanation ? (
        <SimpleExplanationSection
          title={simpleExplanation.title}
          points={simpleExplanation.points}
        />
      ) : null}
    </section>
  );
}
