"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Info,
  Lightbulb,
  CheckCircle2,
  Quote as QuoteIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PageTitle from "@/components/ui/PageTitle";
import { growthData, type GrowthDataItem } from "@/constants/growth-data";

type SectionType = GrowthDataItem["type"];

interface SectionConfig {
  title: string;
  subtitle: string;
  type: SectionType;
  accentColor: "emerald" | "indigo" | "amber";
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
}

const sections: SectionConfig[] = [
  {
    title: "Advice of the day",
    subtitle: "Practical insights to guide your growth journey.",
    type: "advice",
    accentColor: "emerald",
    icon: Lightbulb,
    label: "Growth Advice",
  },
  {
    title: "Solution of the day",
    subtitle: "Actionable steps to solve real-world problems.",
    type: "solution",
    accentColor: "indigo",
    icon: CheckCircle2,
    label: "Life Solution",
  },
  {
    title: "Quote of the day",
    subtitle: "Powerful words to shift your perspective.",
    type: "quote",
    accentColor: "amber",
    icon: QuoteIcon,
    label: "Daily Quote",
  },
];

const TODAY = "2026-03-24";

const contentByType = sections.reduce<Record<SectionType, GrowthDataItem[]>>(
  (acc, section) => {
    acc[section.type] = growthData
      .filter((item) => item.type === section.type && item.date <= TODAY)
      .sort((a, b) => a.date.localeCompare(b.date));
    return acc;
  },
  {
    advice: [],
    solution: [],
    quote: [],
  },
);

export default function GrowthPage() {
  const [indices, setIndices] = useState<Record<SectionType, number>>({
    advice: Math.max(contentByType.advice.length - 1, 0),
    solution: Math.max(contentByType.solution.length - 1, 0),
    quote: Math.max(contentByType.quote.length - 1, 0),
  });

  const moveIndex = (type: SectionType, direction: -1 | 1) => {
    const items = contentByType[type];
    if (items.length === 0) return;

    setIndices((prev) => ({
      ...prev,
      [type]: Math.min(Math.max(prev[type] + direction, 0), items.length - 1),
    }));
  };

  const getAccentClass = (
    accent: "emerald" | "indigo" | "amber",
    type: "bg" | "text" | "border" | "lightBg",
  ) => {
    const map: Record<
      "emerald" | "indigo" | "amber",
      Record<string, string>
    > = {
      emerald: {
        bg: "bg-emerald-500",
        text: "text-emerald-500",
        border: "border-emerald-500/20",
        lightBg: "bg-emerald-50",
      },
      indigo: {
        bg: "bg-indigo-500",
        text: "text-indigo-500",
        border: "border-indigo-500/20",
        lightBg: "bg-indigo-50",
      },
      amber: {
        bg: "bg-amber-500",
        text: "text-amber-500",
        border: "border-amber-500/20",
        lightBg: "bg-amber-50",
      },
    };
    return map[accent][type];
  };

  return (
    <main className="bg-white pt-16">
      <div className="bg-linear-to-r from-blue-600 to-black px-4 py-8 text-white md:px-0">
        <PageTitle
          title="Improve yourself 1% a day"
          subtitle="Daily advice, practical solutions, and strong quotes presented one section at a time."
          titleClassName="text-2xl md:text-4xl font-bold text-white mb-4"
          subtitleClassName="text-lg text-blue-100 mb-6"
          containerClassName="text-center max-w-3xl mx-auto"
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {sections.map((section, idx) => {
            const items = contentByType[section.type];
            const currentIndex = indices[section.type];
            const currentItem = items[currentIndex];
            const isAtStart = currentIndex === 0;
            const isAtLatestItem = currentIndex === items.length - 1; // Now just checking if it is the latest in history

            if (!currentItem) return null;

            return (
              <motion.section
                key={section.type}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col group"
              >
                {/* Section Header */}
                <div className="mb-4">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest text-center">
                    {section.title}
                  </h3>
                </div>

                <div className="relative mx-auto h-[430px] w-full max-w-[400px] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${section.type}-${currentIndex}`}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={currentItem.image}
                        alt={currentItem.title}
                        fill
                        className="object-cover transition-transform duration-700 "
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Gradient Overlay - Subtle to allow text reading */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-80" />

                  {/* Date Tag */}
                  <div className="absolute top-6 right-6 z-20">
                    <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider border border-white/10">
                      {currentItem.date === TODAY ? "TODAY" : currentItem.date}
                    </div>
                  </div>

                  {/* Bottom Navigation Layer */}
                  <div className="absolute inset-0 z-10 flex flex-col justify-end p-6">
                    <div className="flex items-center justify-between">
                      {/* Title - keeping it commented out for now as requested */}
                      {/* <div className="text-white drop-shadow-md">
                            <h2 className="text-xl font-playfair font-bold line-clamp-2">
                                {currentItem.title}
                            </h2>
                        </div> */}

                      {/* Pagination Controls */}
                      <div className="flex items-center gap-1.5 ml-auto">
                        <button
                          onClick={() => moveIndex(section.type, -1)}
                          disabled={isAtStart}
                          className="w-9 h-9 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md text-white border border-white/10 disabled:opacity-20 transition-all hover:bg-black/60 active:scale-95"
                          aria-label="Previous"
                        >
                          <ChevronLeft size={18} />
                        </button>
                        {!isAtLatestItem && (
                          <button
                            onClick={() => moveIndex(section.type, 1)}
                            className={`w-9 h-9 flex items-center justify-center rounded-full ${getAccentClass(section.accentColor, "bg")} text-white shadow-lg active:scale-95 transition-all`}
                            aria-label="Next"
                          >
                            <ChevronRight size={18} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Progress Indicator */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 z-20">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${((currentIndex + 1) / items.length) * 100}%`,
                      }}
                      className={`h-full ${getAccentClass(section.accentColor, "bg")}`}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              </motion.section>
            );
          })}
        </div>
      </div>
    </main>
  );
}
