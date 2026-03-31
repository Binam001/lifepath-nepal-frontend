"use client";

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

export const chartPalette = [
  "#165DFF",
  "#00B8D9",
  "#36B37E",
  "#FF8B00",
  "#6554C0",
  "#FF5630",
];

function normalizeValue(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9+]/g, "");
}

function getScore(value: string, fallback: number) {
  return qualitativeScoreMap[normalizeValue(value)] ?? fallback;
}

export function formatStatScore(index: number, value: string) {
  return getScore(value, 84 - index * 10);
}

export function chartSx() {
  return {
    "& .MuiChartsAxis-line, & .MuiChartsAxis-tick": { stroke: "#d4d4d8" },
    "& .MuiChartsAxis-tickLabel, & .MuiChartsLegend-label, & .MuiChartsTooltip-root":
      {
        fill: "#52525b",
      },
    "& .MuiChartsGrid-line": { stroke: "#f4f4f5" },
  };
}
