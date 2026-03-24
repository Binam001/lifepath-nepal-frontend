"use client";

import {
  Activity,
  Banknote,
  BriefcaseBusiness,
  FlaskConical,
  GraduationCap,
  Gavel,
  HardHat,
  Layers3,
  Landmark,
  Megaphone,
  MonitorSmartphone,
  Palette,
  Shield,
  Sparkles,
  Stethoscope,
  TowerControl,
  Truck,
  Tv,
  Zap,
} from "lucide-react";
import {
  sectorOptions,
  type FutureSectorKey,
} from "@/constants/future-infographics";

const sectorIcons: Record<
  FutureSectorKey,
  React.ComponentType<{ className?: string; size?: number }>
> = {
  all: Layers3,
  "banking-finance": Landmark,
  technology: Sparkles,
  "sales-marketing": Megaphone,
  "business-entrepreneurship": BriefcaseBusiness,
  design: Palette,
  marketing: Megaphone,
  business: BriefcaseBusiness,
  health: Stethoscope,
  education: GraduationCap,
  "tourism-hospitality": TowerControl,
  "engineering-construction": HardHat,
  "transport-logistics": Truck,
  "manufacturing-production": Activity,
  "energy-hydropower": Zap,
  "legal-law": Gavel,
  "media-entertainment": Tv,
  "freelancing-remote": MonitorSmartphone,
  "research-development": FlaskConical,
  "security-services": Shield,
  infrastructure: HardHat,
  other: Banknote,
};

export function SectorSelector({
  activeSector,
  onSelect,
}: {
  activeSector: FutureSectorKey;
  onSelect: (sector: FutureSectorKey) => void;
}) {
  return (
    <div className="mb-10">
      <div className="mb-4 flex justify-center">
        <h3 className="mt-2 text-center text-lg font-semibold tracking-[-0.02em] text-zinc-950">
          Select a sector to explore
        </h3>
      </div>

      <div className="md:hidden">
        <label htmlFor="future-sector-select" className="sr-only">
          Select a sector
        </label>
        <select
          id="future-sector-select"
          value={activeSector}
          onChange={(e) => onSelect(e.target.value as FutureSectorKey)}
          className="w-full rounded-full border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-900 outline-none transition-colors focus:border-blue-600"
        >
          {sectorOptions.map((sector) => (
            <option key={sector.key} value={sector.key}>
              {sector.label}
            </option>
          ))}
        </select>
      </div>

      <div className="hidden rounded-[28px] border border-zinc-200 bg-zinc-50/80 p-3 md:block">
        <div className="flex flex-wrap justify-center gap-2">
        {sectorOptions.map((sector) => {
          const Icon = sectorIcons[sector.key];

          return (
            <button
              key={sector.key}
              type="button"
              onClick={() => onSelect(sector.key)}
              className={`group inline-flex min-h-10 items-center justify-center gap-2 rounded-full border px-3 py-2 text-center transition-all duration-200 ${
                activeSector === sector.key
                  ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                  : "border-zinc-200 bg-white text-zinc-700 hover:border-blue-200 hover:bg-blue-50/40 hover:text-zinc-950"
              }`}
            >
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
                  activeSector === sector.key
                    ? "bg-white/16 text-white"
                    : "bg-zinc-50 text-zinc-500 group-hover:bg-blue-50 group-hover:text-blue-600"
                }`}
              >
                <Icon size={14} />
              </span>
              <span className="text-xs font-semibold leading-none sm:text-[13px]">
                {sector.label}
              </span>
            </button>
          );
        })}
        </div>
      </div>
    </div>
  );
}
