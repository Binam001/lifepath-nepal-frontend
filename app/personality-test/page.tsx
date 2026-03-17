"use client";

import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import {
  ArrowRight,
  ArrowLeft,
  Brain,
  CheckCircle,
  Clock,
  Eye,
  Leaf,
  ListChecks,
  Handshake,
  BookOpen,
  Lightbulb,
  Zap,
  Heart,
} from "lucide-react";
import Link from "next/link";
import { getPersonalityType } from "./personalityData";
// import NewsletterCTA from "../components/home/NewsletterCTA";

type Question = {
  id: number;
  question: string;
  dimension: "EI" | "SN" | "TF" | "JP";
  optionA: string;
  optionB: string;
};

const questions: Question[] = [
  // Extraversion (E) vs Introversion (I) - 10 questions
  {
    id: 1,
    question: "At parties, I usually:",
    dimension: "EI",
    optionA: "Talk to many different people",
    optionB: "Stay with one or two close friends",
  },
  {
    id: 2,
    question: "After a long day, I feel better when I:",
    dimension: "EI",
    optionA: "Go out with friends",
    optionB: "Spend time alone",
  },
  {
    id: 3,
    question: "In group projects, I:",
    dimension: "EI",
    optionA: "Like to take the lead",
    optionB: "Prefer to work quietly",
  },
  {
    id: 4,
    question: "I work best:",
    dimension: "EI",
    optionA: "With other people around",
    optionB: "By myself",
  },
  {
    id: 5,
    question: "Meeting new people makes me feel:",
    dimension: "EI",
    optionA: "Excited and energized",
    optionB: "Tired and drained",
  },
  {
    id: 6,
    question: "On weekends, I prefer to:",
    dimension: "EI",
    optionA: "Go out and do activities",
    optionB: "Relax at home",
  },
  {
    id: 7,
    question: "When I have a problem, I:",
    dimension: "EI",
    optionA: "Talk it out with others",
    optionB: "Think about it alone first",
  },
  {
    id: 8,
    question: "I feel most comfortable:",
    dimension: "EI",
    optionA: "Being around lots of people",
    optionB: "In quiet, calm places",
  },
  {
    id: 9,
    question: "At school or work, I:",
    dimension: "EI",
    optionA: "Make friends easily",
    optionB: "Keep to myself mostly",
  },
  {
    id: 10,
    question: "I get my energy from:",
    dimension: "EI",
    optionA: "Being social and active",
    optionB: "Having alone time",
  },

  // Sensing (S) vs Intuition (N) - 16 questions
  {
    id: 11,
    question: "I prefer to focus on:",
    dimension: "SN",
    optionA: "What's real and practical",
    optionB: "What's possible and imaginative",
  },
  {
    id: 12,
    question: "When I learn something new, I like:",
    dimension: "SN",
    optionA: "Clear, step-by-step instructions",
    optionB: "Understanding why it works",
  },
  {
    id: 13,
    question: "I pay more attention to:",
    dimension: "SN",
    optionA: "Facts and details",
    optionB: "Ideas and meanings",
  },
  {
    id: 14,
    question: "I trust:",
    dimension: "SN",
    optionA: "What I can see and touch",
    optionB: "My gut feelings",
  },
  {
    id: 15,
    question: "When telling a story, I:",
    dimension: "SN",
    optionA: "Describe exactly what happened",
    optionB: "Focus on the main idea",
  },
  {
    id: 16,
    question: "I'm better at:",
    dimension: "SN",
    optionA: "Following proven methods",
    optionB: "Coming up with new ideas",
  },
  {
    id: 17,
    question: "I prefer tasks that are:",
    dimension: "SN",
    optionA: "Practical and useful",
    optionB: "Creative and original",
  },
  {
    id: 18,
    question: "When reading, I notice:",
    dimension: "SN",
    optionA: "Specific facts and details",
    optionB: "Hidden meanings and themes",
  },
  {
    id: 19,
    question: "I remember things by:",
    dimension: "SN",
    optionA: "Exact details of what happened",
    optionB: "Overall impressions",
  },
  {
    id: 20,
    question: "I like work that involves:",
    dimension: "SN",
    optionA: "Clear procedures",
    optionB: "New possibilities",
  },
  {
    id: 21,
    question: "When planning, I focus on:",
    dimension: "SN",
    optionA: "What needs to be done now",
    optionB: "What could happen later",
  },
  {
    id: 22,
    question: "I'm more interested in:",
    dimension: "SN",
    optionA: "How things work",
    optionB: "Why things exist",
  },
  {
    id: 23,
    question: "I notice more:",
    dimension: "SN",
    optionA: "What's right in front of me",
    optionB: "Patterns and connections",
  },
  {
    id: 24,
    question: "I prefer:",
    dimension: "SN",
    optionA: "Tried and tested ways",
    optionB: "Experimenting with new ways",
  },
  {
    id: 25,
    question: "When solving problems, I use:",
    dimension: "SN",
    optionA: "Past experience",
    optionB: "Imagination",
  },
  {
    id: 26,
    question: "I value:",
    dimension: "SN",
    optionA: "Being realistic",
    optionB: "Being innovative",
  },

  // Thinking (T) vs Feeling (F) - 12 questions
  {
    id: 27,
    question: "When making decisions, I consider:",
    dimension: "TF",
    optionA: "What makes sense logically",
    optionB: "How people will feel",
  },
  {
    id: 28,
    question: "I'm more convinced by:",
    dimension: "TF",
    optionA: "Facts and logic",
    optionB: "Personal stories",
  },
  {
    id: 29,
    question: "When there's a conflict, I:",
    dimension: "TF",
    optionA: "Find the fair solution",
    optionB: "Try to keep everyone happy",
  },
  {
    id: 30,
    question: "It's more important to be:",
    dimension: "TF",
    optionA: "Right",
    optionB: "Kind",
  },
  {
    id: 31,
    question: "When I critique something, I:",
    dimension: "TF",
    optionA: "Point out what's wrong",
    optionB: "Consider people's feelings",
  },
  {
    id: 32,
    question: "I make decisions based on:",
    dimension: "TF",
    optionA: "Pros and cons",
    optionB: "Personal values",
  },
  {
    id: 33,
    question: "In arguments, I focus on:",
    dimension: "TF",
    optionA: "Being correct",
    optionB: "Maintaining harmony",
  },
  {
    id: 34,
    question: "I prefer to be seen as:",
    dimension: "TF",
    optionA: "Competent",
    optionB: "Caring",
  },
  {
    id: 35,
    question: "When someone is upset, I:",
    dimension: "TF",
    optionA: "Try to fix the problem",
    optionB: "Offer comfort and support",
  },
  {
    id: 36,
    question: "I value:",
    dimension: "TF",
    optionA: "Truth and fairness",
    optionB: "Compassion and empathy",
  },
  {
    id: 37,
    question: "I'm better at:",
    dimension: "TF",
    optionA: "Analyzing things objectively",
    optionB: "Understanding people's emotions",
  },
  {
    id: 38,
    question: "When giving feedback, I:",
    dimension: "TF",
    optionA: "Say it directly",
    optionB: "Say it gently",
  },

  // Judging (J) vs Perceiving (P) - 10 questions
  {
    id: 39,
    question: "I prefer to:",
    dimension: "JP",
    optionA: "Plan things in advance",
    optionB: "Be spontaneous",
  },
  {
    id: 40,
    question: "With homework or projects, I:",
    dimension: "JP",
    optionA: "Start early",
    optionB: "Wait until the last minute",
  },
  {
    id: 41,
    question: "I feel better when things are:",
    dimension: "JP",
    optionA: "Organized and decided",
    optionB: "Flexible and open",
  },
  {
    id: 42,
    question: "My room is usually:",
    dimension: "JP",
    optionA: "Clean and organized",
    optionB: "A bit messy",
  },
  {
    id: 43,
    question: "I like to:",
    dimension: "JP",
    optionA: "Make a plan and follow it",
    optionB: "See what happens",
  },
  {
    id: 44,
    question: "When traveling, I prefer:",
    dimension: "JP",
    optionA: "A detailed schedule",
    optionB: "Going with the flow",
  },
  {
    id: 45,
    question: "Deadlines make me:",
    dimension: "JP",
    optionA: "Work ahead to finish early",
    optionB: "Work best under pressure",
  },
  {
    id: 46,
    question: "I feel stressed when:",
    dimension: "JP",
    optionA: "Things are unorganized",
    optionB: "I have too many rules",
  },
  {
    id: 47,
    question: "I prefer:",
    dimension: "JP",
    optionA: "Structure and routine",
    optionB: "Variety and change",
  },
  {
    id: 48,
    question: "I make decisions:",
    dimension: "JP",
    optionA: "Quickly",
    optionB: "After considering all options",
  },
];

export default function PersonalityTestPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [result, setResult] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const scale = [
    { value: 1, label: "100%" },
    { value: 2, label: "75%" },
    { value: 3, label: "50%" },
    { value: 4, label: "75%" },
    { value: 5, label: "100%" },
  ];

  // Get window size for confetti
  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    updateWindowSize();
    window.addEventListener("resize", updateWindowSize);

    return () => window.removeEventListener("resize", updateWindowSize);
  }, []);

  // Stop confetti after a short celebration window.
  useEffect(() => {
    if (!showConfetti) {
      return;
    }

    const timer = setTimeout(() => setShowConfetti(false), 5000);

    return () => clearTimeout(timer);
  }, [showConfetti]);

  const handleAnswer = (value: number) => {
    setAnswers({ ...answers, [questions[currentQuestion].id]: value });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResult = () => {
    const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

    questions.forEach((q) => {
      const answer = answers[q.id];
      if (answer !== undefined) {
        const [firstType, secondType] = q.dimension.split("");
        // Scale: 1 = strongly first option, 2 = somewhat first, 3 = neutral, 4 = somewhat second, 5 = strongly second
        // Convert to points: 1->2pts first, 2->1pt first, 3->0pts both, 4->1pt second, 5->2pts second
        if (answer === 1) {
          scores[firstType as keyof typeof scores] += 2;
        } else if (answer === 2) {
          scores[firstType as keyof typeof scores] += 1;
        } else if (answer === 4) {
          scores[secondType as keyof typeof scores] += 1;
        } else if (answer === 5) {
          scores[secondType as keyof typeof scores] += 2;
        }
        // answer === 3 adds nothing (neutral)
      }
    });

    const type =
      (scores.E > scores.I ? "E" : "I") +
      (scores.S > scores.N ? "S" : "N") +
      (scores.T > scores.F ? "T" : "F") +
      (scores.J > scores.P ? "J" : "P");

    setResult(type);
    setShowConfetti(true);
    setShowResult(true);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const isAnswered = answers[questions[currentQuestion]?.id] !== undefined;
  const currentAnswer = answers[questions[currentQuestion]?.id];

  // Testing function to jump to results
  const jumpToResults = () => {
    setResult("INTJ"); // Set a sample personality type
    setShowConfetti(true);
    setShowResult(true);
  };

  if (showResult && result) {
    const personality = getPersonalityType(result);

    if (!personality) {
      return null;
    }

    // Result Hero Section
    return (
      <div className="min-h-screen pt-16 pb-12 bg-zinc-50">
        {/* Confetti Effect */}
        {showConfetti && (
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            recycle={false}
            numberOfPieces={500}
            gravity={0.3}
          />
        )}

        {/* Result Header - Clean & Simple */}
        <section
          className="bg-white border-b"
          style={{
            backgroundImage: "url(/404/404.png)",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
          }}
        >
          <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
            {/* Back Button */}
            <button
              onClick={() => {
                setShowConfetti(false);
                setShowResult(false);
                setCurrentQuestion(0);
                setAnswers({});
                setResult(null);
              }}
              className="mb-6 px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-sm font-medium rounded-lg transition-all cursor-pointer flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Retake Test
            </button>

            {/* Result Display */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                <CheckCircle
                  size={28}
                  className="text-green-600"
                  strokeWidth={2.5}
                />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl md:text-4xl font-bold text-zinc-100 sm:text-zinc-900">
                    {personality.name}
                  </h1>
                  <div className="px-4 py-1.5 bg-blue-600 text-white text-lg sm:text-xl font-bold rounded-lg">
                    {result}
                  </div>
                </div>
                <p className="text-lg text-zinc-50 leading-relaxed">
                  {personality.tagline}
                </p>
              </div>
            </div>

            {/* Introduction */}
            <div className="bg-white/70 backdrop-blur-2xl rounded-xl p-6 md:p-8 mb-6 border border-zinc-200">
              <p className="text-lg md:text-2xl text-zinc-800 font-semibold mb-4">
                {personality.description}
              </p>
              <p className="text-base md:text-lg text-zinc-700 leading-relaxed">
                {personality.detailedDescription}
              </p>
            </div>
          </div>
        </section>

        {/* Blog Content - Simplified */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          {/* Strengths Section - Clean */}
          <section className="bg-white rounded-xl p-6 md:p-8 mb-6 border border-zinc-200">
            <h2 className="text-2xl font-bold text-zinc-900 mb-4">
              Your Key Strengths
            </h2>
            <div className="space-y-3">
              {personality.strengths.map((strength, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle
                    size={20}
                    className="text-green-600 shrink-0 mt-0.5"
                    strokeWidth={2}
                  />
                  <p className="text-base text-zinc-800 leading-relaxed">
                    {strength}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Growth Areas Section - Clean */}
          <section className="bg-white rounded-xl p-6 md:p-8 mb-6 border border-zinc-200">
            <h2 className="text-2xl font-bold text-zinc-900 mb-4">
              Areas for Growth
            </h2>
            <div className="space-y-3">
              {personality.weaknesses.map((weakness, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                  </div>
                  <p className="text-base text-zinc-800 leading-relaxed">
                    {weakness}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Work Style Section */}
          <section className="bg-white rounded-xl p-6 md:p-8 mb-6 border border-zinc-200">
            <h2 className="text-2xl font-bold text-zinc-900 mb-4">
              How You Work Best
            </h2>
            <p className="text-base text-zinc-700 leading-relaxed">
              {personality.workStyle}
            </p>
          </section>

          {/* Career Section - Clean */}
          <section className="bg-white rounded-xl p-6 md:p-8 mb-6 border border-zinc-200">
            <h2 className="text-2xl font-bold text-zinc-900 mb-4">
              Recommended Careers For You
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {personality.careers.map((career, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-3 bg-zinc-50 rounded-lg border border-zinc-200"
                >
                  <CheckCircle size={16} className="text-blue-600 shrink-0" />
                  <span className="text-sm font-medium text-zinc-800">
                    {career}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Cognitive Functions - Compact */}
          <div className="bg-zinc-50 rounded-xl p-6 border border-zinc-200 mb-8">
            <h2 className="text-lg font-bold text-zinc-900 mb-4">
              Your 8 Cognitive Functions
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* Se - Experience */}
              <div className="bg-white rounded-lg p-3 text-center border border-zinc-200">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Eye size={18} className="text-blue-600" />
                </div>
                <h3 className="font-semibold text-sm text-zinc-900">Se</h3>
                <p className="text-xs text-zinc-600">Experience</p>
              </div>

              {/* Ne - Possibilities */}
              <div className="bg-white rounded-lg p-3 text-center border border-zinc-200">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Leaf size={18} className="text-blue-600" />
                </div>
                <h3 className="font-semibold text-sm text-zinc-900">Ne</h3>
                <p className="text-xs text-zinc-600">Possibilities</p>
              </div>

              {/* Te - Order */}
              <div className="bg-white rounded-lg p-3 text-center border border-zinc-200">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-2">
                  <ListChecks size={18} className="text-blue-600" />
                </div>
                <h3 className="font-semibold text-sm text-zinc-900">Te</h3>
                <p className="text-xs text-zinc-600">Order</p>
              </div>

              {/* Fe - Harmony */}
              <div className="bg-white rounded-lg p-3 text-center border border-zinc-200">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Handshake size={18} className="text-blue-600" />
                </div>
                <h3 className="font-semibold text-sm text-zinc-900">Fe</h3>
                <p className="text-xs text-zinc-600">Harmony</p>
              </div>

              {/* Si - Memory */}
              <div className="bg-white rounded-lg p-3 text-center border border-zinc-200">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-2">
                  <BookOpen size={18} className="text-blue-600" />
                </div>
                <h3 className="font-semibold text-sm text-zinc-900">Si</h3>
                <p className="text-xs text-zinc-600">Memory</p>
              </div>

              {/* Ni - Insight */}
              <div className="bg-white rounded-lg p-3 text-center border border-zinc-200">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Lightbulb size={18} className="text-blue-600" />
                </div>
                <h3 className="font-semibold text-sm text-zinc-900">Ni</h3>
                <p className="text-xs text-zinc-600">Insight</p>
              </div>

              {/* Ti - Logic */}
              <div className="bg-white rounded-lg p-3 text-center border border-zinc-200">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Zap size={18} className="text-blue-600" />
                </div>
                <h3 className="font-semibold text-sm text-zinc-900">Ti</h3>
                <p className="text-xs text-zinc-600">Logic</p>
              </div>

              {/* Fi - Values */}
              <div className="bg-white rounded-lg p-3 text-center border border-zinc-200">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Heart size={18} className="text-blue-600" />
                </div>
                <h3 className="font-semibold text-sm text-zinc-900">Fi</h3>
                <p className="text-xs text-zinc-600">Values</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <section className="bg-blue-600 rounded-xl p-6 md:p-8 text-center text-white mb-6">
            <h2 className="text-xl md:text-2xl font-bold mb-3">
              Ready to Turn Insight into Action?
            </h2>
            <p className="text-base text-blue-50 mb-6">
              Explore courses designed for {personality.name} personalities like
              you.
            </p>
            <Link href="/job-training">
              <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-all cursor-pointer inline-flex items-center gap-2">
                Explore Courses
                <ArrowRight size={18} />
              </button>
            </Link>
          </section>

          {/* More Insights Section */}
          {/* <section className="bg-white rounded-xl p-6 md:p-8 border border-zinc-200">
            <h2 className="text-xl font-bold text-zinc-900 mb-4">
              Explore More Personality Frameworks
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-4 bg-zinc-50 rounded-lg border border-zinc-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Brain size={18} className="text-blue-600" />
                  </div>
                  <h3 className="text-base font-semibold text-zinc-900">
                    OCEAN Analysis
                  </h3>
                </div>
                <p className="text-sm text-zinc-600">
                  Big Five personality traits
                </p>
              </div>

              <div className="p-4 bg-zinc-50 rounded-lg border border-zinc-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <User size={18} className="text-blue-600" />
                  </div>
                  <h3 className="text-base font-semibold text-zinc-900">
                    DISC Profile
                  </h3>
                </div>
                <p className="text-sm text-zinc-600">
                  Communication & behavior insights
                </p>
              </div>

              <div className="p-4 bg-zinc-50 rounded-lg border border-zinc-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <ArrowRight size={18} className="text-blue-600" />
                  </div>
                  <h3 className="text-base font-semibold text-zinc-900">
                    Career Roadmap
                  </h3>
                </div>
                <p className="text-sm text-zinc-600">
                  Detailed career paths & industries
                </p>
              </div>

              <div className="p-4 bg-zinc-50 rounded-lg border border-zinc-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <CheckCircle size={18} className="text-blue-600" />
                  </div>
                  <h3 className="text-base font-semibold text-zinc-900">
                    Relationships
                  </h3>
                </div>
                <p className="text-sm text-zinc-600">
                  Compatibility with other types
                </p>
              </div>
            </div>
          </section> */}
        </article>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen pt-16 bg-zinc-100 overflow-hidden"
      id="personalityTest"
    >
      {/* Questions Hero Section */}
      <section className="bg-linear-to-l from-blue-600 to-black text-white">
        <div className="max-w-6xl mx-auto py-8 md:py-12 px-4 relative">
          {/* Test Toggle Button */}
          <button
            onClick={jumpToResults}
            className="absolute top-4 right-4 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black text-xs font-bold rounded-full transition-all shadow-lg hover:shadow-xl cursor-pointer"
          >
            Jump to Results
          </button>

          <div className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Brain size={32} className="text-white" />
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">
              Discover Your Personality Type
            </h1>
            <p className="text-base md:text-lg text-blue-100 mb-4">
              Take our comprehensive 48-question MBTI assessment
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-white">
              <span className="flex items-center gap-2">
                <CheckCircle size={16} />
                100% Free
              </span>
              <span className="text-blue-400">•</span>
              <span className="flex items-center gap-2">
                <Clock size={16} />7 Minutes
              </span>
              <span className="text-blue-400">•</span>
              <span>Instant Results</span>
            </div>
          </div>
        </div>
      </section>

      {/* Test Section */}
      <section className="max-w-6xl mx-auto h-screen sm:h-[80vh] flex flex-col justify-center px-4 sm:px-6">
        {/* Progress Bar */}
        <div className="mb-6 max-w-2xl mx-auto w-full">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-semibold text-zinc-700">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full bg-zinc-200 rounded-full h-2.5 shadow-inner">
            <div
              className="bg-linear-to-r from-blue-600 to-blue-700 h-2.5 rounded-full transition-all duration-500 shadow-lg shadow-blue-600/30"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-zinc-200">
          <h2 className="text-lg md:text-2xl font-semibold text-zinc-900 text-center leading-relaxed mb-8">
            {questions[currentQuestion].question}
          </h2>

          {/* Options + Scale */}
          <div className="mb-6 grid gap-4 md:grid-cols-[1fr_auto_1fr] items-center">
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
              <p className="text-xs font-semibold text-blue-600 mb-1 uppercase tracking-wide">
                Option A
              </p>
              <p className="text-sm md:text-lg font-medium text-zinc-900">
                {questions[currentQuestion].optionA}
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-center gap-8 text-xs font-medium text-zinc-600 px-2">
                <span>Strong</span>
                <span>Mid</span>
                <span className="text-zinc-500">Neutral</span>
                <span>Mid</span>
                <span>Strong</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                {scale.map(({ value, label }) => (
                  <button
                    key={value}
                    onClick={() => handleAnswer(value)}
                    className={`flex h-12 w-14 items-center justify-center rounded-md border-2 text-sm font-semibold transition-colors cursor-pointer ${
                      currentAnswer === value
                        ? value === 1
                          ? "border-blue-600 bg-blue-600 text-white"
                          : value === 2
                            ? "border-blue-500 bg-blue-500 text-white"
                            : value === 3
                              ? "border-zinc-500 bg-zinc-500 text-white"
                              : value === 4
                                ? "border-yellow-500 bg-yellow-500 text-white"
                                : "border-yellow-600 bg-yellow-600 text-white"
                        : value === 1
                          ? "border-blue-400 bg-blue-50 hover:bg-blue-600 hover:text-white text-zinc-800 hover:border-blue-500"
                          : value === 2
                            ? "border-sky-200 bg-sky-50 hover:bg-sky-500 hover:text-white text-zinc-800 hover:border-blue-300"
                            : value === 3
                              ? "border-zinc-200 bg-zinc-50 text-zinc-800 hover:border-zinc-400 hover:bg-zinc-400 hover:text-white"
                              : value === 4
                                ? "border-yellow-200 bg-yellow-50 text-zinc-800 hover:border-yellow-300 hover:bg-yellow-300 hover:text-white"
                                : "border-yellow-400 bg-yellow-50 text-zinc-800 hover:border-yellow-400 hover:bg-yellow-400 hover:text-white"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
              <p className="text-xs font-semibold text-yellow-600 mb-1 uppercase tracking-wide">
                Option B
              </p>
              <p className="text-sm md:text-lg font-medium text-zinc-900">
                {questions[currentQuestion].optionB}
              </p>
            </div>
          </div>
          {/* Helper Text */}
          <div className="p-2 mb-6">
            <p className="text-center text-zinc-600">
              Choose <span className="font-semibold text-blue-600">A</span> or{" "}
              <span className="font-semibold text-yellow-600">B</span>, or{" "}
              <span className="font-semibold text-zinc-600">Neutral</span> if
              neither fits perfectly
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all ${
                currentQuestion === 0
                  ? "bg-zinc-100 text-zinc-400 cursor-not-allowed"
                  : "bg-white border-2 border-zinc-300 text-zinc-700 hover:bg-zinc-50 hover:border-zinc-400 hover:shadow-md cursor-pointer"
              }`}
            >
              <ArrowLeft size={18} />
              <span className="hidden sm:inline">Previous</span>
            </button>

            <div className="flex items-center gap-2">
              {isAnswered && (
                <div className="flex items-center gap-1 text-sm font-semibold text-green-600">
                  <CheckCircle size={16} />
                  <span className="hidden sm:inline">Answered</span>
                </div>
              )}
            </div>

            <button
              onClick={handleNext}
              disabled={!isAnswered}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all ${
                !isAnswered
                  ? "bg-zinc-200 text-zinc-400 cursor-not-allowed"
                  : "bg-linear-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 cursor-pointer"
              }`}
            >
              <span className="hidden sm:inline">
                {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
              </span>
              <span className="sm:hidden">
                {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
              </span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>
      {/* <NewsletterCTA
        btnText="Join Class Today"
        title="Ready to take the next step in your career?"
        description="Enroll in our job training programs and unlock your potential."
        imageSrc="/heroImages/woman2.png"
      /> */}
    </div>
  );
}
