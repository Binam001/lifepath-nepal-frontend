export type GrowthContentType =
  | "advice"
  | "purpose"
  | "reminder"
  | "solution"
  | "positivity"
  | "value of the day";

export type GrowthDataItem = {
  id: string;
  type: GrowthContentType;
  title: string;
  content: string;
  author: string;
  image: string;
  date: string;
};

export const growthData: GrowthDataItem[] = [
  {
    id: "1",
    type: "advice",
    title: "Embrace the Unknown",
    content: "Growth happens at the edge of your comfort zone. Today, try one thing that scares you slightly.",
    author: "Lifepath Team",
    image: "/Growth/Image1.jpeg",
    date: "2026-03-21"
  },
  {
    id: "2",
    type: "value of the day",
    title: "Persistence",
    content: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius",
    image: "/Growth/Image2.jpeg",
    date: "2026-03-21"
  },
  {
    id: "3",
    type: "solution",
    title: "The 2-Minute Rule",
    content: "If a task takes less than two minutes, do it now. This prevents small tasks from piling up and causing stress.",
    author: "David Allen",
    image: "/Growth/Quotes_01.png",
    date: "2026-03-21"
  },
  {
    id: "4",
    type: "advice",
    title: "Mindful Breathing",
    content: "Take five deep breaths whenever you feel overwhelmed. It anchors you in the present moment.",
    author: "Lifepath Team",
    image: "/Growth/Quotes_02-01.png",
    date: "2026-03-22"
  },
  {
    id: "5",
    type: "value of the day",
    title: "Self-Belief",
    content: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
    image: "/Growth/Image1.jpeg",
    date: "2026-03-22"
  },
  {
    id: "6",
    type: "solution",
    title: "Digital Detox",
    content: "Turn off all notifications for 1 hour before sleep. This improves sleep quality and mental clarity.",
    author: "Lifepath Team",
    image: "/Growth/Image2.jpeg",
    date: "2026-03-22"
  },
  {
    id: "7",
    type: "advice",
    title: "Gratitude Journaling",
    content: "Write down three things you are grateful for every evening. It shifts your focus to the positive aspects of life.",
    author: "Lifepath Team",
    image: "/Growth/Quotes_01.png",
    date: "2026-03-23"
  },
  {
    id: "8",
    type: "value of the day",
    title: "Kindness",
    content: "No act of kindness, no matter how small, is ever wasted.",
    author: "Aesop",
    image: "/Growth/Quotes_02-01.png",
    date: "2026-03-23"
  },
  {
    id: "9",
    type: "solution",
    title: "The Pomodoro Technique",
    content: "Work for 25 minutes, then take a 5-minute break. This increases focus and prevents burnout.",
    author: "Francesco Cirillo",
    image: "/Growth/Image1.jpeg",
    date: "2026-03-23"
  },
  {
    id: "10",
    type: "advice",
    title: "Prioritize Sleep",
    content: "Quality sleep is the foundation of high performance. Aim for 7-8 hours to recharge your brain and body for the day ahead.",
    author: "Lifepath Team",
    image: "/Growth/Image2.jpeg",
    date: "2026-03-24"
  },
  {
    id: "11",
    type: "value of the day",
    title: "Consistency",
    content: "Success is the sum of small efforts, repeated day in and day out.",
    author: "Robert Collier",
    image: "/Growth/Quotes_01.png",
    date: "2026-03-24"
  },
  {
    id: "12",
    type: "solution",
    title: "The 80/20 Rule",
    content: "Identify the 20% of your tasks that produce 80% of your results. Focus your energy there to maximize productivity.",
    author: "Vilfredo Pareto",
    image: "/Growth/Quotes_02-01.png",
    date: "2026-03-24"
  },
  {
    id: "13",
    type: "purpose",
    title: "Serve Something Bigger",
    content: "Anchor your day to one reason beyond comfort or approval. Purpose gets clearer when your actions help someone else.",
    author: "Lifepath Team",
    image: "/Growth/Image1.jpeg",
    date: "2026-03-21"
  },
  {
    id: "14",
    type: "reminder",
    title: "One Skill, Repeated Daily",
    content: "Small repetition compounds faster than occasional intensity. Pick one skill and give it focused time every day this week.",
    author: "Lifepath Team",
    image: "/Growth/Image2.jpeg",
    date: "2026-03-21"
  },
  {
    id: "15",
    type: "positivity",
    title: "Protect Your Inner Tone",
    content: "The way you speak to yourself becomes the weather of your day. Replace one harsh thought with one useful thought.",
    author: "Lifepath Team",
    image: "/Growth/Quotes_01.png",
    date: "2026-03-21"
  },
  {
    id: "16",
    type: "purpose",
    title: "Meaning Before Momentum",
    content: "Before chasing speed, decide what is worth moving toward. A meaningful direction saves years of distracted effort.",
    author: "Lifepath Team",
    image: "/Growth/Quotes_Purpose-03.jpg",
    date: "2026-03-27"
  },
  {
    id: "17",
    type: "reminder",
    title: "Feedback Is Fuel",
    content: "Growth gets faster when you stop treating correction like rejection. Ask for one honest note and use it immediately.",
    author: "Lifepath Team",
    image: "/Growth/Quotes_Reminder-01.jpg",
    date: "2026-03-27"
  },
  {
    id: "18",
    type: "positivity",
    title: "Notice What Is Working",
    content: "Optimism gets stronger when it is specific. Name one thing that went right today and why it mattered.",
    author: "Lifepath Team",
    image: "/Growth/Quotes_Positivity-05.jpg",
    date: "2026-03-27"
  },
  {
    id: "19",
    type: "purpose",
    title: "Align Effort With Identity",
    content: "Ask not only what you want to achieve, but who you are becoming through the process. Purpose deepens when identity and effort match.",
    author: "Lifepath Team",
    image: "/Growth/Quotes_01.png",
    date: "2026-03-23"
  },
  {
    id: "20",
    type: "reminder",
    title: "Stretch Without Breaking",
    content: "Real growth is demanding, not destructive. Choose a challenge that expands your capacity without exhausting your discipline.",
    author: "Lifepath Team",
    image: "/Growth/Quotes_02-01.png",
    date: "2026-03-23"
  },
  {
    id: "21",
    type: "positivity",
    title: "Carry Calm Into Chaos",
    content: "Positivity is not denial. It is the decision to remain constructive even when the situation is messy.",
    author: "Lifepath Team",
    image: "/Growth/Image1.jpeg",
    date: "2026-03-23"
  },
  {
    id: "22",
    type: "purpose",
    title: "Let Values Choose the Task",
    content: "When the day feels crowded, choose the action that reflects your deepest value. That is how purpose becomes visible.",
    author: "Lifepath Team",
    image: "/Growth/Quotes_Purpose-03.jpg",
    date: "2026-03-26"
  },
  {
    id: "23",
    type: "reminder",
    title: "Build the Next Version Quietly",
    content: "You do not need public proof for private progress. Consistent unseen work often creates the biggest leap.",
    author: "Lifepath Team",
    image: "/Growth/Quotes_Reminder-01.jpg",
    date: "2026-03-26"
  },
  {
    id: "24",
    type: "positivity",
    title: "Choose Hope With Evidence",
    content: "Look at the effort you are already making. That is evidence that change is still possible, and that is enough for today.",
    author: "Lifepath Team",
    image: "/Growth/Quotes_Positivity-05.jpg",
    date: "2026-03-26"
  },
  {
    id: "25",
    type: "advice",
    title: "Stay Close to What Matters",
    content: "Take advice that pushes you toward clarity, not noise. The right next step is usually smaller and more honest than the dramatic one.",
    author: "Lifepath Team",
    image: "/Growth/Quotes_Advice-02.jpg",
    date: "2026-03-27"
  },
  {
    id: "26",
    type: "solution",
    title: "Solve the Next Bottleneck",
    content: "Do not try to fix your entire life in one day. Find the one friction point slowing you down most and solve that first.",
    author: "Lifepath Team",
    image: "/Growth/Quotes_Solution-04.jpg",
    date: "2026-03-27"
  },
  {
    id: "27",
    type: "value of the day",
    title: "Integrity",
    content: "Your values become visible in repeated choices. Keep one promise to yourself today, especially when no one else is watching.",
    author: "Lifepath Team",
    image: "/Growth/Quotes_Value-06.jpg",
    date: "2026-03-27"
  }
];
