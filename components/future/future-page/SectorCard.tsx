"use client";

import { motion } from "framer-motion";
import { Briefcase, type LucideIcon } from "lucide-react";
import { type FutureSectorKey } from "@/constants/future-infographics";
import {
  getSectorHeat,
  HEAT_CONFIG,
  SECTOR_ICONS,
} from "@/components/future/future-page/config";

interface SectorCardProps {
  sectorKey: string;
  label: string;
  active: boolean;
  onClick: () => void;
}

export function SectorCard({
  sectorKey,
  label,
  active,
  onClick,
}: SectorCardProps) {
  const IconComponent: LucideIcon = SECTOR_ICONS[sectorKey] ?? Briefcase;
  const heat =
    sectorKey === "all"
      ? "growing"
      : getSectorHeat(sectorKey as FutureSectorKey);
  const heatCfg = HEAT_CONFIG[heat];

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`relative w-full cursor-pointer rounded-2xl border-2 p-4 text-left transition-all duration-200 ${
        active
          ? "border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-200"
          : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 hover:shadow-sm"
      }`}
    >
      <div
        className={`mb-3 flex h-9 w-9 items-center justify-center rounded-xl ${
          active ? "bg-white/20" : "bg-zinc-100"
        }`}
      >
        <IconComponent
          className={`h-5 w-5 ${active ? "text-white" : "text-zinc-600"}`}
        />
      </div>
      <p
        className={`mb-2.5 text-sm font-semibold leading-snug ${
          active ? "text-white" : "text-zinc-800"
        }`}
      >
        {label}
      </p>
      <span
        className={`inline-block rounded-full border px-2 py-0.5 text-[10px] font-bold ${
          active ? heatCfg.activeBadge : heatCfg.badge
        }`}
      >
        {heatCfg.label}
      </span>
    </motion.button>
  );
}
