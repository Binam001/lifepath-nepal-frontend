"use client";

import { useState, useEffect } from "react";
import { CheckCircle, BookMarked, Brain } from "lucide-react";
import Link from "next/link";
import { mbtiQuestions } from "@/data/MBTI-test";
import MBTIResultSection from "./MBTIResultSection";
import ConfirmDeleteModal from "./components/ConfirmDeleteModal";
import SavedResultBanner from "./components/SavedResultBanner";
import TestHeader from "./components/TestHeader";
import TestNavigation from "./components/TestNavigation";

export default function MBTITest() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [result, setResult] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [isInitialized, setIsInitialized] = useState(false);
  const [hasSavedResult, setHasSavedResult] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const scale = [
    { value: 1, label: "100%", sublabel: "Strong A" },
    { value: 2, label: "75%", sublabel: "Mid A" },
    { value: 3, label: "50%", sublabel: "Neutral" },
    { value: 4, label: "75%", sublabel: "Mid B" },
    { value: 5, label: "100%", sublabel: "Strong B" },
  ];

  useEffect(() => {
    const savedAnswers = localStorage.getItem("mbti_answers");
    const savedQuestion = localStorage.getItem("mbti_current_question");
    const savedResult = localStorage.getItem("mbti_result");
    const savedShowResult = localStorage.getItem("mbti_show_result");

    let hasBackup = !!localStorage.getItem("mbti_saved_result");

    if (savedAnswers) {
      try {
        const parsed = JSON.parse(savedAnswers);
        setAnswers(parsed);
        if (!hasBackup && savedShowResult === "true" && savedResult) {
          localStorage.setItem("mbti_saved_answers", savedAnswers);
          localStorage.setItem("mbti_saved_result", savedResult);
          hasBackup = true;
        }
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
    if (hasBackup) {
      setHasSavedResult(true);
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

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [currentQuestion]);

  const handleAnswer = (value: number) => {
    const updatedAnswers = {
      ...answers,
      [mbtiQuestions[currentQuestion].id]: value,
    };
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
    setHasSavedResult(true);
    localStorage.setItem("mbti_result", type);
    localStorage.setItem("mbti_show_result", "true");
    localStorage.setItem("mbti_saved_result", type);
    localStorage.setItem("mbti_saved_answers", JSON.stringify(answers));
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

  const handleRestoreResult = () => {
    const savedAnswers = localStorage.getItem("mbti_saved_answers");
    const savedResult = localStorage.getItem("mbti_saved_result");
    if (savedResult && savedAnswers) {
      try {
        const parsedAnswers = JSON.parse(savedAnswers);
        setAnswers(parsedAnswers);
        setResult(savedResult);
        setShowResult(true);
        // Also restore active keys in localStorage
        localStorage.setItem("mbti_answers", savedAnswers);
        localStorage.setItem("mbti_result", savedResult);
        localStorage.setItem("mbti_show_result", "true");
        // Remove active current question so if they click retake again it starts from 0
        localStorage.removeItem("mbti_current_question");
        setCurrentQuestion(0);
      } catch (e) {
        console.error("Failed to restore saved MBTI result:", e);
      }
    }
  };

  const handleDeleteSavedResult = () => {
    localStorage.removeItem("mbti_saved_result");
    localStorage.removeItem("mbti_saved_answers");
    setHasSavedResult(false);
  };

  if (!isInitialized) {
    return (
      <div className="min-h-screen pt-16 bg-zinc-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 bg-white p-8 rounded-2xl border border-zinc-200 shadow-md">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-zinc-700 font-semibold text-lg animate-pulse">
            Loading your test progress...
          </p>
        </div>
      </div>
    );
  }

  if (showResult && result) {
    return (
      <MBTIResultSection
        result={result}
        showConfetti={showConfetti}
        windowSize={windowSize}
        handleRetake={handleRetake}
      />
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-zinc-100 overflow-hidden flex flex-col justify-between">
      <div>
        <TestHeader
          title="MBTI Personality Assessment"
          description="Discover your cognitive functions and how you interact with the world"
          durationText="7 Minutes"
          icon={<Brain size={32} className="text-white animate-pulse" />}
        />

        <section className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
          {hasSavedResult && (
            <SavedResultBanner
              onDelete={() => setIsDeleteModalOpen(true)}
              onRestore={handleRestoreResult}
            />
          )}

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
                className="bg-linear-to-r from-blue-600 to-blue-700 h-2.5 rounded-full transition-all duration-500 shadow-sm shadow-blue-600/30"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 md:p-8 border border-zinc-200 shadow-md">
            <h2 className="text-lg md:text-2xl font-semibold text-zinc-900 text-center leading-relaxed mb-4 md:mb-8 min-h-[40px] md:min-h-[64px]">
              {mbtiQuestions[currentQuestion].question}
            </h2>

            <div className="mb-6 grid gap-4 md:grid-cols-[1fr_auto_1fr] items-center">
              <div className="rounded-lg border border-blue-200 bg-blue-50/50 p-4 min-h-[60px] md:min-h-[100px] flex flex-col justify-center">
                <p className="text-xs font-semibold text-blue-600 mb-1 uppercase tracking-wider">
                  Option A
                </p>
                <p className="text-sm md:text-base font-semibold text-zinc-900 leading-snug">
                  {mbtiQuestions[currentQuestion].optionA}
                </p>
              </div>

              <div className="py-4">
                <div className="flex items-center justify-center gap-1.5 sm:gap-2.5 md:gap-3">
                  {scale.map(({ value, label, sublabel }) => (
                    <div
                      key={value}
                      className="flex flex-col items-center gap-2 w-14 sm:w-16"
                    >
                      <span
                        className={`text-[8px] sm:text-[10px] font-bold text-zinc-500 uppercase tracking-wider text-center select-none h-4 flex items-center justify-center ${value === 3 ? "text-zinc-400" : ""}`}
                      >
                        {sublabel}
                      </span>
                      <button
                        onClick={() => handleAnswer(value)}
                        className={`flex h-12 w-full items-center justify-center rounded-lg border-2 text-xs font-bold transition-all duration-200 cursor-pointer ${
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
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-amber-200 bg-amber-50/30 p-4 min-h-[60px] md:min-h-[100px] flex flex-col justify-center">
                <p className="text-xs font-semibold text-amber-600 mb-1 uppercase tracking-wider">
                  Option B
                </p>
                <p className="text-sm md:text-base font-semibold text-zinc-900 leading-snug">
                  {mbtiQuestions[currentQuestion].optionB}
                </p>
              </div>
            </div>

            <div className="p-2 mb-3 md:mb-6 flex flex-col items-center gap-3">
              <p className="text-center text-xs text-zinc-500 leading-relaxed">
                Choose{" "}
                <span className="font-semibold text-primary">Option A</span> or{" "}
                <span className="font-semibold text-amber-600">Option B</span>,
                or select{" "}
                <span className="font-semibold text-zinc-500">Neutral</span> if
                neither fits perfectly
              </p>
              <div className="h-7 flex md:hidden items-center justify-center">
                {isAnswered && (
                  <div className="flex items-center gap-1.5 text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-100 animate-in fade-in duration-200">
                    <CheckCircle size={14} />
                    <span>Answered</span>
                  </div>
                )}
              </div>
            </div>

            <TestNavigation
              currentQuestion={currentQuestion}
              totalQuestions={mbtiQuestions.length}
              isAnswered={isAnswered}
              handlePrevious={handlePrevious}
              handleNext={handleNext}
            />
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
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteSavedResult}
      />
    </div>
  );
}
