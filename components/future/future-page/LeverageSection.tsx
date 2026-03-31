"use client";

import { motion } from "framer-motion";
import { LEVERAGE_POINTS } from "@/components/future/future-page/config";
import { SectionLabel } from "@/components/future/future-page/SectionLabel";

export function LeverageSection() {
  const colorMap: Record<string, string> = {
    blue: "border-blue-200 bg-blue-100 text-blue-600",
    amber: "border-amber-200 bg-amber-100 text-amber-600",
    emerald: "border-emerald-200 bg-emerald-100 text-emerald-600",
    violet: "border-violet-200 bg-violet-100 text-violet-600",
  };

  return (
    <section className="bg-zinc-50 py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <SectionLabel>Your Advantages</SectionLabel>
          <h2 className="text-3xl font-extrabold text-zinc-900 md:text-4xl">
            Four things that change everything
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-zinc-500">
            If you have these, your location and background matter less than you
            think.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {LEVERAGE_POINTS.map((point, i) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="rounded-2xl border border-zinc-200 bg-white p-6 transition-shadow hover:shadow-md"
              >
                <div
                  className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border ${colorMap[point.color]}`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-bold text-zinc-900">{point.title}</h3>
                <p className="text-sm leading-relaxed text-zinc-500">
                  {point.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
