// ocean-data.ts

export type Trait = "O" | "C" | "E" | "A" | "N";
export type Tier = "veryLow" | "low" | "balanced" | "high" | "veryHigh";

export type TraitDescriptions = Record<
  Tier,
  { title: string; description: string }
>;

export type OceanData = Record<Trait, TraitDescriptions>;

export const oceanDescriptions: OceanData = {
  // --- OPENNESS (O) ---
  O: {
    veryLow: {
      title: "Highly Practical",
      description:
        "You strongly prefer the familiar and conventional over the abstract. You rely heavily on known facts, established routines, and concrete reality rather than imaginative concepts. You are highly skeptical of unproven theories and prefer to work within well-defined, traditional systems where expectations are clear and predictable.",
    },
    low: {
      title: "Traditional",
      description:
        "You generally prefer familiarity and tradition in your day-to-day life. While you can handle necessary changes and adapt when required, you heavily favor practical, proven solutions over experimental ones. You are highly grounded in present reality and excel at executing standard procedures efficiently.",
    },
    balanced: {
      title: "Pragmatic Explorer",
      description:
        "You maintain a healthy balance between tradition and new experiences. You are practical and grounded, yet you remain open to innovation when it makes logical sense. You occasionally enjoy stepping outside your comfort zone, making you an excellent mediator between highly creative individuals and strictly practical thinkers.",
    },
    high: {
      title: "Curious & Creative",
      description:
        "You are intellectually curious, open-minded, and highly receptive to new experiences. You enjoy variety, creative problem-solving, and exploring novel concepts. While you can operate within normal structures, you often look for ways to improve them through innovative thinking and fresh perspectives.",
    },
    veryHigh: {
      title: "Highly Imaginative",
      description:
        "You are constantly seeking novelty, mental stimulation, and aesthetic experiences. You are highly imaginative, deeply engaged with abstract ideas, and often reject conventional ways of thinking. You thrive in environments that allow for unbound creativity and may feel stifled by rigid, repetitive routines.",
    },
  },

  // --- CONSCIENTIOUSNESS (C) ---
  C: {
    veryLow: {
      title: "Highly Spontaneous",
      description:
        "You are entirely adaptable and strongly dislike strict schedules or rigid rules. You prefer to figure things out as you go, prioritizing immediate flexibility over long-term planning. You thrive in chaotic, fast-moving environments where improvisation is more valuable than meticulous organization.",
    },
    low: {
      title: "Flexible",
      description:
        "You prefer loose guidelines and spontaneity over strict itineraries. You can struggle with rigid routines, micromanagement, or long-term deadlines, but you excel in dynamic environments that require rapid pivoting. You value the freedom to approach tasks in your own unique way.",
    },
    balanced: {
      title: "Adaptable Achiever",
      description:
        "You beautifully balance structure with spontaneity. You can be highly organized and disciplined when a project demands it, but you also embrace flexibility. You do not panic when plans change unexpectedly, allowing you to reliably achieve your goals without becoming overly rigid.",
    },
    high: {
      title: "Organized & Driven",
      description:
        "You are reliable, organized, and deeply driven by your goals. You prefer structured environments, plan well in advance, and take your duties and obligations very seriously. People can count on you to follow through on your promises and maintain a high standard of quality in your work.",
    },
    veryHigh: {
      title: "Extremely Disciplined",
      description:
        "You are highly perfectionistic, deeply detail-oriented, and possess immense self-discipline. You adhere strictly to schedules and plan meticulously to avoid errors or inefficiencies. Your exceptional focus allows you to manage complex systems, though you may find it difficult to relax or deviate from the plan.",
    },
  },

  // --- EXTRAVERSION (E) ---
  E: {
    veryLow: {
      title: "Deeply Introverted",
      description:
        "You require significant alone time to recharge your mental and emotional energy. You find large gatherings and constant social interaction highly exhausting. You heavily prefer solitary activities, deep-focus work, or interacting intimately with just one or two highly trusted individuals.",
    },
    low: {
      title: "Reserved",
      description:
        "You naturally lean toward introversion and thoughtfulness. You prefer quiet settings and small, close-knit groups over large crowds. You are highly observant and listen more than you speak, typically only chiming into a conversation when you have something meaningful and well-thought-out to add.",
    },
    balanced: {
      title: "Ambivert",
      description:
        "You are highly adaptable in social situations, acting as a bridge between introverts and extroverts. You genuinely enjoy social gatherings and can be highly engaging, but you equally require solitary downtime afterward to rest and recharge your social batteries.",
    },
    high: {
      title: "Extroverted",
      description:
        "You actively gain energy from interacting with other people. You are generally outgoing, sociable, and talkative. You feel highly comfortable taking the lead in group settings, enjoy collaboration, and prefer a fast-paced environment with plenty of interpersonal communication.",
    },
    veryHigh: {
      title: "Highly Enthusiastic",
      description:
        "You actively seek out high-energy social stimulation and constant interaction. You thrive in large crowds, are highly assertive, and feel most alive when you are the center of a bustling environment. Working entirely alone for long periods can cause you to feel severely drained or restless.",
    },
  },

  // --- AGREEABLENESS (A) ---
  A: {
    veryLow: {
      title: "Fiercely Independent",
      description:
        "You are highly objective, skeptical, and naturally questioning. You prioritize logic, efficiency, and self-interest over protecting the feelings of others. Because you do not easily yield to social pressure, you are exceptionally comfortable with conflict and make an excellent, unyielding negotiator.",
    },
    low: {
      title: "Competitive",
      description:
        "You are guarded, competitive, and value blunt directness over social tact. You are not afraid to express dissenting opinions and prioritize getting things done correctly over ensuring everyone is happy. You challenge the status quo and expect others to prove their competence.",
    },
    balanced: {
      title: "Cooperative yet Firm",
      description:
        "You are generally cooperative, warm, and get along well with most people. However, you maintain strong personal boundaries and are not easily taken advantage of. You can stand your ground, deliver constructive criticism, and defend your interests when the situation requires it.",
    },
    high: {
      title: "Compassionate",
      description:
        "You are empathetic, trusting, and highly value social harmony within your groups. You actively try to avoid unnecessary conflict and look for compromises. You naturally seek out ways to help, encourage, and support the people around you, making you an exceptional team player.",
    },
    veryHigh: {
      title: "Deeply Accommodating",
      description:
        "You are extremely empathetic, highly trusting, and deeply attuned to the pain or needs of others. You frequently prioritize the comfort of others above your own and go out of your way to ensure everyone feels included and cared for, excelling in deeply nurturing or caregiving roles.",
    },
  },

  // --- NEUROTICISM (N) ---
  N: {
    veryLow: {
      title: "Highly Resilient",
      description:
        "You are exceptionally calm, composed, and unflappable under intense pressure. You rarely experience acute stress, anxiety, or self-doubt. You maintain a steady, highly rational emotional baseline even in chaotic or high-stakes situations, though others might occasionally perceive you as detached.",
    },
    low: {
      title: "Emotionally Stable",
      description:
        "You are generally relaxed, optimistic, and handle everyday stress very well. While you may occasionally feel down or anxious during major life events, you bounce back quickly. You do not dwell on negative emotions and easily maintain a rational perspective when things go wrong.",
    },
    balanced: {
      title: "Emotionally Responsive",
      description:
        "You are emotionally stable overall, but you respond appropriately to the demands of your environment. You experience normal, healthy levels of stress and anxiety during difficult or threatening situations, which helps motivate you, but these emotions do not overpower your ability to function.",
    },
    high: {
      title: "Sensitive & Alert",
      description:
        "You are highly in tune with your emotions and highly alert to potential risks. You are prone to worry and can be stressed by sudden changes or interpersonal conflicts. However, this high threat-sensitivity makes you exceptionally good at anticipating problems, identifying risks, and preventing failures before they happen.",
    },
    veryHigh: {
      title: "Highly Reactive",
      description:
        "You experience the world and your emotions very intensely. You are highly reactive to stress, frequently battle anxiety, and can become easily overwhelmed by unpredictable situations. However, this deep sensitivity often translates into profound empathy, self-awareness, and a capacity for deep creative expression when in a safe, predictable environment.",
    },
  },
};

/**
 * Utility function to determine the tier key based on a percentage score.
 * @param score Percentage score (0-100)
 * @returns The corresponding Tier key
 */
export const getOceanTier = (score: number): Tier => {
  if (score <= 20) return "veryLow";
  if (score <= 40) return "low";
  if (score <= 60) return "balanced";
  if (score <= 80) return "high";
  return "veryHigh";
};

export const traitTierLabels: Record<Trait, Record<Tier, string>> = {
  O: {
    veryLow: "Practical",
    low: "Traditional",
    balanced: "Balanced",
    high: "Creative",
    veryHigh: "Imaginative",
  },
  C: {
    veryLow: "Spontaneous",
    low: "Flexible",
    balanced: "Balanced",
    high: "Organized",
    veryHigh: "Disciplined",
  },
  E: {
    veryLow: "Introverted",
    low: "Reserved",
    balanced: "Ambivert",
    high: "Extroverted",
    veryHigh: "Enthusiastic",
  },
  A: {
    veryLow: "Independent",
    low: "Competitive",
    balanced: "Cooperative",
    high: "Compassionate",
    veryHigh: "Accommodating",
  },
  N: {
    veryLow: "Resilient",
    low: "Stable",
    balanced: "Responsive",
    high: "Sensitive",
    veryHigh: "Reactive",
  },
};

export interface TraitDetail {
  key: Trait;
  name: string;
  description: string;
  color: string;
  textColor: string;
  border: string;
  bgLight: string;
  badge: string;
}

export const traitDetails: TraitDetail[] = [
  {
    key: "O",
    name: "Openness to Experience",
    description:
      "Reflects your imagination, curiosity, creativity, and preference for variety and novel ideas.",
    color: "bg-blue-500",
    textColor: "text-blue-700",
    border: "border-blue-200",
    bgLight: "bg-blue-50/50",
    badge: "bg-blue-100 text-blue-800",
  },
  {
    key: "C",
    name: "Conscientiousness",
    description:
      "Indicates your level of self-discipline, organization, planfulness, and duty-driven execution.",
    color: "bg-green-500",
    textColor: "text-green-700",
    border: "border-green-200",
    bgLight: "bg-green-50/50",
    badge: "bg-green-100 text-green-800",
  },
  {
    key: "E",
    name: "Extraversion",
    description:
      "Measures your social energy, assertiveness, talkativeness, and how much you recharge from external stimulation.",
    color: "bg-amber-500",
    textColor: "text-amber-700",
    border: "border-amber-200",
    bgLight: "bg-amber-50/50",
    badge: "bg-amber-100 text-amber-800",
  },
  {
    key: "A",
    name: "Agreeableness",
    description:
      "Reflects your cooperativeness, empathy, social trust, warmth, and interest in helper dynamics.",
    color: "bg-red-400",
    textColor: "text-red-700",
    border: "border-red-200",
    bgLight: "bg-red-50/50",
    badge: "bg-red-100 text-red-800",
  },
  {
    key: "N",
    name: "Neuroticism",
    description:
      "Measures emotional reactivity, threat sensitivity, alertness to risks, and vulnerability to stress.",
    color: "bg-purple-500",
    textColor: "text-purple-700",
    border: "border-purple-200",
    bgLight: "bg-purple-50/50",
    badge: "bg-purple-100 text-purple-800",
  },
];
