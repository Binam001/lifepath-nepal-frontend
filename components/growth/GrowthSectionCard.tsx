"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";
import type { GrowthDataItem } from "@/constants/growth-data";

type GrowthSectionCardProps = {
  sectionTitle: string;
  item: GrowthDataItem;
  mobileInfoOpen: boolean;
  isAtStart: boolean;
  showNextButton: boolean;
  onToggleInfo: () => void;
  onPrevious: () => void;
  onNext: () => void;
};

export default function GrowthSectionCard({
  sectionTitle,
  item,
  mobileInfoOpen,
  isAtStart,
  showNextButton,
  onToggleInfo,
  onPrevious,
  onNext,
}: GrowthSectionCardProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50">
      <div className="group relative h-[430px]">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className={`object-cover transition duration-500 ${
            mobileInfoOpen
              ? "scale-105 blur-sm"
              : "group-hover:scale-105 group-hover:blur-sm"
          }`}
        />
        <div
          className={`absolute inset-0 bg-black/45 transition-opacity duration-300 ${
            mobileInfoOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
        />

        <button
          type="button"
          onClick={onToggleInfo}
          className="absolute top-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/35 text-white backdrop-blur-sm md:hidden"
          aria-label="Toggle description"
        >
          <Info size={18} />
        </button>

        <div
          className={`flex flex-col items-center justify-center z-10 p-6 text-white transition-all duration-300 ${
            mobileInfoOpen
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
          }`}
        >
          <h2 className="font-montserrat text-2xl font-bold leading-tight">
            {item.title}
          </h2>
          <p className="mt-4 text-sm leading-7 text-white/90">{item.content}</p>
          <div className="mt-5">
            <p className="text-sm font-semibold text-white">{item.author}</p>
            <p className="text-xs tracking-[0.16em] text-white/70 uppercase">
              {item.date}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onPrevious}
          disabled={isAtStart}
          className="absolute left-4 bottom-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/35 text-white backdrop-blur-sm transition-colors hover:bg-black/50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-black/35"
          aria-label={`Previous ${sectionTitle}`}
        >
          <ChevronLeft size={18} />
        </button>

        {showNextButton && (
          <button
            type="button"
            onClick={onNext}
            className="absolute right-4 bottom-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-blue-600/90 text-white backdrop-blur-sm transition-colors hover:bg-blue-700"
            aria-label={`Next ${sectionTitle}`}
          >
            <ChevronRight size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
