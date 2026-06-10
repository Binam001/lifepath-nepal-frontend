import { calculateArchetype } from "./CareermatchingForOcean";
import { type Trait } from "./OCEAN-data";

export type CoreCareerCategory =
  | "software_and_tech"
  | "creative_arts_design"
  | "healthcare_and_caregiving"
  | "leadership_and_management"
  | "research_and_academia"
  | "legal_and_compliance";

export interface CoreCareerInfo {
  title: string;
  description: string;
  iconName: "Code" | "Palette" | "Heart" | "Briefcase" | "BookOpen" | "Scale";
  jobExamples: string[];
}

// 1. Unified Core Career Metadata
export const coreCareerMetadata: Record<CoreCareerCategory, CoreCareerInfo> = {
  software_and_tech: {
    title: "Software Engineering & Tech Development",
    description: "Building systems, writing algorithms, backend infrastructure, and artificial intelligence solutions.",
    iconName: "Code",
    jobExamples: ["Software Engineer", "Full Stack Developer", "Data Scientist", "System Architect", "DevOps Engineer"],
  },
  creative_arts_design: {
    title: "Design & Creative Expression",
    description: "Graphic design, content creation, copy editing, literature, creative direction, and visual arts.",
    iconName: "Palette",
    jobExamples: ["UI/UX Designer", "Graphic Artist", "Creative Director", "Copywriter", "Animator"],
  },
  healthcare_and_caregiving: {
    title: "Healthcare, Counseling & Caregiving",
    description: "Therapy, life coaching, social work, medical care, and counseling individuals through challenges.",
    iconName: "Heart",
    jobExamples: ["Psychologist", "Life Coach", "Social Worker", "Nurse Practitioner", "Counselor"],
  },
  leadership_and_management: {
    title: "Strategy, Leadership & Business Operations",
    description: "Directing projects, starting businesses, managing corporate goals, and organizing operations.",
    iconName: "Briefcase",
    jobExamples: ["Project Manager", "Operations Director", "Management Consultant", "Product Manager", "Entrepreneur"],
  },
  research_and_academia: {
    title: "Research, Science & Education",
    description: "Teaching, conducting scientific experiments, database management, archiving, and analysis.",
    iconName: "BookOpen",
    jobExamples: ["Research Scientist", "University Professor", "Data Analyst", "Academic Educator", "Archivist"],
  },
  legal_and_compliance: {
    title: "Law, Risk Management & Compliance",
    description: "Legal advice, risk analysis, compliance checking, auditing, and enforcing rules and standards.",
    iconName: "Scale",
    jobExamples: ["Corporate Lawyer", "Compliance Auditor", "Risk Analyst", "Policy Advisor", "Legal Consultant"],
  },
};

// 2. Normalization Engine (Keyword-based with exact match fallback)
export const getCoreCareerCategory = (career: string): CoreCareerCategory => {
  const c = career.toLowerCase().trim();

  // Exact Match / Strong override dictionary
  const overrides: Record<string, CoreCareerCategory> = {
    "chief financial officer (cfo)": "leadership_and_management",
    "corporate lawyer": "legal_and_compliance",
    "systems engineer": "software_and_tech",
    "project manager": "leadership_and_management",
    "human resources (hr) manager": "leadership_and_management",
    "hr manager": "leadership_and_management",
    "school counselor": "healthcare_and_caregiving",
    "life coach": "healthcare_and_caregiving",
  };

  if (overrides[c]) return overrides[c];

  // Keyword Matching
  if (
    c.includes("software") ||
    c.includes("programmer") ||
    c.includes("developer") ||
    c.includes("computer") ||
    c.includes("data scientist") ||
    c.includes("cybersecurity") ||
    c.includes("hacker") ||
    c.includes("database") ||
    c.includes("network") ||
    c.includes("cloud") ||
    c.includes("it ") ||
    c.includes("tech") ||
    c.includes("machine learning") ||
    c.includes("architect") ||
    c.includes("coder")
  ) {
    return "software_and_tech";
  }

  if (
    c.includes("designer") ||
    c.includes("artist") ||
    c.includes("writer") ||
    c.includes("author") ||
    c.includes("creative") ||
    c.includes("animator") ||
    c.includes("game design") ||
    c.includes("branding") ||
    c.includes("copywriter") ||
    c.includes("art") ||
    c.includes("novelist") ||
    c.includes("editor") ||
    c.includes("translator") ||
    c.includes("florist")
  ) {
    return "creative_arts_design";
  }

  if (
    c.includes("doctor") ||
    c.includes("nurse") ||
    c.includes("caregiver") ||
    c.includes("therapist") ||
    c.includes("counselor") ||
    c.includes("psychology") ||
    c.includes("social work") ||
    c.includes("pediatrician") ||
    c.includes("coach") ||
    c.includes("physician") ||
    c.includes("surgeon") ||
    c.includes("therapist")
  ) {
    return "healthcare_and_caregiving";
  }

  if (
    c.includes("scientist") ||
    c.includes("researcher") ||
    c.includes("professor") ||
    c.includes("teacher") ||
    c.includes("educator") ||
    c.includes("academic") ||
    c.includes("philosopher") ||
    c.includes("mathematician") ||
    c.includes("science") ||
    c.includes("historian") ||
    c.includes("librarian") ||
    c.includes("archivist") ||
    c.includes("botanist") ||
    c.includes("biologist")
  ) {
    return "research_and_academia";
  }

  if (
    c.includes("lawyer") ||
    c.includes("judge") ||
    c.includes("legal") ||
    c.includes("compliance") ||
    c.includes("auditor") ||
    c.includes("inspector") ||
    c.includes("forensic") ||
    c.includes("attorney") ||
    c.includes("risk") ||
    c.includes("air traffic")
  ) {
    return "legal_and_compliance";
  }

  if (
    c.includes("ceo") ||
    c.includes("founder") ||
    c.includes("executive") ||
    c.includes("manager") ||
    c.includes("director") ||
    c.includes("advisor") ||
    c.includes("consultant") ||
    c.includes("strategist") ||
    c.includes("operations") ||
    c.includes("entrepreneur") ||
    c.includes("business") ||
    c.includes("cfo") ||
    c.includes("coordinator") ||
    c.includes("investor") ||
    c.includes("broker") ||
    c.includes("planner")
  ) {
    return "leadership_and_management";
  }

  // Default fallback if no keywords match
  return "leadership_and_management";
};

// 3. Multi-Test Profile Synthesis
export interface SynthesizedProfile {
  title: string;
  commonTraits: string[];
  description: string;
  advice: string;
}

export const getNatureSynthesis = (
  mbtiCode?: string,
  omegaverseRole?: string,
  oceanScores?: Record<string, number>
): SynthesizedProfile => {
  const oceanArch = oceanScores
    ? calculateArchetype(oceanScores as Record<Trait, number>)
    : null;

  // Flags representing personality tendencies
  const isIntroverted =
    (mbtiCode && mbtiCode.startsWith("I")) ||
    (oceanScores && (oceanScores.E ?? 50) < 45) ||
    (omegaverseRole && ["SIGMA", "DELTA", "OMEGA"].includes(omegaverseRole));

  const isHighlyStructured =
    (mbtiCode && mbtiCode.endsWith("J")) ||
    (oceanScores && (oceanScores.C ?? 50) > 60) ||
    (omegaverseRole && ["DELTA", "BETA"].includes(omegaverseRole));

  const isHighlyCreative =
    (mbtiCode && mbtiCode.includes("N")) ||
    (oceanScores && (oceanScores.O ?? 50) > 65) ||
    (omegaverseRole && ["GAMMA", "OMEGA"].includes(omegaverseRole));

  const isOutgoingLeader =
    (mbtiCode && mbtiCode.startsWith("E") && mbtiCode.includes("J")) ||
    (omegaverseRole === "ALPHA") ||
    (oceanScores && (oceanScores.E ?? 50) > 65 && (oceanScores.C ?? 50) > 60);

  // 1. Silent Innovator / Mastermind (Introverted + Creative + Structured)
  if (isIntroverted && isHighlyCreative && isHighlyStructured) {
    return {
      title: "The Silent Mastermind",
      commonTraits: ["Independent", "Strategic", "Innovative", "System-Driven"],
      description:
        "You combine a deep creative imagination with a strict, self-disciplined execution style. You prefer working in quiet settings where you can design complex structures, build architectures, or map out long-term visions without unnecessary social distractions.",
      advice:
        "Practice sharing your plans early. Because you process things internally and build massive structures in your head, others can struggle to follow your logic. Communication is your key team building skill.",
    };
  }

  // 2. The Lone Wolf Innovator (Introverted + Creative + Spontaneous)
  if (isIntroverted && isHighlyCreative) {
    return {
      title: "The Independent Visionary",
      commonTraits: ["Self-Directed", "Imaginative", "Adaptable", "Reflective"],
      description:
        "You are a quiet explorer of ideas. You value independence and flexible work environments that let you pivot, draft prototypes, and conceptualize solutions. You care more about solving interesting problems than climbing hierarchy ladders.",
      advice:
        "Partner with structured project managers or reliable organizers. You are excellent at starting creative projects but will gain momentum by having others help you organize and finish them.",
    };
  }

  // 3. The Decisive Director (Extroverted + Structured Leader)
  if (isOutgoingLeader) {
    return {
      title: "The Decisive Director",
      commonTraits: ["Results-Driven", "Organized", "Articulate", "Assertive"],
      description:
        "You are a natural organizer of people and tasks. You combine a clear, objective long-term vision with decisive team execution. You thrive in high-stakes environments, excel at public speaking, and take your commitments very seriously.",
      advice:
        "Practice active listening. You move quickly and expect results, which can overwhelm team members who process emotions or data more slowly. Cultivating empathy will double your leadership impact.",
    };
  }

  // 4. Quiet Hardworker / Reliable Analyst (Introverted + Structured)
  if (isIntroverted && isHighlyStructured) {
    return {
      title: "The Reliable Specialist",
      commonTraits: ["Detail-Oriented", "Reliable", "Composed", "Thorough"],
      description:
        "You are the structural backbone of any project. You are highly organized, detail-oriented, and value predictability and safety. You prefer working behind the scenes on clear, step-by-step assignments where instructions are reliable.",
      advice:
        "Stretch yourself by embracing small, safe risks. Routines keep you secure, but small improvisations will build your confidence and make you highly adaptable in fast-changing tech spaces.",
    };
  }

  // 5. The Empathic Helper (Creative/Helpful + Relationship Focus)
  const isAgreeable =
    (mbtiCode && mbtiCode.includes("F")) ||
    (oceanScores && (oceanScores.A ?? 50) > 60) ||
    (omegaverseRole === "OMEGA");

  if (isAgreeable) {
    return {
      title: "The Compassionate Catalyst",
      commonTraits: ["Empathetic", "Harmonious", "Creative", "Supportive"],
      description:
        "You possess immense emotional intelligence and care deeply about social harmony. You easily read a room, understand what people need, and thrive when you are nurturing relationships, coordinating communication, or helping others grow.",
      advice:
        "Build strict boundaries for your emotional availability. Because you take on others' feelings, you are highly prone to burnout. Remember that saying 'no' is a form of self-care.",
    };
  }

  // Fallback / General mix
  return {
    title: "The Balanced Pragmatist",
    commonTraits: ["Adaptable", "Practical", "Cooperative", "Logical"],
    description:
      "You bridge different working and thinking styles. You balance structure with spontaneity and social interaction with focused downtime. This makes you an excellent team mediator and a versatile problem-solver.",
    advice:
      "Take time to focus on your specific values. Because you adapt so easily to different environments and systems, you can lose track of what paths bring you the most genuine satisfaction.",
  };
};
