"use client";

import { TrendingUp } from "lucide-react";

export function SimpleExplanationSection({
  title,
  points,
}: {
  title: string;
  points: string[];
}) {
  return (
    <section className="mt-10 border-t border-zinc-200 pt-8">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600/10 text-blue-600">
          <TrendingUp className="h-5 w-5" />
        </div>
        <h3 className="text-2xl font-semibold tracking-[-0.03em] text-zinc-950">
          {title}
        </h3>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {points.map((point, index) => (
          <div key={index} className="border-l border-zinc-200 pl-4">
            <p className="text-[11px] font-semibold tracking-[0.18em] text-blue-600 uppercase">
              Point {index + 1}
            </p>
            <p className="mt-2 text-sm leading-7 text-zinc-700">{point}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
