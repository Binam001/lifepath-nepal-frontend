"use client";

import { useMemo, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CANVAS_H, CANVAS_W, EDGES, NODES, RNode } from "../frontend/data";
import { isUnlocked, PROJECTS } from "../frontend/projects";
import { NodeStatus } from "./useProgress";
import ProjectCard from "./ProjectCard";
import RoadmapNode from "./RoadmapNode";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface Props {
  getStatus: (id: string) => NodeStatus;
  progress: Record<string, NodeStatus>;
  onNodeClick: (id: string) => void;
}

// Visual size = canvas size × SCALE. Internal coordinates stay unchanged.
const SCALE = 0.75;

export default function RoadmapCanvas({
  getStatus,
  progress,
  onNodeClick,
}: Props) {
  const nodeMap = useMemo(() => {
    const m = new Map<string, RNode>();
    for (const n of NODES) m.set(n.id, n);
    return m;
  }, []);

  const doneCount = useMemo(
    () => Object.values(progress).filter((s) => s === "done").length,
    [progress],
  );

  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // ---------- GSAP: draw SVG paths in as the user scrolls ----------
  useGSAP(
    () => {
      if (!svgRef.current) return;
      const paths = svgRef.current.querySelectorAll<SVGPathElement>(
        "path[data-roadmap-path]",
      );
      paths.forEach((path) => {
        const length = path.getTotalLength();
        if (!length) return;
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: path,
            start: "top 90%",
            end: "top 55%",
            scrub: 0.6,
          },
        });
      });
      // Animate phase headers up on enter
      const phaseEls = containerRef.current?.querySelectorAll(
        "[data-roadmap-phase]",
      );
      phaseEls?.forEach((el) => {
        gsap.from(el, {
          y: 24,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });
      });
    },
    { scope: containerRef },
  );

  return (
    <div className="w-full overflow-x-auto" data-lenis-prevent>
      {/* Outer container takes the SCALED dimensions, so the page reserves
          the correct vertical space and centers horizontally. */}
      <div
        className="mx-auto"
        style={{ width: CANVAS_W * SCALE, height: CANVAS_H * SCALE }}
      >
        {/* Inner container keeps original 1:1 coordinates so all our (x, y)
            values from data.ts still work, then visually scales down. */}
        <div
          ref={containerRef}
          className="relative"
          style={{
            width: CANVAS_W,
            height: CANVAS_H,
            transform: `scale(${SCALE})`,
            transformOrigin: "top left",
          }}
        >
          {/* Decorative dot grid background */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.18]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #93c5fd 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* SVG edges — animated draw-in by GSAP */}
          <svg
            ref={svgRef}
            width={CANVAS_W}
            height={CANVAS_H}
            viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
            className="absolute inset-0 pointer-events-none"
          >
            <defs>
              <marker
                id="arrow"
                viewBox="0 0 10 10"
                refX="6"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#1e3a8a" />
              </marker>
            </defs>

            {EDGES.map((e, i) => {
              if (!e.path) return null;
              const isCross = e.kind === "cross";
              return (
                <path
                  key={i}
                  data-roadmap-path
                  d={e.path}
                  stroke={e.color ?? "#1e3a8a"}
                  strokeWidth={isCross ? 1.25 : 2}
                  fill="none"
                  strokeDasharray={
                    e.dashed ? (isCross ? "4 8" : "6 6") : undefined
                  }
                  opacity={isCross ? 0.52 : 1}
                  strokeLinecap="round"
                />
              );
            })}
          </svg>

          {/* HTML overlay for clickable nodes */}
          {NODES.map((n) => (
            <div
              key={n.id}
              data-roadmap-phase={n.variant === "phase" ? "" : undefined}
            >
              <RoadmapNode
                node={n}
                status={
                  n.variant === "phase" || n.variant === "title"
                    ? "pending"
                    : getStatus(n.id)
                }
                onClick={onNodeClick}
              />
            </div>
          ))}

          {/* Project idea cards */}
          {PROJECTS.map((p) => (
            <ProjectCard
              key={p.id}
              project={p}
              unlocked={isUnlocked(p, progress, doneCount)}
            />
          ))}

          {/* Floating helper near title */}
          <div
            className="absolute pointer-events-none text-[11px] font-semibold text-blue-600 italic"
            style={{ left: CANVAS_W / 2 + 230, top: 50, width: 220 }}
          >
            ← click any topic to mark
            <br /> your progress
          </div>

          <span className="sr-only">{nodeMap.size} topics</span>
        </div>
      </div>
    </div>
  );
}
