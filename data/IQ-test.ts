export type CognitiveQuestion = {
  id: number;
  category: "logic" | "sequence" | "analogy" | "math";
  prompt: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
};

export const iqTestQuestions: CognitiveQuestion[] = [
  // ==========================================
  // CATEGORY 1: DEDUCTIVE LOGIC
  // ==========================================
  {
    id: 1,
    category: "logic",
    prompt:
      "All zibbles are bops. No bops are clops. Which statement is definitely true?",
    options: [
      "Some zibbles are clops",
      "No zibbles are clops",
      "All clops are zibbles",
      "Cannot be determined",
    ],
    correctAnswerIndex: 1,
    explanation:
      "If zibbles are a subset of bops, and bops never intersect with clops, zibbles can never intersect with clops.",
  },
  {
    id: 2,
    category: "logic",
    prompt: "If some A are B, and all B are C, which must be true?",
    options: ["All A are C", "Some A are C", "No A are C", "Some C are not A"],
    correctAnswerIndex: 1,
    explanation:
      "Because the portion of A that overlaps with B is completely enveloped by C, at least some A must be C.",
  },
  {
    id: 3,
    category: "logic",
    prompt:
      "You meet two people, A and B. Person A says, 'We are both liars.' If liars always lie and truth-tellers always tell the truth, what are they?",
    options: [
      "A is a liar, B is truthful",
      "Both are liars",
      "Both are truthful",
      "A is truthful, B is a liar",
    ],
    correctAnswerIndex: 0,
    explanation:
      "If A is telling the truth, his statement creates a paradox. Therefore, A must be a liar. Since A is a liar, his statement 'we are both liars' is false, meaning B must be truthful.",
  },
  {
    id: 4,
    category: "logic",
    prompt:
      "Every time the red light flashes, the buzzer sounds. The buzzer just sounded. What can you definitively conclude?",
    options: [
      "The red light flashed",
      "The red light did not flash",
      "The system is broken",
      "Cannot be determined",
    ],
    correctAnswerIndex: 3,
    explanation:
      "This tests the 'affirming the consequent' fallacy. The prompt says the light causes the buzzer, but it never explicitly states the buzzer ONLY sounds when the light flashes. Something else could have triggered it.",
  },
  {
    id: 5,
    category: "logic",
    prompt:
      "If it rains, the grass is wet. The grass is not wet. What can you conclude?",
    options: [
      "It rained",
      "It did not rain",
      "The grass is dead",
      "Cannot be determined",
    ],
    correctAnswerIndex: 1,
    explanation:
      "This is a classic 'Modus Tollens' deduction. If P implies Q, and Q is false, then P must be false.",
  },
  {
    id: 6,
    category: "logic",
    prompt:
      "No widgets are gadgets. Some gadgets are gizmos. Which must be true?",
    options: [
      "Some gizmos are not widgets",
      "No widgets are gizmos",
      "All gizmos are widgets",
      "Some widgets are gizmos",
    ],
    correctAnswerIndex: 0,
    explanation:
      "Since some gadgets are gizmos, those specific gizmos cannot possibly be widgets (because no gadgets are widgets).",
  },

  // ==========================================
  // CATEGORY 2: QUANTITATIVE & SEQUENCE
  // ==========================================
  {
    id: 7,
    category: "sequence",
    prompt: "Find the next number: 2, 6, 12, 20, 30, ___",
    options: ["40", "42", "44", "46"],
    correctAnswerIndex: 1,
    explanation:
      "The differences between the numbers increase by 2 each time (+4, +6, +8, +10, +12).",
  },
  {
    id: 8,
    category: "sequence",
    prompt: "Find the next number: 3, 4, 8, 17, 33, ___",
    options: ["50", "58", "64", "66"],
    correctAnswerIndex: 1,
    explanation:
      "The sequence adds successive perfect squares: +1, +4, +9, +16, +25.",
  },
  {
    id: 9,
    category: "sequence",
    prompt: "Find the next number: 100, 99, 95, 86, 70, ___",
    options: ["45", "49", "54", "55"],
    correctAnswerIndex: 0,
    explanation:
      "The sequence subtracts successive perfect squares: -1, -4, -9, -16, -25.",
  },
  {
    id: 10,
    category: "sequence",
    prompt: "Find the next number: 2, 3, 5, 7, 11, ___",
    options: ["12", "13", "14", "15"],
    correctAnswerIndex: 1,
    explanation:
      "The sequence consists of prime numbers. The next prime after 11 is 13.",
  },
  {
    id: 11,
    category: "sequence",
    prompt: "Find the next number: 8, 27, 64, 125, ___",
    options: ["196", "216", "256", "512"],
    correctAnswerIndex: 1,
    explanation:
      "The sequence consists of perfect cubes: 2^3, 3^3, 4^3, 5^3, 6^3.",
  },
  {
    id: 12,
    category: "sequence",
    prompt: "Find the next number: 1, 2, 6, 24, 120, ___",
    options: ["240", "480", "720", "840"],
    correctAnswerIndex: 2,
    explanation:
      "The sequence multiplies the previous number by an incrementing integer: x2, x3, x4, x5, x6. (These are factorials).",
  },

  // ==========================================
  // CATEGORY 3: WORD ANALOGIES
  // ==========================================
  {
    id: 13,
    category: "analogy",
    prompt: "Odometer is to Mileage as Barometer is to ___",
    options: ["Temperature", "Humidity", "Pressure", "Speed"],
    correctAnswerIndex: 2,
    explanation:
      "An odometer measures mileage; a barometer measures atmospheric pressure.",
  },
  {
    id: 14,
    category: "analogy",
    prompt: "Inept is to Skill as Flawless is to ___",
    options: ["Perfection", "Defect", "Beauty", "Effort"],
    correctAnswerIndex: 1,
    explanation: "Inept means lacking skill; flawless means lacking defect.",
  },
  {
    id: 15,
    category: "analogy",
    prompt: "Archipelago is to Island as Constellation is to ___",
    options: ["Galaxy", "Star", "Planet", "Universe"],
    correctAnswerIndex: 1,
    explanation:
      "An archipelago is a grouping of islands; a constellation is a grouping of stars.",
  },
  {
    id: 16,
    category: "analogy",
    prompt: "Cacophony is to Sound as Glare is to ___",
    options: ["Vision", "Sun", "Light", "Reflection"],
    correctAnswerIndex: 2,
    explanation:
      "Cacophony is a harsh, overwhelming sound; glare is a harsh, overwhelming light.",
  },
  {
    id: 17,
    category: "analogy",
    prompt: "Ephemeral is to Permanent as Clandestine is to ___",
    options: ["Secret", "Open", "Brief", "Dangerous"],
    correctAnswerIndex: 1,
    explanation:
      "Ephemeral is the antonym of permanent; clandestine (secret) is the antonym of open.",
  },
  {
    id: 18,
    category: "analogy",
    prompt: "Scalpel is to Surgeon as Awl is to ___",
    options: ["Carpenter", "Cobbler", "Plumber", "Blacksmith"],
    correctAnswerIndex: 1,
    explanation:
      "A scalpel is the primary cutting tool of a surgeon; an awl is the primary piercing tool of a cobbler/leatherworker.",
  },

  // ==========================================
  // CATEGORY 4: APPLIED MENTAL ARITHMETIC
  // ==========================================
  {
    id: 19,
    category: "math",
    prompt:
      "A machine produces 5 widgets every 3 minutes. How many widgets will 4 machines produce in 15 minutes?",
    options: ["75", "100", "125", "150"],
    correctAnswerIndex: 1,
    explanation:
      "One machine makes 25 widgets in 15 minutes (5 x 5). Four machines working together make 100 widgets (25 x 4).",
  },
  {
    id: 20,
    category: "math",
    prompt:
      "If a shirt costs $20 after a 20% discount, what was the original price?",
    options: ["$22", "$24", "$25", "$28"],
    correctAnswerIndex: 2,
    explanation: "$20 represents 80% of the original price. 20 / 0.8 = 25.",
  },
  {
    id: 21,
    category: "math",
    prompt:
      "A train travels at 60 mph for 2 hours, then 90 mph for 1 hour. What is the average speed for the entire trip?",
    options: ["70 mph", "75 mph", "80 mph", "85 mph"],
    correctAnswerIndex: 0,
    explanation:
      "Distance 1: 120 miles. Distance 2: 90 miles. Total distance: 210 miles. Total time: 3 hours. Average speed: 210 / 3 = 70 mph.",
  },
  {
    id: 22,
    category: "math",
    prompt:
      "A lily pad doubles in size every day. If it takes 48 days to cover the pond, how long does it take to cover half the pond?",
    options: ["24 days", "46 days", "47 days", "49 days"],
    correctAnswerIndex: 2,
    explanation:
      "If it doubles every day, it must be half the size on the day immediately prior to completely covering the pond (day 47).",
  },
  {
    id: 23,
    category: "math",
    prompt:
      "If 3 cats catch 3 mice in 3 minutes, how many cats are needed to catch 100 mice in 100 minutes?",
    options: ["3 cats", "10 cats", "33 cats", "100 cats"],
    correctAnswerIndex: 0,
    explanation:
      "The rate is 1 cat catches 1 mouse every 3 minutes. Given 100 minutes, 1 cat can catch 33.3 mice. Therefore, 3 cats can catch 100 mice in that same 100-minute window.",
  },
  {
    id: 24,
    category: "math",
    prompt:
      "A bat and a ball cost $1.10 in total. The bat costs $1.00 more than the ball. How much does the ball cost?",
    options: ["$0.05", "$0.10", "$0.15", "$0.20"],
    correctAnswerIndex: 0,
    explanation:
      "If the ball costs X, the bat costs X + $1.00. Therefore, X + (X + $1.00) = $1.10. 2X = $0.10, making X = $0.05.",
  },
];

export type UserResponse = {
  questionId: number;
  isCorrect: boolean;
  timeTakenSeconds: number;
};

export type PopulationStats = {
  meanRawScore: number;
  standardDeviation: number;
};

export const defaultPopulationStats: PopulationStats = {
  meanRawScore: 12,
  standardDeviation: 4,
};

export const calculateRawScore = (responses: UserResponse[]): number => {
  return responses.reduce((total, response) => {
    return total + (response.isCorrect ? 1 : 0);
  }, 0);
};

export const calculateFinalIQ = (
  rawScore: number,
  stats: PopulationStats
): number => {
  if (stats.standardDeviation === 0) return 100;
  const zScore = (rawScore - stats.meanRawScore) / stats.standardDeviation;
  const preciseIQ = 100 + (zScore * 15);
  const clampedIQ = Math.max(40, Math.min(160, preciseIQ));
  return Math.round(clampedIQ);
};

export const calculatePercentile = (iq: number): number => {
  const z = (iq - 100) / 15;
  // Standard normal CDF approximation (accuracy within 0.0002)
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.39894228 * Math.exp(-z * z / 2);
  const p = d * t * (0.31938153 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
  const cdf = z >= 0 ? 1 - p : p;
  return Math.round(cdf * 1000) / 10; // e.g. 97.7%
};
