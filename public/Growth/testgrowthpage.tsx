"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";
import PageTitle from "@/components/ui/PageTitle";
import {
  growthData,
  type GrowthContentType,
  type GrowthDataItem,
} from "@/constants/growth-data";

type SectionType = Extract<
  GrowthContentType,
  "advice" | "solution" | "value of the day"
>;

const sections: Array<{
  title: string;
  subtitle: string;
  type: SectionType;
}> = [
  {
    title: "Advice of the day",
    subtitle:
      "A short, practical insight to guide your thinking and decisions today.",
    type: "advice",
  },
  {
    title: "Solution of the day",
    subtitle:
      "Simple, actionable solutions to real problems in growth, life, and work.",
    type: "solution",
  },
  {
    title: "Value of the day",
    subtitle:
      "A grounded daily value to shape your mindset and decisions.",
    type: "value of the day",
  },
];

const TODAY = "2026-03-23";

const contentByType = sections.reduce<Record<SectionType, GrowthDataItem[]>>(
  (acc, section) => {
    acc[section.type] = growthData
      .filter((item) => item.type === section.type)
      .sort((a, b) => a.date.localeCompare(b.date));
    return acc;
  },
  {
    advice: [],
    solution: [],
    "value of the day": [],
  },
);

export default function GrowthPage() {
  const [indices, setIndices] = useState<Record<SectionType, number>>({
    advice: Math.max(contentByType.advice.length - 1, 0),
    solution: Math.max(contentByType.solution.length - 1, 0),
    "value of the day": Math.max(contentByType["value of the day"].length - 1, 0),
  });
  const [mobileInfoOpen, setMobileInfoOpen] = useState<
    Record<SectionType, boolean>
  >({
    advice: false,
    solution: false,
    "value of the day": false,
  });

  const moveIndex = (type: SectionType, direction: -1 | 1) => {
    const items = contentByType[type];
    if (items.length === 0) return;

    setIndices((prev) => ({
      ...prev,
      [type]: Math.min(Math.max(prev[type] + direction, 0), items.length - 1),
    }));
  };

  const toggleMobileInfo = (type: SectionType) => {
    setMobileInfoOpen((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  return (
    <main className="bg-white pt-16">
      <div className="bg-linear-to-r from-blue-600 to-black px-4 py-8 text-white md:px-0">
        <PageTitle
          title="Improve yourself 1% a day"
          subtitle="Daily advice, practical solutions, and grounded values presented one section at a time."
          titleClassName="text-2xl md:text-4xl font-bold text-white mb-4"
          subtitleClassName="text-lg text-blue-100 mb-6"
          containerClassName="text-center max-w-3xl mx-auto"
        />
      </div>

      <section className="mx-auto max-w-7xl px-4 py-10 md:px-0 md:py-24">
        <div className="grid gap-8 lg:grid-cols-3">
          {sections.map((section) => {
            const items = contentByType[section.type];
            const currentIndex = indices[section.type];
            const currentItem = items[currentIndex];
            const isAtStart = currentIndex === 0;
            const isAtLatestItem =
              currentIndex === items.length - 1 && currentItem?.date === TODAY;

            if (!currentItem) return null;

            return (
              <section key={section.type} className="flex flex-col">
                <div className="mb-5">
                  <p className="text-3xl text-center font-montserrat font-semibold tracking-relaxed text-blue-500">
                    {section.title}
                  </p>
                </div>

                <div className="overflow-hidden flex items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50">
                  <div className="group relative h-[430px]">
                    <Image
                      src={currentItem.image}
                      alt={currentItem.title}
                      fill
                      className={`object-cover transition duration-500 ${
                        mobileInfoOpen[section.type]
                          ? "scale-105 blur-sm"
                          : "group-hover:scale-105 group-hover:blur-sm"
                      }`}
                    />
                    <div
                      className={`absolute inset-0 bg-black/45 transition-opacity duration-300 ${
                        mobileInfoOpen[section.type]
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-100"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => toggleMobileInfo(section.type)}
                      className="absolute top-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/35 text-white backdrop-blur-sm md:hidden"
                      aria-label="Toggle description"
                    >
                      <Info size={18} />
                    </button>

                    <div
                      className={`flex flex-col items-center justify-center z-10 p-6 text-white transition-all duration-300 ${
                        mobileInfoOpen[section.type]
                          ? "translate-y-0 opacity-100"
                          : "translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                      }`}
                    >
                      <h2 className="font-montserrat text-2xl font-bold leading-tight">
                        {currentItem.title}
                      </h2>
                      <p className="mt-4 text-sm leading-7 text-white/90">
                        {currentItem.content}
                      </p>
                      <div className="mt-5">
                        <p className="text-sm font-semibold text-white">
                          {currentItem.author}
                        </p>
                        <p className="text-xs tracking-[0.16em] text-white/70 uppercase">
                          {currentItem.date}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => moveIndex(section.type, -1)}
                      disabled={isAtStart}
                      className="absolute left-4 bottom-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/35 text-white backdrop-blur-sm transition-colors hover:bg-black/50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-black/35"
                      aria-label={`Previous ${section.title}`}
                    >
                      <ChevronLeft size={18} />
                    </button>
                    {!isAtLatestItem && (
                      <button
                        type="button"
                        onClick={() => moveIndex(section.type, 1)}
                        className="absolute right-4 bottom-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-blue-600/90 text-white backdrop-blur-sm transition-colors hover:bg-blue-700"
                        aria-label={`Next ${section.title}`}
                      >
                        <ChevronRight size={18} />
                      </button>
                    )}
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </section>
    </main>
  );
}
