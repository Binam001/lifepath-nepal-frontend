"use client";

import React from "react";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";

interface TestNavigationProps {
  currentQuestion: number;
  totalQuestions: number;
  isAnswered: boolean;
  handlePrevious: () => void;
  handleNext: () => void;
  nextButtonColorClass?: string;
  statusText?: string;
  containerClass?: string;
}

export default function TestNavigation({
  currentQuestion,
  totalQuestions,
  isAnswered,
  handlePrevious,
  handleNext,
  nextButtonColorClass = "bg-primary hover:bg-primary/90 shadow-primary/10",
  statusText = "Answered",
  containerClass = "flex justify-between items-center border-t border-zinc-100 pt-4 md:pt-6 max-w-2xl mx-auto w-full",
}: TestNavigationProps) {
  const isFirst = currentQuestion === 0;
  const isLast = currentQuestion === totalQuestions - 1;

  return (
    <div className={containerClass}>
      <button
        onClick={handlePrevious}
        disabled={isFirst}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
          isFirst
            ? "bg-zinc-100 text-zinc-400 cursor-not-allowed"
            : "bg-white border-2 border-zinc-200 text-zinc-700 hover:bg-zinc-50 hover:border-zinc-300 hover:shadow-xs cursor-pointer active:scale-95"
        }`}
      >
        <ArrowLeft size={18} />
        <span>Previous</span>
      </button>

      <div className="hidden md:flex items-center gap-2">
        {isAnswered && (
          <div className="flex items-center gap-1.5 text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-100 animate-in fade-in duration-200">
            <CheckCircle size={14} />
            <span>{statusText}</span>
          </div>
        )}
      </div>

      <button
        onClick={handleNext}
        disabled={!isAnswered}
        className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all text-white shadow-md hover:shadow-lg ${
          !isAnswered
            ? "bg-primary/80 text-white cursor-not-allowed shadow-none"
            : `${nextButtonColorClass} cursor-pointer active:scale-95`
        }`}
      >
        <span>{isLast ? "Finish" : "Next"}</span>
        <ArrowRight size={16} />
      </button>
    </div>
  );
}
