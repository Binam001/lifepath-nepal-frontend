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
    text: "A project deadline is moved up suddenly. You feel tense and cannot focus. What do you do?",
    options: [
      {
        id: "a",
        weight: 3,
        text: "Talk to a team member for stress relief.",
      },
      {
        id: "b",
        weight: 1,
        text: "Ignore how you feel and force yourself to work harder.",
      },
      {
        id: "c",
        weight: 5,
        text: "Take a short break and return with a clear mind.",
      },
    ],
  },
  {
    id: 102,
    domain: "self-awareness",
    linkedQuestionId: 3,
    text: "A coworker becomes quiet and distant after you take the lead on a group task. What do you do?",
    options: [
      {
        id: "a",
        weight: 5,
        text: "Think about your response, then talk to them privately.",
      },
      {
        id: "b",
        weight: 3,
        text: "Ask them directly at work if anything is wrong.",
      },
      {
        id: "c",
        weight: 1,
        text: "Assume they are having a bad day and do not bring it up.",
      },
    ],
  },
  {
    id: 103,
    domain: "self-awareness",
    linkedQuestionId: 5,
    text: "Your manager asks you to do a task that uses a skill, you are not very strong in. What do you do?",
    options: [
      {
        id: "a",
        weight: 1,
        text: "Accept it confidently and try to figure it out yourself.",
      },
      {
        id: "b",
        weight: 5,
        text: "Accept it, explain your skill level, and ask for guidance.",
      },
      {
        id: "c",
        weight: 3,
        text: "Ask for clarification and check if someone can help.",
      },
    ],
  },

  // Self-Regulation
  {
    id: 104,
    domain: "self-regulation",
    linkedQuestionId: 6,
    text: "A client sends an email saying your recent work is unacceptable, but gives no details. What do you do?",
    options: [
      {
        id: "a",
        weight: 5,
        text: "Respond calmly and follow up with a meeting request.",
      },
      {
        id: "b",
        weight: 1,
        text: "Reply, explain your work, and request feedback.",
      },
      {
        id: "c",
        weight: 3,
        text: "Forward to your manager and request their help.",
      },
    ],
  },
  {
    id: 105,
    domain: "self-regulation",
    linkedQuestionId: 9,
    text: "In a high-pressure situation, a teammate makes a mistake. What do you do?",
    options: [
      {
        id: "a",
        weight: 3,
        text: "Work to fix the problem and control the situation.",
      },
      {
        id: "b",
        weight: 5,
        text: "Support the team in fixing the issue and discuss it later.",
      },
      {
        id: "c",
        weight: 1,
        text: "Focus on what went wrong and who was responsible.",
      },
    ],
  },
  {
    id: 106,
    domain: "self-regulation",
    linkedQuestionId: 10,
    text: "You receive a poor performance review right before the weekend. What do you do?",
    options: [
      {
        id: "a",
        weight: 1,
        text: "React emotionally and focus on the negative aspects of the review.",
      },
      {
        id: "b",
        weight: 3,
        text: "Respond quickly to your boss and raise questions about the review",
      },
      {
        id: "c",
        weight: 5,
        text: "Think it over and prepare calm questions for discussion later.",
      },
    ],
  },

  // Motivation
  {
    id: 107,
    domain: "motivation",
    linkedQuestionId: 11,
    text: "You are given a long project that will take months to finish. How do you make sure it gets done?",
    options: [
      {
        id: "a",
        weight: 5,
        text: "Break it down into smaller tasks and track progress weekly.",
      },
      {
        id: "b",
        weight: 1,
        text: "Wait until the deadline is near so pressure pushes you to finish.",
      },
      {
        id: "c",
        weight: 3,
        text: "Ask your manager to check on you often to stay on track.",
      },
    ],
  },
  {
    id: 108,
    domain: "motivation",
    linkedQuestionId: 14,
    text: "A new way of doing a task is introduced at work, and your first attempt does not work. What do you do?",
    options: [
      {
        id: "a",
        weight: 3,
        text: "Ask someone experienced to help you with it.",
      },
      {
        id: "b",
        weight: 1,
        text: "Suggest the earlier method may be more practical.",
      },
      {
        id: "c",
        weight: 5,
        text: "Review what went wrong, learn the method, and try again.",
      },
    ],
  },
  {
    id: 109,
    domain: "motivation",
    linkedQuestionId: 15,
    text: "You finish your part of a project early, but you notice a small visual issue that others may not notice. What do you do?",
    options: [
      {
        id: "a",
        weight: 1,
        text: "Leave it as it is because the work is already complete.",
      },
      {
        id: "b",
        weight: 5,
        text: "Take the time to fix it to ensure high-quality work.",
      },
      {
        id: "c",
        weight: 3,
        text: "Ask a colleague whether you should fix it.",
      },
    ],
  },

  // Empathy
  {
    id: 110,
    domain: "empathy",
    linkedQuestionId: 16,
    text: "During a team video call, you notice a member who usually talks is silent and looking down. What do you do?",
    options: [
      {
        id: "a",
        weight: 3,
        text: "Gently ask in the group if everything is okay.",
      },
      {
        id: "b",
        weight: 5,
        text: "Send a private message after the meeting to check if they’re okay.",
      },
      {
        id: "c",
        weight: 1,
        text: "Stay focused on work and continue as normal.",
      },
    ],
  },
  {
    id: 111,
    domain: "empathy",
    linkedQuestionId: 19,
    text: "A client keeps asking for small changes because they seem unsure, even though the work is already good. What do you do?",
    options: [
      {
        id: "a",
        weight: 5,
        text: "Address their feedback and explain your checks.",
      },
      {
        id: "b",
        weight: 1,
        text: "Explain that the process is already being managed.",
      },
      {
        id: "c",
        weight: 3,
        text: "Make the changes and talk to your team about it later.",
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
    text: "Two team members are arguing strongly about how to solve a problem, and the project is delayed. What do you do?",
    options: [
      {
        id: "a",
        weight: 5,
        text: "Help them discuss and reach a conclusion",
      },
      {
        id: "b",
        weight: 1,
        text: "Agree with one side and continue discussion",
      },
      {
        id: "c",
        weight: 3,
        text: "Let them to handle it on their own",
      },
    ],
  },
  {
    id: 114,
    domain: "social-skills",
    linkedQuestionId: 25,
    text: "You need to give feedback to someone whose work does not match what was expected. What do you say?",
    options: [
      {
        id: "a",
        weight: 1,
        text: "This does not match expectations. Please revise it.",
      },
      {
        id: "b",
        weight: 3,
        text: "It is fine, but some changes may be needed later.",
      },
      {
        id: "c",
        weight: 5,
        text: "Good effort, but needs changes. Let’s review it.",
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
