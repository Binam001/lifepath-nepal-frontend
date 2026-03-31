"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Lightbulb,
  Bell,
  Compass,
  Wrench,
  SunMedium,
  Gem,
  type LucideIcon,
  X,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PageTitle from "@/components/ui/PageTitle";
import { getGrowLatest } from "@/services/grow";
import type { GrowCategoryGroup, GrowItem } from "@/types/grow";

type SectionType =
  | "advice-of-the-day"
  | "solution-of-the-day"
  | "value-of-the-day"
  | "reminder-of-the-day"
  | "positivity-of-the-day"
  | "purpose-of-the-day";

type ReactionType = "agree" | "disagree" | "like";

interface SectionConfig {
  title: string;
  subtitle: string;
  slug: SectionType;
  annotation: string;
  accentColor: "emerald" | "indigo" | "amber" | "sky" | "violet" | "rose";
  icon: LucideIcon;
}

interface ItemReactions {
  agree: boolean;
  disagree: boolean;
  like: boolean;
}

const sections: SectionConfig[] = [
  {
    title: "Advice of the day",
    subtitle: "Practical insights to guide your growth journey.",
    slug: "advice-of-the-day",
    annotation: "Advice",
    accentColor: "sky",
    icon: Lightbulb,
  },
  {
    title: "Reminder of the day",
    subtitle: "A small stretch to sharpen your next version.",
    slug: "reminder-of-the-day",
    annotation: "Reminder",
    accentColor: "amber",
    icon: Bell,
  },
  {
    title: "Purpose of the day",
    subtitle: "A daily reminder of what your effort should serve.",
    slug: "purpose-of-the-day",
    annotation: "Purpose",
    accentColor: "violet",
    icon: Compass,
  },

  {
    title: "Solution of the day",
    subtitle: "Actionable steps to solve real-world problems.",
    slug: "solution-of-the-day",
    annotation: "Solution",
    accentColor: "emerald",
    icon: Wrench,
  },

  {
    title: "Positivity of the day",
    subtitle: "A constructive thought to steady your momentum.",
    slug: "positivity-of-the-day",
    annotation: "Positivity",
    accentColor: "rose",
    icon: SunMedium,
  },
  {
    title: "Value of the day",
    subtitle: "A grounded daily value to shape your mindset.",
    slug: "value-of-the-day",
    annotation: "Value",
    accentColor: "indigo",
    icon: Gem,
  },
];

const EMPTY_REACTIONS: ItemReactions = {
  agree: false,
  disagree: false,
  like: false,
};

const TODAY = new Date().toISOString().slice(0, 10);

export default function GrowthPage() {
  const preloadedImagesRef = useRef(new Set<string>());
  const [indexOverrides, setIndexOverrides] = useState<
    Partial<Record<SectionType, number>>
  >({});
  const [reactions, setReactions] = useState<Record<string, ItemReactions>>({});
  const {
    data: growResponse,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["grow-latest", 5],
    queryFn: () => getGrowLatest(5),
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const groups = useMemo(
    () =>
      sections.reduce<Record<SectionType, GrowItem[]>>(
        (acc, section) => {
          const category = growResponse?.data?.categories.find(
            (item: GrowCategoryGroup) => item.slug === section.slug,
          );
          acc[section.slug] = [...(category?.items ?? [])]
            .filter((item) => item.date <= TODAY)
            .sort((a, b) => a.date.localeCompare(b.date));
          return acc;
        },
        {
          "advice-of-the-day": [],
          "solution-of-the-day": [],
          "value-of-the-day": [],
          "reminder-of-the-day": [],
          "positivity-of-the-day": [],
          "purpose-of-the-day": [],
        },
      ),
    [growResponse],
  );

  const visibleSections = useMemo(
    () => sections.filter((section) => groups[section.slug].length > 0),
    [groups],
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    for (const section of visibleSections) {
      const items = groups[section.slug];
      for (const image of items.map((item) => item.image).filter(Boolean)) {
        if (preloadedImagesRef.current.has(image)) continue;

        const img = new window.Image();
        img.src = image;
        preloadedImagesRef.current.add(image);
      }
    }
  }, [groups, indexOverrides, visibleSections]);

  const moveIndex = (type: SectionType, direction: -1 | 1) => {
    const items = groups[type];
    if (items.length === 0) return;

    const currentIndex = Math.min(
      indexOverrides[type] ?? Math.max(items.length - 1, 0),
      Math.max(items.length - 1, 0),
    );

    setIndexOverrides((prev) => ({
      ...prev,
      [type]: Math.min(Math.max(currentIndex + direction, 0), items.length - 1),
    }));
  };

  const toggleReaction = (itemId: string, reaction: ReactionType) => {
    setReactions((prev) => {
      const current = prev[itemId] ?? EMPTY_REACTIONS;

      if (reaction === "like") {
        return {
          ...prev,
          [itemId]: {
            ...current,
            like: !current.like,
          },
        };
      }

      const nextValue = !current[reaction];

      return {
        ...prev,
        [itemId]: {
          ...current,
          agree: reaction === "agree" ? nextValue : false,
          disagree: reaction === "disagree" ? nextValue : false,
        },
      };
    });
  };

  const getAccentClass = (
    accent: SectionConfig["accentColor"],
    type: "bg" | "softBadge",
  ) => {
    const map = {
      emerald: {
        bg: "bg-emerald-500",
        softBadge: "bg-emerald-500/85 text-white",
      },
      indigo: { bg: "bg-indigo-500", softBadge: "bg-indigo-500/85 text-white" },
      amber: { bg: "bg-amber-500", softBadge: "bg-amber-500/90 text-white" },
      sky: { bg: "bg-sky-500", softBadge: "bg-sky-500/85 text-white" },
      violet: { bg: "bg-violet-500", softBadge: "bg-violet-500/85 text-white" },
      rose: { bg: "bg-rose-500", softBadge: "bg-rose-500/85 text-white" },
    };

    return map[accent][type];
  };

  return (
    <main className="bg-white pt-16">
      <div className="bg-linear-to-r from-blue-600 to-black px-4 py-8 text-white md:px-0">
        <PageTitle
          title="Improve yourself 1% a day"
          subtitle="Daily advice, purpose, growth, solutions, positivity, and values presented one section at a time."
          titleClassName="mb-4 text-2xl font-bold text-white md:text-4xl"
          subtitleClassName="mb-6 text-lg text-blue-100"
          containerClassName="mx-auto max-w-3xl text-center"
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        {isLoading ? (
          <div className="py-16 text-center text-sm text-zinc-500">
            Loading daily growth content...
          </div>
        ) : isError || !growResponse?.success || !growResponse.data ? (
          <div className="py-16 text-center text-sm text-rose-600">
            Failed to load daily growth content.
          </div>
        ) : visibleSections.length === 0 ? (
          <div className="py-16 text-center text-sm text-zinc-500">
            No growth content is available right now.
          </div>
        ) : (
          <div className="grid gap-6 sm:gap-8 md:gap-10 md:grid-cols-2 xl:grid-cols-3">
          {visibleSections.map((section, idx) => {
            const items = groups[section.slug];
            const currentIndex = Math.min(
              indexOverrides[section.slug] ?? Math.max(items.length - 1, 0),
              Math.max(items.length - 1, 0),
            );
            const currentItem = items[currentIndex];
            const SectionIcon = section.icon;

            if (!currentItem) return null;

            const currentReactions =
              reactions[currentItem.id] ?? EMPTY_REACTIONS;
            const isAtStart = currentIndex === 0;
            const isAtLatestItem = currentIndex === items.length - 1;

            return (
              <motion.section
                key={section.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group flex flex-col"
              >
                <div className="relative mx-auto w-full max-w-[424px] overflow-hidden rounded-2xl sm:rounded-[2rem] border border-slate-200 bg-white p-2 sm:p-3 shadow-[0_24px_60px_rgba(15,23,42,0.12)]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${section.slug}-${currentIndex}`}
                      initial={{ opacity: 0, scale: 1.02 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.99 }}
                      transition={{ duration: 0.18 }}
                      className="relative text-center"
                    >
                      <div>
                        <span className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.12em] sm:tracking-[0.18em] text-slate-700">
                          <SectionIcon size={14} className="sm:w-4 sm:h-4" />
                          <span className="hidden min-[400px]:inline">
                            {section.title}
                          </span>
                          <span className="min-[400px]:hidden">
                            {section.annotation}
                          </span>
                        </span>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${section.slug}-${currentIndex}`}
                      initial={{ opacity: 0, scale: 1.02 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.99 }}
                      transition={{ duration: 0.18 }}
                      className="relative"
                    >
                      <div className="relative mx-auto h-[340px] w-full sm:h-[380px] sm:w-[380px] md:h-[430px] md:w-[400px] max-w-full overflow-hidden rounded-2xl sm:rounded-[1.6em] border border-zinc-100 bg-zinc-100">
                        <Image
                          src={currentItem.image}
                          alt={section.title}
                          fill
                          priority
                          loading="eager"
                          className="object-cover transition-transform duration-700"
                        />
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  <div className="mt-3 sm:mt-4 flex items-center justify-between gap-2 sm:gap-3 px-0.5 sm:px-1">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <div className="group/action relative">
                        <span className="pointer-events-none absolute -top-8 sm:-top-10 left-1/2 -translate-x-1/2 rounded-full bg-zinc-900 px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.12em] sm:tracking-[0.16em] text-white opacity-0 shadow-lg transition-opacity group-hover/action:opacity-100">
                          Like
                        </span>
                        <button
                          type="button"
                          onClick={() => toggleReaction(currentItem.id, "like")}
                          className={`flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full border transition-colors ${
                            currentReactions.like
                              ? "border-rose-500 text-rose-500"
                              : "border-zinc-200 bg-white text-zinc-700 hover:border-pink-200 hover:bg-pink-50 hover:text-pink-600"
                          }`}
                          aria-label={`Like ${section.title}`}
                          aria-pressed={currentReactions.like}
                        >
                          <motion.span
                            key={currentReactions.like ? "liked" : "unliked"}
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.18 }}
                            className="inline-flex"
                          >
                            <Heart
                              size={16}
                              className={`sm:w-[18px] sm:h-[18px] ${
                                currentReactions.like ? "fill-current" : ""
                              }`}
                            />
                          </motion.span>
                        </button>
                      </div>
                      <div className="group/action relative">
                        <span className="pointer-events-none absolute -top-8 sm:-top-10 left-1/2 -translate-x-1/2 rounded-full bg-zinc-900 px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.12em] sm:tracking-[0.16em] text-white opacity-0 shadow-lg transition-opacity group-hover/action:opacity-100">
                          Agree
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            toggleReaction(currentItem.id, "agree")
                          }
                          className={`flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full border transition-colors ${
                            currentReactions.agree
                              ? "border-emerald-500 bg-emerald-500 text-white"
                              : "border-zinc-200 bg-white text-zinc-700 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600"
                          }`}
                          aria-label={`Agree with ${section.title}`}
                          aria-pressed={currentReactions.agree}
                        >
                          <Check
                            size={16}
                            className="sm:w-[18px] sm:h-[18px]"
                          />
                        </button>
                      </div>

                      <div className="group/action relative">
                        <span className="pointer-events-none absolute -top-8 sm:-top-10 left-1/2 -translate-x-1/2 rounded-full bg-zinc-900 px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.12em] sm:tracking-[0.16em] text-white opacity-0 shadow-lg transition-opacity group-hover/action:opacity-100">
                          Disagree
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            toggleReaction(currentItem.id, "disagree")
                          }
                          className={`flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full border transition-colors ${
                            currentReactions.disagree
                              ? "border-red-500 bg-red-500 text-white"
                              : "border-zinc-200 bg-white text-zinc-700 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
                          }`}
                          aria-label={`Disagree with ${section.title}`}
                          aria-pressed={currentReactions.disagree}
                        >
                          <X size={16} className="sm:w-[18px] sm:h-[18px]" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 sm:gap-1.5">
                      <button
                        type="button"
                        onClick={() => moveIndex(section.slug, -1)}
                        disabled={isAtStart}
                        className={`flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full text-white transition-all disabled:cursor-not-allowed disabled:opacity-30 ${getAccentClass(section.accentColor, "bg")}`}
                        aria-label="Previous"
                      >
                        <ChevronLeft
                          size={16}
                          className="sm:w-[18px] sm:h-[18px]"
                        />
                      </button>
                      {!isAtLatestItem && (
                        <button
                          type="button"
                          onClick={() => moveIndex(section.slug, 1)}
                          className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-zinc-200 bg-zinc-50 text-zinc-700 transition-all hover:bg-zinc-100"
                          aria-label="Next"
                        >
                          <ChevronRight
                            size={16}
                            className="sm:w-[18px] sm:h-[18px]"
                          />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.section>
            );
          })}
          </div>
        )}
      </div>
    </main>
  );
}
