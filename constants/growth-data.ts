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
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop",
    date: "2026-03-21"
  },
  {
    id: "2",
    type: "quote",
    title: "Persistence",
    content: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius",
    image: "https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=1964&auto=format&fit=crop",
    date: "2026-03-21"
  },
  {
    id: "3",
    type: "solution",
    title: "The 2-Minute Rule",
    content: "If a task takes less than two minutes, do it now. This prevents small tasks from piling up and causing stress.",
    author: "David Allen",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=2072&auto=format&fit=crop",
    date: "2026-03-21"
  },
  {
    id: "4",
    type: "advice",
    title: "Mindful Breathing",
    content: "Take five deep breaths whenever you feel overwhelmed. It anchors you in the present moment.",
    author: "Lifepath Team",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1999&auto=format&fit=crop",
    date: "2026-03-22"
  },
  {
    id: "5",
    type: "quote",
    title: "Self-Belief",
    content: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
    image: "https://images.unsplash.com/photo-1494173853739-c21f58b16055?q=80&w=1965&auto=format&fit=crop",
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
    image: "/Growth/Quotes_02-01.png",
    date: "2026-03-23"
  },
  {
    id: "8",
    type: "quote",
    title: "Kindness",
    content: "No act of kindness, no matter how small, is ever wasted.",
    author: "Aesop",
    image: "/Growth/Image2.jpeg",
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
  }
];
