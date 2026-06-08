export interface OmegaverseType {
  code: "ALPHA" | "BETA" | "OMEGA" | "SIGMA" | "DELTA" | "GAMMA";
  name: string;
  tagline: string;
  description: string;
  detailedDescription: string;
  strengths: string[];
  weaknesses: string[];
  careers: string[];
  workStyle: string;
  compatibility: {
    bestMatch: string;
    goodMatch: string;
    challenging: string;
  };
}

export const omegaverseTypes: Record<string, OmegaverseType> = {
  ALPHA: {
    code: "ALPHA",
    name: "Alpha",
    tagline: "The Commanding Leader and Protector",
    description:
      "Decisive, natural-born leaders with protective instincts and a powerful presence.",
    detailedDescription:
      "Alphas are highly ambitious, outgoing, and protective. They naturally step forward in a crisis and command respect, driving teams toward concrete goals with a focus on vision and execution.",
    strengths: [
      "Strong leadership and authority",
      "Protective and loyal instincts",
      "Decisive action under pressure",
      "High determination and drive",
    ],
    weaknesses: [
      "Can be stubborn or overly dominant",
      "Struggle to show vulnerability",
      "May become overly competitive",
    ],
    careers: [
      "Executive Director",
      "Defense Personnel",
      "Strategic Consultant",
      "Entrepreneur",
    ],
    workStyle:
      "Thrives in positions of leadership, autonomy, and high stakes. Prefers setting goals rather than executing routines.",
    compatibility: {
      bestMatch: "Omega",
      goodMatch: "Beta",
      challenging: "Alpha",
    },
  },
  BETA: {
    code: "BETA",
    name: "Beta",
    tagline: "The Balanced Pillar of Stability",
    description:
      "Calm, reliable, and cooperative professionals who form the stable foundation of any group.",
    detailedDescription:
      "Betas are the peacemakers and essential builders of society. They are objective, balanced, and highly adaptable. Betas rarely seek extreme dominance, preferring steady, collaborative environments where logic and harmony coexist.",
    strengths: [
      "High stability and reliability",
      "Excellent mediation skills",
      "Adaptable and level-headed",
      "Practical and down-to-earth",
    ],
    weaknesses: [
      "Can avoid taking necessary risks",
      "May settle for the status quo",
      "Can be passive in critical conflicts",
    ],
    careers: [
      "Project Manager",
      "Educator",
      "Systems Coordinator",
      "Financial Analyst",
    ],
    workStyle:
      "Excel in collaborative team settings. Provide steady execution, clear communication, and keep operations running smoothly.",
    compatibility: {
      bestMatch: "Beta",
      goodMatch: "Alpha, Omega",
      challenging: "None",
    },
  },
  OMEGA: {
    code: "OMEGA",
    name: "Omega",
    tagline: "The Empathetic Creator and Caregiver",
    description:
      "Warm, intuitive, and deeply empathetic individuals who nurture relationships and creativity.",
    detailedDescription:
      "Omegas are highly intuitive, creative, and caring. They possess a deep emotional intelligence and excel at reading the atmosphere of a room. Omegas value harmony, safety, and deep emotional connections above all.",
    strengths: [
      "Exceptional emotional intelligence",
      "Nurturing and supportive nature",
      "Creative and artistic vision",
      "Highly intuitive and empathetic",
    ],
    weaknesses: [
      "Can take criticism personally",
      "Prone to emotional overwhelm",
      "May neglect own self-care for others",
    ],
    careers: [
      "Therapist/Counselor",
      "Creative Designer",
      "Community Organizer",
      "Healthcare Worker",
    ],
    workStyle:
      "Thrives in creative, collaborative, or caregiving environments. Needs safety, appreciation, and emotional alignment.",
    compatibility: {
      bestMatch: "Alpha",
      goodMatch: "Beta",
      challenging: "Omega",
    },
  },
  SIGMA: {
    code: "SIGMA",
    name: "Sigma",
    tagline: "The Independent Lone Wolf",
    description:
      "Highly self-reliant, analytical, and capable leaders who operate outside social hierarchies.",
    detailedDescription:
      "Sigmas are independent thinkers who do not seek social status or control over others, yet they possess immense capability. They are quiet, observant, and highly analytical, leading through competence rather than authority.",
    strengths: [
      "Exceptional self-reliance",
      "Deep analytical capacity",
      "Independent and self-directed",
      "Original problem-solving skills",
    ],
    weaknesses: [
      "Can be aloof or emotionally detached",
      "Resists conventional schedules and rules",
      "May struggle with routine collaborative meetings",
    ],
    careers: [
      "Software Architect",
      "Independent Consultant",
      "Research Scientist",
      "Novelist",
    ],
    workStyle:
      "Needs maximum autonomy and freedom to tackle complex challenges. Excels at individual mastery.",
    compatibility: {
      bestMatch: "Sigma, Delta",
      goodMatch: "Gamma",
      challenging: "Alpha",
    },
  },
  DELTA: {
    code: "DELTA",
    name: "Delta",
    tagline: "The Dutiful Guard and Executor",
    description:
      "Detail-oriented, hardworking, and security-focused individuals who value structure.",
    detailedDescription:
      "Deltas are quiet, structured, and focused. Often shaped by experience, they value rules and protocols highly. They work diligently in the background, ensuring operations run exactly as planned and securing the baseline details.",
    strengths: [
      "Precision and attention to detail",
      "High discipline and compliance",
      "Steady, reliable work execution",
      "Supportive team presence",
    ],
    weaknesses: [
      "Can resist sudden pivots or changes",
      "Struggles under high ambiguity",
      "May hold onto cautious patterns",
    ],
    careers: [
      "Compliance Officer",
      "Financial Auditor",
      "Quality Inspector",
      "Database Administrator",
    ],
    workStyle:
      "Thrives under clear guidelines, structured workflows, and defined responsibilities. Excels at consistency.",
    compatibility: {
      bestMatch: "Sigma",
      goodMatch: "Beta, Gamma",
      challenging: "Alpha",
    },
  },
  GAMMA: {
    code: "GAMMA",
    name: "Gamma",
    tagline: "The Adaptive Strategist and Visionary",
    description:
      "Highly intelligent, flexible, and original thinkers who forge their own paths dynamically.",
    detailedDescription:
      "Gammas are creative strategists who are highly adaptive. They do not mind changing their approach or pivoting dynamically to capture new opportunities, valuing knowledge, original execution, and strategic foresight.",
    strengths: [
      "Strategic agility and versatility",
      "Creative and original vision",
      "Highly adaptable to trends",
      "Broad perspective analysis",
    ],
    weaknesses: [
      "Can lose interest in repetitive execution",
      "May seem eccentric or unpredictable",
      "Can struggle to explain abstract ideas simply",
    ],
    careers: [
      "Creative Director",
      "Innovation Lead",
      "Product Strategist",
      "Trend Analyst",
    ],
    workStyle:
      "Needs dynamic, changing environments that reward innovation and flexible pivots over routine execution.",
    compatibility: {
      bestMatch: "Gamma, Beta",
      goodMatch: "Delta, Omega",
      challenging: "Alpha",
    },
  },
};
