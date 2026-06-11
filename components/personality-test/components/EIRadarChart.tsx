"use client";

import React from "react";
import { Brain, Zap, Sparkles, Smile, Compass } from "lucide-react";
import { EIResult } from "@/data/EmotionalIntelligence-test";

interface EIRadarChartProps {
  result: EIResult;
}

interface Point {
  x: number;
  y: number;
}

const CENTER = 250;
const R_MAX = 135;
const R_MIN = 30;

// Angles in radians for regular pentagon:
const ANGLES = [
  -Math.PI / 2,
  -Math.PI / 2 + (72 * Math.PI) / 180,
  -Math.PI / 2 + (144 * Math.PI) / 180,
  -Math.PI / 2 + (216 * Math.PI) / 180,
  -Math.PI / 2 + (288 * Math.PI) / 180,
];

const domainsConfig = [
  {
    key: "self-awareness",
    name: "Self-Awareness",
    icon: Brain,
    color: "#3b82f6", // Blue
    textColor: "text-blue-600",
    glowColor: "rgba(59, 130, 246, 0.15)",
    labelPos: { left: "50%", top: "7%" },
  },
  {
    key: "self-regulation",
    name: "Self-Regulation",
    icon: Zap,
    color: "#a855f7", // Purple
    textColor: "text-purple-600",
    glowColor: "rgba(168, 85, 247, 0.15)",
    labelPos: { left: "87%", top: "37%" },
  },
  {
    key: "motivation",
    name: "Motivation",
    icon: Sparkles,
    color: "#eab308", // Yellow
    textColor: "text-amber-500",
    glowColor: "rgba(234, 179, 8, 0.15)",
    labelPos: { left: "73%", top: "82%" },
  },
  {
    key: "empathy",
    name: "Empathy",
    icon: Smile,
    color: "#ec4899", // Pink
    textColor: "text-pink-500",
    glowColor: "rgba(236, 72, 153, 0.15)",
    labelPos: { left: "27%", top: "82%" },
  },
  {
    key: "social-skills",
    name: "Social Skills",
    icon: Compass,
    color: "#10b981", // Emerald
    textColor: "text-emerald-600",
    glowColor: "rgba(16, 185, 129, 0.15)",
    labelPos: { left: "13%", top: "37%" },
  },
];

function getCardinalSplinePath(points: Point[], tension = 0.45): string {
  if (points.length < 3) return "";
  const n = points.length;
  let path = `M ${points[0].x} ${points[0].y}`;

  for (let i = 0; i < n; i++) {
    const p0 = points[(i - 1 + n) % n];
    const p1 = points[i];
    const p2 = points[(i + 1) % n];
    const p3 = points[(i + 2) % n];

    const cp1x = p1.x + ((p2.x - p0.x) / 6) * tension;
    const cp1y = p1.y + ((p2.y - p0.y) / 6) * tension;

    const cp2x = p2.x - ((p3.x - p1.x) / 6) * tension;
    const cp2y = p2.y - ((p3.y - p1.y) / 6) * tension;

    path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }

  return path + " Z";
}

export default function EIRadarChart({ result }: EIRadarChartProps) {
  const getRadius = (score: number) => {
    // Score is from 0.0 to 5.0
    const s = Math.max(0, Math.min(5.0, score));
    return R_MIN + (s / 5.0) * (R_MAX - R_MIN);
  };

  const scorePoints = domainsConfig.map((config, idx) => {
    const domainData = result.domains[config.key];
    const score = domainData ? domainData.trueScore : 2.5;
    const r = getRadius(score);
    return {
      x: CENTER + r * Math.cos(ANGLES[idx]),
      y: CENTER + r * Math.sin(ANGLES[idx]),
    };
  });

  const splinePath = getCardinalSplinePath(scorePoints, 0.45);
  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1.0];

  const outerBorderPoints = ANGLES.map((angle) => {
    const r = 175;
    return `${CENTER + r * Math.cos(angle)},${CENTER + r * Math.sin(angle)}`;
  }).join(" ");

  return (
    <div className="relative w-full max-w-[450px] aspect-square mx-auto my-4 select-none">
      <svg viewBox="0 0 500 500" className="w-full h-full">
        <defs>
          <linearGradient id="eiBlobGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.16" />
            <stop offset="50%" stopColor="#818cf8" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.16" />
          </linearGradient>

          <linearGradient id="eiStrokeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>

          <filter id="eiGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <polygon
          points={outerBorderPoints}
          fill="none"
          stroke="#f1f5f9"
          strokeWidth="1.5"
        />

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

        {splinePath && (
          <path
            d={splinePath}
            fill="url(#eiBlobGrad)"
            stroke="url(#eiStrokeGrad)"
            strokeWidth="3.5"
            filter="url(#eiGlow)"
          />
        )}

        {scorePoints.map((point, idx) => {
          const config = domainsConfig[idx];
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

      {domainsConfig.map((domain, idx) => {
        const Icon = domain.icon;
        const domainData = result.domains[domain.key];
        const score = domainData ? domainData.trueScore : 2.5;

        // Custom status labels based on trueScore
        let levelLabel = "Developing";
        if (score >= 4.0) levelLabel = "Excellent";
        else if (score >= 3.2) levelLabel = "Strong";

        return (
          <div
            key={domain.key}
            style={{
              left: domain.labelPos.left,
              top: domain.labelPos.top,
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center p-2 text-center pointer-events-none"
          >
            <div
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center border border-zinc-100 shadow-xs mb-1 transition-all duration-300 pointer-events-auto hover:scale-110"
              style={{
                boxShadow: `0 4px 14px ${domain.glowColor}`,
              }}
            >
              <Icon size={18} style={{ color: domain.color }} />
            </div>

            <span
              className="text-xs sm:text-sm font-extrabold select-none"
              style={{ color: domain.color }}
            >
              {domain.name}
            </span>

            <span className="text-[9px] sm:text-[10px] font-black tracking-wider text-zinc-500 uppercase select-none">
              {levelLabel} • {score.toFixed(1)}/5
            </span>
          </div>
        );
      })}
    </div>
  );
}
