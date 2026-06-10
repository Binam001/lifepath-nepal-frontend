export type Trait = "O" | "C" | "E" | "A" | "N";

export interface Question {
  id: number;
  trait: Trait;
  polarity: 1 | -1;
  text: string;
}

export const oceanQuestions: Question[] = [
  // --- OPENNESS (O) ---
  {
    id: 1,
    trait: "O",
    polarity: 1,
    text: "I enjoy trying new things and exploring new ideas.",
  },
  {
    id: 2,
    trait: "O",
    polarity: 1,
    text: "I have a highly active imagination.",
  },
  {
    id: 3,
    trait: "O",
    polarity: 1,
    text: "I am curious about many different topics and subjects.",
  },
  {
    id: 4,
    trait: "O",
    polarity: -1,
    text: "I usually follow my daily routine",
  },
  {
    id: 5,
    trait: "O",
    polarity: -1,
    text: "I have little interest in abstract or theoretical concepts.",
  },
  {
    id: 6,
    trait: "O",
    polarity: -1,
    text: "I prefer simple and clear things over complex ones.",
  },

  // --- CONSCIENTIOUSNESS (C) ---
  {
    id: 7,
    trait: "C",
    polarity: 1,
    text: "I always finish my tasks and daily work on time.",
  },
  {
    id: 8,
    trait: "C",
    polarity: 1,
    text: "I like to keep my workspace organized and clean.",
  },
  {
    id: 9,
    trait: "C",
    polarity: 1,
    text: "I pay close attention to details when working on a project.",
  },
  {
    id: 10,
    trait: "C",
    polarity: -1,
    text: "I often lose my personal things.",
  },
  {
    id: 11,
    trait: "C",
    polarity: -1,
    text: "I find it difficult to follow to a strict schedule.",
  },
  {
    id: 12,
    trait: "C",
    polarity: -1,
    text: "I often do important work at the last minute.",
  },

  // --- EXTRAVERSION (E) ---
  {
    id: 13,
    trait: "E",
    polarity: 1,
    text: "I feel energized when I am around a large group of people.",
  },
  {
    id: 14,
    trait: "E",
    polarity: 1,
    text: "I find it easy to start conversations with strangers.",
  },
  {
    id: 15,
    trait: "E",
    polarity: 1,
    text: "I enjoy being the center of attention at social gatherings.",
  },
  {
    id: 16,
    trait: "E",
    polarity: -1,
    text: "I prefer to remain quiet when I am in a group.",
  },
  {
    id: 17,
    trait: "E",
    polarity: -1,
    text: "I feel very tired after attending at social events.",
  },
  {
    id: 18,
    trait: "E",
    polarity: -1,
    text: "I usually wait for others to speak first before joining a conversation.",
  },

  // --- AGREEABLENESS (A) ---
  {
    id: 19,
    trait: "A",
    polarity: 1,
    text: "I deeply care about the feelings of others.",
  },
  {
    id: 20,
    trait: "A",
    polarity: 1,
    text: "I try to be helpful and polite to everyone I meet.",
  },
  {
    id: 21,
    trait: "A",
    polarity: 1,
    text: "I always try to see the good in other people.",
  },
  {
    id: 22,
    trait: "A",
    polarity: -1,
    text: "I often consider my needs more than others’ needs.",
  },
  {
    id: 23,
    trait: "A",
    polarity: -1,
    text: "I often get into arguments or conflicts with people.",
  },
  {
    id: 24,
    trait: "A",
    polarity: -1,
    text: "I can be honest and direct when others make mistakes.",
  },

  // --- NEUROTICISM (N) ---
  {
    id: 25,
    trait: "N",
    polarity: 1,
    text: "I worry frequently about things that might go wrong.",
  },
  {
    id: 26,
    trait: "N",
    polarity: 1,
    text: "I get stressed out easily by sudden changes.",
  },
  {
    id: 27,
    trait: "N",
    polarity: 1,
    text: "I often feel upset by small problems.",
  },
  {
    id: 28,
    trait: "N",
    polarity: -1,
    text: "I remain calm even in highly stressful situations.",
  },
  {
    id: 29,
    trait: "N",
    polarity: -1,
    text: "I rarely feel nervous or highly stressed.",
  },
  {
    id: 30,
    trait: "N",
    polarity: -1,
    text: "I can easily let go of my frustration and move on.",
  },
];
