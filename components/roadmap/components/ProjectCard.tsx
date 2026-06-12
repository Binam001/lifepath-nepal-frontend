"use client";

import { Clock, Lock, Rocket } from "lucide-react";
import { CANVAS_W } from "../frontend/data";
import { ProjectIdea } from "../frontend/projects";

interface Props {
  project: ProjectIdea;
  unlocked: boolean;
}

const CARD_W = 240;
const RAIL_PAD = 18;

export default function ProjectCard({ project, unlocked }: Props) {
  const left =
    project.side === "left" ? RAIL_PAD : CANVAS_W - CARD_W - RAIL_PAD;

  return (
    <div
      className="absolute"
      style={{
        left,
        top: project.y,
        width: CARD_W,
      }}
    >
      {/* "Project idea" label tab */}
      <div
        className={`inline-flex items-center gap-1.5 rounded-t-md px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${
          unlocked ? "bg-emerald-600 text-white" : "bg-zinc-400 text-white"
        }`}
      >
        {unlocked ? (
          <Rocket className="h-3 w-3" />
        ) : (
          <Lock className="h-3 w-3" />
        )}
        Project idea
      </div>

      <div
        className={`relative overflow-hidden rounded-md rounded-tl-none border-2 bg-white shadow-[3px_3px_0_#1e3a8a] transition ${
          unlocked
            ? "border-emerald-600"
            : "border-zinc-300 opacity-70 grayscale"
        }`}
      >
        {!unlocked && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/85 backdrop-blur-[1px] px-3 text-center">
            <Lock className="h-5 w-5 text-zinc-500" />
            <p className="mt-1 text-[11px] font-semibold text-zinc-700 leading-snug">
              {project.unlock.description}
            </p>
          </div>
        )}

        <div className="p-3.5">
          <h4 className="text-[15px] font-bold leading-tight text-blue-950">
            {project.title}
          </h4>
          <p className="mt-1.5 inline-flex items-center gap-1 text-[10px] font-medium text-zinc-500">
            <Clock className="h-3 w-3" />
            {project.effort}
          </p>
          <p className="mt-2 text-[12px] leading-snug text-zinc-700">
            {project.pitch}
          </p>

          <ol className="mt-2.5 space-y-1.5">
            {project.steps.map((s, i) => (
              <li
                key={i}
                className="flex items-start gap-1.5 text-[11px] leading-snug text-blue-950"
              >
                <span className="mt-0.5 inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[9px] font-bold text-emerald-700">
                  {i + 1}
                </span>
                <span>{s}</span>
              </li>
            ))}
          </ol>

          <div className="mt-3 flex flex-wrap gap-1">
            {project.stack.map((s) => (
              <span
                key={s}
                className="rounded bg-blue-50 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-blue-700"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
