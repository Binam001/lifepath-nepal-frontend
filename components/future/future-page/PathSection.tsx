"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PATH_CARDS } from "@/components/future/future-page/config";

export function PathSection() {
  return (
    <section className="bg-linear-to-br from-slate-900 to-blue-950 py-20 text-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <p className="mb-3 text-[13.5px] font-bold uppercase tracking-widest text-blue-400">
            Your Next Step
          </p>
          <h2 className="text-3xl font-extrabold text-white md:text-4xl">
            Where are you right now?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-slate-400">
            Pick the path that fits your situation and take one small step
            today.
          </p>
        </div>

        <div className="mb-12 grid gap-6 md:grid-cols-3">
          {PATH_CARDS.map((path, i) => (
            <motion.div
              key={path.who}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:bg-white/8"
            >
              <div className="mb-4 text-4xl">{path.emoji}</div>
              <h3 className="mb-2 text-lg font-bold text-white">{path.who}</h3>
              <p className="mb-5 text-sm leading-relaxed text-slate-300">
                {path.action}
              </p>
              <div className="space-y-2.5">
                {path.steps.map((step, si) => (
                  <div key={step} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10 text-[10px] font-bold text-white">
                      {si + 1}
                    </span>
                    <p className="text-xs leading-relaxed text-slate-300">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <p className="mb-5 text-sm text-slate-400">
            Not sure which sector fits you? Find your strengths first.
          </p>
          <a
            href="/personality-test"
            className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-900/30 transition-colors hover:bg-blue-500"
          >
            Take the Personality Test
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
