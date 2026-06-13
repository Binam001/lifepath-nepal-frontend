"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  CircleDot,
  Clock,
  ExternalLink,
  Flag,
  Lightbulb,
  RotateCcw,
  SkipForward,
  Sparkles,
  X,
} from "lucide-react";
import { RNode } from "../frontend/data";
import { CONTENT, NodeContent } from "../frontend/content";
import { NodeStatus } from "./useProgress";

interface Props {
  node: RNode | null;
  status: NodeStatus;
  onClose: () => void;
  onSetStatus: (status: NodeStatus) => void;
  contentMap?: Record<string, NodeContent>;
}

const kindLabel: Record<string, string> = {
  official: "Official",
  article: "Article",
  video: "Video",
  course: "Course",
  opensource: "Open Source",
};

const kindStyle: Record<string, string> = {
  official: "bg-emerald-100 text-emerald-800",
  article: "bg-blue-100 text-blue-800",
  video: "bg-rose-100 text-rose-800",
  course: "bg-amber-100 text-amber-800",
  opensource: "bg-zinc-100 text-zinc-800",
};

export default function NodeDrawer({
  node,
  status,
  onClose,
  onSetStatus,
  contentMap,
}: Props) {
  const content = node ? (contentMap ? contentMap[node.id] : CONTENT[node.id]) : undefined;
  const resources = content?.resources ?? node?.resources ?? [];
  const sortedResources = [...resources].sort((a, b) => {
    const aOfficial = (a.kind ?? "article") === "official" ? 0 : 1;
    const bOfficial = (b.kind ?? "article") === "official" ? 0 : 1;
    return aOfficial - bOfficial;
  });
  const hasOfficialDocs = sortedResources.some(
    (resource) => (resource.kind ?? "article") === "official",
  );

  return (
    <AnimatePresence>
      {node && (
        <>
          {/* backdrop */}
          <motion.div
            key="bd"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-blue-950/40 backdrop-blur-[2px]"
            onClick={onClose}
          />
          {/* drawer */}
          <motion.aside
            key="dr"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="fixed right-0 top-0 z-50 flex h-screen w-full max-w-md flex-col bg-white shadow-2xl"
            data-lenis-prevent
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-zinc-200 bg-gradient-to-br from-blue-700 to-blue-900 px-6 py-6 text-white">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-blue-200">
                  Roadmap topic
                </p>
                <h2 className="mt-1 text-2xl font-bold leading-tight">
                  {node.title}
                </h2>
                {content?.effort && (
                  <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-blue-500/30 px-2.5 py-0.5 text-xs font-medium text-blue-50">
                    <Clock className="h-3 w-3" />
                    {content.effort}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="rounded-full p-2 text-blue-100 hover:bg-white/10 hover:text-white transition cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Status pills */}
            <div className="flex flex-wrap items-center gap-2 border-b border-zinc-200 bg-zinc-50 px-6 py-4">
              <StatusPill
                active={status === "done"}
                color="emerald"
                icon={<Check className="h-4 w-4" />}
                label="Done"
                onClick={() =>
                  onSetStatus(status === "done" ? "pending" : "done")
                }
              />
              <StatusPill
                active={status === "learning"}
                color="amber"
                icon={<CircleDot className="h-4 w-4" />}
                label="Learning"
                onClick={() =>
                  onSetStatus(status === "learning" ? "pending" : "learning")
                }
              />
              <StatusPill
                active={status === "skipped"}
                color="zinc"
                icon={<SkipForward className="h-4 w-4" />}
                label="Skip"
                onClick={() =>
                  onSetStatus(status === "skipped" ? "pending" : "skipped")
                }
              />
              {status !== "pending" && (
                <button
                  type="button"
                  onClick={() => onSetStatus("pending")}
                  className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-600 hover:bg-zinc-50 cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Reset
                </button>
              )}
            </div>

            {/* Body */}
            <div
              className="flex-1 overflow-y-auto overscroll-contain px-6 py-6 [touch-action:pan-y]"
              data-lenis-prevent
            >
              {/* Description */}
              {content?.description ? (
                <p className="text-[15px] leading-relaxed text-zinc-700">
                  {content.description}
                </p>
              ) : node.description ? (
                <p className="text-[15px] leading-relaxed text-zinc-700">
                  {node.description}
                </p>
              ) : (
                <p className="text-[15px] italic text-zinc-500">
                  A focused topic on your learning journey. Mark it once
                  you&apos;ve covered the basics and feel comfortable building
                  with it.
                </p>
              )}

              {/* Where to begin */}
              {content?.howToBegin && content.howToBegin.length > 0 && (
                <section className="mt-7 rounded-2xl border border-blue-100 bg-blue-50/60 p-5">
                  <div className="flex items-center gap-2">
                    <Flag className="h-4 w-4 text-blue-700" />
                    <h3 className="text-sm font-bold uppercase tracking-wider text-blue-900">
                      Where to begin
                    </h3>
                  </div>
                  <ol className="mt-3 space-y-2.5">
                    {content.howToBegin.map((step, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm leading-relaxed text-blue-950"
                      >
                        <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600 text-[11px] font-bold text-white">
                          {i + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </section>
              )}

              {/* Resources */}
              {sortedResources.length > 0 && (
                <section className="mt-7">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-blue-700" />
                    <h3 className="text-sm font-bold uppercase tracking-wider text-blue-900">
                      Recommended resources
                    </h3>
                  </div>
                  <ul className="mt-3 space-y-1.5">
                    {sortedResources.map((r) => {
                      const kind = r.kind ?? "article";
                      return (
                        <li key={r.url}>
                          <a
                            href={r.url}
                            target="_blank"
                            rel="noreferrer"
                            className="group flex items-center gap-2 rounded-md border border-zinc-200 bg-white px-2.5 py-1.5 transition hover:border-blue-600 hover:bg-blue-50/50"
                          >
                            <span
                              className={`shrink-0 rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${kindStyle[kind]}`}
                            >
                              {kindLabel[kind]}
                            </span>
                            <span className="text-sm font-medium text-zinc-800 underline underline-offset-2 group-hover:text-blue-900">
                              {r.label}
                            </span>
                            <ExternalLink className="ml-auto h-3.5 w-3.5 shrink-0 text-zinc-400 group-hover:text-blue-700" />
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                  {!hasOfficialDocs && (
                    <p className="mt-2 text-xs text-zinc-500">
                      No official docs linked for this topic yet.
                    </p>
                  )}
                </section>
              )}

              {/* Pro tip */}
              <section className="mt-8 rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-white px-5 py-4">
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-blue-700" />
                  <p className="text-xs font-bold uppercase tracking-wider text-blue-900">
                    Pro tip
                  </p>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-blue-950">
                  Don&apos;t just read about it, build a tiny project that uses
                  this concept. The roadmap is a map, but your portfolio is the
                  journey.
                </p>
              </section>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function StatusPill({
  active,
  color,
  icon,
  label,
  onClick,
}: {
  active: boolean;
  color: "emerald" | "amber" | "zinc";
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  const styles = {
    emerald: active
      ? "bg-emerald-600 text-white border-emerald-700"
      : "border-emerald-300 bg-white text-emerald-700 hover:bg-emerald-50",
    amber: active
      ? "bg-amber-500 text-white border-amber-600"
      : "border-amber-300 bg-white text-amber-800 hover:bg-amber-50",
    zinc: active
      ? "bg-zinc-800 text-white border-zinc-900"
      : "border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-100",
  }[color];

  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full border-[1.5px] px-3 py-1.5 text-sm font-semibold transition cursor-pointer ${styles}`}
    >
      {icon}
      {label}
    </button>
  );
}
