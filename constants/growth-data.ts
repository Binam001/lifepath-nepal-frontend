export type GrowthDataItem = {
  id: string;
  type: "advice" | "quote" | "solution";
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
    type: "quote",
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
    type: "quote",
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
    type: "quote",
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
    type: "quote",
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
  }
];
