export type EIDomain =
  | "self-awareness"
  | "self-regulation"
  | "motivation"
  | "empathy"
  | "social-skills";

export interface SelfReportQuestion {
  id: number;
  domain: EIDomain;
  isReverse: boolean;
  text: string;
}

export interface ScenarioOption {
  id: string;
  weight: number;
  text: string;
}

export interface ScenarioQuestion {
  id: number;
  domain: EIDomain;
  linkedQuestionId: number;
  text: string;
  options: ScenarioOption[];
}

export interface DomainResult {
  domain: string;
  selfReportScore: number; // Max 5.0
  scenarioScore: number; // Max 5.0
  trueScore: number; // Max 5.0
  gapPenalty: number; // Absolute difference
  hasBlindSpot: boolean;
  hasImposterSyndrome: boolean;
}

export interface EIResult {
  totalTrueScore: number; // Max 5.0
  domains: Record<string, DomainResult>;
  // Array of specific linked inconsistencies (e.g., Question 2 vs Scenario 101)
  // where the difference between the normalized Q answer and Scenario weight >= 2
  microInconsistencies: Array<{
    scenarioId: number;
    linkedQuestionId: number;
    difference: number;
  }>;
}

// --- Layer 1: Self-Report Questions ---

export const selfReportQuestions: SelfReportQuestion[] = [
  // Self-Awareness
  {
    id: 1,
    domain: "self-awareness",
    isReverse: false,
    text: "I usually know why my mood changes when I feel upset.",
  },
  {
    id: 2,
    domain: "self-awareness",
    isReverse: true,
    text: "I usually notice that I was stressed only after someone tells me.",
  },
  {
    id: 3,
    domain: "self-awareness",
    isReverse: false,
    text: "I understand how my behavior and tone affect other people.",
  },
  {
    id: 4,
    domain: "self-awareness",
    isReverse: true,
    text: "I often struggle to explain how I am feeling.",
  },
  {
    id: 5,
    domain: "self-awareness",
    isReverse: false,
    text: "I have a clear understanding of my strengths and weaknesses.",
  },

  // Self-Regulation
  {
    id: 6,
    domain: "self-regulation",
    isReverse: false,
    text: "I stay calm and focused when dealing with an upset person at work.",
  },
  {
    id: 7,
    domain: "self-regulation",
    isReverse: true,
    text: "I feel frustrated when things do not go as planned.",
  },
  {
    id: 8,
    domain: "self-regulation",
    isReverse: false,
    text: "I can recover quickly and stay positive after receiving strong criticism.",
  },
  {
    id: 9,
    domain: "self-regulation",
    isReverse: true,
    text: "I tend to make quick decisions when I am under heavy pressure.",
  },
  {
    id: 10,
    domain: "self-regulation",
    isReverse: false,
    text: "I pause and think carefully before I reply to an emotional message.",
  },

  // Motivation
  {
    id: 11,
    domain: "motivation",
    isReverse: false,
    text: "I set long-term goals and keep track of my progress.",
  },
  {
    id: 12,
    domain: "motivation",
    isReverse: true,
    text: "I lose interest in tasks if I do not get quick praise or a reward.",
  },
  {
    id: 13,
    domain: "motivation",
    isReverse: false,
    text: "I try to improve my skills even when my job does not require it.",
  },
  {
    id: 14,
    domain: "motivation",
    isReverse: true,
    text: "I give up easily when a task becomes difficult.",
  },
  {
    id: 15,
    domain: "motivation",
    isReverse: false,
    text: "I care more about doing quality work than finishing as fast as possible.",
  },

  // Empathy
  {
    id: 16,
    domain: "empathy",
    isReverse: false,
    text: "I can usually tell how someone feels from their body language.",
  },
  {
    id: 17,
    domain: "empathy",
    isReverse: true,
    text: "I get annoyed when people talk about personal problems at work.",
  },
  {
    id: 18,
    domain: "empathy",
    isReverse: false,
    text: "I listen carefully to other people without interrupting them.",
  },
  {
    id: 19,
    domain: "empathy",
    isReverse: true,
    text: "It is difficult for me to see other’s viewpoints during disagreements.",
  },
  {
    id: 20,
    domain: "empathy",
    isReverse: false,
    text: "Before judging someone, I try to understand why they may have made a mistake.",
  },

  // Social Skills
  {
    id: 21,
    domain: "social-skills",
    isReverse: false,
    text: "I can easily build positive relationships with new people.",
  },
  {
    id: 22,
    domain: "social-skills",
    isReverse: true,
    text: "I avoid joining group discussions or team meetings.",
  },
  {
    id: 23,
    domain: "social-skills",
    isReverse: false,
    text: "I am good at helping people solve disagreements calmly.",
  },
  {
    id: 24,
    domain: "social-skills",
    isReverse: true,
    text: "I find it hard to explain my ideas clearly to a large group.",
  },
  {
    id: 25,
    domain: "social-skills",
    isReverse: false,
    text: "I try to give helpful and kind feedback to others.",
  },
];

// --- Layer 2: Scenario Questions ---

export const scenarioQuestions: ScenarioQuestion[] = [
  // Self-Awareness
  {
    id: 101,
    domain: "self-awareness",
    linkedQuestionId: 2,
    text: "You are trying to fix something at home, but you get frustrated and start making mistakes. What do you do?",
    options: [
      {
        id: "a",
        weight: 1,
        text: "Keep on doing to finish as fast as possible.",
      },
      {
        id: "b",
        weight: 5,
        text: "Step away to calm down and restart later.",
      },
      {
        id: "c",
        weight: 3,
        text: "Call a friend or family member for advice.",
      },
    ],
  },
  {
    id: 102,
    domain: "self-awareness",
    linkedQuestionId: 3,
    text: "A friend becomes unusually quiet after you share a personal success story. What do you do?",
    options: [
      {
        id: "a",
        weight: 1,
        text: "Assume they are dealing with something else.",
      },
      {
        id: "b",
        weight: 5,
        text: "Consider their feelings and check on them later.",
      },
      {
        id: "c",
        weight: 3,
        text: "Ask them directly why they became quiet.",
      },
    ],
  },
  {
    id: 103,
    domain: "self-awareness",
    linkedQuestionId: 5,
    text: "You are asked to take on a task that feels challenging for you. What do you do?",
    options: [
      {
        id: "a",
        weight: 1,
        text: "Take it on and try to work it out yourself.",
      },
      {
        id: "b",
        weight: 5,
        text: "Accept it and be honest about where you may need help.",
      },
      {
        id: "c",
        weight: 3,
        text: "Ask questions and see what support is available.",
      },
    ],
  },

  // Self-Regulation
  {
    id: 104,
    domain: "self-regulation",
    linkedQuestionId: 6,
    text: "A customer states your service was poor but provides no details. How do you respond?",
    options: [
      {
        id: "a",
        weight: 3,
        text: "Request a supervisor to assist.",
      },
      {
        id: "b",
        weight: 5,
        text: "Calmly ask for specific details.",
      },
      {
        id: "c",
        weight: 1,
        text: "Share your side of the situation.",
      },
    ],
  },
  {
    id: 105,
    domain: "self-regulation",
    linkedQuestionId: 9,
    text: "A teammate makes a mistake that loses the game. How do you react?",
    options: [
      {
        id: "a",
        weight: 3,
        text: "Explain the correct method.",
      },
      {
        id: "b",
        weight: 5,
        text: "Provide support and remain positive.",
      },
      {
        id: "c",
        weight: 1,
        text: "Express visible frustration regarding the mistake.",
      },
    ],
  },
  {
    id: 106,
    domain: "self-regulation",
    linkedQuestionId: 10,
    text: "You fail a big exam on a Friday afternoon. What do you do?",
    options: [
      {
        id: "a",
        weight: 3,
        text: "Open your books right away and study all weekend.",
      },
      {
        id: "b",
        weight: 5,
        text: "Relax for the weekend, then review on Monday.",
      },
      {
        id: "c",
        weight: 1,
        text: "Constantly worry about the low score.",
      },
    ],
  },

  // Motivation
  {
    id: 107,
    domain: "motivation",
    linkedQuestionId: 11,
    text: "You decide to read a book that you've always wanted to finish. How do you get through it?",
    options: [
      {
        id: "a",
        weight: 5,
        text: "Read a set number of pages every day.",
      },
      {
        id: "b",
        weight: 1,
        text: "Wait to read it until you feel motivated.",
      },
      {
        id: "c",
        weight: 3,
        text: "Promise yourself a big reward once you finally finish.",
      },
    ],
  },
  {
    id: 108,
    domain: "motivation",
    linkedQuestionId: 14,
    text: "You get lost trying a new, faster route to friend's house. What do you do?",
    options: [
      {
        id: "a",
        weight: 1,
        text: "Stick to your old, familiar route.",
      },
      {
        id: "b",
        weight: 3,
        text: "Ask someone nearby for directions.",
      },
      {
        id: "c",
        weight: 5,
        text: "Check a map to find the right way.",
      },
    ],
  },
  {
    id: 109,
    domain: "motivation",
    linkedQuestionId: 15,
    text: "You finish writing a birthday card but notice a small spelling mistake at the end. What do you do?",
    options: [
      {
        id: "a",
        weight: 5,
        text: "Fix the mistake or rewrite the card.",
      },
      {
        id: "b",
        weight: 3,
        text: "Ask someone else if the mistake looks bad.",
      },
      {
        id: "c",
        weight: 1,
        text: "Leave it alone since they will still understand it.",
      },
    ],
  },

  // Empathy
  {
    id: 110,
    domain: "empathy",
    linkedQuestionId: 16,
    text: "During a dinner with friends, you notice someone who usually talks a lot is very quiet and looking down. What do you do?",
    options: [
      {
        id: "a",
        weight: 3,
        text: "Ask them in front of everyone if something is wrong.",
      },
      {
        id: "b",
        weight: 1,
        text: "Ignore it and keep talking to your other friends.",
      },
      {
        id: "c",
        weight: 5,
        text: "Talk to them alone later to see if they are okay.",
      },
    ],
  },
  {
    id: 111,
    domain: "empathy",
    linkedQuestionId: 19,
    text: "A friend keeps texting you for minor updates about a trip you are organizing. What do you do?",
    options: [
      {
        id: "a",
        weight: 1,
        text: "Tell them to stop worrying and relax.",
      },
      {
        id: "b",
        weight: 3,
        text: "Keep replying with short answers to their texts.",
      },
      {
        id: "c",
        weight: 5,
        text: "Explain everything so they feel better.",
      },
    ],
  },
  {
    id: 112,
    domain: "empathy",
    linkedQuestionId: 20,
    text: "A junior employee makes a mistake that creates extra work for you. What do you do?",
    options: [
      {
        id: "a",
        weight: 1,
        text: "Handle it yourself and update the manager about the situation.",
      },
      {
        id: "b",
        weight: 3,
        text: "Tell them to fix it quickly without providing guidance.",
      },
      {
        id: "c",
        weight: 5,
        text: "Sit with them, understand the confusion, and help fix it.",
      },
    ],
  },

  // Social Skills
  {
    id: 113,
    domain: "social-skills",
    linkedQuestionId: 23,
    text: "Two coworkers argue loudly over a shared workspace. What do you do?",
    options: [
      {
        id: "a",
        weight: 5,
        text: "Calmly help them agree on a schedule.",
      },
      {
        id: "b",
        weight: 1,
        text: "Tell the louder person they are being unprofessional.",
      },
      {
        id: "c",
        weight: 3,
        text: "Walk away and let them sort it out themselves.",
      },
    ],
  },
  {
    id: 114,
    domain: "social-skills",
    linkedQuestionId: 25,
    text: "A coworker helps set up a task but makes a mistake. What do you do?",
    options: [
      {
        id: "a",
        weight: 1,
        text: "'This is wrong. I will just fix it myself.'",
      },
      {
        id: "b",
        weight: 3,
        text: "Say thank you, then quietly fix it after they leave.",
      },
      {
        id: "c",
        weight: 5,
        text: "'Thanks! Let me show you the setup.'",
      },
    ],
  },
  {
    id: 115,
    domain: "social-skills",
    linkedQuestionId: 21,
    text: "You are leading a new team where people do not know each other. How do you start the first meeting?",
    options: [
      {
        id: "a",
        weight: 3,
        text: "Tell them to review the information given and ask questions later.",
      },
      {
        id: "b",
        weight: 5,
        text: "Start with introductions and create a friendly environment.",
      },
      {
        id: "c",
        weight: 1,
        text: "Begin assigning tasks immediately to keep the process efficient.",
      },
    ],
  },
];

export function calculateEIScores(
  userSelfReportAnswers: Record<number, number>,
  userScenarioAnswers: Record<number, number>,
): EIResult {
  const normalizedSelfReport: Record<number, number> = {};
  selfReportQuestions.forEach((q) => {
    const rawAnswer = userSelfReportAnswers[q.id];
    // Default to neutral (3) if not answered for some reason
    const val = rawAnswer !== undefined ? rawAnswer : 3;
    normalizedSelfReport[q.id] = q.isReverse ? 6 - val : val;
  });

  const domainsList: EIDomain[] = [
    "self-awareness",
    "self-regulation",
    "motivation",
    "empathy",
    "social-skills",
  ];

  const domains: Record<string, DomainResult> = {};

  domainsList.forEach((domain) => {
    // Layer 1 Domain Score: average of 5 normalized answers
    const l1Questions = selfReportQuestions.filter((q) => q.domain === domain);
    const l1Sum = l1Questions.reduce(
      (sum, q) => sum + (normalizedSelfReport[q.id] ?? 3),
      0,
    );
    const selfReportScore =
      l1Questions.length > 0 ? l1Sum / l1Questions.length : 0;

    // Layer 2 Domain Score: average of 3 scenario weights
    const l2Scenarios = scenarioQuestions.filter((s) => s.domain === domain);
    const l2Sum = l2Scenarios.reduce((sum, s) => {
      const weight = userScenarioAnswers[s.id];
      // Default to 3 (neutral weight) if not answered for some reason
      return sum + (weight !== undefined ? weight : 3);
    }, 0);
    const scenarioScore =
      l2Scenarios.length > 0 ? l2Sum / l2Scenarios.length : 0;

    // Step 3: Weighted "True EI" Domain Score (30% Layer 1, 70% Layer 2)
    const trueScore = 0.3 * selfReportScore + 0.7 * scenarioScore;

    // Step 4: Self-Awareness Gap (Layer 3 Logic)
    const gapPenalty = Math.abs(selfReportScore - scenarioScore);
    const hasBlindSpot = selfReportScore - scenarioScore >= 1.0;
    const hasImposterSyndrome = scenarioScore - selfReportScore >= 1.0;

    domains[domain] = {
      domain,
      selfReportScore,
      scenarioScore,
      trueScore,
      gapPenalty,
      hasBlindSpot,
      hasImposterSyndrome,
    };
  });

  // Step 5: Aggregate the Total Score (unweighted average of the 5 domains)
  const totalTrueScore =
    domainsList.reduce((sum, d) => sum + domains[d].trueScore, 0) /
    domainsList.length;

  // Micro-Inconsistencies
  const microInconsistencies: Array<{
    scenarioId: number;
    linkedQuestionId: number;
    difference: number;
  }> = [];

  scenarioQuestions.forEach((scenario) => {
    const scenarioWeight = userScenarioAnswers[scenario.id];
    if (scenarioWeight !== undefined) {
      const linkedQId = scenario.linkedQuestionId;
      const normalizedQVal = normalizedSelfReport[linkedQId];
      if (normalizedQVal !== undefined) {
        const difference = Math.abs(normalizedQVal - scenarioWeight);
        if (difference >= 2) {
          microInconsistencies.push({
            scenarioId: scenario.id,
            linkedQuestionId: linkedQId,
            difference,
          });
        }
      }
    }
  });

  return {
    totalTrueScore,
    domains,
    microInconsistencies,
  };
}
