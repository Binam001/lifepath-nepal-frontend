"use client";

import { useRef } from "react";
import {
  Activity,
  BriefcaseBusiness,
  Building2,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Layers3,
  Megaphone,
  Palette,
  Sparkles,
  Wrench,
} from "lucide-react";
import {
  sectorOptions,
  type FutureSectorKey,
} from "@/constants/future-infographics";

const sectorIcons: Record<
  FutureSectorKey,
  React.ComponentType<{ className?: string; size?: number }>
> = {
  all: Layers3,
  technology: Sparkles,
  design: Palette,
  marketing: Megaphone,
  business: BriefcaseBusiness,
  health: Activity,
  education: GraduationCap,
  infrastructure: Wrench,
  other: Building2,
};

export function SectorSelector({
  activeSector,
  onSelect,
}: {
  activeSector: FutureSectorKey;
  onSelect: (sector: FutureSectorKey) => void;
}) {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scrollByAmount = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;

    container.scrollBy({
      left: direction === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  return (
    <div className="mb-10">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <h3 className="mt-2 text-lg font-semibold tracking-[-0.02em] text-zinc-950">
            Select a sector to explore
          </h3>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <button
          type="button"
          onClick={() => scrollByAmount("left")}
          className="absolute top-1/2 left-0 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 transition-colors hover:border-zinc-300 hover:text-zinc-950 md:inline-flex"
          aria-label="Scroll sectors left"
        >
          <ChevronLeft size={18} />
        </button>

        <div
          ref={scrollRef}
          className="overflow-x-auto scroll-px-14 snap-x snap-mandatory md:px-14 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="inline-flex min-w-max gap-2 md:min-w-full md:justify-center">
            {sectorOptions.map((sector) =>
              (() => {
                const Icon = sectorIcons[sector.key];

                return (
                  <button
                    key={sector.key}
                    type="button"
                    onClick={() => onSelect(sector.key)}
                    className={`group relative snap-start overflow-hidden rounded-full border border-gray-200 px-3 py-2 text-left whitespace-nowrap transition-all duration-200 ${
                      activeSector === sector.key
                        ? "border-blue-600 bg-white  text-zinc-950"
                        : "border-zinc-300 bg-transparent text-zinc-600  hover:border-zinc-200 hover:bg-white hover:text-zinc-900"
                    }`}
                  >
                    <div className="flex items-center justify-center gap-3 text-center">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                          activeSector === sector.key
                            ? "bg-blue-600 text-white"
                            : "bg-white text-zinc-500  group-hover:bg-blue-50 group-hover:text-blue-600"
                        }`}
                      >
                        <Icon size={16} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold leading-none">
                          {sector.label}
                        </p>
                      </div>
                    </div>
                    {/* {activeSector === sector.key ? (
                      <div className="mt-2 h-0.5 w-full rounded-full bg-blue-600" />
                    ) : null} */}
                  </button>
                );
              })(),
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={() => scrollByAmount("right")}
          className="absolute top-1/2 right-0 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 transition-colors hover:border-zinc-300 hover:text-zinc-950 md:inline-flex"
          aria-label="Scroll sectors right"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
