"use client";

import { motion } from "framer-motion";
import { TrendingDown, TrendingUp } from "lucide-react";

interface JobCardProps {
  title: string;
  index: number;
  tone: "up" | "down";
}

export function JobCard({ title, index, tone }: JobCardProps) {
  const isUp = tone === "up";
  const barWidth = Math.max(38, 98 - index * 13);

  return (
    <motion.div
      initial={{ opacity: 0, x: isUp ? -12 : 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      className={`rounded-xl border p-4 ${
        isUp ? "border-emerald-100 bg-emerald-50" : "border-rose-100 bg-rose-50"
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
            isUp ? "bg-emerald-100" : "bg-rose-100"
          }`}
        >
          {isUp ? (
            <TrendingUp className="h-4 w-4 text-emerald-600" />
          ) : (
            <TrendingDown className="h-4 w-4 text-rose-500" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex items-center justify-between">
            <p
              className={`text-sm font-semibold leading-tight ${
                isUp ? "text-emerald-900" : "text-rose-900"
              }`}
            >
              {title}
            </p>
            <span
              className={`ml-2 shrink-0 text-xs font-bold ${
                isUp ? "text-emerald-600" : "text-rose-500"
              }`}
            >
              {barWidth}%
            </span>
          </div>
          <div
            className={`h-1.5 rounded-full ${
              isUp ? "bg-emerald-200" : "bg-rose-200"
            }`}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${barWidth}%` }}
              transition={{
                delay: 0.25 + index * 0.07,
                duration: 0.7,
                ease: "easeOut",
              }}
              className={`h-1.5 rounded-full ${
                isUp ? "bg-emerald-500" : "bg-rose-400"
              }`}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
