import {
  Bot,
  Brain,
  BriefcaseBusiness,
  Cpu,
  GraduationCap,
  Rocket,
  Sparkles,
  TrendingDown,
  // TrendingUp,
  UserRoundSearch,
  Wifi,
} from "lucide-react";

export type FutureSectorKey =
  | "all"
  | "technology"
  | "design"
  | "marketing"
  | "business"
  | "health"
  | "education"
  | "infrastructure"
  | "foreign-employment"
  | "other";

export type FutureStat = {
  value: string;
  label: string;
  source?: string;
};

export const sectorOptions: Array<{ key: FutureSectorKey; label: string }> = [
  { key: "all", label: "All" },
  { key: "technology", label: "Technology" },
  { key: "design", label: "Design" },
  { key: "marketing", label: "Marketing" },
  { key: "business", label: "Business" },
  { key: "health", label: "Health" },
  { key: "education", label: "Education" },
  { key: "infrastructure", label: "Infrastructure" },
  { key: "foreign-employment", label: "Foreign Employment" },
  { key: "other", label: "Other" },
];

export const nepalFutureWorkforce = [
  { value: "22M", label: "projected workforce by 2030" },
  { value: "400K/year", label: "new youth entering job market yearly" },
  { value: "6.5M", label: "jobs needed by 2050" },
  { value: "65%", label: "population in working-age group" },
  { value: "42%", label: "youth share (16–40)" },
];

export const employmentReality = [
  { value: "10-12%", label: "overall unemployment range" },
  { value: "20-23%", label: "youth unemployment (15-24)" },
  { value: "20%+", label: "youth joblessness among highest in region" },
  { value: "32%", label: "population actually employed" },
];

export const migrationEconomy = [
  { value: "4M+", label: "Nepalis working abroad" },
  { value: "2.2M", label: "people absent from country (census)" },
  { value: "25-33%", label: "GDP from remittances" },
  { value: "200K+", label: "workers leaving every few months" },
];

export const sectorShift = [
  { from: "Agriculture-heavy economy", to: "Service & remittance-driven" },
  { from: "Local labor jobs", to: "Foreign employment dependence" },
  { from: "Government aspiration", to: "Private/skill-based paths" },
];

export const emergingNepalRoles = [
  "Software Developer",
  "AI / Data Analyst",
  "Cybersecurity Specialist",
  "Cloud Engineer",
  "Digital Marketer",
  "UI/UX Designer",
  "Content Creator / Personal Brand",
  "Freelance Developer",
  "E-commerce Operator",
  "EdTech / Trainer",
];

export const decliningNepalRoles = [
  "Clerical / Admin roles",
  "Manual accounting",
  "Basic data entry",
  "Low-skill labor (domestic)",
  "Traditional print/media jobs",
];

export const nepalSkillShift = [
  { skill: "Digital literacy", weight: "critical baseline" },
  { skill: "AI usage / prompt skills", weight: "rapidly rising" },
  { skill: "Communication (English + clarity)", weight: "high leverage" },
  { skill: "Self-learning ability", weight: "core differentiator" },
  { skill: "Portfolio building", weight: "proof > degree" },
];

export const coreSkills = [
  {
    label: "Digital literacy",
    value: 88,
    note: "the minimum baseline for modern work participation",
  },
  {
    label: "Communication clarity",
    value: 79,
    note: "language and clarity still act as strong income multipliers",
  },
  {
    label: "AI / prompt usage",
    value: 72,
    note: "rapidly rising as a leverage skill across categories",
  },
];

export const opportunityChannels = [
  "Local companies (limited, competitive)",
  "Remote global jobs",
  "Freelancing platforms",
  "Startups / small teams",
  "Foreign employment",
];

export const remoteEconomyNepal = [
  { year: "2020", remote: "low adoption" },
  { year: "2023", remote: "growing freelance culture" },
  { year: "2026", remote: "mainstream for skilled youth" },
];

export const incomePaths = [
  { path: "Local job", income: "low-mid", growth: "slow" },
  { path: "Abroad job", income: "mid", growth: "stable" },
  { path: "Remote/global", income: "high", growth: "fast" },
  { path: "Freelance", income: "variable", growth: "skill-dependent" },
];

export const educationMismatch = [
  "Degree != job readiness",
  "Theory-heavy learning",
  "Lack of internships",
  "Limited exposure to real work",
];

export const hiringRealityNepal = [
  "Experience required for entry-level",
  "Referral/network-based hiring",
  "Skill > certificate",
  "Low starting salaries",
];

export const geographyGap = [
  { region: "Kathmandu/Pokhara", advantage: "more exposure, jobs" },
  { region: "Outside valley", disadvantage: "limited access, fewer opportunities" },
];

export const digitalShiftNepal = [
  { value: "100K+", label: "new tech jobs emerging" },
  { value: "fast", label: "growth in IT outsourcing" },
  { value: "rising", label: "startup ecosystem" },
];

export const workforceRisk = [
  "Brain drain (talent leaving)",
  "Skill mismatch",
  "Automation risk in low-skill jobs",
  "Overdependence on remittance",
];

export const futureOpportunityZones = [
  "IT outsourcing & global remote work",
  "AI-assisted services",
  "Digital education & content",
  "Tourism (premium & niche)",
  "Hydropower & infrastructure",
  "E-commerce & logistics",
];

export const careerEvolutionFlow = [
  "Learn basics",
  "Build skills",
  "Create proof (projects/portfolio)",
  "Get first opportunity",
  "Scale globally",
];

export const timeToStability = [
  { phase: "0-6 months", state: "confusion / exploration" },
  { phase: "6-12 months", state: "skill building" },
  { phase: "1-2 years", state: "earning stability" },
];

export const decisionPressureNepal = [
  "Family expectations",
  "Abroad vs stay dilemma",
  "Degree vs skill confusion",
  "Peer comparison",
];

export const studentMistakes = [
  "Chasing trends blindly",
  "Ignoring skill-building",
  "Waiting instead of doing",
  "Overvaluing degrees",
];

export const leveragePoints = [
  "Internet access = global opportunity",
  "English = income multiplier",
  "Skills = location independence",
  "Portfolio = fastest way to stand out",
];

export const futureSignalsNepal = [
  "More youth choosing remote over abroad",
  "Shift from degree -> skill economy",
  "Rise of solo careers (freelancers/creators)",
  "Global competition increasing",
];

export const contrastGlobalVsNepal = [
  { global: "AI replacing jobs", nepal: "low-skill jobs at higher risk" },
  { global: "remote work growth", nepal: "mass opportunity leap" },
  { global: "skill-first hiring", nepal: "just beginning shift" },
];

export const categorySignals = [
  {
    category: "Technology",
    increasing: ["Software Developer", "AI / Data Analyst", "Cloud Engineer"],
    declining: ["Basic data entry", "Manual accounting"],
  },
  {
    category: "Creative & Media",
    increasing: ["UI/UX Designer", "Content Creator / Personal Brand"],
    declining: ["Traditional print/media jobs"],
  },
  {
    category: "Commerce & Digital",
    increasing: ["Digital Marketer", "E-commerce Operator", "Freelance Developer"],
    declining: ["Clerical / Admin roles"],
  },
];

export const marketPulse: FutureStat[] = [
  { value: "22M", label: "projected workforce by 2030", source: "Nepal projection" },
  { value: "400K/year", label: "new youth entering market", source: "Nepal estimate" },
  { value: "4M+", label: "Nepalis working abroad", source: "Migration signal" },
  { value: "25-33%", label: "GDP from remittances", source: "Macro reliance" },
];

export const changeSignals = [
  {
    icon: Brain,
    value: "20-23%",
    label: "youth unemployment remains elevated",
    source: "Employment reality",
  },
  {
    icon: Sparkles,
    value: "100K+",
    label: "new tech jobs emerging",
    source: "Digital shift",
  },
  {
    icon: TrendingDown,
    value: "32%",
    label: "population actually employed",
    source: "Employment reality",
  },
];

export const flowSteps = [
  { label: "Education", icon: GraduationCap },
  { label: "Skills", icon: Brain },
  { label: "Experience", icon: BriefcaseBusiness },
  { label: "Opportunities", icon: UserRoundSearch },
  { label: "Growth", icon: Rocket },
];

export const trendLines = [
  {
    title: "AI replacing repetitive work",
    text: "Low-skill and routine clerical work face the highest pressure.",
    icon: Bot,
  },
  {
    title: "Remote work is a leap for Nepal",
    text: "Remote-first paths can compress geography limits for skilled youth.",
    icon: Wifi,
  },
  {
    title: "Skills are starting to beat credentials",
    text: "Portfolio, proof, and self-learning are becoming stronger filters.",
    icon: Cpu,
  },
];

export const sectorPerformance: Record<
  FutureSectorKey,
  {
    title: string;
    summary: string;
    stats: FutureStat[];
    increasing: string[];
    declining: string[];
    skills: string[];
  }
> = {
  all: {
    title: "All sectors",
    summary:
      "Nepal's market is splitting between growing skill-led sectors and shrinking routine work.",
    stats: [
      { value: "High", label: "remote upside" },
      { value: "Rising", label: "skill-first hiring" },
      { value: "Mixed", label: "local opportunity depth" },
    ],
    increasing: [
      "Software Developer",
      "UI/UX Designer",
      "Digital Marketer",
      "AI / Data Analyst",
      "EdTech / Trainer",
      "Health Technician",
    ],
    declining: [
      "Clerical / Admin roles",
      "Manual accounting",
      "Basic data entry",
      "Traditional print/media jobs",
      "Low-skill labor (domestic)",
    ],
    skills: [
      "Digital literacy",
      "Communication",
      "Portfolio building",
      "AI usage",
    ],
  },
  technology: {
    title: "Technology",
    summary:
      "The strongest growth path for youth with internet access, proof of work, and English.",
    stats: [
      { value: "Fast", label: "demand growth" },
      { value: "Global", label: "market reach" },
      { value: "High", label: "skill leverage" },
    ],
    increasing: [
      "Software Developer",
      "AI / Data Analyst",
      "Cybersecurity Specialist",
      "Cloud Engineer",
    ],
    declining: ["Basic data entry", "Manual accounting"],
    skills: ["Coding", "AI literacy", "Systems thinking", "English"],
  },
  design: {
    title: "Design",
    summary:
      "Design is becoming more digital-product and brand-system oriented, less print dependent.",
    stats: [
      { value: "Steady", label: "demand growth" },
      { value: "Portfolio", label: "entry filter" },
      { value: "Remote", label: "work format" },
    ],
    increasing: ["UI/UX Designer", "Brand Designer", "Motion Designer"],
    declining: ["Traditional print/media jobs"],
    skills: ["Figma", "Visual systems", "Case studies", "Client communication"],
  },
  marketing: {
    title: "Marketing",
    summary:
      "Distribution, personal branding, and digital acquisition are creating more visible opportunities.",
    stats: [
      { value: "Rising", label: "creator economy" },
      { value: "Strong", label: "remote fit" },
      { value: "Fast", label: "skill turnover" },
    ],
    increasing: [
      "Digital Marketer",
      "Content Creator / Personal Brand",
      "E-commerce Operator",
    ],
    declining: ["Traditional print/media jobs"],
    skills: ["Content strategy", "Analytics", "Copywriting", "AI tools"],
  },
  business: {
    title: "Business",
    summary:
      "Business roles are shifting toward operations, sales, and execution skills rather than titles alone.",
    stats: [
      { value: "Competitive", label: "entry market" },
      { value: "Networked", label: "hiring style" },
      { value: "Variable", label: "salary growth" },
    ],
    increasing: ["Sales Operations", "Account Management", "Startup Ops"],
    declining: ["Clerical / Admin roles", "Executive support"],
    skills: ["Communication", "Execution", "CRM tools", "Decision-making"],
  },
  health: {
    title: "Health",
    summary:
      "Health demand stays structurally strong, especially in technical and support roles tied to service delivery.",
    stats: [
      { value: "Stable", label: "sector demand" },
      { value: "Local", label: "job concentration" },
      { value: "Trusted", label: "credential weight" },
    ],
    increasing: ["Health Technician", "Lab Support", "Nursing Support Roles"],
    declining: ["Paper-based admin handling"],
    skills: ["Accuracy", "Care systems", "Documentation", "Basic digital tools"],
  },
  education: {
    title: "Education",
    summary:
      "Traditional teaching is being joined by digital education, coaching, and skill-based training formats.",
    stats: [
      { value: "Growing", label: "digital demand" },
      { value: "Hybrid", label: "delivery model" },
      { value: "Trust", label: "core advantage" },
    ],
    increasing: ["EdTech / Trainer", "Online Tutor", "Learning Designer"],
    declining: ["Theory-only instruction"],
    skills: ["Teaching clarity", "Digital delivery", "Content design", "English"],
  },
  infrastructure: {
    title: "Infrastructure",
    summary:
      "Hydropower, logistics, and construction-linked systems remain practical long-term opportunity zones.",
    stats: [
      { value: "Long-term", label: "growth horizon" },
      { value: "Project-led", label: "work style" },
      { value: "Mixed", label: "local access" },
    ],
    increasing: ["Hydropower Roles", "Logistics Operations", "Project Coordination"],
    declining: ["Unskilled manual dependency"],
    skills: ["Coordination", "Technical basics", "Site systems", "Discipline"],
  },
  "foreign-employment": {
    title: "Foreign Employment",
    summary:
      "Still a major income path, but increasingly compared against remote and skill-led alternatives.",
    stats: [
      { value: "4M+", label: "workers abroad" },
      { value: "Stable", label: "income path" },
      { value: "High", label: "migration pressure" },
    ],
    increasing: ["Trade Roles Abroad", "Service Roles Abroad", "Technical Worker Migration"],
    declining: ["Undifferentiated local low-skill work"],
    skills: ["Trade skills", "English", "Adaptability", "Certification"],
  },
  other: {
    title: "Other sectors",
    summary:
      "Tourism, niche services, creator paths, and solo work are becoming more visible opportunity zones.",
    stats: [
      { value: "Fragmented", label: "market shape" },
      { value: "Niche", label: "advantage model" },
      { value: "Flexible", label: "entry path" },
    ],
    increasing: ["Tourism Specialist", "Freelance Service Work", "Niche Creator Roles"],
    declining: ["Generalist low-skill service roles"],
    skills: ["Adaptability", "Personal brand", "Sales", "Self-learning"],
  },
};
