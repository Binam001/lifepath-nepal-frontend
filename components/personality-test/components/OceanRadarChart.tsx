"use client";

import React from "react";
import { Sparkles, Target, Flame, HeartHandshake, Waves } from "lucide-react";
import { getOceanTier, traitTierLabels, type Trait } from "@/data/OCEAN-data";

interface OceanRadarChartProps {
  scores: Record<string, number>;
}

interface Point {
  x: number;
  y: number;
}

const CENTER = 250;
const R_MAX = 135;
const R_MIN = 30;

// Angles in radians for regular pentagon (0 is straight up, rotating clockwise):
// 0: Top (-90 deg)
// 1: Right (-18 deg)
// 2: Bottom Right (54 deg)
// 3: Bottom Left (126 deg)
// 4: Left (198 deg)
const ANGLES = [
  -Math.PI / 2,
  -Math.PI / 2 + (72 * Math.PI) / 180,
  -Math.PI / 2 + (144 * Math.PI) / 180,
  -Math.PI / 2 + (216 * Math.PI) / 180,
  -Math.PI / 2 + (288 * Math.PI) / 180,
];

const traitsConfig = [
  {
    key: "O",
    name: "Openness",
    icon: Sparkles,
    color: "#3b82f6", // Blue
    textColor: "text-blue-600",
    glowColor: "rgba(59, 130, 246, 0.15)",
    labelPos: { left: "50%", top: "7%" },
  },
  {
    key: "C",
    name: "Discipline",
    icon: Target,
    color: "#22c55e", // Green
    textColor: "text-green-600",
    glowColor: "rgba(34, 197, 94, 0.15)",
    labelPos: { left: "87%", top: "37%" },
  },
  {
    key: "E",
    name: "Extravert",
    icon: Flame,
    color: "#eab308", // Amber
    textColor: "text-amber-500",
    glowColor: "rgba(234, 179, 8, 0.15)",
    labelPos: { left: "73%", top: "82%" },
  },
  {
    key: "A",
    name: "Empathy",
    icon: HeartHandshake,
    color: "#f87171", // Red
    textColor: "text-red-500",
    glowColor: "rgba(248, 113, 113, 0.15)",
    labelPos: { left: "27%", top: "82%" },
  },
  {
    key: "N",
    name: "Sensitive",
    icon: Waves,
    color: "#a855f7", // Purple
    textColor: "text-purple-600",
    glowColor: "rgba(168, 85, 247, 0.15)",
    labelPos: { left: "13%", top: "37%" },
  },
];

/**
 * Generates a closed Catmull-Rom cardinal spline path for an array of points.
 */
function getCardinalSplinePath(points: Point[], tension = 0.45): string {
  if (points.length < 3) return "";
  const n = points.length;
  let path = `M ${points[0].x} ${points[0].y}`;

  for (let i = 0; i < n; i++) {
    const p0 = points[(i - 1 + n) % n];
    const p1 = points[i];
    const p2 = points[(i + 1) % n];
    const p3 = points[(i + 2) % n];

    // Compute Control Points
    const cp1x = p1.x + ((p2.x - p0.x) / 6) * tension;
    const cp1y = p1.y + ((p2.y - p0.y) / 6) * tension;

    const cp2x = p2.x - ((p3.x - p1.x) / 6) * tension;
    const cp2y = p2.y - ((p3.y - p1.y) / 6) * tension;

    path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }

  return path + " Z";
}

export default function OceanRadarChart({ scores }: OceanRadarChartProps) {
  const getRadius = (score: number) => {
    const s = Math.max(0, Math.min(100, score));
    return R_MIN + (s / 100) * (R_MAX - R_MIN);
  };

  // User score coordinates
  const scorePoints = traitsConfig.map((config, idx) => {
    const score = scores[config.key] ?? 50;
    const r = getRadius(score);
    return {
      x: CENTER + r * Math.cos(ANGLES[idx]),
      y: CENTER + r * Math.sin(ANGLES[idx]),
    };
  });

  const splinePath = getCardinalSplinePath(scorePoints, 0.45);

  // Concentric pentagon grids
  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1.0];

  // Outer constellation border matching the label positions (approx. R = 175)
  const outerBorderPoints = ANGLES.map((angle) => {
    const r = 175;
    return `${CENTER + r * Math.cos(angle)},${CENTER + r * Math.sin(angle)}`;
  }).join(" ");

  return (
    <div className="relative w-full max-w-[450px] aspect-square mx-auto my-4 select-none">
      {/* SVG Radar Visuals */}
      <svg viewBox="0 0 500 500" className="w-full h-full">
        <defs>
          {/* User Score Fill Gradient */}
          <linearGradient id="blobGradLight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.16" />
            <stop offset="50%" stopColor="#818cf8" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.16" />
          </linearGradient>

          {/* User Score Stroke Gradient */}
          <linearGradient id="strokeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>

          {/* Glowing Stroke Filter */}
          <filter id="glowLight" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer Constellation Polygon */}
        <polygon
          points={outerBorderPoints}
          fill="none"
          stroke="#f1f5f9"
          strokeWidth="1.5"
        />

        {/* Concentric Pentagon Grids */}
        {gridLevels.map((level, idx) => {
          const points = ANGLES.map((angle) => {
            const r = R_MIN + level * (R_MAX - R_MIN);
            return `${CENTER + r * Math.cos(angle)},${CENTER + r * Math.sin(angle)}`;
          }).join(" ");

          return (
            <polygon
              key={idx}
              points={points}
              fill="none"
              stroke="#e2e8f0"
              strokeWidth={level === 1.0 ? "1.5" : "1"}
              strokeDasharray={level === 1.0 ? "none" : "2,3"}
            />
          );
        })}

        {/* Radiating Axis Lines */}
        {ANGLES.map((angle, idx) => (
          <line
            key={idx}
            x1={CENTER}
            y1={CENTER}
            x2={CENTER + R_MAX * Math.cos(angle)}
            y2={CENTER + R_MAX * Math.sin(angle)}
            stroke="#e2e8f0"
            strokeWidth="1"
            strokeDasharray="2,2"
          />
        ))}

        {/* User Score Curved Polygon Spline */}
        {splinePath && (
          <path
            d={splinePath}
            fill="url(#blobGradLight)"
            stroke="url(#strokeGrad)"
            strokeWidth="3.5"
            filter="url(#glowLight)"
          />
        )}

        {/* Vertices Dots */}
        {scorePoints.map((point, idx) => {
          const config = traitsConfig[idx];
          return (
            <circle
              key={idx}
              cx={point.x}
              cy={point.y}
              r="6.5"
              fill="#ffffff"
              stroke={config.color}
              strokeWidth="3.5"
              className="drop-shadow-xs"
            />
          );
        })}
      </svg>

      {/* HTML Absolute Placed Labels */}
      {traitsConfig.map((trait, idx) => {
        const Icon = trait.icon;
        const score = scores[trait.key] ?? 50;
        const tier = getOceanTier(score);
        const tierLabel = traitTierLabels[trait.key as Trait][tier];

        return (
          <div
            key={trait.key}
            style={{
              left: trait.labelPos.left,
              top: trait.labelPos.top,
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center p-2 text-center pointer-events-none"
          >
            {/* Icon Bubble */}
            <div
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center border border-zinc-100 shadow-xs mb-1 transition-all duration-300 pointer-events-auto hover:scale-110"
              style={{
                boxShadow: `0 4px 14px ${trait.glowColor}`,
              }}
            >
              <Icon size={18} style={{ color: trait.color }} />
            </div>

            {/* Trait Name */}
            <span
              className="text-xs sm:text-sm font-extrabold select-none"
              style={{ color: trait.color }}
            >
              {trait.name}
            </span>

            {/* Trait Level / Score */}
            <span className="text-[9px] sm:text-[10px] font-black tracking-wider text-zinc-500 uppercase select-none">
              {tierLabel} • {score}%
            </span>
          </div>
        );
      })}
    </div>
  );
}
