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
    question:
      "When you are forced to manage a team project that is completely disorganized, you:",
    optionA: "Create strict rules to restore order",
    optionB: "Instantly take charge and assign tasks",
    optionC: "Keep the team calm and united",
    optionD: "Step away and finish the work alone",
    scoreMap: {
      A: { ALPHA: 0, BETA: 2, OMEGA: 0, SIGMA: 0, DELTA: 5, GAMMA: 1 },
      B: { ALPHA: 5, BETA: 0, OMEGA: 0, SIGMA: 1, DELTA: 1, GAMMA: 2 },
      C: { ALPHA: 0, BETA: 3, OMEGA: 5, SIGMA: 0, DELTA: 0, GAMMA: 0 },
      D: { ALPHA: 1, BETA: 0, OMEGA: 0, SIGMA: 5, DELTA: 0, GAMMA: 2 },
    },
  },
  {
    id: 2,
    question: "At a large social event where you hardly know anyone, you:",
    optionA: "Quietly observe the crowd before joining",
    optionB: "Find and comfort anyone looking lonely",
    optionC: "Try to build connections with new people",
    optionD: "Stay close to people you already know",
    scoreMap: {
      A: { ALPHA: 1, BETA: 0, OMEGA: 0, SIGMA: 5, DELTA: 2, GAMMA: 1 },
      B: { ALPHA: 0, BETA: 3, OMEGA: 5, SIGMA: 0, DELTA: 1, GAMMA: 0 },
      C: { ALPHA: 3, BETA: 0, OMEGA: 0, SIGMA: 1, DELTA: 0, GAMMA: 5 },
      D: { ALPHA: 0, BETA: 5, OMEGA: 2, SIGMA: 0, DELTA: 2, GAMMA: 0 },
    },
  },
  {
    id: 3,
    question:
      "When people near you start arguing loudly, your first instinct is to:",
    optionA: "Try to calm people down and restore peace",
    optionB: "Walk away to avoid the drama completely",
    optionC: "Analyze the situation objectively and point out the facts",
    optionD: "Take control and forcefully resolve it",
    scoreMap: {
      A: { ALPHA: 0, BETA: 3, OMEGA: 5, SIGMA: 0, DELTA: 0, GAMMA: 0 },
      B: { ALPHA: 0, BETA: 0, OMEGA: 0, SIGMA: 5, DELTA: 0, GAMMA: 2 },
      C: { ALPHA: 1, BETA: 0, OMEGA: 0, SIGMA: 2, DELTA: 2, GAMMA: 5 },
      D: { ALPHA: 5, BETA: 0, OMEGA: 0, SIGMA: 0, DELTA: 2, GAMMA: 1 },
    },
  },
  {
    id: 4,
    question:
      "If you are working under a leader whom you highly respect, you will:",
    optionA: "Work hard to earn a top role",
    optionB: "Act as their dedicated, loyal supporter",
    optionC: "Work perfectly without needing their supervision",
    optionD: "Carefully follow all their instructions perfectly",
    scoreMap: {
      A: { ALPHA: 5, BETA: 0, OMEGA: 0, SIGMA: 2, DELTA: 0, GAMMA: 3 },
      B: { ALPHA: 0, BETA: 5, OMEGA: 3, SIGMA: 0, DELTA: 1, GAMMA: 0 },
      C: { ALPHA: 1, BETA: 0, OMEGA: 0, SIGMA: 5, DELTA: 0, GAMMA: 1 },
      D: { ALPHA: 0, BETA: 2, OMEGA: 0, SIGMA: 0, DELTA: 5, GAMMA: 1 },
    },
  },
  {
    id: 5,
    question:
      "When sending emails or text messages, your communication style is usually:",
    optionA: "Highly formal, structured, and professional",
    optionB: "Direct, commanding, and focused on results",
    optionC: "Warm, friendly, and highly supportive",
    optionD: "Keep it short and to the point, without casual conversation",
    scoreMap: {
      A: { ALPHA: 0, BETA: 2, OMEGA: 0, SIGMA: 0, DELTA: 5, GAMMA: 1 },
      B: { ALPHA: 5, BETA: 0, OMEGA: 0, SIGMA: 2, DELTA: 0, GAMMA: 2 },
      C: { ALPHA: 0, BETA: 3, OMEGA: 5, SIGMA: 0, DELTA: 0, GAMMA: 0 },
      D: { ALPHA: 1, BETA: 0, OMEGA: 0, SIGMA: 5, DELTA: 0, GAMMA: 2 },
    },
  },
  {
    id: 6,
    question:
      "When you receive a major award or public praise in front of a large crowd, you:",
    optionA: "Confidently enjoy being noticed and appreciated",
    optionB: "Give a polite, prepared speech of thanks",
    optionC: "Accept it quietly and step away without much attention",
    optionD: "Immediately shift attention to thank your team",
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
      "If a major project you put a lot of effort into completely fails, your first thought is:",
    optionA: "I feel terrible for my hardworking teammates.",
    optionB: "I should have done it myself to ensure quality.",
    optionC: "I must analyze the strategy to fix the issues.",
    optionD: "I take lead and help the team learn from mistake.",
    scoreMap: {
      A: { ALPHA: 0, BETA: 4, OMEGA: 5, SIGMA: 0, DELTA: 0, GAMMA: 0 },
      B: { ALPHA: 1, BETA: 0, OMEGA: 0, SIGMA: 5, DELTA: 1, GAMMA: 2 },
      C: { ALPHA: 1, BETA: 0, OMEGA: 0, SIGMA: 2, DELTA: 1, GAMMA: 5 },
      D: { ALPHA: 5, BETA: 0, OMEGA: 0, SIGMA: 1, DELTA: 0, GAMMA: 1 },
    },
  },
  {
    id: 8,
    question:
      "During a sudden, unexpected emergency situation, your immediate reaction is to:",
    optionA: "Take command and direct everyone to safety",
    optionB: "Comfort panicking people and keep them calm",
    optionC: "Quickly find an escape route for yourself",
    optionD: "Strictly follow the safety rules",
    scoreMap: {
      A: { ALPHA: 5, BETA: 0, OMEGA: 0, SIGMA: 1, DELTA: 2, GAMMA: 1 },
      B: { ALPHA: 0, BETA: 3, OMEGA: 5, SIGMA: 0, DELTA: 0, GAMMA: 0 },
      C: { ALPHA: 1, BETA: 0, OMEGA: 0, SIGMA: 5, DELTA: 0, GAMMA: 2 },
      D: { ALPHA: 0, BETA: 2, OMEGA: 0, SIGMA: 0, DELTA: 5, GAMMA: 1 },
    },
  },
  {
    id: 9,
    question:
      "If you discover that someone has tried to cheat or take advantage of you, you will:",
    optionA: "Quietly create a strategy to outsmart them",
    optionB: "Speak to them directly and ask for an explanation",
    optionC: "Feel deeply hurt and emotionally betrayed",
    optionD: "Instantly cut them out of your life silently",
    scoreMap: {
      A: { ALPHA: 2, BETA: 0, OMEGA: 0, SIGMA: 2, DELTA: 0, GAMMA: 5 },
      B: { ALPHA: 5, BETA: 0, OMEGA: 0, SIGMA: 0, DELTA: 1, GAMMA: 2 },
      C: { ALPHA: 0, BETA: 3, OMEGA: 5, SIGMA: 0, DELTA: 0, GAMMA: 0 },
      D: { ALPHA: 1, BETA: 0, OMEGA: 0, SIGMA: 5, DELTA: 0, GAMMA: 2 },
    },
  },
  {
    id: 10,
    question: "When you are under extreme pressure, you tend to:",
    optionA: "Retreat and be completely alone to recharge",
    optionB: "Focus strictly on routines to stay in control",
    optionC: "Keep working even if you feel very tired",
    optionD: "Reach out to close friends for support",
    scoreMap: {
      A: { ALPHA: 1, BETA: 0, OMEGA: 0, SIGMA: 5, DELTA: 0, GAMMA: 2 },
      B: { ALPHA: 0, BETA: 2, OMEGA: 0, SIGMA: 0, DELTA: 5, GAMMA: 0 },
      C: { ALPHA: 5, BETA: 0, OMEGA: 0, SIGMA: 1, DELTA: 1, GAMMA: 1 },
      D: { ALPHA: 0, BETA: 5, OMEGA: 4, SIGMA: 0, DELTA: 0, GAMMA: 0 },
    },
  },
  {
    id: 11,
    question:
      "If you witness someone being treated very unfairly, you will usually:",
    optionA: "Comfort the victim and offer them sympathy",
    optionB: "Watch the situation quietly from a distance",
    optionC: "Find someone who can quickly stop it",
    optionD: "Take immediately action and end it",
    scoreMap: {
      A: { ALPHA: 0, BETA: 3, OMEGA: 5, SIGMA: 0, DELTA: 0, GAMMA: 0 },
      B: { ALPHA: 1, BETA: 0, OMEGA: 0, SIGMA: 5, DELTA: 0, GAMMA: 2 },
      C: { ALPHA: 2, BETA: 0, OMEGA: 0, SIGMA: 1, DELTA: 5, GAMMA: 4 },
      D: { ALPHA: 5, BETA: 0, OMEGA: 0, SIGMA: 1, DELTA: 1, GAMMA: 1 },
    },
  },
  {
    id: 12,
    question:
      "How do you prefer to organize your personal workspace or bedroom?",
    optionA: "Set up to look modern and impressive",
    optionB: "Filled with comfortable items to feel cozy",
    optionC: "Extremely minimal, keeping only the essentials",
    optionD: "Perfectly neat, highly organized, and sorted",
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
    question:
      "When you are assigned a very repetitive and boring task, you prefer to:",
    optionA: "Automate it creatively so you never repeat it",
    optionB: "Pass it to others and focus on bigger work",
    optionC: "Do it with a positive attitude and support others",
    optionD: "Work quietly and independently until finished",
    scoreMap: {
      A: { ALPHA: 2, BETA: 0, OMEGA: 0, SIGMA: 3, DELTA: 0, GAMMA: 5 },
      B: { ALPHA: 5, BETA: 0, OMEGA: 0, SIGMA: 1, DELTA: 0, GAMMA: 2 },
      C: { ALPHA: 0, BETA: 5, OMEGA: 3, SIGMA: 0, DELTA: 1, GAMMA: 0 },
      D: { ALPHA: 1, BETA: 0, OMEGA: 0, SIGMA: 5, DELTA: 2, GAMMA: 1 },
    },
  },
  {
    id: 14,
    question: "How do you generally view strict workplace or social rules?",
    optionA: "I ignore rules and do things my own way",
    optionB: "I find ways to avoid strict rules when possible",
    optionC: "I prefer to set rules for others to follow",
    optionD: "I respect rules and follow them strictly",
    scoreMap: {
      A: { ALPHA: 1, BETA: 0, OMEGA: 0, SIGMA: 5, DELTA: 0, GAMMA: 1 },
      B: { ALPHA: 2, BETA: 0, OMEGA: 0, SIGMA: 2, DELTA: 0, GAMMA: 5 },
      C: { ALPHA: 5, BETA: 0, OMEGA: 0, SIGMA: 1, DELTA: 1, GAMMA: 2 },
      D: { ALPHA: 0, BETA: 4, OMEGA: 3, SIGMA: 0, DELTA: 5, GAMMA: 0 },
    },
  },
  {
    id: 15,
    question:
      "When it is time to brainstorm new ideas or create a plan, you work best by:",
    optionA: "Working together and sharing everyone’s ideas",
    optionB: "Work alone in a quiet space to think clearly",
    optionC: "Questioning old methods and coming up with new ideas",
    optionD: "Sharing a clear vision for others to follow",
    scoreMap: {
      A: { ALPHA: 0, BETA: 5, OMEGA: 4, SIGMA: 0, DELTA: 1, GAMMA: 0 },
      B: { ALPHA: 1, BETA: 0, OMEGA: 0, SIGMA: 5, DELTA: 0, GAMMA: 3 },
      C: { ALPHA: 2, BETA: 0, OMEGA: 0, SIGMA: 2, DELTA: 0, GAMMA: 5 },
      D: { ALPHA: 5, BETA: 1, OMEGA: 0, SIGMA: 0, DELTA: 0, GAMMA: 2 },
    },
  },
  {
    id: 16,
    question: "How do you personally view and manage your money?",
    optionA: "A resource to increase power and position",
    optionB: "A resource to support people close to you",
    optionC: "A way to live without depending on others",
    optionD: "Something to budget carefully and save safely",
    scoreMap: {
      A: { ALPHA: 5, BETA: 0, OMEGA: 0, SIGMA: 1, DELTA: 0, GAMMA: 3 },
      B: { ALPHA: 0, BETA: 4, OMEGA: 5, SIGMA: 0, DELTA: 1, GAMMA: 0 },
      C: { ALPHA: 2, BETA: 0, OMEGA: 0, SIGMA: 5, DELTA: 0, GAMMA: 2 },
      D: { ALPHA: 0, BETA: 2, OMEGA: 0, SIGMA: 0, DELTA: 5, GAMMA: 1 },
    },
  },
  {
    id: 17,
    question:
      "How do you feel about taking risks in your career or personal life?",
    optionA: "I strongly prefer safety and avoid risks",
    optionB: "I confidently take big risks for massive rewards",
    optionC: "I take the reliable path to keep everyone secure",
    optionD: "I take risks after thinking them through carefully",
    scoreMap: {
      A: { ALPHA: 0, BETA: 2, OMEGA: 1, SIGMA: 0, DELTA: 5, GAMMA: 0 },
      B: { ALPHA: 5, BETA: 0, OMEGA: 0, SIGMA: 2, DELTA: 0, GAMMA: 4 },
      C: { ALPHA: 0, BETA: 5, OMEGA: 4, SIGMA: 0, DELTA: 2, GAMMA: 0 },
      D: { ALPHA: 2, BETA: 0, OMEGA: 0, SIGMA: 5, DELTA: 0, GAMMA: 3 },
    },
  },
  {
    id: 18,
    question:
      "When a major plan suddenly changes or gets cancelled at the last minute, you:",
    optionA: "Quickly take control and create a new plan",
    optionB: "Stay flexible and keep team morale positive",
    optionC: "Feel relieved and use the free time alone",
    optionD: "Fall back on a backup plan to maintain order",
    scoreMap: {
      A: { ALPHA: 5, BETA: 0, OMEGA: 0, SIGMA: 1, DELTA: 2, GAMMA: 1 },
      B: { ALPHA: 0, BETA: 4, OMEGA: 5, SIGMA: 0, DELTA: 0, GAMMA: 0 },
      C: { ALPHA: 1, BETA: 0, OMEGA: 0, SIGMA: 5, DELTA: 0, GAMMA: 2 },
      D: { ALPHA: 0, BETA: 2, OMEGA: 0, SIGMA: 0, DELTA: 5, GAMMA: 1 },
    },
  },
  {
    id: 19,
    question:
      "How do you handle a team member who is lazy or avoids their responsibilities?",
    optionA: "Quietly do their work to keep the peace",
    optionB: "Find indirect ways to make them work",
    optionC: "Ignore them entirely and focus on your work",
    optionD: "Directly speak and ask them to work harder",
    scoreMap: {
      A: { ALPHA: 0, BETA: 5, OMEGA: 4, SIGMA: 0, DELTA: 1, GAMMA: 0 },
      B: { ALPHA: 2, BETA: 0, OMEGA: 0, SIGMA: 2, DELTA: 0, GAMMA: 5 },
      C: { ALPHA: 1, BETA: 0, OMEGA: 0, SIGMA: 5, DELTA: 0, GAMMA: 1 },
      D: { ALPHA: 5, BETA: 0, OMEGA: 0, SIGMA: 1, DELTA: 2, GAMMA: 1 },
    },
  },
  {
    id: 20,
    question:
      "When someone shares a deep personal secret with you, how do you usually respond?",
    optionA: "Feel honored and protect their secret carefully",
    optionB: "Feel stressed about having to keep it hidden",
    optionC: "Remember it quietly for possible future use",
    optionD: "Listen politely but try not to get involved or remember it",
    scoreMap: {
      A: { ALPHA: 0, BETA: 4, OMEGA: 5, SIGMA: 0, DELTA: 1, GAMMA: 0 },
      B: { ALPHA: 1, BETA: 2, OMEGA: 0, SIGMA: 0, DELTA: 5, GAMMA: 0 },
      C: { ALPHA: 2, BETA: 0, OMEGA: 0, SIGMA: 2, DELTA: 0, GAMMA: 5 },
      D: { ALPHA: 1, BETA: 0, OMEGA: 0, SIGMA: 5, DELTA: 0, GAMMA: 1 },
    },
  },
  {
    id: 21,
    question: "What does your idea of a truly perfect vacation look like?",
    optionA: "Leading an exciting adventure where you are in control",
    optionB: "A relaxing time with family and friends",
    optionC: "Traveling entirely alone to a quiet, isolated place",
    optionD: "Following a fully planned and detailed schedule",
    scoreMap: {
      A: { ALPHA: 5, BETA: 0, OMEGA: 0, SIGMA: 1, DELTA: 0, GAMMA: 2 },
      B: { ALPHA: 0, BETA: 5, OMEGA: 4, SIGMA: 0, DELTA: 1, GAMMA: 0 },
      C: { ALPHA: 2, BETA: 0, OMEGA: 0, SIGMA: 5, DELTA: 0, GAMMA: 1 },
      D: { ALPHA: 0, BETA: 2, OMEGA: 0, SIGMA: 0, DELTA: 5, GAMMA: 1 },
    },
  },
  {
    id: 22,
    question:
      "When a friend comes to you upset about a personal problem, you usually:",
    optionA: "Think of creative ways to solve the problem",
    optionB: "Listen carefully, give comfort, and understand their feelings",
    optionC: "Tell them the exact actions they should do",
    optionD: "Give practical and logical step-by-step advice",
    scoreMap: {
      A: { ALPHA: 1, BETA: 0, OMEGA: 0, SIGMA: 2, DELTA: 0, GAMMA: 5 },
      B: { ALPHA: 0, BETA: 4, OMEGA: 5, SIGMA: 0, DELTA: 1, GAMMA: 0 },
      C: { ALPHA: 5, BETA: 0, OMEGA: 0, SIGMA: 1, DELTA: 2, GAMMA: 1 },
      D: { ALPHA: 0, BETA: 2, OMEGA: 0, SIGMA: 0, DELTA: 5, GAMMA: 1 },
    },
  },
  {
    id: 23,
    question:
      "How do you react if someone interrupts you while you are deeply focused on a task?",
    optionA: "Ignore them and maintain focus on work",
    optionB: "Stop what you are doing and give them full attention",
    optionC: "Politely ask them to return during a break",
    optionD: "Feel frustrated and ask them not to interrupt again",
    scoreMap: {
      A: { ALPHA: 1, BETA: 0, OMEGA: 0, SIGMA: 5, DELTA: 0, GAMMA: 2 },
      B: { ALPHA: 0, BETA: 4, OMEGA: 5, SIGMA: 0, DELTA: 1, GAMMA: 0 },
      C: { ALPHA: 0, BETA: 2, OMEGA: 0, SIGMA: 0, DELTA: 5, GAMMA: 1 },
      D: { ALPHA: 5, BETA: 0, OMEGA: 0, SIGMA: 1, DELTA: 2, GAMMA: 1 },
    },
  },
  {
    id: 24,
    question:
      "What is the primary motivation that drives you to work hard every day?",
    optionA: "To be the best and gain influence",
    optionB: "To support and care for loved ones",
    optionC: "To achieve freedom and independence",
    optionD: "To complete a job perfectly",
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
    question:
      "What is the most important quality you look for in a romantic relationship?",
    optionA: "A partner who fully respects your independence",
    optionB: "An intellectual equal who challenges your mind",
    optionC: "A relationship where you lead and protect your partner",
    optionD: "A deeply emotional bond filled with mutual care",
    scoreMap: {
      A: { ALPHA: 1, BETA: 0, OMEGA: 0, SIGMA: 5, DELTA: 0, GAMMA: 2 },
      B: { ALPHA: 2, BETA: 0, OMEGA: 0, SIGMA: 2, DELTA: 0, GAMMA: 5 },
      C: { ALPHA: 5, BETA: 1, OMEGA: 0, SIGMA: 0, DELTA: 2, GAMMA: 0 },
      D: { ALPHA: 0, BETA: 3, OMEGA: 5, SIGMA: 0, DELTA: 1, GAMMA: 0 },
    },
  },
  {
    id: 26,
    question:
      "How do you generally process and react to the sadness of other people?",
    optionA: "You absorb their emotions and feel it with them",
    optionB: "You notice their emotions but stay emotionally detached",
    optionC: "You logically analyze the root cause of their sadness",
    optionD: "You immediately take action to fix what made them sad",
    scoreMap: {
      A: { ALPHA: 0, BETA: 3, OMEGA: 5, SIGMA: 0, DELTA: 0, GAMMA: 0 },
      B: { ALPHA: 1, BETA: 0, OMEGA: 0, SIGMA: 5, DELTA: 0, GAMMA: 2 },
      C: { ALPHA: 2, BETA: 0, OMEGA: 0, SIGMA: 2, DELTA: 1, GAMMA: 5 },
      D: { ALPHA: 5, BETA: 0, OMEGA: 0, SIGMA: 1, DELTA: 2, GAMMA: 1 },
    },
  },
  {
    id: 27,
    question: "How would you prefer to spend a perfect weekend?",
    optionA: "Organizing an energetic activity with friends",
    optionB: "Enjoying a quiet, cozy night at home with loved ones",
    optionC: "Spending time alone on your own activities",
    optionD: "Diving into research or learning a new skill",
    scoreMap: {
      A: { ALPHA: 5, BETA: 1, OMEGA: 0, SIGMA: 0, DELTA: 0, GAMMA: 1 },
      B: { ALPHA: 0, BETA: 4, OMEGA: 5, SIGMA: 0, DELTA: 2, GAMMA: 0 },
      C: { ALPHA: 1, BETA: 0, OMEGA: 0, SIGMA: 5, DELTA: 0, GAMMA: 2 },
      D: { ALPHA: 1, BETA: 0, OMEGA: 0, SIGMA: 3, DELTA: 0, GAMMA: 5 },
    },
  },
  {
    id: 28,
    question:
      "When meeting someone completely stranger, what is the first thing you notice about them?",
    optionA: "Their professionalism and intelligent presentation",
    optionB: "Their confidence, posture, and natural presence",
    optionC: "Their warm smile and friendly nature",
    optionD: "Whether they respect personal space",
    scoreMap: {
      A: { ALPHA: 0, BETA: 1, OMEGA: 0, SIGMA: 1, DELTA: 5, GAMMA: 4 },
      B: { ALPHA: 5, BETA: 0, OMEGA: 0, SIGMA: 1, DELTA: 0, GAMMA: 2 },
      C: { ALPHA: 0, BETA: 2, OMEGA: 5, SIGMA: 0, DELTA: 1, GAMMA: 0 },
      D: { ALPHA: 2, BETA: 0, OMEGA: 0, SIGMA: 5, DELTA: 0, GAMMA: 1 },
    },
  },
  {
    id: 29,
    question: "How do you define the concept of true loyalty?",
    optionA: "A mutual respect earned slowly through actions",
    optionB: "A strong commitment to keeping your promises",
    optionC: "A strong dedication to following your leaders",
    optionD: "An emotional bond supporting each other completely",
    scoreMap: {
      A: { ALPHA: 2, BETA: 0, OMEGA: 0, SIGMA: 5, DELTA: 0, GAMMA: 3 },
      B: { ALPHA: 0, BETA: 5, OMEGA: 1, SIGMA: 0, DELTA: 5, GAMMA: 0 },
      C: { ALPHA: 5, BETA: 0, OMEGA: 0, SIGMA: 1, DELTA: 2, GAMMA: 1 },
      D: { ALPHA: 0, BETA: 3, OMEGA: 5, SIGMA: 0, DELTA: 1, GAMMA: 0 },
    },
  },
  {
    id: 30,
    question: "What scenario represents your absolute deepest fear?",
    optionA: "Losing the trust of people close to you",
    optionB: "Being in a situation with strict control and no freedom",
    optionC: "Dealing with a messy situation without preparation",
    optionD: "Losing your authority and being seen as weak",
    scoreMap: {
      A: { ALPHA: 0, BETA: 5, OMEGA: 5, SIGMA: 0, DELTA: 1, GAMMA: 0 },
      B: { ALPHA: 1, BETA: 0, OMEGA: 0, SIGMA: 5, DELTA: 0, GAMMA: 2 },
      C: { ALPHA: 2, BETA: 0, OMEGA: 0, SIGMA: 1, DELTA: 5, GAMMA: 4 },
      D: { ALPHA: 5, BETA: 0, OMEGA: 0, SIGMA: 2, DELTA: 0, GAMMA: 1 },
    },
  },
  {
    id: 31,
    question:
      "When you achieve a major success or win a competition, how do you handle it?",
    optionA: "Share the credit and celebrate with your team",
    optionB: "Boldly celebrate and ensure everyone notices your win",
    optionC: "Quickly plan a bigger and more challenging goal",
    optionD: "Quietly accept the win and move to the next task",
    scoreMap: {
      A: { ALPHA: 0, BETA: 5, OMEGA: 4, SIGMA: 0, DELTA: 1, GAMMA: 0 },
      B: { ALPHA: 5, BETA: 0, OMEGA: 0, SIGMA: 1, DELTA: 0, GAMMA: 2 },
      C: { ALPHA: 2, BETA: 0, OMEGA: 0, SIGMA: 1, DELTA: 0, GAMMA: 5 },
      D: { ALPHA: 1, BETA: 0, OMEGA: 0, SIGMA: 5, DELTA: 2, GAMMA: 1 },
    },
  },
  {
    id: 32,
    question: "What specific behavior from others makes you the most angry?",
    optionA: "When people are careless or break rules unnecessarily",
    optionB: "When people cause conflict or disturb the peace",
    optionC: "When someone disrespects you or challenges your authority",
    optionD: "When someone closely monitors and controls what you do",
    scoreMap: {
      A: { ALPHA: 1, BETA: 0, OMEGA: 0, SIGMA: 0, DELTA: 5, GAMMA: 1 },
      B: { ALPHA: 0, BETA: 4, OMEGA: 5, SIGMA: 0, DELTA: 1, GAMMA: 0 },
      C: { ALPHA: 5, BETA: 0, OMEGA: 0, SIGMA: 2, DELTA: 0, GAMMA: 1 },
      D: { ALPHA: 2, BETA: 0, OMEGA: 0, SIGMA: 5, DELTA: 0, GAMMA: 4 },
    },
  },
  {
    id: 33,
    question: "How do you process personal failure or a harsh rejection?",
    optionA: "Carefully review the failure to understand what went wrong",
    optionB: "Instantly detach yourself and walk away calmly",
    optionC: "Feel the pain and seek comfort from friends",
    optionD: "Refuse defeat and aggressively push forward until you win",
    scoreMap: {
      A: { ALPHA: 1, BETA: 0, OMEGA: 0, SIGMA: 2, DELTA: 3, GAMMA: 5 },
      B: { ALPHA: 1, BETA: 0, OMEGA: 0, SIGMA: 5, DELTA: 1, GAMMA: 2 },
      C: { ALPHA: 0, BETA: 4, OMEGA: 5, SIGMA: 0, DELTA: 0, GAMMA: 0 },
      D: { ALPHA: 5, BETA: 0, OMEGA: 0, SIGMA: 1, DELTA: 0, GAMMA: 2 },
    },
  },
  {
    id: 34,
    question:
      "When you sit down to learn a brand new board game or activity, you usually:",
    optionA: "Focus on the best strategy to dominate and win",
    optionB: "Focus more on bonding with friends than winning",
    optionC: "Read the rulebook fully to ensure compliance",
    optionD: "Find creative ways to push it beyond its limits",
    scoreMap: {
      A: { ALPHA: 5, BETA: 0, OMEGA: 0, SIGMA: 1, DELTA: 0, GAMMA: 2 },
      B: { ALPHA: 0, BETA: 5, OMEGA: 4, SIGMA: 0, DELTA: 1, GAMMA: 0 },
      C: { ALPHA: 0, BETA: 2, OMEGA: 0, SIGMA: 0, DELTA: 5, GAMMA: 1 },
      D: { ALPHA: 2, BETA: 0, OMEGA: 0, SIGMA: 3, DELTA: 0, GAMMA: 5 },
    },
  },
  {
    id: 35,
    question:
      "How would you describe your typical fashion style or everyday clothing?",
    optionA: "Soft and comfortable that feel cozy and easy to wear",
    optionB: "Highly practical and minimal without drawing attention",
    optionC: "Perfectly neat, clean, and suitable for the situation",
    optionD: "Bold, high-quality clothes that show confidence",
    scoreMap: {
      A: { ALPHA: 0, BETA: 4, OMEGA: 5, SIGMA: 0, DELTA: 0, GAMMA: 0 },
      B: { ALPHA: 1, BETA: 0, OMEGA: 0, SIGMA: 5, DELTA: 2, GAMMA: 1 },
      C: { ALPHA: 0, BETA: 2, OMEGA: 0, SIGMA: 0, DELTA: 5, GAMMA: 1 },
      D: { ALPHA: 5, BETA: 0, OMEGA: 0, SIGMA: 1, DELTA: 0, GAMMA: 3 },
    },
  },
  {
    id: 36,
    question: "What do you want people to think of when they remember you?",
    optionA: "As a powerful leader who protected their people",
    optionB: "As a loving person who made others feel special",
    optionC: "As a person who succeeded through their own effort",
    optionD: "As a brilliant visionary who introduced creative ideas",
    scoreMap: {
      A: { ALPHA: 5, BETA: 0, OMEGA: 0, SIGMA: 1, DELTA: 0, GAMMA: 1 },
      B: { ALPHA: 0, BETA: 4, OMEGA: 5, SIGMA: 0, DELTA: 1, GAMMA: 0 },
      C: { ALPHA: 1, BETA: 0, OMEGA: 0, SIGMA: 5, DELTA: 0, GAMMA: 2 },
      D: { ALPHA: 2, BETA: 0, OMEGA: 0, SIGMA: 3, DELTA: 0, GAMMA: 5 },
    },
  },
];
