import { ChronotypeCode } from "./SleepChonotype-test";

export interface ChronotypeProfile {
  name: string;
  tagline: string;
  summary: string;
  description: string;
  population: string;
  characteristics: string;
  traits: string;
  peakProductivity: string;
  challenge: string;
  idealSleepSchedule: string;
  strengths: string[];
  dailyRhythm: {
    wake: string;
    peakEnergy: string;
    windDown: string;
    bedtime: string;
  };
  careers: string[];
  color: string;
  bgColor: string;
  borderColor: string;
  badgeColor: string;
}

export const chronotypeProfiles: Record<ChronotypeCode, ChronotypeProfile> = {
  L: {
    name: "Lion",
    tagline: "Early Risers & Goal-Oriented Leaders",
    summary:
      "Lions are natural early risers with immense morning energy. You wake up early easily, hit your peak productivity before noon, and like structured routines.",
    description:
      "Lions make up about 15% to 20% of the population. You are typically driven, organized, and proactive. You wake up naturally early and filled with energy, allowing you to tackle your most demanding intellectual work at the very start of the day. However, you tend to tire out in the late afternoon and early evening, making you less active during social night events. In teams, you are a natural planner and executor who prefers structure and clear objectives.",
    population: "15–20% of the population",
    characteristics:
      "Lions are the ultimate morning people. They wake up before dawn with plenty of energy and are ready to tackle the day immediately.",
    traits:
      "Lions are typically highly motivated, natural leaders, type-A personalities, and highly analytical. They are goal-oriented, practical, and highly organized.",
    peakProductivity:
      "Early morning to noon. They should tackle their most difficult, analytical, or demanding tasks first thing in the day.",
    challenge:
      "Because they burn so much energy in the morning, Lions usually hit a steep wall in the late afternoon. Evening social events can be exhausting for them, and they usually need to be asleep by 9:00 PM or 10:00 PM to function well the next day.",
    idealSleepSchedule: "10:00 PM to 6:00 AM",
    strengths: [
      "High morning focus and productivity",
      "Goal-driven, structured, and organized",
      "Strong leadership and execution capabilities",
      "Consistent sleep-wake schedules",
    ],
    dailyRhythm: {
      wake: "5:30 AM - 6:00 AM",
      peakEnergy: "8:00 AM - 12:00 PM",
      windDown: "9:00 PM - 10:00 PM",
      bedtime: "10:00 PM",
    },
    careers: [
      "Chief Executive Officer (CEO)",
      "Project Manager",
      "Finance Manager",
      "Entrepreneur",
      "Coordinator",
    ],
    color: "text-amber-700",
    bgColor: "bg-amber-50/50",
    borderColor: "border-amber-200",
    badgeColor: "bg-amber-100 text-amber-800",
  },
  B: {
    name: "Bear",
    tagline: "Sun-Synchronized Steady Achievers",
    summary:
      "Bears cycle naturally with the sun. You have a steady mid-day focus, align well with normal working hours, and are highly cooperative team players.",
    description:
      "Bears are the most common chronotype, accounting for roughly 55% of the population. Your biological clock is perfectly synchronized with the cycle of the sun. You have a steady ramp-up in the morning, a peak of productivity in the late morning and early afternoon, and a natural drop in energy around 2:00 PM (the afternoon dip). You sleep deeply at night and value a standard 8-hour rest. Bears are warm, approachable, and excel at collaborative, team-based work during regular daylight hours.",
    population: "50–55% of the population",
    characteristics:
      "Bears are the most common chronotype, meaning traditional society (the 9-to-5 workday) is largely built around their biological rhythm. Their sleep-wake cycle perfectly follows the sun.",
    traits:
      "Bears are generally extroverted, easygoing, open-minded, and good team players. They prioritize happiness and comfort and try to avoid conflict.",
    peakProductivity:
      "Mid-morning to early afternoon (around 10:00 AM to 2:00 PM).",
    challenge:
      "Bears easily experience a mid-afternoon drop in energy between 2:00 PM and 4:00 PM. They often really want a nap, sugar, or caffeine during this time. They also usually need a full 8 hours of sleep, and if they miss it, they feel very tired and slow.",
    idealSleepSchedule: "11:00 PM to 7:00 AM",
    strengths: [
      "Perfect fit for standard 9 to 5 working hours",
      "Reliable, steady, and consistent output",
      "Highly collaborative and friendly team player",
      "Balanced and healthy sleep cycle overall",
    ],
    dailyRhythm: {
      wake: "7:00 AM - 7:30 AM",
      peakEnergy: "10:00 AM - 2:00 PM",
      windDown: "10:00 PM - 11:00 PM",
      bedtime: "11:00 PM",
    },
    careers: [
      "Sales Manager",
      "Marketing Executive",
      "HR Coordinator",
      "Public Relations Specialist",
      "Teacher",
    ],
    color: "text-blue-700",
    bgColor: "bg-blue-50/50",
    borderColor: "border-blue-200",
    badgeColor: "bg-blue-100 text-blue-800",
  },
  W: {
    name: "Wolf",
    tagline: "Late Night Creative Visionaries",
    summary:
      "Wolves are evening-oriented night owls. You find it hard to wake up early, find your peak creative energy in the evening, and prefer flexible, unstructured routines.",
    description:
      "Wolves make up about 15% to 20% of the population. You are a classic 'night owl' who struggles to wake up before 9:00 AM and does not feel fully awake until mid afternoon. Your energy peaks twice: once around noon and again late in the evening (often past 8:00 PM). This late night surge makes you highly creative, imaginative, and reflective. You prefer unstructured environments that allow you to follow inspiration, and you work best during quiet night hours when others are asleep.",
    population: "15–20% of the population",
    characteristics:
      "Wolves are the classic night owls. They have a delayed biological clock and struggle immensely to wake up early. For a Wolf, mornings mean a slow start and a foggy mind.",
    traits:
      "Wolves are highly creative, impulsive, emotionally intense, and often introverted. They are out-of-the-box thinkers who tend to seek new experiences.",
    peakProductivity:
      "Late afternoon into the late evening. While everyone else is winding down, a Wolf’s brain is just sparking with creative ideas.",
    challenge:
      "Traditional work and school schedules are brutal for Wolves. Forcing themselves to be alert at 8:00 AM goes against their biology, leading to chronic sleep deprivation and relying heavily on morning caffeine.",
    idealSleepSchedule: "12:00 AM (Midnight) to 7:30 AM or 8:00 AM",
    strengths: [
      "Exceptional creativity and out-of-the-box thinking",
      "Peak productivity when others are winding down",
      "Highly independent and self-driven",
      "Adaptable and spontaneous mindset",
    ],
    dailyRhythm: {
      wake: "8:30 AM - 9:00 AM",
      peakEnergy: "1:00 PM - 5:00 PM",
      windDown: "11:00 PM - 12:00 AM",
      bedtime: "12:00 AM - 1:00 AM",
    },
    careers: [
      "Creative Designer",
      "Content Writer",
      "Software Developer",
      "Artist/Illustrator",
      "Freelance Consultant",
    ],
    color: "text-purple-700",
    bgColor: "bg-purple-50/50",
    borderColor: "border-purple-200",
    badgeColor: "bg-purple-100 text-purple-850",
  },
  D: {
    name: "Dolphin",
    tagline: "Light Sleepers & Analytical Problem Solvers",
    summary:
      "Dolphins are light, sensitive sleepers. You have active minds, work in short energetic bursts, and are highly intelligent, detail-oriented thinkers.",
    description:
      "Dolphins make up about 10% of the population. Characterized by a highly active brain, dolphins are extremely light, sensitive sleepers who frequently wake up during the night and struggle to fall asleep due to racing thoughts. You do not have a single large energy block instead, your focus comes in intense, highly analytical bursts throughout the day. You are detail-oriented, highly intelligent, and perfectionistic. You thrive in quiet, deep focus environments where you can analyze complex problems.",
    population: "10% of the population",
    characteristics:
      "Real dolphins sleep with only half their brain at a time to stay alert for predators. Human Dolphins mimic this by being incredibly light sleepers who wake up at the slightest noise or change in temperature.",
    traits:
      "Dolphins are highly intelligent, neurotic, detail-oriented perfectionists. They often suffer from anxiety, overthinking, and insomnia.",
    peakProductivity:
      'Mid morning to early afternoon. Dolphins have erratic energy levels, but they usually hit a solid stride for "deep work" between 10:00 AM and 12:00 PM.',
    challenge:
      "Dolphins rarely get a full, uninterrupted night of sleep. They often wake up feeling unrefreshed and spend the night ruminating over the day's events or tomorrow's to-do list.",
    idealSleepSchedule: "11:30 PM to 6:30 AM",
    strengths: [
      "High attention to detail and precision",
      "Highly analytical and quick thinking mind",
      "Deep focus capabilities during quiet periods",
      "Strong problem solving and troubleshooting skills",
    ],
    dailyRhythm: {
      wake: "6:30 AM - 7:00 AM",
      peakEnergy: "10:00 AM - 2:00 PM",
      windDown: "10:30 PM - 11:30 PM",
      bedtime: "11:30 PM - 12:00 AM",
    },
    careers: [
      "Research Analyst",
      "Data Scientist",
      "Quality Assurance Engineer",
      "Editor",
      "System Administrator",
    ],
    color: "text-teal-700",
    bgColor: "bg-teal-50/50",
    borderColor: "border-teal-200",
    badgeColor: "bg-teal-100 text-teal-850",
  },
};
