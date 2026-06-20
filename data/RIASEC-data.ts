export type RiasecCategory = "R" | "I" | "A" | "S" | "E" | "C";

export interface RiasecThemeDetail {
  name: string;
  label: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  idealEnvironment: string[];
}

export interface HollandCareer {
  title: string;
  code: string;
  description: string;
  field: string;
}

export const riasecThemes: Record<RiasecCategory, RiasecThemeDetail> = {
  R: {
    name: "Realistic",
    label: "The Doers",
    description:
      "Prefers hands-on, concrete activities. Enjoys working with tools, machinery, plants, or animals. Often describes people who are practical, physical, and mechanical.",
    strengths: [
      "Highly practical and common-sense oriented.",
      "Excels in physical or mechanical problem-solving.",
      "Stays grounded and reliable in a crisis.",
    ],
    weaknesses: [
      "Can struggle with highly abstract theories.",
      "May become impatient with endless meetings or discussions.",
      "Can be perceived as blunt in highly emotional situations.",
    ],
    idealEnvironment: [
      "Physical, hands-on settings with clear, tangible goals.",
      "Workplaces with clear safety rules and minimal office politics.",
      "Environments where people can work independently with tools or technology.",
    ],
  },
  I: {
    name: "Investigative",
    label: "The Thinkers",
    description:
      "Prefers intellectual, analytical, and scientific research. Enjoys problem solving, theoretical examination, and analyzing patterns. Often describes people who are curious, logical, and scholarly.",
    strengths: [
      "Exceptional at complex, logical problem-solving.",
      "Highly independent and self-motivated.",
      "Evaluates situations objectively without emotional bias.",
    ],
    weaknesses: [
      "Prone to 'analysis paralysis' (overthinking before acting).",
      "May prefer isolation and struggle with highly collaborative tasks.",
      "Can focus so much on data that they ignore human factors.",
    ],
    idealEnvironment: [
      "Quiet, intellectual spaces that allow for deep focus and independent study.",
      "Workplaces that reward curiosity, research, and data-driven decisions.",
      "Environments free from constant interruptions and repetitive administrative tasks.",
    ],
  },
  A: {
    name: "Artistic",
    label: "The Creators",
    description:
      "Prefers unstructured, expressive, and imaginative tasks. Enjoys design, art, music, drama, and creative writing. Often describes people who are expressive, original, and independent.",
    strengths: [
      "Highly adaptable and comfortable with ambiguity.",
      "Brings fresh, out-of-the-box perspectives to stagnant problems.",
      "Deeply expressive and emotionally intelligent.",
    ],
    weaknesses: [
      "Strongly dislikes rigid rules, schedules, and micromanagement.",
      "Can struggle to stay organized with mundane tasks.",
      "May abandon projects once the 'creative phase' is over.",
    ],
    idealEnvironment: [
      "Highly flexible, open-minded spaces like studios or creative agencies.",
      "Workplaces that value originality, aesthetics, and self-expression.",
      "Environments with minimal rigid rules, relaxed dress codes, and flexible hours.",
    ],
  },
  S: {
    name: "Social",
    label: "The Helpers",
    description:
      "Prefers interpersonal, cooperative, and teaching activities. Enjoys counseling, healing, training, and supporting others. Often describes people who are helpful, friendly, and empathetic.",
    strengths: [
      "Exceptional communicators and active listeners.",
      "Naturally builds team morale and resolves conflicts.",
      "Highly empathetic to the needs of clients or coworkers.",
    ],
    weaknesses: [
      "Can experience burnout by carrying others' emotional weight.",
      "May avoid necessary confrontations to keep the peace.",
      "Often struggles with purely mechanical, isolated work.",
    ],
    idealEnvironment: [
      "Collaborative, human-centered settings like schools, clinics, or community centers.",
      "Workplaces focused on mutual support, healing, or teaching.",
      "Environments with high levels of social interaction and team-based goals.",
    ],
  },
  E: {
    name: "Enterprising",
    label: "The Persuaders",
    description:
      "Prefers leadership, managerial, and entrepreneurial roles. Enjoys organizing people, selling ideas, managing companies, and negotiation. Often describes people who are energetic, ambitious, and talkative.",
    strengths: [
      "Confident leaders who naturally take charge.",
      "Highly persuasive and goal-oriented.",
      "Comfortable taking calculated risks to achieve success.",
    ],
    weaknesses: [
      "Can become overly competitive or impatient with slow progress.",
      "May dominate conversations and fail to listen to subordinates.",
      "Sometimes neglects fine details to focus on the 'big picture'.",
    ],
    idealEnvironment: [
      "Fast-paced, competitive environments like corporate offices or startups.",
      "Workplaces that reward ambition, leadership, and financial success.",
      "Environments with clear hierarchies where taking calculated risks is encouraged.",
    ],
  },
  C: {
    name: "Conventional",
    label: "The Organizers",
    description:
      "Prefers structured, detail-oriented, and orderly tasks. Enjoys spreadsheets, financial records, indexing information, and managing logistics. Often describes people who are orderly, systematic, and methodical.",
    strengths: [
      "Extremely organized, reliable, and punctual.",
      "Excels at catching errors and maintaining quality control.",
      "Creates highly efficient systems out of chaos.",
    ],
    weaknesses: [
      "Can be inflexible when sudden changes disrupt the plan.",
      "Uncomfortable working in vague, undefined environments.",
      "May struggle to innovate or break established rules.",
    ],
    idealEnvironment: [
      "Highly structured, predictable settings like banks or administrative offices.",
      "Workplaces with clear chains of command and standard operating procedures.",
      "Environments that value accuracy, dependability, and organized data.",
    ],
  },
};

export const hollandCareersDatabase: HollandCareer[] = [
  // Technology & Engineering
  {
    title: "Software Engineer / Architect",
    code: "IRC",
    field: "Technology",
    description:
      "Fuses investigative logical analysis with hands-on coding (Realistic) and systematic, conventional documentation structures.",
  },
  {
    title: "Data Scientist",
    code: "IRC",
    field: "Technology",
    description:
      "Combines investigative pattern detection and statistical research with conventional database management and realistic implementation.",
  },
  {
    title: "Robotics & Automation Engineer",
    code: "RIC",
    field: "Engineering",
    description:
      "Merges hands-on, realistic assembly of mechanical parts with investigative systems programming and conventional quality testing.",
  },
  {
    title: "Civil or Structural Engineer",
    code: "RIC",
    field: "Engineering",
    description:
      "Combines physical, hands-on construction oversight (Realistic) with investigative mathematical modeling and conventional building codes.",
  },
  {
    title: "Database Administrator",
    code: "CRI",
    field: "Technology",
    description:
      "Balances highly conventional data mapping and index tables with realistic network hardware setup and investigative troubleshooting.",
  },

  // Creative & Architectural
  {
    title: "UX/UI Designer",
    code: "AEI",
    field: "Creative Arts",
    description:
      "Balances creative visual expression (Artistic) with business marketing initiative (Enterprising) and investigative user testing.",
  },
  {
    title: "Creative Director / Product Producer",
    code: "AES",
    field: "Creative Arts",
    description:
      "Fuses artistic visual/copywriting guidance with enterprising team orchestration and social collaboration with clients.",
  },
  {
    title: "Architect",
    code: "AIR",
    field: "Engineering & Design",
    description:
      "Fuses artistic design with investigative structural calculations and realistic physical blueprint construction oversight.",
  },
  {
    title: "Technical Writer / Content Planner",
    code: "ASI",
    field: "Communications",
    description:
      "Combines artistic written clarity and vocabulary with social audience empathy and investigative product analysis.",
  },

  // Educational, Social, & Healthcare
  {
    title: "Clinical Psychologist / Therapist",
    code: "IAS",
    field: "Healthcare & Research",
    description:
      "Combines investigative behavioral diagnosis and mental research with social empathy, support, and active listening.",
  },
  {
    title: "University Professor / Lecturer",
    code: "SAI",
    field: "Education",
    description:
      "Fuses social training, lecture delivery, and mentorship with investigative research and artistic material design.",
  },
  {
    title: "Human Resources Director",
    code: "SEC",
    field: "Corporate Operations",
    description:
      "Balances social employee support and team mediation with enterprising leadership and conventional file/contract compliance.",
  },

  // Business Leadership, Sales, & Consulting
  {
    title: "Operations / Project Manager",
    code: "ECS",
    field: "Corporate Operations",
    description:
      "Combines enterprising project leadership with conventional budget tracking and social team facilitation.",
  },
  {
    title: "Financial Investment Advisor",
    code: "ECI",
    field: "Finance",
    description:
      "Fuses enterprising client persuasion and deal pitch work with conventional market records and investigative charts analysis.",
  },
  {
    title: "Management Consultant",
    code: "ECI",
    field: "Finance & Strategy",
    description:
      "Merges enterprising strategy presentations and company pitching with conventional process audits and investigative troubleshooting.",
  },
  {
    title: "Accountant / Auditor",
    code: "CEI",
    field: "Finance",
    description:
      "Combines conventional spreadsheet tracking with enterprising corporate presentation and investigative error auditing.",
  },
  {
    title: "Supply Chain & Logistics Specialist",
    code: "CER",
    field: "Corporate Operations",
    description:
      "Balances conventional inventory detail with enterprising supplier negotiation and realistic physical storage logistics.",
  },
  // Trades, Aviation, & Culinary (Realistic Heavy)
  {
    title: "Commercial Pilot / Aviation",
    code: "RIE",
    field: "Transportation",
    description: "Combines realistic, hands-on vehicle operation with investigative weather/navigation math and enterprising leadership.",
  },
  {
    title: "Electrician / HVAC Technician",
    code: "RCI",
    field: "Skilled Trades",
    description: "Fuses realistic physical installation with conventional adherence to safety codes and investigative electrical troubleshooting.",
  },
  {
    title: "Executive Chef",
    code: "REA",
    field: "Culinary Arts",
    description: "Merges realistic, fast-paced physical cooking with enterprising kitchen management and artistic menu design.",
  },
  // Healthcare & Medicine (Investigative / Social Heavy)
  {
    title: "Registered Nurse / Practitioner",
    code: "SIC",
    field: "Healthcare",
    description: "Balances intense social patient care with investigative medical charting and conventional dosage administration.",
  },
  {
    title: "Surgeon / Medical Specialist",
    code: "IRS",
    field: "Healthcare",
    description: "Combines highly investigative biological diagnostics with realistic, precise physical operations and social patient consulting.",
  },
  {
    title: "Physical Therapist",
    code: "SRE",
    field: "Healthcare",
    description: "Fuses social patient motivation with realistic physical body mechanics and enterprising private practice management.",
  },
  // Law, Public Service, & Communications
  {
    title: "Corporate Lawyer / Attorney",
    code: "EIA",
    field: "Legal",
    description: "Combines enterprising courtroom persuasion with investigative case research and artistic manipulation of language.",
  },
  {
    title: "Social Worker",
    code: "SEC",
    field: "Public Service",
    description: "Balances intense social empathy and counseling with enterprising community advocacy and conventional case paperwork.",
  },
  {
    title: "Public Relations Specialist",
    code: "EAS",
    field: "Communications",
    description: "Fuses enterprising media pitching with artistic press release writing and social networking.",
  },
  // Sciences & Environment
  {
    title: "Environmental Scientist",
    code: "IRE",
    field: "Science",
    description: "Combines investigative data collection with realistic outdoor fieldwork and enterprising policy advocacy.",
  },
  {
    title: "Forensic Investigator",
    code: "ICR",
    field: "Law Enforcement",
    description: "Merges investigative crime scene logic with conventional evidence logging and realistic physical sample collection.",
  },
];

/**
 * Heuristic scorer to recommend multi-dimensional careers based on user's Holland Code.
 * @param hollandCode The user's top three letter code, e.g. "AES"
 * @returns Sorted array of 6 matching careers
 */
export function getHollandCareerRecommendations(
  hollandCode: string,
): HollandCareer[] {
  const userLetters = hollandCode.split("");

  const scored = hollandCareersDatabase.map((career) => {
    let score = 0;
    const careerLetters = career.code.split("");

    // 1. Position weight (Exact Index Matches)
    for (
      let i = 0;
      i < Math.min(userLetters.length, careerLetters.length);
      i++
    ) {
      if (userLetters[i] === careerLetters[i]) {
        score += (3 - i) * 2.5; // Rank 1 match = 7.5, Rank 2 = 5.0, Rank 3 = 2.5
      }
    }

    // 2. Inclusion weight (Letters present)
    careerLetters.forEach((letter) => {
      if (userLetters.includes(letter)) {
        score += 2.0; // Add 2 points for each letter in the code
      }
    });

    return { career, score };
  });

  // Sort by score descending
  scored.sort((a, b) => b.score - a.score);

  // Return the top 6 matches
  return scored.slice(0, 6).map((item) => item.career);
}

/**
 * Generates a custom 3-point ideal environment list based on the user's specific 3-letter code.
 * @param hollandCode The user's top three letter code, e.g. "IRC"
 * @returns An array of 3 personalized environment strings
 */
export function getBlendedEnvironment(hollandCode: string): string[] {
  const letters = hollandCode.split("") as RiasecCategory[];
  
  // Safety check: ensure we have 3 letters
  if (letters.length !== 3) return [];

  const primaryLetter = letters[0];
  const secondaryLetter = letters[1];
  const tertiaryLetter = letters[2];

  return [
    // Point 1: Their absolute biggest environmental need (from 1st letter)
    riasecThemes[primaryLetter].idealEnvironment[0],
    
    // Point 2: Their preferred workplace vibe/culture (from 2nd letter)
    riasecThemes[secondaryLetter].idealEnvironment[1],
    
    // Point 3: How they prefer the workplace to be structured (from 3rd letter)
    riasecThemes[tertiaryLetter].idealEnvironment[2]
  ];
}
