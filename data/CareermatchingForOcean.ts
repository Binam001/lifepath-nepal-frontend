// archetype-matching.ts

export type Trait = "O" | "C" | "E" | "A" | "N";

export interface Archetype {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  careers: string[];
}

// ---------------------------------------------------------
// 1. THE ARCHETYPE DICTIONARY
// ---------------------------------------------------------
export const archetypes: Record<string, Archetype> = {
  visionary: {
    id: "visionary",
    title: "The Visionary",
    subtitle: "High Openness + Low Conscientiousness",
    description:
      "You are a pure creative force. You thrive on big ideas, abstract concepts, and breaking the rules. You struggle with strict routines but excel in environments that demand innovation, out-of-the-box thinking, and rapid ideation.",
    careers: [
      "Creative Director",
      "Entrepreneur",
      "Independent Artist",
      "Film Director",
      "Advertising Copywriter",
      "Futurist",
    ],
  },
  mastermind: {
    id: "mastermind",
    title: "The Mastermind",
    subtitle: "High Openness + High Conscientiousness",
    description:
      "You combine wild imagination with ruthless execution. You don't just dream up big ideas; you build the systems to make them reality. You are highly analytical, organized, and focused on long-term strategy.",
    careers: [
      "Software Architect",
      "Urban Planner",
      "Research Scientist",
      "Data Scientist",
      "Management Consultant",
      "Lead Engineer",
    ],
  },
  executor: {
    id: "executor",
    title: "The Executor",
    subtitle: "High Conscientiousness + Low Agreeableness",
    description:
      "You are incredibly driven, highly organized, and completely unfazed by conflict. You value efficiency and competence over protecting people's feelings, making you an unstoppable force in competitive environments.",
    careers: [
      "Chief Financial Officer (CFO)",
      "Corporate Lawyer",
      "Surgeon",
      "Forensic Auditor",
      "Investigative Journalist",
      "Operations Director",
    ],
  },
  caregiver: {
    id: "caregiver",
    title: "The Caregiver",
    subtitle: "High Agreeableness + High Extraversion",
    description:
      "You are the glue that holds communities together. You are deeply empathetic, outgoing, and thrive when you are helping others. You possess immense emotional intelligence and easily build trust with anyone.",
    careers: [
      "Pediatrician",
      "Human Resources Director",
      "Social Worker",
      "Kindergarten Teacher",
      "Counselor",
      "Public Relations Specialist",
    ],
  },
  gladiator: {
    id: "gladiator",
    title: "The Gladiator",
    subtitle: "High Extraversion + Low Neuroticism",
    description:
      "You are fearless, highly assertive, and completely thrive under pressure. You love being the center of attention and can handle high-stakes situations without breaking a sweat. You naturally gravitate toward leadership.",
    careers: [
      "Enterprise Sales Director",
      "Politician",
      "Trial Lawyer",
      "Television Broadcaster",
      "Real Estate Broker",
      "Crisis Manager",
    ],
  },
  sage: {
    id: "sage",
    title: "The Sage",
    subtitle: "Low Extraversion + High Openness",
    description:
      "You are a deep thinker who prefers solitude to explore complex ideas. You are highly observant, intellectual, and prefer to work independently. You contribute profound insights rather than loud opinions.",
    careers: [
      "Philosopher",
      "Novelist",
      "Archivist",
      "Independent Researcher",
      "Technical Writer",
      "Librarian",
    ],
  },
  guardian: {
    id: "guardian",
    title: "The Guardian",
    subtitle: "High Conscientiousness + Low Openness",
    description:
      "You are the backbone of society. You are incredibly reliable, fiercely protective of tradition, and highly practical. People count on you to keep the world running smoothly through structure and discipline.",
    careers: [
      "Compliance Officer",
      "Accountant",
      "Military Officer",
      "Logistics Manager",
      "Quality Assurance Inspector",
      "Civil Engineer",
    ],
  },
  balancer: {
    id: "balancer",
    title: "The Balancer",
    subtitle: "Moderate / Adaptable Traits",
    description:
      "You do not possess extreme traits, which is your greatest superpower. You are a chameleon who can adapt to almost any situation. You can be creative when needed, organized when required, and social when the moment calls for it.",
    careers: [
      "Project Manager",
      "General Manager",
      "Educator",
      "Mediator",
      "Real Estate Agent",
      "Business Analyst",
    ],
  },
};

// ---------------------------------------------------------
// 2. THE SIGNATURE MAPPING
// ---------------------------------------------------------
// Because there are 40 possible combinations of top 2 traits,
// we map the generated signatures to our core archetypes.
const signatureMap: Record<string, string> = {
  High_O_Low_C: "visionary",
  High_E_High_O: "visionary",

  High_C_High_O: "mastermind",
  High_C_Low_E: "mastermind",

  High_C_Low_A: "executor",
  Low_A_Low_N: "executor",

  High_A_High_E: "caregiver",
  High_A_Low_C: "caregiver",

  High_E_Low_N: "gladiator",
  High_E_Low_A: "gladiator",

  High_O_Low_E: "sage",
  Low_E_Low_N: "sage",

  High_C_Low_O: "guardian",
  High_A_High_C: "guardian",
};

// ---------------------------------------------------------
// 3. THE ALGORITHM
// ---------------------------------------------------------

/**
 * Calculates the user's top two most extreme traits and returns their Archetype.
 * @param scores The user's percentages { O: 69, C: 44, E: 56, A: 25, N: 44 }
 */
export const calculateArchetype = (
  scores: Record<Trait, number>,
): Archetype => {
  // 1. Calculate how far each score is from 50 (the neutral middle)
  const differences = (Object.keys(scores) as Trait[]).map((trait) => {
    return {
      trait,
      score: scores[trait],
      diff: Math.abs(scores[trait] - 50),
      polarity: scores[trait] >= 50 ? "High" : "Low",
    };
  });

  // 2. Sort by the largest difference (most extreme traits first)
  differences.sort((a, b) => b.diff - a.diff);

  // If the user's most extreme trait is barely away from 50 (e.g., all scores are 45-55)
  // They are a pure ambivert/generalist.
  if (differences[0].diff < 15) {
    return archetypes["balancer"];
  }

  // 3. Take the top 2 most extreme traits
  const top2 = [differences[0], differences[1]];

  // 4. Alphabetize the traits to ensure consistent signature generation
  // (so "O" and "C" always forms "C_O" regardless of which was more extreme)
  top2.sort((a, b) => a.trait.localeCompare(b.trait));

  // 5. Generate the string signature (e.g., "High_C_Low_O")
  const signature = `${top2[0].polarity}_${top2[0].trait}_${top2[1].polarity}_${top2[1].trait}`;

  // 6. Look up the archetype. If for some reason a weird combination isn't mapped,
  // fallback to the "Balancer" or write a default handler.
  const archetypeId = signatureMap[signature];

  return archetypes[archetypeId] || archetypes["balancer"];
};
