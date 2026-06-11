"use client";

import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";

interface SavedResultBannerProps {
  onDelete: () => void;
  onRestore: () => void;
  title?: string;
  message?: string;
  buttonColorClass?: string;
  iconBgClass?: string;
  iconBorderRadiusClass?: string;
  containerBorderRadiusClass?: string;
}

export default function SavedResultBanner({
  onDelete,
  onRestore,
  title = "Previous Result Available",
  message = "You can view your last completed test results directly.",
  buttonColorClass = "bg-blue-600 hover:bg-blue-700 shadow-blue-600/10",
  iconBgClass = "bg-blue-50 text-blue-600",
  iconBorderRadiusClass = "rounded-lg",
  containerBorderRadiusClass = "rounded-2xl",
}: SavedResultBannerProps) {
  return (
    <div
      className={`mb-8 max-w-2xl mx-auto w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white border border-zinc-200 p-4 shadow-xs animate-fade-in relative overflow-hidden animate-in fade-in duration-300 ${containerBorderRadiusClass}`}
    >
      <div className="flex items-center gap-3 pl-2">
        <div
          className={`w-9 h-9 flex items-center justify-center shrink-0 ${iconBgClass} ${iconBorderRadiusClass}`}
        >
          <Sparkles size={18} className="animate-pulse" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-zinc-900">{title}</h4>
          <p className="text-xs text-zinc-500 mt-0.5">{message}</p>
        </div>
      </div>
      <div className="flex gap-2 sm:self-center shrink-0">
        <button
          onClick={onDelete}
          className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 active:scale-95 text-zinc-700 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          Delete
        </button>
        <button
          onClick={onRestore}
          className={`px-4 py-2 text-white text-xs font-bold rounded-lg transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 ${buttonColorClass}`}
        >
          <span>View Result</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
