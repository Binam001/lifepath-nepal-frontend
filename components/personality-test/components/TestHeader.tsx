"use client";

import React from "react";
import { CheckCircle, Clock } from "lucide-react";

interface TestHeaderProps {
  title: string;
  description: string;
  durationText: string;
  typeText?: string;
  resultText?: string;
  bgGradientClass?: string;
  icon: React.ReactNode;
}

export default function TestHeader({
  title,
  description,
  durationText,
  typeText = "100% Free",
  resultText = "Instant Results",
  bgGradientClass = "bg-linear-to-l from-blue-600 to-black text-white",
  icon,
}: TestHeaderProps) {
  return (
    <section className={bgGradientClass}>
      <div className="max-w-6xl mx-auto py-8 md:py-12 px-4 relative">
        <div className="text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-xs">
              {icon}
            </div>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 tracking-tight">
            {title}
          </h1>
          <p className="text-base md:text-lg text-zinc-200 mb-4 font-light">
            {description}
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-white/95 font-medium">
            <span className="flex items-center gap-2">
              <CheckCircle size={16} />
              {typeText}
            </span>
            <span className="text-white/40">•</span>
            <span className="flex items-center gap-2">
              <Clock size={16} />
              {durationText}
            </span>
            <span className="text-white/40">•</span>
            <span>{resultText}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
