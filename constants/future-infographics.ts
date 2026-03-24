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
  // | "foreign-employment"
  | "other";

export type FutureStat = {
  value: string;
  label: string;
  source?: string;
};

export const sectorOptions: Array<{ key: FutureSectorKey; label: string }> = [
  { key: "all", label: "All Sectors" },
  { key: "technology", label: "IT & Technology" },
  { key: "design", label: "Design & Creative" },
  { key: "marketing", label: "Sales & Marketing" },
  { key: "business", label: "Business & Entrepreneurship" },
  { key: "health", label: "Health & Medical" },
  { key: "education", label: "Education & Teaching" },
  { key: "infrastructure", label: "Engineering & Construction" },
  { key: "other", label: "Other Sectors" },
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

export const sectorNotices: Record<
  FutureSectorKey,
  Array<{ title: string; text: string }>
> = {
  all: [
    {
      title: "Demand is concentrating",
      text: "The strongest upside is clustering around sectors that combine digital capability, measurable output, and rising service complexity.",
    },
    {
      title: "Routine work is weakening",
      text: "Clerical, repetitive, and low-signal roles are the most exposed across the broader market.",
    },
    {
      title: "Proof is becoming the filter",
      text: "Across sectors, portfolios, demonstrable skills, and practical execution are carrying more weight than credentials alone.",
    },
  ],
  technology: [
    {
      title: "Technology is broader than software",
      text: "The strongest technology story now includes AI, electrical systems, clean energy, and engineering tied to physical infrastructure.",
    },
    {
      title: "Remote and on-site paths are splitting",
      text: "Software exports globally fastest, while energy, manufacturing, and civil-linked engineering stay more project and location tied.",
    },
    {
      title: "Hybrid skill stacks win",
      text: "Coding alone is less differentiated than coding plus systems, hardware, simulation, or domain context.",
    },
  ],
  design: [
    {
      title: "Static design is no longer the center",
      text: "The strongest demand is shifting toward UI/UX, product systems, motion, and digital interface work rather than routine asset production.",
    },
    {
      title: "Portfolio quality decides entry",
      text: "Design remains one of the clearest proof-of-work fields, so strong case studies and visible process matter more than credentials alone.",
    },
    {
      title: "Remote fit varies by subfield",
      text: "UI/UX and digital design travel better globally, while industrial and physical-product design stay more tied to location and industry.",
    },
  ],
  marketing: [
    {
      title: "Measurement is now the core filter",
      text: "Marketing roles with clear links to acquisition, retention, revenue, or research are outperforming general promotion work.",
    },
    {
      title: "Content alone is not enough",
      text: "The stronger path combines messaging with analytics, lifecycle thinking, channel strategy, or audience insight.",
    },
    {
      title: "Distribution is fragmenting",
      text: "Creator systems, performance channels, CRM, and brand strategy are splitting into more specialized marketing tracks.",
    },
  ],
  business: [
    {
      title: "Business is becoming more operational",
      text: "General business titles matter less than the ability to improve systems, manage projects, and execute reliably.",
    },
    {
      title: "Analysis creates leverage",
      text: "Operations, management analysis, and project delivery are carrying stronger demand than broad coordination roles.",
    },
    {
      title: "Trust still matters, but less alone",
      text: "Networks help with entry, but durable growth is increasingly tied to visible execution and measurable improvement.",
    },
  ],
  health: [
    {
      title: "Health is structurally durable",
      text: "This sector is driven more by demographic need and care demand than by short-term market cycles.",
    },
    {
      title: "Digital workflow is rising inside care",
      text: "Records, diagnostics, and digitally coordinated care are growing alongside direct patient-facing roles.",
    },
    {
      title: "Credentials still matter here",
      text: "Unlike many other sectors, trust, licensing, and regulated competence remain central filters for access and growth.",
    },
  ],
  education: [
    {
      title: "Education is unbundling",
      text: "Formal teaching is being joined by coaching, digital delivery, skill-based training, and learning design.",
    },
    {
      title: "Delivery format is shifting fast",
      text: "Hybrid and online systems are becoming normal, especially where access and flexibility matter more than classroom tradition.",
    },
    {
      title: "Teaching clarity is still the moat",
      text: "Tools matter, but the real differentiator remains how well knowledge is structured, delivered, and understood.",
    },
  ],
  infrastructure: [
    {
      title: "This sector moves on longer cycles",
      text: "Infrastructure opportunity depends on capital projects, public investment, utilities, and physical build-out rather than rapid hype swings.",
    },
    {
      title: "Energy changes the picture",
      text: "Grid, transmission, storage, and clean-energy demand are expanding the infrastructure story beyond traditional construction roles.",
    },
    {
      title: "Location still matters a lot",
      text: "Access to projects, cities, and build zones shapes opportunity more heavily here than in software or digital sectors.",
    },
  ],
  other: [
    {
      title: "Niche beats generic",
      text: "Tourism, hospitality, and personalized services reward specialization much more than undifferentiated general service work.",
    },
    {
      title: "Service quality is the real moat",
      text: "These sectors often depend on trust, repeat customers, and experience quality rather than pure scale.",
    },
    {
      title: "Operator skill matters more than title",
      text: "Business discipline, sales ability, and customer handling often matter more here than formal career ladders.",
    },
  ],
};

export const technologyEvidence = [
  {
    title: "WEF 2025",
    text: "Technology growth is not only AI and software. The 2025 Future of Jobs report also highlights robotics, energy systems, and environmental engineering as growth areas through 2030.",
    source: "World Economic Forum, January 7, 2025",
  },
  {
    title: "IEA 2024",
    text: "Global energy employment grew by nearly 2.5 million jobs in 2023, with clean energy contributing 1.5 million of that growth and strong demand for specialized engineering talent in grids and nuclear.",
    source: "International Energy Agency, World Energy Employment 2024",
  },
  {
    title: "BLS 2024-34",
    text: "Mechanical engineers are projected to grow 9%, electrical and electronics engineers 7%, and civil engineers 5%, showing that engineering demand extends beyond software roles.",
    source: "U.S. Bureau of Labor Statistics, updated 2025",
  },
];

export const designEvidence = [
  {
    title: "BLS web and digital designers",
    text: "Web developers and digital designers are projected to grow 7% from 2024 to 2034, with continued demand from ecommerce, mobile interfaces, and digital product usage.",
    source: "U.S. Bureau of Labor Statistics, updated August 28, 2025",
  },
  {
    title: "BLS graphic designers",
    text: "Graphic designers are projected to grow 2% from 2024 to 2034, and BLS notes that AI tools may reduce demand for some freelance and routine production work.",
    source: "U.S. Bureau of Labor Statistics, updated August 28, 2025",
  },
  {
    title: "BLS industrial designers",
    text: "Industrial designers are projected to grow 3% from 2024 to 2034, supported by demand for innovative product design, especially around higher-tech products.",
    source: "U.S. Bureau of Labor Statistics, updated August 28, 2025",
  },
  {
    title: "BLS animators",
    text: "Special effects artists and animators are projected to grow 2% from 2024 to 2034, with demand continuing in games, film, mobile graphics, and visual effects.",
    source: "U.S. Bureau of Labor Statistics, updated August 28, 2025",
  },
];

export const marketingEvidence = [
  {
    title: "BLS marketing managers",
    text: "Marketing managers are projected to grow 7% from 2024 to 2034, with demand tied to pricing strategy, market expansion, and customer acquisition.",
    source: "U.S. Bureau of Labor Statistics, updated August 28, 2025",
  },
  {
    title: "BLS market research analysts",
    text: "Market research analysts and marketing specialists are projected to grow 7% from 2024 to 2034, driven by expanding use of data, customer behavior analysis, and performance measurement.",
    source: "U.S. Bureau of Labor Statistics, updated August 28, 2025",
  },
  {
    title: "BLS public relations specialists",
    text: "Public relations specialists are projected to grow 5% from 2024 to 2034, with social media and rapid reputation management continuing to create demand.",
    source: "U.S. Bureau of Labor Statistics, updated August 28, 2025",
  },
  {
    title: "WEF 2025",
    text: "Broadening digital access is the most transformative trend in the Future of Jobs Report 2025, reinforcing continued demand for digital distribution, communication, and audience-facing work.",
    source: "World Economic Forum, January 7, 2025",
  },
];

export const businessEvidence = [
  {
    title: "BLS management analysts",
    text: "Management analysts are projected to grow 9% from 2024 to 2034 as organizations seek efficiency, restructuring, and cost control.",
    source: "U.S. Bureau of Labor Statistics, updated August 28, 2025",
  },
  {
    title: "BLS project management specialists",
    text: "Project management specialists are projected to grow 6% from 2024 to 2034 as firms need people who can coordinate complex operations and deliver outcomes.",
    source: "U.S. Bureau of Labor Statistics, updated August 28, 2025",
  },
  {
    title: "BLS top executives / operations managers",
    text: "General and operations managers are projected to grow 4% from 2024 to 2034, with large annual openings as organizations keep relying on operating leaders.",
    source: "U.S. Bureau of Labor Statistics, updated August 28, 2025",
  },
];

export const healthEvidence = [
  {
    title: "BLS registered nurses",
    text: "Registered nurses are projected to grow 5% from 2024 to 2034, with about 189,100 openings each year on average.",
    source: "U.S. Bureau of Labor Statistics, updated August 28, 2025",
  },
  {
    title: "BLS medical records specialists",
    text: "Medical records specialists are projected to grow 7% from 2024 to 2034 as healthcare demand and electronic records continue to expand.",
    source: "U.S. Bureau of Labor Statistics, updated August 28, 2025",
  },
  {
    title: "BLS nurse practitioners",
    text: "Nurse practitioners are among the fastest-growing healthcare roles, projected to rise 46% from 2024 to 2034 as demand for primary and specialized care expands.",
    source: "U.S. Bureau of Labor Statistics, updated August 28, 2025",
  },
];

export const educationEvidence = [
  {
    title: "BLS postsecondary teachers",
    text: "Postsecondary teachers are projected to grow 7% from 2024 to 2034, much faster than average, with about 114,000 openings per year.",
    source: "U.S. Bureau of Labor Statistics, updated August 28, 2025",
  },
  {
    title: "BLS instructional coordinators",
    text: "Instructional coordinators are projected to grow 1% from 2024 to 2034, showing that education administration is steadier but slower than direct teaching growth.",
    source: "U.S. Bureau of Labor Statistics, updated August 28, 2025",
  },
  {
    title: "UNESCO digital education",
    text: "UNESCO describes digital learning as a major force transforming access, delivery, administration, and resilience in education systems.",
    source: "UNESCO Digital Learning and Transformation of Education",
  },
];

export const infrastructureEvidence = [
  {
    title: "BLS civil engineers",
    text: "Civil engineers are projected to grow 5% from 2024 to 2034 as investment continues in roads, bridges, water systems, and waste treatment.",
    source: "U.S. Bureau of Labor Statistics, updated August 28, 2025",
  },
  {
    title: "BLS facilities managers",
    text: "Administrative services and facilities managers are projected to grow 4% from 2024 to 2034, with building efficiency and operations keeping demand in place.",
    source: "U.S. Bureau of Labor Statistics, updated August 28, 2025",
  },
  {
    title: "IEA world energy employment 2024",
    text: "The global energy sector added nearly 2.5 million jobs in 2023, with strong gains in clean energy, grids, transmission, distribution, and storage.",
    source: "International Energy Agency, World Energy Employment 2024",
  },
];

export const otherEvidence = [
  {
    title: "BLS lodging managers",
    text: "Lodging managers are projected to grow 3% from 2024 to 2034 as travel spending and hospitality management continue to support demand.",
    source: "U.S. Bureau of Labor Statistics, updated August 28, 2025",
  },
  {
    title: "BLS travel agents",
    text: "Travel agents are projected to grow 2% from 2024 to 2034, with demand remaining for personalized travel planning despite online booking tools.",
    source: "U.S. Bureau of Labor Statistics, updated August 28, 2025",
  },
  {
    title: "BLS management occupations",
    text: "Management occupations overall are projected to grow faster than average from 2024 to 2034, creating room for niche service and hospitality operators with strong business judgment.",
    source: "U.S. Bureau of Labor Statistics, updated August 28, 2025",
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
    title: "All Sectors - Future Job Market in Nepal (2025-2030)",
    summary:
      "Nepal is shifting from agriculture → service economy → digital economy. This means physical work is declining, skill-based work is rising, and remote/global jobs are growing. Winners: IT + Healthcare + Digital + Energy. Middle: Education + Govt + Banking. Losers: Low-skill + repetitive + traditional-only jobs.",
    stats: [
      { value: "Very High 🚀", label: "IT & Technology growth" },
      { value: "High", label: "Healthcare demand" },
      { value: "Growing", label: "Tourism & Hospitality" },
      { value: "Growing", label: "Energy (Hydropower)" },
      { value: "Fast Growth", label: "Digital Marketing" },
      { value: "Fast Growth", label: "E-commerce" },
    ],
    increasing: [
      "Software Developer",
      "AI / Data Analyst",
      "UI/UX Designer",
      "Digital Marketer",
      "Healthcare Workers",
      "Cybersecurity Specialist",
      "Cloud Engineer",
      "Content Creator",
      "E-commerce Operator",
      "EdTech / Trainer",
      "Hydropower Technician",
      "Renewable Energy Engineer",
    ],
    declining: [
      "Traditional Farming (declining interest)",
      "Low-skill Labor (declining locally)",
      "Manufacturing Jobs (weak growth)",
      "Clerical Jobs (automation risk)",
      "Manual accounting",
      "Basic data entry",
      "Traditional print/media jobs",
    ],
    skills: [
      "Digital literacy (critical baseline)",
      "Communication (English + clarity)",
      "AI usage / prompt skills",
      "Self-learning ability",
      "Portfolio building",
    ],
  },
  technology: {
    title: "Technology",
    summary:
      "Technology demand is broader than IT. It includes software, AI, electrical and electronics engineering, mechanical systems, civil infrastructure, and clean-energy engineering tied to automation, grids, manufacturing, and renewable build-out.",
    stats: [
      { value: "9%", label: "mechanical engineer growth", source: "BLS 2024-34" },
      { value: "7%", label: "electrical/electronics engineer growth", source: "BLS 2024-34" },
      { value: "2.5M+", label: "energy jobs added in 2023", source: "IEA 2024" },
    ],
    increasing: [
      "Software Developer",
      "AI / Data Analyst",
      "Electrical Engineer",
      "Mechanical Engineer",
      "Renewable Energy Engineer",
      "Cybersecurity Specialist",
      "Cloud Engineer",
      "Civil / Environmental Engineer",
    ],
    declining: [
      "Basic data entry",
      "Routine manual QA",
      "Low-complexity repetitive IT support",
      "Legacy print production workflows",
    ],
    skills: [
      "Coding",
      "AI literacy",
      "Electrical systems",
      "Mechanical design thinking",
      "CAD / simulation",
      "Systems thinking",
      "English",
    ],
  },
  design: {
    title: "Design",
    summary:
      "Design demand is splitting into stronger digital-product, interface, motion, and product-design tracks, while routine print-heavy and low-complexity visual production work faces more pressure from automation and template-based tools.",
    stats: [
      { value: "7%", label: "web & digital designer growth", source: "BLS 2024-34" },
      { value: "3%", label: "industrial designer growth", source: "BLS 2024-34" },
      { value: "2%", label: "graphic / animator growth", source: "BLS 2024-34" },
    ],
    increasing: [
      "UI/UX Designer",
      "Web & Digital Interface Designer",
      "Product Designer",
      "Brand Systems Designer",
      "Motion Designer",
      "Industrial Designer",
    ],
    declining: [
      "Traditional print/media jobs",
      "Routine production design",
      "Low-complexity social media asset work",
      "Template-based layout-only work",
    ],
    skills: [
      "Figma",
      "Interaction thinking",
      "Visual systems",
      "Motion basics",
      "Case studies",
      "User research",
      "Client communication",
    ],
  },
  marketing: {
    title: "Marketing",
    summary:
      "Marketing is moving toward digital distribution, performance measurement, content systems, audience analytics, and reputation management. The strongest demand is in roles that can connect creativity to measurable growth rather than campaign execution alone.",
    stats: [
      { value: "7%", label: "marketing manager growth", source: "BLS 2024-34" },
      { value: "7%", label: "market research / specialist growth", source: "BLS 2024-34" },
      { value: "5%", label: "PR specialist growth", source: "BLS 2024-34" },
    ],
    increasing: [
      "Digital Marketer",
      "Performance Marketing Specialist",
      "Market Research Analyst",
      "Content Creator / Personal Brand",
      "Brand Strategist",
      "CRM / Lifecycle Marketer",
      "E-commerce Operator",
      "Public Relations Specialist",
    ],
    declining: [
      "Traditional print/media jobs",
      "Manual ad-buying workflows",
      "Low-complexity posting-only roles",
      "Non-analytical general promotion work",
    ],
    skills: [
      "Content strategy",
      "Analytics",
      "Audience research",
      "Copywriting",
      "Lifecycle thinking",
      "AI tools",
      "Brand judgment",
    ],
  },
  business: {
    title: "Business",
    summary:
      "Business demand is strongest in operations, analysis, project delivery, and client-facing execution. The market is rewarding people who can improve systems, manage teams, and move work forward with measurable outcomes.",
    stats: [
      { value: "9%", label: "management analyst growth", source: "BLS 2024-34" },
      { value: "6%", label: "project management growth", source: "BLS 2024-34" },
      { value: "4%", label: "operations manager growth", source: "BLS 2024-34" },
    ],
    increasing: [
      "Management Analyst",
      "Project Manager",
      "Sales Operations",
      "Account Management",
      "Business Operations Specialist",
      "Startup Ops",
    ],
    declining: [
      "Clerical / Admin roles",
      "Executive support",
      "Routine coordination-only roles",
      "Low-autonomy back-office work",
    ],
    skills: [
      "Communication",
      "Execution",
      "Operational analysis",
      "Project planning",
      "CRM tools",
      "Decision-making",
    ],
  },
  health: {
    title: "Health",
    summary:
      "Health demand stays structurally strong across patient care, diagnostics, health information, and advanced practice roles. It is one of the more durable sectors because it is driven by demographic and care-system demand rather than short-cycle trends.",
    stats: [
      { value: "46%", label: "nurse practitioner growth", source: "BLS 2024-34" },
      { value: "7%", label: "medical records growth", source: "BLS 2024-34" },
      { value: "5%", label: "registered nurse growth", source: "BLS 2024-34" },
    ],
    increasing: [
      "Nurse Practitioner",
      "Registered Nurse",
      "Health Technician",
      "Medical Records Specialist",
      "Lab Support",
      "Nursing Support Roles",
    ],
    declining: [
      "Paper-based admin handling",
      "Manual coding-only workflows",
      "Low-digital support processes",
    ],
    skills: [
      "Accuracy",
      "Care systems",
      "Documentation",
      "Digital records",
      "Clinical judgment",
      "Basic digital tools",
    ],
  },
  education: {
    title: "Education",
    summary:
      "Education demand is splitting between stronger digital and higher-education teaching demand, coaching and training formats, and slower curriculum-administration tracks. Delivery is becoming more hybrid and tech-enabled.",
    stats: [
      { value: "7%", label: "postsecondary teacher growth", source: "BLS 2024-34" },
      { value: "1%", label: "instructional coordinator growth", source: "BLS 2024-34" },
      { value: "Hybrid", label: "delivery model", source: "UNESCO digital education" },
    ],
    increasing: [
      "Postsecondary Teacher",
      "EdTech / Trainer",
      "Online Tutor",
      "Learning Designer",
      "Skills Coach",
    ],
    declining: [
      "Theory-only instruction",
      "Static curriculum delivery",
      "Low-tech classroom-only dependence",
    ],
    skills: [
      "Teaching clarity",
      "Digital delivery",
      "Content design",
      "Assessment thinking",
      "English",
    ],
  },
  infrastructure: {
    title: "Infrastructure",
    summary:
      "Infrastructure demand is tied to roads, bridges, water systems, logistics, facilities, and energy build-out. It is slower-moving than digital sectors but more anchored to public investment and physical systems.",
    stats: [
      { value: "5%", label: "civil engineer growth", source: "BLS 2024-34" },
      { value: "4%", label: "facilities manager growth", source: "BLS 2024-34" },
      { value: "2.5M+", label: "energy jobs added in 2023", source: "IEA 2024" },
    ],
    increasing: [
      "Civil Engineer",
      "Project Coordination",
      "Facilities Manager",
      "Grid / Energy Systems Roles",
      "Logistics Operations",
      "Hydropower Roles",
    ],
    declining: [
      "Unskilled manual dependency",
      "Low-tech site coordination",
      "Paper-based maintenance tracking",
    ],
    skills: [
      "Coordination",
      "Technical basics",
      "Site systems",
      "Project discipline",
      "Safety processes",
    ],
  },
  // "foreign-employment": {
  //   title: "Foreign Employment",
  //   summary:
  //     "Still a major income path, but increasingly compared against remote and skill-led alternatives.",
  //   stats: [
  //     { value: "4M+", label: "workers abroad" },
  //     { value: "Stable", label: "income path" },
  //     { value: "High", label: "migration pressure" },
  //   ],
  //   increasing: ["Trade Roles Abroad", "Service Roles Abroad", "Technical Worker Migration"],
  //   declining: ["Undifferentiated local low-skill work"],
  //   skills: ["Trade skills", "English", "Adaptability", "Certification"],
  // },
  other: {
    title: "Other Sectors",
    summary:
      "This includes Banking & Finance, Tourism & Hospitality, Transport & Logistics, Manufacturing, Energy & Hydropower, Legal & Law, Media & Entertainment, Freelancing & Remote Work, Research & Development, and Security Services. These sectors offer diverse opportunities with varying growth rates.",
    stats: [
      { value: "Stable", label: "Banking & Finance" },
      { value: "Growing", label: "Tourism & Hospitality" },
      { value: "Fast Growth", label: "Freelancing & Remote Work" },
    ],
    increasing: [
      "Bank Officers",
      "Financial Analysts",
      "Hotel Staff",
      "Tour Guides",
      "Trekking Guides",
      "Pilots",
      "Logistics Managers",
      "Hydropower Technicians",
      "Electrical Engineers",
      "Lawyers",
      "Journalists",
      "Content Creators",
      "Video Editors",
      "Influencers",
      "Graphic Designers",
      "Writers",
      "Virtual Assistants",
      "Scientists",
      "Policy Researchers",
    ],
    declining: [
      "Traditional Banking Clerks",
      "Manual Accounting",
      "Low-skill Factory Workers",
      "Basic Security Guards",
      "Traditional Media Jobs",
    ],
    skills: [
      "Financial literacy",
      "Customer service",
      "Digital tools",
      "Communication",
      "Specialized expertise",
      "Self-learning",
      "Adaptability",
    ],
  },
};
