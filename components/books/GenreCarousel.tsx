"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Brain,
  ChevronLeft,
  ChevronRight,
  Compass,
  Repeat,
  Rocket,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";
import { type Genre } from "@/constants/books";

type GenreCarouselProps = {
  genres: Genre[];
};

const genreIcons = {
  sparkles: Sparkles,
  target: Target,
  zap: Zap,
  rocket: Rocket,
  brain: Brain,
  repeat: Repeat,
  compass: Compass,
} as const;

export default function GenreCarousel({ genres }: GenreCarouselProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    const container = containerRef.current;
    if (!container) return;

    const maxScrollLeft = container.scrollWidth - container.clientWidth;
    setCanScrollLeft(container.scrollLeft > 4);
    setCanScrollRight(container.scrollLeft < maxScrollLeft - 4);
  };

  useEffect(() => {
    updateScrollState();

    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      container.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  const scrollByAmount = (direction: "left" | "right") => {
    const container = containerRef.current;
    if (!container) return;

    const amount = Math.max(container.clientWidth * 0.78, 280);
    container.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-zinc-500">
            Swipe through genres or use the arrows to explore.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Scroll genres left"
            onClick={() => scrollByAmount("left")}
            disabled={!canScrollLeft}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 shadow-sm transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Scroll genres right"
            onClick={() => scrollByAmount("right")}
            disabled={!canScrollRight}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 shadow-sm transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {genres.map((genre) =>
          (() => {
            const Icon = genreIcons[genre.icon];

            return (
              <Link
                key={genre.name}
                href={{
                  pathname: "/books/all-books",
                  query: { genre: genre.name },
                }}
                className="group relative min-w-[280px] flex-none snap-start overflow-hidden  border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-600/10 sm:min-w-[340px] lg:min-w-[380px]"
              >
                <div className="relative h-[360px] w-full overflow-hidden">
                  <Image
                    src={genre.image}
                    alt={genre.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <div className="mt-2 flex items-end justify-between gap-4">
                      <h3 className="font-montserrat text-2xl font-bold leading-tight">
                        {genre.name}
                      </h3>
                      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-zinc-900 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                        <Icon className="h-5 w-5" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })(),
        )}
      </div>
    </div>
  );
}
