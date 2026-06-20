// --- TYPES ---

export type RiasecCategory = "R" | "I" | "A" | "S" | "E" | "C";

export interface RiasecQuestion {
  id: number;
  category: RiasecCategory;
  text: string;
}

export type LikertScore = 1 | 2 | 3 | 4 | 5;

export interface UserResponse {
  questionId: number;
  score: LikertScore;
}

export interface CategoryResult {
  category: RiasecCategory;
  totalScore: number;
}



// --- QUESTION BANK ---

export const riasecQuestions: RiasecQuestion[] = [
  // Realistic (R) - Hands-on, building, outdoors
  { id: 1, category: "R", text: "Fixing things around the house." },
  { id: 2, category: "R", text: "Working with my hands to build things." },
  {
    id: 3,
    category: "R",
    text: "Spending time outdoors planting or gardening.",
  },
  { id: 4, category: "R", text: "Operating tools, machines, or equipment." },
  { id: 5, category: "R", text: "Putting together models or furniture." },

  // Investigative (I) - Thinking, solving, discovering
  { id: 6, category: "I", text: "Figuring out how complex things work." },
  { id: 7, category: "I", text: "Solving difficult puzzles or math problems." },
  { id: 8, category: "I", text: "Reading about science or new discoveries." },
  {
    id: 9,
    category: "I",
    text: "Looking closely at information to find clues.",
  },
  { id: 10, category: "I", text: "Doing experiments to see what happens." },

  // Artistic (A) - Creating, designing, expressing
  {
    id: 11,
    category: "A",
    text: "Writing stories, poems, or journal entries.",
  },
  { id: 12, category: "A", text: "Drawing, painting, or making art." },
  { id: 13, category: "A", text: "Playing a musical instrument or singing." },
  { id: 14, category: "A", text: "Designing how things look or feel." },
  { id: 15, category: "A", text: "Acting in a play or performing for others." },

  // Social (S) - Helping, teaching, supporting
  { id: 16, category: "S", text: "Teaching someone how to do something new." },
  {
    id: 17,
    category: "S",
    text: "Taking care of people who are sick or hurt.",
  },
  {
    id: 18,
    category: "S",
    text: "Listening to friends and giving them advice.",
  },
  { id: 19, category: "S", text: "Volunteering to help out in the community." },
  { id: 20, category: "S", text: "Helping people settle arguments fairly." },

  // Enterprising (E) - Leading, persuading, selling
  { id: 21, category: "E", text: "Starting and running my own business." },
  { id: 22, category: "E", text: "Selling things or pitching new ideas." },
  { id: 23, category: "E", text: "Taking charge and leading a group project." },
  { id: 24, category: "E", text: "Giving a speech in front of a crowd." },
  {
    id: 25,
    category: "E",
    text: "Negotiating deals or bargaining for a good price.",
  },

  // Conventional (C) - Organizing, detailing, tracking
  {
    id: 26,
    category: "C",
    text: "Keeping a detailed budget or tracking money.",
  },
  { id: 27, category: "C", text: "Organizing files, folders, or workspaces." },
  {
    id: 28,
    category: "C",
    text: "Double-checking work to make sure it's perfect.",
  },
  { id: 29, category: "C", text: "Entering data into spreadsheets." },
  { id: 30, category: "C", text: "Keeping track of supplies and inventory." },
];

// --- CALCULATION ENGINE ---

export function calculateHollandCode(responses: UserResponse[]): string {
  // Score Tabulation
  const scorecard: Record<RiasecCategory, number> = {
    R: 0,
    I: 0,
    A: 0,
    S: 0,
    E: 0,
    C: 0,
  };

  responses.forEach((response) => {
    const question = riasecQuestions.find((q) => q.id === response.questionId);
    if (question) {
      scorecard[question.category] += response.score;
    }
  });

  const sortedResults: CategoryResult[] = Object.keys(scorecard).map((key) => ({
    category: key as RiasecCategory,
    totalScore: scorecard[key as RiasecCategory],
  }));

  // Sorting and Tie-Breaking
  sortedResults.sort((a, b) => {
    if (b.totalScore !== a.totalScore) {
      return b.totalScore - a.totalScore;
    }
    return a.category.localeCompare(b.category);
  });

  // Extract Top 3 Code
  const topThree = sortedResults.slice(0, 3);
  const hollandCode = topThree.map((result) => result.category).join("");

  return hollandCode;
}
