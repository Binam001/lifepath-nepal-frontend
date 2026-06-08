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
  BookMarked,
  Layers,
} from "lucide-react";
import Link from "next/link";
import { getPersonalityType } from "../../data/MBTI-data";

import { mbtiQuestions } from "@/data/MBTI-test";

export default function MBTITest() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [result, setResult] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [isInitialized, setIsInitialized] = useState(false);

  const scale = [
    { value: 1, label: "100%" },
    { value: 2, label: "75%" },
    { value: 3, label: "50%" },
    { value: 4, label: "75%" },
    { value: 5, label: "100%" },
  ];

  useEffect(() => {
    const savedAnswers = localStorage.getItem("mbti_answers");
    const savedQuestion = localStorage.getItem("mbti_current_question");
    const savedResult = localStorage.getItem("mbti_result");
    const savedShowResult = localStorage.getItem("mbti_show_result");

    if (savedAnswers) {
      try {
        setAnswers(JSON.parse(savedAnswers));
      } catch (e) {
        console.error("Failed to parse saved MBTI answers:", e);
      }
    }
    if (savedQuestion) {
      const qIndex = parseInt(savedQuestion, 10);
      if (!isNaN(qIndex) && qIndex >= 0 && qIndex < mbtiQuestions.length) {
        setCurrentQuestion(qIndex);
      }
    }
    if (savedResult) {
      setResult(savedResult);
    }
    if (savedShowResult === "true") {
      setShowResult(true);
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    updateWindowSize();
    window.addEventListener("resize", updateWindowSize);
    return () => window.removeEventListener("resize", updateWindowSize);
  }, []);

  useEffect(() => {
    if (!showConfetti) return;
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, [showConfetti]);

  const handleAnswer = (value: number) => {
    const updatedAnswers = { ...answers, [mbtiQuestions[currentQuestion].id]: value };
    setAnswers(updatedAnswers);
    localStorage.setItem("mbti_answers", JSON.stringify(updatedAnswers));
  };

  const handleNext = () => {
    if (currentQuestion < mbtiQuestions.length - 1) {
      const nextQuestion = currentQuestion + 1;
      setCurrentQuestion(nextQuestion);
      localStorage.setItem("mbti_current_question", nextQuestion.toString());
    } else {
      calculateResult();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      const prevQuestion = currentQuestion - 1;
      setCurrentQuestion(prevQuestion);
      localStorage.setItem("mbti_current_question", prevQuestion.toString());
    }
  };

  const calculateResult = () => {
    const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    mbtiQuestions.forEach((q) => {
      const answer = answers[q.id];
      if (answer !== undefined) {
        const [firstType, secondType] = q.dimension.split("");
        if (answer === 1) {
          scores[firstType as keyof typeof scores] += 2;
        } else if (answer === 2) {
          scores[firstType as keyof typeof scores] += 1;
        } else if (answer === 4) {
          scores[secondType as keyof typeof scores] += 1;
        } else if (answer === 5) {
          scores[secondType as keyof typeof scores] += 2;
        }
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
    localStorage.setItem("mbti_result", type);
    localStorage.setItem("mbti_show_result", "true");
  };

  const progress = ((currentQuestion + 1) / mbtiQuestions.length) * 100;
  const isAnswered = answers[mbtiQuestions[currentQuestion]?.id] !== undefined;
  const currentAnswer = answers[mbtiQuestions[currentQuestion]?.id];

  const handleRetake = () => {
    setShowConfetti(false);
    setShowResult(false);
    setCurrentQuestion(0);
    setAnswers({});
    setResult(null);
    localStorage.removeItem("mbti_answers");
    localStorage.removeItem("mbti_current_question");
    localStorage.removeItem("mbti_result");
    localStorage.removeItem("mbti_show_result");
  };

  if (!isInitialized) {
    return (
      <div className="min-h-screen pt-16 bg-zinc-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 bg-white p-8 rounded-2xl border border-zinc-200 shadow-md">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-zinc-700 font-semibold text-lg animate-pulse">Loading your test progress...</p>
        </div>
      </div>
    );
  }

  if (showResult && result) {
    const personality = getPersonalityType(result);
    if (!personality) return null;

    return (
      <div className="min-h-screen pt-16 pb-12 bg-zinc-50">
        {showConfetti && (
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            recycle={false}
            numberOfPieces={500}
            gravity={0.3}
          />
        )}

        <section
          className="bg-white border-b"
          style={{
            backgroundImage: "url(/404/404.png)",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
          }}
        >
          <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={handleRetake}
                className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-sm font-medium rounded-lg transition-all cursor-pointer flex items-center gap-2"
              >
                <ArrowLeft size={16} />
                Retake Test
              </button>
            </div>

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
                  <div className="px-4 py-1.5 bg-blue-600 text-white text-lg sm:text-xl font-bold rounded-lg animate-bounce">
                    {result}
                  </div>
                </div>
                <p className="text-lg text-zinc-50 sm:text-zinc-700 leading-relaxed font-medium">
                  {personality.tagline}
                </p>
              </div>
            </div>

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

        <article className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <section className="bg-white rounded-xl p-6 md:p-8 mb-6 border border-zinc-200 shadow-xs">
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

          <section className="bg-white rounded-xl p-6 md:p-8 mb-6 border border-zinc-200 shadow-xs">
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

          <section className="bg-white rounded-xl p-6 md:p-8 mb-6 border border-zinc-200 shadow-xs">
            <h2 className="text-2xl font-bold text-zinc-900 mb-4">
              How You Work Best
            </h2>
            <p className="text-base text-zinc-700 leading-relaxed">
              {personality.workStyle}
            </p>
          </section>

          <section className="bg-white rounded-xl p-6 md:p-8 mb-6 border border-zinc-200 shadow-xs">
            <h2 className="text-2xl font-bold text-zinc-900 mb-4">
              Recommended Careers For You
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {personality.careers.map((career, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-3 bg-zinc-50 rounded-lg border border-zinc-200 hover:border-blue-300 transition-all"
                >
                  <CheckCircle size={16} className="text-blue-600 shrink-0" />
                  <span className="text-sm font-medium text-zinc-800">
                    {career}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <div className="bg-zinc-50 rounded-xl p-6 border border-zinc-200 mb-8">
            <h2 className="text-lg font-bold text-zinc-900 mb-4">
              Your 8 Cognitive Functions
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white rounded-lg p-3 text-center border border-zinc-200">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Eye size={18} className="text-blue-600" />
                </div>
                <h3 className="font-semibold text-sm text-zinc-900">Se</h3>
                <p className="text-xs text-zinc-600">Experience</p>
              </div>
              <div className="bg-white rounded-lg p-3 text-center border border-zinc-200">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Leaf size={18} className="text-blue-600" />
                </div>
                <h3 className="font-semibold text-sm text-zinc-900">Ne</h3>
                <p className="text-xs text-zinc-600">Possibilities</p>
              </div>
              <div className="bg-white rounded-lg p-3 text-center border border-zinc-200">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-2">
                  <ListChecks size={18} className="text-blue-600" />
                </div>
                <h3 className="font-semibold text-sm text-zinc-900">Te</h3>
                <p className="text-xs text-zinc-600">Order</p>
              </div>
              <div className="bg-white rounded-lg p-3 text-center border border-zinc-200">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Handshake size={18} className="text-blue-600" />
                </div>
                <h3 className="font-semibold text-sm text-zinc-900">Fe</h3>
                <p className="text-xs text-zinc-600">Harmony</p>
              </div>
              <div className="bg-white rounded-lg p-3 text-center border border-zinc-200">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-2">
                  <BookOpen size={18} className="text-blue-600" />
                </div>
                <h3 className="font-semibold text-sm text-zinc-900">Si</h3>
                <p className="text-xs text-zinc-600">Memory</p>
              </div>
              <div className="bg-white rounded-lg p-3 text-center border border-zinc-200">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Lightbulb size={18} className="text-blue-600" />
                </div>
                <h3 className="font-semibold text-sm text-zinc-900">Ni</h3>
                <p className="text-xs text-zinc-600">Insight</p>
              </div>
              <div className="bg-white rounded-lg p-3 text-center border border-zinc-200">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Zap size={18} className="text-blue-600" />
                </div>
                <h3 className="font-semibold text-sm text-zinc-900">Ti</h3>
                <p className="text-xs text-zinc-600">Logic</p>
              </div>
              <div className="bg-white rounded-lg p-3 text-center border border-zinc-200">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Heart size={18} className="text-blue-600" />
                </div>
                <h3 className="font-semibold text-sm text-zinc-900">Fi</h3>
                <p className="text-xs text-zinc-600">Values</p>
              </div>
            </div>
          </div>

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

          <div className="inline-flex items-center justify-center w-full pb-2">
            <Link
              href="/mbti-book"
              className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black text-md font-bold rounded-full transition-all shadow-lg hover:shadow-xl cursor-pointer"
            >
              Learn about MBTI
            </Link>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-zinc-100 overflow-hidden flex flex-col justify-between">
      <div>
        <section className="bg-gradient-to-l from-blue-600 to-black text-white">
          <div className="max-w-6xl mx-auto py-8 md:py-12 px-4 relative">
            <div className="text-center max-w-3xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-xs">
                  <Brain size={32} className="text-white animate-pulse" />
                </div>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 tracking-tight">
                MBTI Personality Assessment
              </h1>
              <p className="text-base md:text-lg text-zinc-200 mb-4 font-light">
                Discover your cognitive functions and how you interact with the
                world
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-white/95 font-medium">
                <span className="flex items-center gap-2">
                  <CheckCircle size={16} />
                  100% Free
                </span>
                <span className="text-white/40">•</span>
                <span className="flex items-center gap-2">
                  <Clock size={16} />7 Minutes
                </span>
                <span className="text-white/40">•</span>
                <span>Instant Results</span>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
          <div className="mb-8 max-w-2xl mx-auto w-full">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-semibold text-zinc-700">
                Question {currentQuestion + 1} of {mbtiQuestions.length}
              </span>
              <span className="text-sm font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full bg-zinc-200 rounded-full h-2.5 shadow-inner">
              <div
                className="bg-gradient-to-r from-blue-600 to-blue-700 h-2.5 rounded-full transition-all duration-500 shadow-sm shadow-blue-600/30"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 md:p-8 border border-zinc-200 shadow-md">
            <h2 className="text-lg md:text-2xl font-semibold text-zinc-900 text-center leading-relaxed mb-8 min-h-[64px]">
              {mbtiQuestions[currentQuestion].question}
            </h2>

            <div className="mb-6 grid gap-4 md:grid-cols-[1fr_auto_1fr] items-center">
              <div className="rounded-lg border border-blue-200 bg-blue-50/50 p-4 min-h-[100px] flex flex-col justify-center">
                <p className="text-xs font-semibold text-blue-600 mb-1 uppercase tracking-wider">
                  Option A
                </p>
                <p className="text-sm md:text-base font-semibold text-zinc-900 leading-snug">
                  {mbtiQuestions[currentQuestion].optionA}
                </p>
              </div>

              <div className="space-y-3 py-4">
                <div className="flex items-center justify-center gap-8 text-[10px] sm:text-xs font-bold text-zinc-500 px-2 uppercase tracking-wider">
                  <span>Strong A</span>
                  <span>Mid A</span>
                  <span className="text-zinc-400">Neutral</span>
                  <span>Mid B</span>
                  <span>Strong B</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  {scale.map(({ value, label }) => (
                    <button
                      key={value}
                      onClick={() => handleAnswer(value)}
                      className={`flex h-12 w-14 items-center justify-center rounded-lg border-2 text-xs font-bold transition-all duration-200 cursor-pointer ${
                        currentAnswer === value
                          ? value === 1
                            ? "border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-600/20"
                            : value === 2
                              ? "border-blue-500 bg-blue-500 text-white shadow-md shadow-blue-500/20"
                              : value === 3
                                ? "border-zinc-500 bg-zinc-500 text-white shadow-md shadow-zinc-500/20"
                                : value === 4
                                  ? "border-amber-500 bg-amber-500 text-white shadow-md shadow-amber-500/20"
                                  : "border-amber-600 bg-amber-600 text-white shadow-md shadow-amber-600/20"
                          : value === 1
                            ? "border-blue-400 bg-blue-50 hover:bg-blue-600 hover:text-white text-zinc-800 hover:border-blue-500"
                            : value === 2
                              ? "border-sky-200 bg-sky-50/50 hover:bg-sky-500 hover:text-white text-zinc-800 hover:border-blue-300"
                              : value === 3
                                ? "border-zinc-200 bg-zinc-50 text-zinc-800 hover:border-zinc-400 hover:bg-zinc-400 hover:text-white"
                                : value === 4
                                  ? "border-amber-100 bg-amber-50/50 text-zinc-800 hover:border-amber-300 hover:bg-amber-300 hover:text-white"
                                  : "border-amber-300 bg-amber-50 text-zinc-800 hover:border-amber-400 hover:bg-amber-400 hover:text-white"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-amber-200 bg-amber-50/30 p-4 min-h-[100px] flex flex-col justify-center">
                <p className="text-xs font-semibold text-amber-600 mb-1 uppercase tracking-wider">
                  Option B
                </p>
                <p className="text-sm md:text-base font-semibold text-zinc-900 leading-snug">
                  {mbtiQuestions[currentQuestion].optionB}
                </p>
              </div>
            </div>

            <div className="p-2 mb-6">
              <p className="text-center text-xs text-zinc-500 leading-relaxed">
                Choose{" "}
                <span className="font-semibold text-blue-600">Option A</span> or{" "}
                <span className="font-semibold text-amber-600">Option B</span>,
                or select{" "}
                <span className="font-semibold text-zinc-500">Neutral</span> if
                neither fits perfectly
              </p>
            </div>

            <div className="flex justify-between items-center border-t border-zinc-100 pt-6">
              <button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  currentQuestion === 0
                    ? "bg-zinc-100 text-zinc-400 cursor-not-allowed"
                    : "bg-white border-2 border-zinc-200 text-zinc-700 hover:bg-zinc-50 hover:border-zinc-300 hover:shadow-xs cursor-pointer"
                }`}
              >
                <ArrowLeft size={18} />
                <span>Previous</span>
              </button>

              <div className="flex items-center gap-2">
                {isAnswered && (
                  <div className="flex items-center gap-1.5 text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-100">
                    <CheckCircle size={14} />
                    <span>Answered</span>
                  </div>
                )}
              </div>

              <button
                onClick={handleNext}
                disabled={!isAnswered}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 hover:shadow-lg cursor-pointer"
              >
                <span>
                  {currentQuestion === mbtiQuestions.length - 1
                    ? "Finish"
                    : "Next"}
                </span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </section>
      </div>

      <div className="flex flex-col items-center justify-center w-full pb-8 bg-zinc-100 border-t border-zinc-200/50 pt-4">
        <Link
          href="/mbti-book"
          className="px-5 py-2 bg-amber-400 hover:bg-amber-500 text-black text-sm font-bold rounded-full transition-all shadow-md inline-flex items-center gap-1.5 hover:scale-105"
        >
          <BookMarked size={16} />
          Learn more about MBTI types
        </Link>
      </div>
    </div>
  );
}
