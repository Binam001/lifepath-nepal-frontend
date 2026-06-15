// Define the shortened chronotype codes
export type ChronotypeCode = "L" | "B" | "W" | "D";

// Interface for a single multiple-choice option
export interface Option {
  id: string;
  text: string;
  category: ChronotypeCode;
}

// Interface for a single question
export interface Question {
  id: number;
  text: string;
  options: Option[];
}

// The complete 24-question assessment data with randomized option orders
export const sleepChronotypeAssessment: Question[] = [
  {
    id: 1,
    text: "When you wake up, how do you usually feel?",
    options: [
      { id: "A", text: "Tired and a little tense.", category: "D" },
      { id: "B", text: "Ready to start the day.", category: "L" },
      { id: "C", text: "Sleepy and slow to begin.", category: "W" },
      { id: "D", text: "A bit slow, then feeling fine.", category: "B" },
    ],
  },
  {
    id: 2,
    text: "What time do you usually have breakfast?",
    options: [
      { id: "A", text: "Close to lunchtime.", category: "W" },
      { id: "B", text: "An hour or two after waking.", category: "B" },
      { id: "C", text: "I skip it or forget.", category: "D" },
      { id: "D", text: "Right after waking up.", category: "L" },
    ],
  },
  {
    id: 3,
    text: "When is the best time for you to do a difficult task?",
    options: [
      { id: "A", text: "Around midday.", category: "B" },
      { id: "B", text: "A little at a time.", category: "D" },
      { id: "C", text: "Early morning.", category: "L" },
      { id: "D", text: "Late at night.", category: "W" },
    ],
  },
  {
    id: 4,
    text: "How do you usually feel at 4:00 PM?",
    options: [
      { id: "A", text: "Very tired and low on energy.", category: "L" },
      { id: "B", text: "More energetic than earlier.", category: "W" },
      { id: "C", text: "A little tired, but still okay.", category: "B" },
      { id: "D", text: "Tired, but unable to relax.", category: "D" },
    ],
  },
  {
    id: 5,
    text: "How easily do you fall asleep?",
    options: [
      { id: "A", text: "I stay awake for a long time.", category: "W" },
      { id: "B", text: "I fall asleep very quickly.", category: "L" },
      { id: "C", text: "My mind keeps thinking too much.", category: "D" },
      { id: "D", text: "I fall asleep in about 20 minutes.", category: "B" },
    ],
  },
  {
    id: 6,
    text: "If you have to wake up very early for a trip, how do you react?",
    options: [
      { id: "A", text: "A bit annoyed, but I manage.", category: "B" },
      { id: "B", text: "Very hard, I feel really bad.", category: "W" },
      { id: "C", text: "Easy, I like early mornings.", category: "L" },
      { id: "D", text: "I stay up worrying about the alarm.", category: "D" },
    ],
  },
  {
    id: 7,
    text: "How do you feel about naps?",
    options: [
      { id: "A", text: "I try, but I can’t sleep.", category: "D" },
      { id: "B", text: "I like short afternoon naps.", category: "B" },
      { id: "C", text: "I like long naps in the evening.", category: "W" },
      { id: "D", text: "I rarely nap, I sleep at night.", category: "L" },
    ],
  },
  {
    id: 8,
    text: "When do you feel most creative?",
    options: [
      { id: "A", text: "Right after waking up.", category: "L" },
      { id: "B", text: "At random times.", category: "D" },
      { id: "C", text: "Late in the morning.", category: "B" },
      { id: "D", text: "Very late at night.", category: "W" },
    ],
  },
  {
    id: 9,
    text: "How do you react to loud noises while sleeping?",
    options: [
      { id: "A", text: "I don’t wake up easily.", category: "W" },
      { id: "B", text: "I wake up, then sleep again quickly.", category: "B" },
      {
        id: "C",
        text: "I wake up and struggle to sleep again.",
        category: "D",
      },
      { id: "D", text: "I almost never wake up.", category: "L" },
    ],
  },
  {
    id: 10,
    text: "What time do you usually go to bed?",
    options: [
      { id: "A", text: "Around 11 PM.", category: "B" },
      { id: "B", text: "I change times often.", category: "D" },
      { id: "C", text: "Early, around 9–10 PM.", category: "L" },
      { id: "D", text: "After midnight.", category: "W" },
    ],
  },
  {
    id: 11,
    text: "How are you in the morning?",
    options: [
      { id: "A", text: "Awake but a bit worried.", category: "D" },
      { id: "B", text: "Quiet, I prefer no talking.", category: "W" },
      { id: "C", text: "Calm and relaxed.", category: "B" },
      { id: "D", text: "Happy and talkative.", category: "L" },
    ],
  },
  {
    id: 12,
    text: "When do you feel best for exercise?",
    options: [
      { id: "A", text: "Early morning.", category: "L" },
      { id: "B", text: "Afternoon time.", category: "B" },
      { id: "C", text: "I can’t keep a fixed time.", category: "D" },
      { id: "D", text: "Evening.", category: "W" },
    ],
  },
  {
    id: 13,
    text: "How much coffee or tea do you drink to stay awake?",
    options: [
      { id: "A", text: "One in the morning, maybe one later.", category: "B" },
      { id: "B", text: "I don’t drink it or only sometimes.", category: "L" },
      { id: "C", text: "A lot, I need it to start the day.", category: "W" },
      { id: "D", text: "A lot, but it makes me feel shaky.", category: "D" },
    ],
  },
  {
    id: 14,
    text: "If you have no plans on a Saturday, when do you wake up?",
    options: [
      { id: "A", text: "Around noon.", category: "W" },
      { id: "B", text: "Early, but I feel tired.", category: "D" },
      { id: "C", text: "About one hour later than usual.", category: "B" },
      { id: "D", text: "At my usual time.", category: "L" },
    ],
  },
  {
    id: 15,
    text: "How do you feel during a long dinner party?",
    options: [
      { id: "A", text: "Tired, but I stay awake.", category: "D" },
      {
        id: "B",
        text: "I enjoy it, but leave before midnight.",
        category: "B",
      },
      { id: "C", text: "I feel sleepy before it ends.", category: "L" },
      { id: "D", text: "I feel more active at midnight.", category: "W" },
    ],
  },
  {
    id: 16,
    text: "How do you feel about breakfast?",
    options: [
      { id: "A", text: "I usually eat breakfast.", category: "L" },
      { id: "B", text: "I usually skip it.", category: "W" },
      { id: "C", text: "Just a little food to start the day.", category: "D" },
      { id: "D", text: "I like it, but keep it light.", category: "B" },
    ],
  },
  {
    id: 17,
    text: "How do you feel at work or school at 10:00 AM?",
    options: [
      { id: "A", text: "Focused and productive.", category: "B" },
      { id: "B", text: "Calm and steady.", category: "L" },
      { id: "C", text: "Still a bit sleepy.", category: "W" },
      { id: "D", text: "Hard to focus, mind feels busy.", category: "D" },
    ],
  },
  {
    id: 18,
    text: "How do you react to bright light in the evening?",
    options: [
      { id: "A", text: "I like it, it keeps me active.", category: "W" },
      { id: "B", text: "It keeps me awake for a long time.", category: "D" },
      { id: "C", text: "It feels fine for a while.", category: "B" },
      { id: "D", text: "It feels uncomfortable.", category: "L" },
    ],
  },
  {
    id: 19,
    text: "How do you feel if you stay up 2 hours past your bedtime?",
    options: [
      {
        id: "A",
        text: "I feel tired, but I can’t stop thinking.",
        category: "D",
      },
      { id: "B", text: "Very tired and not feeling well.", category: "L" },
      { id: "C", text: "Still full of energy.", category: "W" },
      { id: "D", text: "Tired, but I can relax and sleep.", category: "B" },
    ],
  },
  {
    id: 20,
    text: "When do you think most clearly for big decisions?",
    options: [
      { id: "A", text: "During the day.", category: "B" },
      { id: "B", text: "Late at night.", category: "W" },
      { id: "C", text: "Rarely feels clear.", category: "D" },
      { id: "D", text: "In the morning.", category: "L" },
    ],
  },
  {
    id: 21,
    text: "How do you feel about routine?",
    options: [
      { id: "A", text: "I like a strict routine.", category: "L" },
      { id: "B", text: "I follow a flexible routine.", category: "B" },
      { id: "C", text: "I try, but I don’t stick to it.", category: "D" },
      {
        id: "D",
        text: "I don’t like routines, I go with the flow.",
        category: "W",
      },
    ],
  },
  {
    id: 22,
    text: "How would friends describe your energy?",
    options: [
      { id: "A", text: "Active at night.", category: "W" },
      { id: "B", text: "Restless and unpredictable.", category: "D" },
      { id: "C", text: "Steady and consistent.", category: "B" },
      { id: "D", text: "Active in the morning.", category: "L" },
    ],
  },
  {
    id: 23,
    text: "How do you feel about the snooze button?",
    options: [
      { id: "A", text: "I’m already awake before the alarm.", category: "D" },
      { id: "B", text: "I keep hitting it again and again.", category: "W" },
      { id: "C", text: "I never use it, I get up right away.", category: "L" },
      { id: "D", text: "I use it once or twice, then get up.", category: "B" },
    ],
  },
  {
    id: 24,
    text: "When do you feel most relaxed?",
    options: [
      { id: "A", text: "Late afternoon.", category: "B" },
      { id: "B", text: "Early evening after finishing my day.", category: "L" },
      { id: "C", text: "In short moments when I am alone.", category: "D" },
      { id: "D", text: "Very late at night when it is quiet.", category: "W" },
    ],
  },
];

// Helper to map codes back to full names for UI rendering
export const chronotypeNames: Record<ChronotypeCode, string> = {
  L: "Lion",
  B: "Bear",
  W: "Wolf",
  D: "Dolphin",
};

/**
 * Calculates the dominant sleep chronotype based on an array of user answers.
 * @param answers - An array of ChronotypeCode values ('L', 'B', 'W', 'D')
 * @returns An object containing the dominant chronotype code, full name, and the score breakdown.
 */
export function calculateChronotype(answers: ChronotypeCode[]): {
  resultCode: ChronotypeCode;
  resultName: string;
  breakdown: Record<ChronotypeCode, number>;
} {
  const breakdown: Record<ChronotypeCode, number> = {
    L: 0,
    B: 0,
    W: 0,
    D: 0,
  };

  // Count the occurrences of each category
  answers.forEach((answer) => {
    if (breakdown.hasOwnProperty(answer)) {
      breakdown[answer]++;
    }
  });

  // Find the chronotype with the highest score
  let dominantType: ChronotypeCode = "B"; // Default fallback
  let maxScore = -1;

  for (const [type, score] of Object.entries(breakdown)) {
    if (score > maxScore) {
      maxScore = score;
      dominantType = type as ChronotypeCode;
    }
  }

  return {
    resultCode: dominantType,
    resultName: chronotypeNames[dominantType],
    breakdown,
  };
}

export type { ChronotypeProfile } from "./SleepChonotype-data";
export { chronotypeProfiles } from "./SleepChonotype-data";
