export type TraitScores = {
  ALPHA: number;
  BETA: number;
  OMEGA: number;
  SIGMA: number;
  DELTA: number;
  GAMMA: number;
};

export interface OmegaverseQuestion {
  id: number;
  question: string;

  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;

  scoreMap: {
    A: TraitScores;
    B: TraitScores;
    C: TraitScores;
    D: TraitScores;
  };
}

export const omegaverseQuestions: OmegaverseQuestion[] = [
  // =========================
  // 1–12: Group Dynamics & Social Instincts
  // =========================
  {
    id: 1,
    question: "When managing a messy group project or shared task, you:",
    optionA: "Create strict rules",
    optionB: "Take charge immediately",
    optionC: "Ensure everyone is happy",
    optionD: "Work completely alone",
    scoreMap: {
      A: { ALPHA: 0, BETA: 2, OMEGA: 0, SIGMA: 0, DELTA: 5, GAMMA: 1 },
      B: { ALPHA: 5, BETA: 0, OMEGA: 0, SIGMA: 1, DELTA: 1, GAMMA: 2 },
      C: { ALPHA: 0, BETA: 3, OMEGA: 5, SIGMA: 0, DELTA: 0, GAMMA: 0 },
      D: { ALPHA: 1, BETA: 0, OMEGA: 0, SIGMA: 5, DELTA: 0, GAMMA: 2 },
    },
  },
  {
    id: 2,
    question: "At a big event where you don't know many people, you:",
    optionA: "Watch quietly from afar",
    optionB: "Check if anyone needs a friend",
    optionC: "Talk to useful people",
    optionD: "Stick with close friends",
    scoreMap: {
      A: { ALPHA: 1, BETA: 0, OMEGA: 0, SIGMA: 5, DELTA: 2, GAMMA: 1 },
      B: { ALPHA: 0, BETA: 3, OMEGA: 5, SIGMA: 0, DELTA: 1, GAMMA: 0 },
      C: { ALPHA: 3, BETA: 0, OMEGA: 0, SIGMA: 1, DELTA: 0, GAMMA: 5 },
      D: { ALPHA: 0, BETA: 5, OMEGA: 2, SIGMA: 0, DELTA: 2, GAMMA: 0 },
    },
  },
  {
    id: 3,
    question: "When a bad argument breaks out around you, you:",
    optionA: "Calm the hurt feelings",
    optionB: "Walk away completely",
    optionC: "Point out the facts",
    optionD: "Lead them to a solution",
    scoreMap: {
      A: { ALPHA: 0, BETA: 3, OMEGA: 5, SIGMA: 0, DELTA: 0, GAMMA: 0 },
      B: { ALPHA: 0, BETA: 0, OMEGA: 0, SIGMA: 5, DELTA: 0, GAMMA: 2 },
      C: { ALPHA: 1, BETA: 0, OMEGA: 0, SIGMA: 2, DELTA: 2, GAMMA: 5 },
      D: { ALPHA: 5, BETA: 0, OMEGA: 0, SIGMA: 0, DELTA: 2, GAMMA: 1 },
    },
  },
  {
    id: 4,
    question: "If you work under a boss you highly respect, you:",
    optionA: "Aim for a promotion",
    optionB: "Be their loyal supporter",
    optionC: "Work independently",
    optionD: "Follow rules perfectly",
    scoreMap: {
      A: { ALPHA: 5, BETA: 0, OMEGA: 0, SIGMA: 2, DELTA: 0, GAMMA: 3 },
      B: { ALPHA: 0, BETA: 5, OMEGA: 3, SIGMA: 0, DELTA: 1, GAMMA: 0 },
      C: { ALPHA: 1, BETA: 0, OMEGA: 0, SIGMA: 5, DELTA: 0, GAMMA: 1 },
      D: { ALPHA: 0, BETA: 2, OMEGA: 0, SIGMA: 0, DELTA: 5, GAMMA: 1 },
    },
  },
  {
    id: 5,
    question: "When texting or emailing, your style is usually:",
    optionA: "Formal and structured",
    optionB: "Direct and to the point",
    optionC: "Friendly and caring",
    optionD: "Very short, rarely chat",
    scoreMap: {
      A: { ALPHA: 0, BETA: 2, OMEGA: 0, SIGMA: 0, DELTA: 5, GAMMA: 1 },
      B: { ALPHA: 5, BETA: 0, OMEGA: 0, SIGMA: 2, DELTA: 0, GAMMA: 2 },
      C: { ALPHA: 0, BETA: 3, OMEGA: 5, SIGMA: 0, DELTA: 0, GAMMA: 0 },
      D: { ALPHA: 1, BETA: 0, OMEGA: 0, SIGMA: 5, DELTA: 0, GAMMA: 2 },
    },
  },
  {
    id: 6,
    question: "When you receive praise or an award in front of a crowd, you:",
    optionA: "Accept it proudly",
    optionB: "Give a polite speech",
    optionC: "Just take it and go",
    optionD: "Credit the team",
    scoreMap: {
      A: { ALPHA: 5, BETA: 0, OMEGA: 0, SIGMA: 1, DELTA: 0, GAMMA: 1 },
      B: { ALPHA: 0, BETA: 2, OMEGA: 0, SIGMA: 0, DELTA: 5, GAMMA: 2 },
      C: { ALPHA: 1, BETA: 0, OMEGA: 0, SIGMA: 5, DELTA: 0, GAMMA: 2 },
      D: { ALPHA: 0, BETA: 5, OMEGA: 4, SIGMA: 0, DELTA: 1, GAMMA: 0 },
    },
  },
  {
    id: 7,
    question:
      "If a project you are working on completely fails, your first thought is:",
    optionA: "I feel so bad for the team.",
    optionB: "I should have done it myself.",
    optionC: "Why did the plan fail?",
    optionD: "Who is to blame?",
    scoreMap: {
      A: { ALPHA: 0, BETA: 4, OMEGA: 5, SIGMA: 0, DELTA: 0, GAMMA: 0 },
      B: { ALPHA: 1, BETA: 0, OMEGA: 0, SIGMA: 5, DELTA: 1, GAMMA: 2 },
      C: { ALPHA: 1, BETA: 0, OMEGA: 0, SIGMA: 2, DELTA: 1, GAMMA: 5 },
      D: { ALPHA: 5, BETA: 0, OMEGA: 0, SIGMA: 1, DELTA: 0, GAMMA: 1 },
    },
  },
  {
    id: 8,
    question: "During a sudden, unexpected emergency, you instantly:",
    optionA: "Tell everyone what to do",
    optionB: "Comfort the panicked",
    optionC: "Find my own escape",
    optionD: "Follow safety rules",
    scoreMap: {
      A: { ALPHA: 5, BETA: 0, OMEGA: 0, SIGMA: 1, DELTA: 2, GAMMA: 1 },
      B: { ALPHA: 0, BETA: 3, OMEGA: 5, SIGMA: 0, DELTA: 0, GAMMA: 0 },
      C: { ALPHA: 1, BETA: 0, OMEGA: 0, SIGMA: 5, DELTA: 0, GAMMA: 2 },
      D: { ALPHA: 0, BETA: 2, OMEGA: 0, SIGMA: 0, DELTA: 5, GAMMA: 1 },
    },
  },
  {
    id: 9,
    question: "If someone tries to cheat you or use you, you:",
    optionA: "Outsmart them",
    optionB: "Call them out",
    optionC: "Feel deeply betrayed",
    optionD: "Cut them out silently",
    scoreMap: {
      A: { ALPHA: 2, BETA: 0, OMEGA: 0, SIGMA: 2, DELTA: 0, GAMMA: 5 },
      B: { ALPHA: 5, BETA: 0, OMEGA: 0, SIGMA: 0, DELTA: 1, GAMMA: 2 },
      C: { ALPHA: 0, BETA: 3, OMEGA: 5, SIGMA: 0, DELTA: 0, GAMMA: 0 },
      D: { ALPHA: 1, BETA: 0, OMEGA: 0, SIGMA: 5, DELTA: 0, GAMMA: 2 },
    },
  },
  {
    id: 10,
    question: "When you are exhausted or under extreme stress, you:",
    optionA: "Spend time alone to rest and recover",
    optionB: "Just stick to my normal daily habits",
    optionC: "Force myself to keep going anyway",
    optionD: "Talk to my friends for support",
    scoreMap: {
      A: { ALPHA: 1, BETA: 0, OMEGA: 0, SIGMA: 5, DELTA: 0, GAMMA: 2 },
      B: { ALPHA: 0, BETA: 2, OMEGA: 0, SIGMA: 0, DELTA: 5, GAMMA: 0 },
      C: { ALPHA: 5, BETA: 0, OMEGA: 0, SIGMA: 1, DELTA: 1, GAMMA: 1 },
      D: { ALPHA: 0, BETA: 5, OMEGA: 4, SIGMA: 0, DELTA: 0, GAMMA: 0 },
    },
  },
  {
    id: 11,
    question: "If you see someone being treated unfairly, you usually:",
    optionA: "Comfort the victim",
    optionB: "Just watch quietly",
    optionC: "Find someone who can stop it",
    optionD: "Step in and stop it",
    scoreMap: {
      A: { ALPHA: 0, BETA: 3, OMEGA: 5, SIGMA: 0, DELTA: 0, GAMMA: 0 },
      B: { ALPHA: 1, BETA: 0, OMEGA: 0, SIGMA: 5, DELTA: 0, GAMMA: 2 },
      C: { ALPHA: 2, BETA: 0, OMEGA: 0, SIGMA: 1, DELTA: 5, GAMMA: 4 },
      D: { ALPHA: 5, BETA: 0, OMEGA: 0, SIGMA: 1, DELTA: 1, GAMMA: 1 },
    },
  },
  {
    id: 12,
    question: "How do you organize your desk or room?",
    optionA: "Set up to look impressive",
    optionB: "Relaxing and comfortable",
    optionC: "Very empty and simple",
    optionD: "Perfectly neat and sorted",
    scoreMap: {
      A: { ALPHA: 5, BETA: 0, OMEGA: 0, SIGMA: 1, DELTA: 1, GAMMA: 3 },
      B: { ALPHA: 0, BETA: 4, OMEGA: 5, SIGMA: 0, DELTA: 0, GAMMA: 0 },
      C: { ALPHA: 1, BETA: 0, OMEGA: 0, SIGMA: 5, DELTA: 1, GAMMA: 2 },
      D: { ALPHA: 0, BETA: 2, OMEGA: 0, SIGMA: 0, DELTA: 5, GAMMA: 1 },
    },
  },

  // =========================
  // 13–24: Work Ethic, Problem Solving & Routine
  // =========================
  {
    id: 13,
    question: "When you have to do a very boring, repeating task, you:",
    optionA: "Automate it",
    optionB: "Make someone else do it",
    optionC: "Do it for the team",
    optionD: "Grind it out alone",
    scoreMap: {
      A: { ALPHA: 2, BETA: 0, OMEGA: 0, SIGMA: 3, DELTA: 0, GAMMA: 5 },
      B: { ALPHA: 5, BETA: 0, OMEGA: 0, SIGMA: 1, DELTA: 0, GAMMA: 2 },
      C: { ALPHA: 0, BETA: 5, OMEGA: 3, SIGMA: 0, DELTA: 1, GAMMA: 0 },
      D: { ALPHA: 1, BETA: 0, OMEGA: 0, SIGMA: 5, DELTA: 2, GAMMA: 1 },
    },
  },
  {
    id: 14,
    question: "How do you handle strict rules?",
    optionA: "I ignore them quietly",
    optionB: "I find a way around",
    optionC: "I prefer to make them",
    optionD: "I follow them exactly",
    scoreMap: {
      A: { ALPHA: 1, BETA: 0, OMEGA: 0, SIGMA: 5, DELTA: 0, GAMMA: 1 },
      B: { ALPHA: 2, BETA: 0, OMEGA: 0, SIGMA: 2, DELTA: 0, GAMMA: 5 },
      C: { ALPHA: 5, BETA: 0, OMEGA: 0, SIGMA: 1, DELTA: 1, GAMMA: 2 },
      D: { ALPHA: 0, BETA: 4, OMEGA: 3, SIGMA: 0, DELTA: 5, GAMMA: 0 },
    },
  },
  {
    id: 15,
    question: "When coming up with new ideas or plans, you prefer:",
    optionA: "Working with a team",
    optionB: "Working all by myself",
    optionC: "Challenging the current ideas",
    optionD: "Leading with my own vision",
    scoreMap: {
      A: { ALPHA: 0, BETA: 5, OMEGA: 4, SIGMA: 0, DELTA: 1, GAMMA: 0 },
      B: { ALPHA: 1, BETA: 0, OMEGA: 0, SIGMA: 5, DELTA: 0, GAMMA: 3 },
      C: { ALPHA: 2, BETA: 0, OMEGA: 0, SIGMA: 2, DELTA: 0, GAMMA: 5 },
      D: { ALPHA: 5, BETA: 1, OMEGA: 0, SIGMA: 0, DELTA: 0, GAMMA: 2 },
    },
  },
  {
    id: 16,
    question: "How do you view and handle money?",
    optionA: "A tool for power",
    optionB: "A way to help",
    optionC: "The price of freedom",
    optionD: "Something to budget and save",
    scoreMap: {
      A: { ALPHA: 5, BETA: 0, OMEGA: 0, SIGMA: 1, DELTA: 0, GAMMA: 3 },
      B: { ALPHA: 0, BETA: 4, OMEGA: 5, SIGMA: 0, DELTA: 1, GAMMA: 0 },
      C: { ALPHA: 2, BETA: 0, OMEGA: 0, SIGMA: 5, DELTA: 0, GAMMA: 2 },
      D: { ALPHA: 0, BETA: 2, OMEGA: 0, SIGMA: 0, DELTA: 5, GAMMA: 1 },
    },
  },
  {
    id: 17,
    question: "How do you feel about taking risks?",
    optionA: "Completely avoid risks",
    optionB: "Take big risks",
    optionC: "Avoid risks to stay safe",
    optionD: "Take smart solo risks",
    scoreMap: {
      A: { ALPHA: 0, BETA: 2, OMEGA: 1, SIGMA: 0, DELTA: 5, GAMMA: 0 },
      B: { ALPHA: 5, BETA: 0, OMEGA: 0, SIGMA: 2, DELTA: 0, GAMMA: 4 },
      C: { ALPHA: 0, BETA: 5, OMEGA: 4, SIGMA: 0, DELTA: 2, GAMMA: 0 },
      D: { ALPHA: 2, BETA: 0, OMEGA: 0, SIGMA: 5, DELTA: 0, GAMMA: 3 },
    },
  },
  {
    id: 18,
    question: "When a plan suddenly changes or gets cancelled, you:",
    optionA: "Make a new plan quickly",
    optionB: "Go with the flow",
    optionC: "Enjoy the free time alone",
    optionD: "Follow the backup plan",
    scoreMap: {
      A: { ALPHA: 5, BETA: 0, OMEGA: 0, SIGMA: 1, DELTA: 2, GAMMA: 1 },
      B: { ALPHA: 0, BETA: 4, OMEGA: 5, SIGMA: 0, DELTA: 0, GAMMA: 0 },
      C: { ALPHA: 1, BETA: 0, OMEGA: 0, SIGMA: 5, DELTA: 0, GAMMA: 2 },
      D: { ALPHA: 0, BETA: 2, OMEGA: 0, SIGMA: 0, DELTA: 5, GAMMA: 1 },
    },
  },
  {
    id: 19,
    question: "How do you handle a lazy coworker or team member?",
    optionA: "Do their work for the team",
    optionB: "Find a clever way to make them work",
    optionC: "Ignore them entirely",
    optionD: "Confront them directly",
    scoreMap: {
      A: { ALPHA: 0, BETA: 5, OMEGA: 4, SIGMA: 0, DELTA: 1, GAMMA: 0 },
      B: { ALPHA: 2, BETA: 0, OMEGA: 0, SIGMA: 2, DELTA: 0, GAMMA: 5 },
      C: { ALPHA: 1, BETA: 0, OMEGA: 0, SIGMA: 5, DELTA: 0, GAMMA: 1 },
      D: { ALPHA: 5, BETA: 0, OMEGA: 0, SIGMA: 1, DELTA: 2, GAMMA: 1 },
    },
  },
  {
    id: 20,
    question: "When someone tells you a deep, dark secret, you:",
    optionA: "I feel honored they trust me so much",
    optionB: "I feel stressed about having to hide it",
    optionC: "Quietly remember it as useful information",
    optionD: "Forget it, since it's not my business",
    scoreMap: {
      A: { ALPHA: 0, BETA: 4, OMEGA: 5, SIGMA: 0, DELTA: 1, GAMMA: 0 },
      B: { ALPHA: 1, BETA: 2, OMEGA: 0, SIGMA: 0, DELTA: 5, GAMMA: 0 },
      C: { ALPHA: 2, BETA: 0, OMEGA: 0, SIGMA: 2, DELTA: 0, GAMMA: 5 },
      D: { ALPHA: 1, BETA: 0, OMEGA: 0, SIGMA: 5, DELTA: 0, GAMMA: 1 },
    },
  },
  {
    id: 21,
    question: "What is your idea of a perfect vacation?",
    optionA: "Doing something bold and thrilling",
    optionB: "A fun group trip",
    optionC: "Backpacking alone",
    optionD: "A perfectly planned tour",
    scoreMap: {
      A: { ALPHA: 5, BETA: 0, OMEGA: 0, SIGMA: 1, DELTA: 0, GAMMA: 2 },
      B: { ALPHA: 0, BETA: 5, OMEGA: 4, SIGMA: 0, DELTA: 1, GAMMA: 0 },
      C: { ALPHA: 2, BETA: 0, OMEGA: 0, SIGMA: 5, DELTA: 0, GAMMA: 1 },
      D: { ALPHA: 0, BETA: 2, OMEGA: 0, SIGMA: 0, DELTA: 5, GAMMA: 1 },
    },
  },
  {
    id: 22,
    question: "When a friend comes to you with a problem, you usually:",
    optionA: "Find a clever trick to fix it",
    optionB: "listen and comfort them",
    optionC: "Take charge and tell them what to do",
    optionD: "Give safe, step-by-step advice",
    scoreMap: {
      A: { ALPHA: 1, BETA: 0, OMEGA: 0, SIGMA: 2, DELTA: 0, GAMMA: 5 },
      B: { ALPHA: 0, BETA: 4, OMEGA: 5, SIGMA: 0, DELTA: 1, GAMMA: 0 },
      C: { ALPHA: 5, BETA: 0, OMEGA: 0, SIGMA: 1, DELTA: 2, GAMMA: 1 },
      D: { ALPHA: 0, BETA: 2, OMEGA: 0, SIGMA: 0, DELTA: 5, GAMMA: 1 },
    },
  },
  {
    id: 23,
    question: "How do you react to being interrupted while focusing?",
    optionA: "Ignore them completely",
    optionB: "Stop and help them",
    optionC: "Ask them to schedule a time",
    optionD: "Annoyed, I tell them to leave",
    scoreMap: {
      A: { ALPHA: 1, BETA: 0, OMEGA: 0, SIGMA: 5, DELTA: 0, GAMMA: 2 },
      B: { ALPHA: 0, BETA: 4, OMEGA: 5, SIGMA: 0, DELTA: 1, GAMMA: 0 },
      C: { ALPHA: 0, BETA: 2, OMEGA: 0, SIGMA: 0, DELTA: 5, GAMMA: 1 },
      D: { ALPHA: 5, BETA: 0, OMEGA: 0, SIGMA: 1, DELTA: 2, GAMMA: 1 },
    },
  },
  {
    id: 24,
    question: "What drives you to work hard every day?",
    optionA: "Wanting to be the best",
    optionB: "Caring for my family",
    optionC: "Wanting total freedom",
    optionD: "Doing a perfect job",
    scoreMap: {
      A: { ALPHA: 5, BETA: 0, OMEGA: 0, SIGMA: 1, DELTA: 0, GAMMA: 2 },
      B: { ALPHA: 0, BETA: 5, OMEGA: 4, SIGMA: 0, DELTA: 1, GAMMA: 0 },
      C: { ALPHA: 2, BETA: 0, OMEGA: 0, SIGMA: 5, DELTA: 0, GAMMA: 3 },
      D: { ALPHA: 0, BETA: 2, OMEGA: 0, SIGMA: 0, DELTA: 5, GAMMA: 1 },
    },
  },

  // =========================
  // 25–36: Internal World, Values & Relationships
  // =========================
  {
    id: 25,
    question: "What do you want most in a romantic relationship?",
    optionA: "Total independence",
    optionB: "An intellectual equal",
    optionC: "To protect and lead",
    optionD: "To love and care",
    scoreMap: {
      A: { ALPHA: 1, BETA: 0, OMEGA: 0, SIGMA: 5, DELTA: 0, GAMMA: 2 },
      B: { ALPHA: 2, BETA: 0, OMEGA: 0, SIGMA: 2, DELTA: 0, GAMMA: 5 },
      C: { ALPHA: 5, BETA: 1, OMEGA: 0, SIGMA: 0, DELTA: 2, GAMMA: 0 },
      D: { ALPHA: 0, BETA: 3, OMEGA: 5, SIGMA: 0, DELTA: 1, GAMMA: 0 },
    },
  },
  {
    id: 26,
    question: "How do you deal with other people's sadness?",
    optionA: "Feel it with them",
    optionB: "Observe without feeling",
    optionC: "Analyze why they are sad",
    optionD: "Try to fix it",
    scoreMap: {
      A: { ALPHA: 0, BETA: 3, OMEGA: 5, SIGMA: 0, DELTA: 0, GAMMA: 0 },
      B: { ALPHA: 1, BETA: 0, OMEGA: 0, SIGMA: 5, DELTA: 0, GAMMA: 2 },
      C: { ALPHA: 2, BETA: 0, OMEGA: 0, SIGMA: 2, DELTA: 1, GAMMA: 5 },
      D: { ALPHA: 5, BETA: 0, OMEGA: 0, SIGMA: 1, DELTA: 2, GAMMA: 1 },
    },
  },
  {
    id: 27,
    question: "Your perfect weekend is spent:",
    optionA: "Leading a group activity",
    optionB: "A cozy night at home",
    optionC: "Doing things completely alone",
    optionD: "Researching new topics",
    scoreMap: {
      A: { ALPHA: 5, BETA: 1, OMEGA: 0, SIGMA: 0, DELTA: 0, GAMMA: 1 },
      B: { ALPHA: 0, BETA: 4, OMEGA: 5, SIGMA: 0, DELTA: 2, GAMMA: 0 },
      C: { ALPHA: 1, BETA: 0, OMEGA: 0, SIGMA: 5, DELTA: 0, GAMMA: 2 },
      D: { ALPHA: 1, BETA: 0, OMEGA: 0, SIGMA: 3, DELTA: 0, GAMMA: 5 },
    },
  },
  {
    id: 28,
    question: "When meeting with strangers, what do you notice first?",
    optionA: "How smart they are",
    optionB: "How confident they seem",
    optionC: "How kind or friendly they are",
    optionD: "How they respect personal space",
    scoreMap: {
      A: { ALPHA: 0, BETA: 1, OMEGA: 0, SIGMA: 1, DELTA: 5, GAMMA: 4 },
      B: { ALPHA: 5, BETA: 0, OMEGA: 0, SIGMA: 1, DELTA: 0, GAMMA: 2 },
      C: { ALPHA: 0, BETA: 2, OMEGA: 5, SIGMA: 0, DELTA: 1, GAMMA: 0 },
      D: { ALPHA: 2, BETA: 0, OMEGA: 0, SIGMA: 5, DELTA: 0, GAMMA: 1 },
    },
  },
  {
    id: 29,
    question: "How do you view loyalty?",
    optionA: "Earning trust over time",
    optionB: "Honoring your duties and promises",
    optionC: "Following my lead completely",
    optionD: "Sticking together no matter what",
    scoreMap: {
      A: { ALPHA: 2, BETA: 0, OMEGA: 0, SIGMA: 5, DELTA: 0, GAMMA: 3 },
      B: { ALPHA: 0, BETA: 5, OMEGA: 1, SIGMA: 0, DELTA: 5, GAMMA: 0 },
      C: { ALPHA: 5, BETA: 0, OMEGA: 0, SIGMA: 1, DELTA: 2, GAMMA: 1 },
      D: { ALPHA: 0, BETA: 3, OMEGA: 5, SIGMA: 0, DELTA: 1, GAMMA: 0 },
    },
  },
  {
    id: 30,
    question: "Your absolute deepest fear is:",
    optionA: "Being unloved or alone",
    optionB: "Losing my freedom",
    optionC: "Being totally unprepared",
    optionD: "Losing power or control",
    scoreMap: {
      A: { ALPHA: 0, BETA: 5, OMEGA: 5, SIGMA: 0, DELTA: 1, GAMMA: 0 },
      B: { ALPHA: 1, BETA: 0, OMEGA: 0, SIGMA: 5, DELTA: 0, GAMMA: 2 },
      C: { ALPHA: 2, BETA: 0, OMEGA: 0, SIGMA: 1, DELTA: 5, GAMMA: 4 },
      D: { ALPHA: 5, BETA: 0, OMEGA: 0, SIGMA: 2, DELTA: 0, GAMMA: 1 },
    },
  },
  {
    id: 31,
    question: "When you are winning or very successful, you:",
    optionA: "Share the reward with the team",
    optionB: "Show off boldly",
    optionC: "Find an even bigger goal",
    optionD: "Quietly move on",
    scoreMap: {
      A: { ALPHA: 0, BETA: 5, OMEGA: 4, SIGMA: 0, DELTA: 1, GAMMA: 0 },
      B: { ALPHA: 5, BETA: 0, OMEGA: 0, SIGMA: 1, DELTA: 0, GAMMA: 2 },
      C: { ALPHA: 2, BETA: 0, OMEGA: 0, SIGMA: 1, DELTA: 0, GAMMA: 5 },
      D: { ALPHA: 1, BETA: 0, OMEGA: 0, SIGMA: 5, DELTA: 2, GAMMA: 1 },
    },
  },
  {
    id: 32,
    question: "What makes you the most angry?",
    optionA: "When things are messy and disorganized",
    optionB: "When people argue and fight",
    optionC: "When someone disrespects me",
    optionD: "When someone tries to control me",
    scoreMap: {
      A: { ALPHA: 1, BETA: 0, OMEGA: 0, SIGMA: 0, DELTA: 5, GAMMA: 1 },
      B: { ALPHA: 0, BETA: 4, OMEGA: 5, SIGMA: 0, DELTA: 1, GAMMA: 0 },
      C: { ALPHA: 5, BETA: 0, OMEGA: 0, SIGMA: 2, DELTA: 0, GAMMA: 1 },
      D: { ALPHA: 2, BETA: 0, OMEGA: 0, SIGMA: 5, DELTA: 0, GAMMA: 4 },
    },
  },
  {
    id: 33,
    question: "How do you handle personal failure or rejection?",
    optionA: "Figure out exactly what went wrong",
    optionB: "Walk away completely",
    optionC: "Cry or seek comfort",
    optionD: "Refuse to quit and try even harder",
    scoreMap: {
      A: { ALPHA: 1, BETA: 0, OMEGA: 0, SIGMA: 2, DELTA: 3, GAMMA: 5 },
      B: { ALPHA: 1, BETA: 0, OMEGA: 0, SIGMA: 5, DELTA: 1, GAMMA: 2 },
      C: { ALPHA: 0, BETA: 4, OMEGA: 5, SIGMA: 0, DELTA: 0, GAMMA: 0 },
      D: { ALPHA: 5, BETA: 0, OMEGA: 0, SIGMA: 1, DELTA: 0, GAMMA: 2 },
    },
  },
  {
    id: 34,
    question: "When learning to play a new game, you:",
    optionA: "Try to beat everyone instantly",
    optionB: "Play just for fun with friends",
    optionC: "Read the rulebook completely",
    optionD: "Find a way to break the game",
    scoreMap: {
      A: { ALPHA: 5, BETA: 0, OMEGA: 0, SIGMA: 1, DELTA: 0, GAMMA: 2 },
      B: { ALPHA: 0, BETA: 5, OMEGA: 4, SIGMA: 0, DELTA: 1, GAMMA: 0 },
      C: { ALPHA: 0, BETA: 2, OMEGA: 0, SIGMA: 0, DELTA: 5, GAMMA: 1 },
      D: { ALPHA: 2, BETA: 0, OMEGA: 0, SIGMA: 3, DELTA: 0, GAMMA: 5 },
    },
  },
  {
    id: 35,
    question: "Your fashion or clothing style is usually:",
    optionA: "Soft and cozy",
    optionB: "Simple and practical",
    optionC: "Neat and appropriate",
    optionD: "Bold and expensive",
    scoreMap: {
      A: { ALPHA: 0, BETA: 4, OMEGA: 5, SIGMA: 0, DELTA: 0, GAMMA: 0 },
      B: { ALPHA: 1, BETA: 0, OMEGA: 0, SIGMA: 5, DELTA: 2, GAMMA: 1 },
      C: { ALPHA: 0, BETA: 2, OMEGA: 0, SIGMA: 0, DELTA: 5, GAMMA: 1 },
      D: { ALPHA: 5, BETA: 0, OMEGA: 0, SIGMA: 1, DELTA: 0, GAMMA: 3 },
    },
  },
  {
    id: 36,
    question: "In the end, how do you want to be remembered?",
    optionA: "A powerful leader",
    optionB: "A loving and kind person",
    optionC: "A free lone wolf",
    optionD: "A brilliant mind",
    scoreMap: {
      A: { ALPHA: 5, BETA: 0, OMEGA: 0, SIGMA: 1, DELTA: 0, GAMMA: 1 },
      B: { ALPHA: 0, BETA: 4, OMEGA: 5, SIGMA: 0, DELTA: 1, GAMMA: 0 },
      C: { ALPHA: 1, BETA: 0, OMEGA: 0, SIGMA: 5, DELTA: 0, GAMMA: 2 },
      D: { ALPHA: 2, BETA: 0, OMEGA: 0, SIGMA: 3, DELTA: 0, GAMMA: 5 },
    },
  },
];
