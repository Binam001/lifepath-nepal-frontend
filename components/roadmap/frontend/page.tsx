"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Code2,
  Download,
  RotateCcw,
  Search,
  Sparkles,
} from "lucide-react";
import PageTitle from "@/components/ui/PageTitle";
import { NODES } from "./data";
import { useProgress } from "../components/useProgress";
import RoadmapCanvas from "../components/RoadmapCanvas";
import NodeDrawer from "../components/NodeDrawer";

export default function FrontendRoadmapPage() {
  const { getStatus, setStatus, progress, reset } = useProgress();
  const [openId, setOpenId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past 100px
        setIsHeaderVisible(false);
      } else {
        // Scrolling up
        setIsHeaderVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const trackable = useMemo(
    () => NODES.filter((n) => n.variant !== "title" && n.variant !== "phase"),
    [],
  );
  const doneCount = useMemo(
    () => trackable.filter((n) => progress[n.id] === "done").length,
    [trackable, progress],
  );
  const learningCount = useMemo(
    () => trackable.filter((n) => progress[n.id] === "learning").length,
    [trackable, progress],
  );
  const pct = trackable.length
    ? Math.round((doneCount / trackable.length) * 100)
    : 0;

  const filtered = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return trackable
      .filter((n) => n.title.toLowerCase().includes(q))
      .slice(0, 8);
  }, [query, trackable]);

  const openNode = NODES.find((n) => n.id === openId) ?? null;

  return (
    <div className="min-h-screen bg-zinc-50 pt-16">
      {/* ---------------- Hero ---------------- */}
      <section className="relative overflow-hidden border-b border-blue-900 bg-linear-to-l from-blue-600 to-black text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "radial-gradient(circle, #60a5fa 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-12 md:py-16">
          <Link
            href="/roadmap"
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-200 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            All roadmaps
          </Link>

          <div className="mt-6 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-300/30 bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-100">
                <Sparkles className="h-3.5 w-3.5" />
                Career Roadmap · Frontend
              </div>
              <div className="mt-4">
                <PageTitle
                  title="Become a Frontend Developer"
                  subtitle="Step-by-step path from the basics of the web all the way to shipping production React apps. Click any topic to read a starter guide, find resources and mark your progress — your status is saved on this device."
                  titleClassName="text-3xl md:text-5xl font-bold text-white leading-tight mb-3"
                  subtitleClassName="text-base text-blue-100 md:text-lg max-w-2xl"
                  containerClassName="max-w-3xl"
                  align="left"
                />
              </div>
            </div>

            {/* Progress card */}
            <div className="w-full max-w-sm rounded-2xl border border-blue-400/30 bg-blue-950/60 p-5 backdrop-blur">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-blue-200">
                    Your progress
                  </p>
                  <p className="mt-1 text-3xl font-black text-white">{pct}%</p>
                </div>
                <button
                  onClick={() => {
                    if (confirm("Reset all progress on this roadmap?")) reset();
                  }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-blue-400/40 px-3 py-1.5 text-xs font-medium text-blue-100 hover:bg-blue-900/60 cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Reset
                </button>
              </div>
              <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-blue-900/60">
                <div
                  className="h-full rounded-full bg-linear-to-r from-blue-300 to-emerald-400 transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-blue-100">
                <span>
                  <span className="font-bold text-emerald-300">
                    {doneCount}
                  </span>{" "}
                  done
                </span>
                <span>
                  <span className="font-bold text-amber-300">
                    {learningCount}
                  </span>{" "}
                  in progress
                </span>
                <span>
                  <span className="font-bold text-white">
                    {trackable.length}
                  </span>{" "}
                  total
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Toolbar ---------------- */}
      <div className={`sticky z-30 border-b border-zinc-200 bg-white/90 backdrop-blur transition-all duration-300 ${
        isHeaderVisible ? "top-16" : "top-0"
      }`}>
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between">
          <Legend />

          <div className="flex w-full max-w-md items-center gap-2">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search topics (e.g. React, CSS, Auth)"
                className="w-full rounded-full border border-zinc-200 bg-white py-2 pl-9 pr-4 text-sm placeholder:text-zinc-400 focus:border-blue-600 focus:outline-none"
              />
              {filtered.length > 0 && (
                <div className="absolute left-0 right-0 top-full z-40 mt-2 max-h-72 overflow-y-auto rounded-xl border border-zinc-200 bg-white shadow-xl">
                  {filtered.map((n) => (
                    <button
                      key={n.id}
                      onClick={() => {
                        setOpenId(n.id);
                        setQuery("");
                      }}
                      className="flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-sm hover:bg-blue-50"
                    >
                      <span className="font-medium text-zinc-900">
                        {n.title}
                      </span>
                      <span className="text-xs text-zinc-400">
                        {getStatus(n.id) === "done"
                          ? "Done"
                          : getStatus(n.id) === "learning"
                            ? "Learning"
                            : "—"}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={() => {
                const blob = new Blob([JSON.stringify(progress, null, 2)], {
                  type: "application/json",
                });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "frontend-roadmap-progress.json";
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="hidden md:inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-3 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 cursor-pointer"
            >
              <Download className="h-4 w-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* ---------------- Canvas ---------------- */}
      <section className="mx-auto max-w-[1120px] py-10">
        <RoadmapCanvas
          getStatus={getStatus}
          progress={progress}
          onNodeClick={setOpenId}
        />
      </section>

      {/* ---------------- Footer CTA ---------------- */}
      <section className="border-t border-zinc-200 bg-white py-14">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            <Code2 className="h-3.5 w-3.5" />
            Ready to apply this in the real world?
          </div>
          <h2
            className="mt-4 text-3xl font-semibold text-blue-600 md:text-4xl"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Find a frontend role on LifePath
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-zinc-600">
            We curate the best frontend jobs and internships in Nepal — from
            startups to established product teams. Take what you&apos;ve learned
            here straight into your first (or next) job.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/jobs"
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Browse Frontend Jobs
            </Link>
            <Link
              href="/grow"
              className="inline-flex items-center gap-2 rounded-full border border-blue-300 bg-white px-6 py-3 text-sm font-semibold text-blue-700 hover:bg-blue-50"
            >
              Get Career Guidance
            </Link>
          </div>
        </div>
      </section>

      {/* Drawer */}
      <NodeDrawer
        node={openNode}
        status={openId ? getStatus(openId) : "pending"}
        onClose={() => setOpenId(null)}
        onSetStatus={(s) => openId && setStatus(openId, s)}
      />
    </div>
  );
}

// ---------------- Legend ----------------
function Legend() {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-zinc-700">
      <LegendItem swatch="bg-blue-600 border-blue-900" label="Primary topic" />
      <LegendItem
        swatch="bg-white border-blue-800 border-[2px]"
        label="Recommended"
      />
      <LegendItem
        swatch="bg-sky-50 border-sky-300 border-[2px]"
        label="Alternative"
      />
      <LegendItem
        swatch="bg-zinc-50 border-zinc-300 border-[2px] border-dashed"
        label="Optional"
      />
      <span className="hidden h-5 w-px bg-zinc-200 md:inline-block" />
      <LegendItem
        swatch="bg-emerald-200 border-emerald-600 border-[2px]"
        label="Done"
      />
      <LegendItem swatch="bg-white ring-2 ring-amber-400" label="Learning" />
    </div>
  );
}

function LegendItem({ swatch, label }: { swatch: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`inline-block h-3.5 w-7 rounded-sm ${swatch}`} />
      {label}
    </span>
  );
}
