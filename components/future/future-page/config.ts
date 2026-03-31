import {
  Zap,
  Globe,
  Laptop,
  Heart,
  GraduationCap,
  Building2,
  Truck,
  Scale,
  Film,
  Factory,
  FlaskConical,
  Megaphone,
  ShieldCheck,
  Briefcase,
  Star,
  Wifi,
  type LucideIcon,
} from "lucide-react";
import {
  sectorPerformance,
  type FutureSectorKey,
} from "@/constants/future-infographics";

export const SECTOR_ICONS: Record<string, LucideIcon> = {
  all: Globe,
  "banking-finance": Building2,
  technology: Laptop,
  education: GraduationCap,
  health: Heart,
  "tourism-hospitality": Globe,
  "sales-marketing": Megaphone,
  "engineering-construction": Building2,
  "transport-logistics": Truck,
  "manufacturing-production": Factory,
  "energy-hydropower": Zap,
  "legal-law": Scale,
  "media-entertainment": Film,
  "business-entrepreneurship": Briefcase,
  "freelancing-remote": Wifi,
  "research-development": FlaskConical,
  "security-services": ShieldCheck,
};

export const LEVERAGE_POINTS: Array<{
  icon: LucideIcon;
  title: string;
  desc: string;
  color: string;
}> = [
  {
    icon: Wifi,
    title: "Internet = Global stage",
    desc: "With a laptop and internet, you can work for clients anywhere in the world — right from Nepal.",
    color: "blue",
  },
  {
    icon: GraduationCap,
    title: "English = Income multiplier",
    desc: "Strong English opens remote jobs that pay 3–5x more than most local positions.",
    color: "amber",
  },
  {
    icon: Star,
    title: "Portfolio = Fast track",
    desc: "Showing real work (projects, designs, code) gets you hired faster than waiting years for a degree.",
    color: "emerald",
  },
  {
    icon: Zap,
    title: "AI skills = Unfair edge",
    desc: "Knowing how to use AI tools for real work is a skill most people still don't have.",
    color: "violet",
  },
];

export const PATH_CARDS = [
  {
    emoji: "📚",
    who: "Still in school?",
    action: "Don't wait for graduation - Start now",
    steps: [
      "Learn a skill",
      "Build a small project and share it publicly",
      "Find your personality & strengths first",
    ],
  },
  {
    emoji: "🔍",
    who: "Job hunting?",
    action: "Focus your energy on the fastest-growing sectors.",
    steps: [
      "Pick one sector from the explorer above",
      "Learn the top 2 skills listed for that sector",
      "Create proof of work — a portfolio or project",
    ],
  },
  {
    emoji: "⇄",
    who: "Want to switch careers?",
    action: "Your existing skills transfer more than you think.",
    steps: [
      "Map your current skills to growing roles above",
      "Add one new digital skill to your stack",
      "Start freelancing on the side to build proof",
    ],
  },
];

export function getSectorHeat(
  key: FutureSectorKey,
): "hot" | "growing" | "stable" | "shifting" {
  if (key === "all") return "growing";
  const sector = sectorPerformance[key];
  const total = sector.increasing.length + sector.declining.length;
  if (total === 0) return "stable";
  const ratio = sector.increasing.length / total;
  if (ratio >= 0.7) return "hot";
  if (ratio >= 0.55) return "growing";
  if (ratio >= 0.4) return "stable";
  return "shifting";
}

export const HEAT_CONFIG = {
  hot: {
    label: "🔥 Hot",
    badge: "text-emerald-700 bg-emerald-50 border-emerald-200",
    activeBadge: "text-white bg-white/20 border-white/30",
  },
  growing: {
    label: "📈 Growing",
    badge: "text-blue-700 bg-blue-50 border-blue-200",
    activeBadge: "text-white bg-white/20 border-white/30",
  },
  stable: {
    label: "📊 Stable",
    badge: "text-amber-700 bg-amber-50 border-amber-200",
    activeBadge: "text-white bg-white/20 border-white/30",
  },
  shifting: {
    label: "⚠️ Shifting",
    badge: "text-rose-700 bg-rose-50 border-rose-200",
    activeBadge: "text-white bg-white/20 border-white/30",
  },
};

export const SECTOR_COMPARISON = [
  {
    key: "banking-finance",
    label: "Banking & Finance",
    demandScore: 72,
    declineScore: 45,
  },
  {
    key: "technology",
    label: "IT & Technology",
    demandScore: 88,
    declineScore: 28,
  },
  {
    key: "education",
    label: "Education & Teaching",
    demandScore: 65,
    declineScore: 32,
  },
  {
    key: "health",
    label: "Health & Medical",
    demandScore: 70,
    declineScore: 30,
  },
  {
    key: "tourism-hospitality",
    label: "Tourism & Hospitality",
    demandScore: 67,
    declineScore: 22,
  },
  {
    key: "sales-marketing",
    label: "Sales & Marketing",
    demandScore: 70,
    declineScore: 35,
  },
  {
    key: "engineering-construction",
    label: "Engineering & Construction",
    demandScore: 78,
    declineScore: 20,
  },
  {
    key: "transport-logistics",
    label: "Transport & Logistics",
    demandScore: 62,
    declineScore: 28,
  },
  {
    key: "manufacturing-production",
    label: "Manufacturing & Production",
    demandScore: 52,
    declineScore: 42,
  },
  {
    key: "energy-hydropower",
    label: "Energy & Hydropower",
    demandScore: 82,
    declineScore: 15,
  },
  {
    key: "legal-law",
    label: "Legal & Law",
    demandScore: 55,
    declineScore: 25,
  },
  {
    key: "media-entertainment",
    label: "Media & Entertainment",
    demandScore: 42,
    declineScore: 68,
  },
  {
    key: "business-entrepreneurship",
    label: "Business & Entrepreneurship",
    demandScore: 72,
    declineScore: 20,
  },
  {
    key: "freelancing-remote",
    label: "Freelancing & Remote Work",
    demandScore: 75,
    declineScore: 18,
  },
  {
    key: "research-development",
    label: "Research & Development",
    demandScore: 38,
    declineScore: 30,
  },
  {
    key: "security-services",
    label: "Security Services",
    demandScore: 58,
    declineScore: 22,
  },
];
