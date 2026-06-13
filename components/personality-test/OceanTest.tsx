"use client";

import { useState, useEffect } from "react";
import { CheckCircle, BookMarked, Brain } from "lucide-react";
import Link from "next/link";
import { oceanQuestions } from "@/data/OCEAN-test";
import OceanResultSection from "./OceanResultSection";
import ConfirmDeleteModal from "./components/ConfirmDeleteModal";
import SavedResultBanner from "./components/SavedResultBanner";
import TestHeader from "./components/TestHeader";
import TestNavigation from "./components/TestNavigation";

export default function OceanTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [result, setResult] = useState<Record<string, number> | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [isInitialized, setIsInitialized] = useState(false);
  const [hasSavedResult, setHasSavedResult] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const scale = [
    { value: 1, label: "100%", sublabel: "Strong Disagree" },
    { value: 2, label: "75%", sublabel: "Disagree" },
    { value: 3, label: "50%", sublabel: "Neutral" },
    { value: 4, label: "75%", sublabel: "Agree" },
    { value: 5, label: "100%", sublabel: "Strong Agree" },
  ];

  useEffect(() => {
    const savedAnswers = localStorage.getItem("ocean_answers");
    const savedQuestion = localStorage.getItem("ocean_current_question");
    const savedResult = localStorage.getItem("ocean_result");
    const savedShowResult = localStorage.getItem("ocean_show_result");

    let hasBackup = !!localStorage.getItem("ocean_saved_result");

    if (savedAnswers) {
      try {
        setAnswers(JSON.parse(savedAnswers));
      } catch (e) {
        console.error("Failed to parse saved OCEAN answers:", e);
      }
    }
    if (savedQuestion) {
      const qIndex = parseInt(savedQuestion, 10);
      if (!isNaN(qIndex) && qIndex >= 0 && qIndex < oceanQuestions.length) {
        setCurrentQuestion(qIndex);
      }
    }
    if (savedResult) {
      try {
        const parsedResult = JSON.parse(savedResult);
        setResult(parsedResult);
        if (!hasBackup && savedShowResult === "true") {
          localStorage.setItem("ocean_saved_answers", savedAnswers || "{}");
          localStorage.setItem("ocean_saved_result", savedResult);
          hasBackup = true;
        }
      } catch (e) {
        console.error("Failed to parse saved OCEAN result:", e);
      }
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

  const handleAnswer = (value: number) => {
    const updatedAnswers = {
      ...answers,
      [oceanQuestions[currentQuestion].id]: value,
    };
    setAnswers(updatedAnswers);
    localStorage.setItem("ocean_answers", JSON.stringify(updatedAnswers));
  };

  const handleNext = () => {
    if (currentQuestion < oceanQuestions.length - 1) {
      const nextQuestion = currentQuestion + 1;
      setCurrentQuestion(nextQuestion);
      localStorage.setItem("ocean_current_question", nextQuestion.toString());
    } else {
      calculateResult();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      const prevQuestion = currentQuestion - 1;
      setCurrentQuestion(prevQuestion);
      localStorage.setItem("ocean_current_question", prevQuestion.toString());
    }
  };

  const calculateResult = () => {
    const traitSums = { O: 0, C: 0, E: 0, A: 0, N: 0 };
    const traitCounts = { O: 0, C: 0, E: 0, A: 0, N: 0 };

    oceanQuestions.forEach((q) => {
      const answer = answers[q.id];
      if (answer !== undefined) {
        const score = q.polarity === 1 ? answer - 1 : 5 - answer; // Map 1..5 to 0..4
        traitSums[q.trait] += score;
        traitCounts[q.trait]++;
      }
    });

    const traits: Array<keyof typeof traitSums> = ["O", "C", "E", "A", "N"];
    const computedScores: Record<string, number> = {};

    traits.forEach((t) => {
      const count = traitCounts[t];
      const sum = traitSums[t];
      computedScores[t] =
        count > 0 ? Math.round((sum / (count * 4)) * 100) : 50;
    });

    setResult(computedScores);
    setShowConfetti(true);
    setShowResult(true);
    setHasSavedResult(true);
    localStorage.setItem("ocean_result", JSON.stringify(computedScores));
    localStorage.setItem("ocean_show_result", "true");
    localStorage.setItem("ocean_saved_result", JSON.stringify(computedScores));
    localStorage.setItem("ocean_saved_answers", JSON.stringify(answers));
  };

  const progress = ((currentQuestion + 1) / oceanQuestions.length) * 100;
  const isAnswered = answers[oceanQuestions[currentQuestion]?.id] !== undefined;
  const currentAnswer = answers[oceanQuestions[currentQuestion]?.id];

  const handleRetake = () => {
    setShowConfetti(false);
    setShowResult(false);
    setCurrentQuestion(0);
    setAnswers({});
    setResult(null);
    localStorage.removeItem("ocean_answers");
    localStorage.removeItem("ocean_current_question");
    localStorage.removeItem("ocean_result");
    localStorage.removeItem("ocean_show_result");
  };

  const handleRestoreResult = () => {
    const savedAnswers = localStorage.getItem("ocean_saved_answers");
    const savedResult = localStorage.getItem("ocean_saved_result");
    if (savedResult && savedAnswers) {
      try {
        const parsedAnswers = JSON.parse(savedAnswers);
        const parsedResult = JSON.parse(savedResult);
        setAnswers(parsedAnswers);
        setResult(parsedResult);
        setShowResult(true);
        localStorage.setItem("ocean_answers", savedAnswers);
        localStorage.setItem("ocean_result", savedResult);
        localStorage.setItem("ocean_show_result", "true");
        localStorage.removeItem("ocean_current_question");
        setCurrentQuestion(0);
      } catch (e) {
        console.error("Failed to restore saved OCEAN result:", e);
      }
    }
  };

  const handleDeleteSavedResult = () => {
    localStorage.removeItem("ocean_saved_result");
    localStorage.removeItem("ocean_saved_answers");
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
      <OceanResultSection
        scores={result}
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
          title="Big Five Personality Test (OCEAN)"
          description="Discover your scores on Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism"
          durationText="6 Minutes"
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
                Question {currentQuestion + 1} of {oceanQuestions.length}
              </span>
              <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full bg-zinc-200 rounded-full h-2.5 shadow-inner">
              <div
                className="bg-linear-to-l from-primary to-primary/60 h-2.5 rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 md:p-8 border border-zinc-200 shadow-md">
            <h2 className="text-lg md:text-2xl font-semibold text-zinc-900 text-center leading-relaxed mb-8 min-h-[64px] flex items-center justify-center">
              {oceanQuestions[currentQuestion].text}
            </h2>

            <div className="mb-6 flex justify-center items-center">
              {/* <div className="mb-6 grid gap-4 md:grid-cols-[1fr_auto_1fr] items-center"></div> */}
              {/* <div className="rounded-lg border border-red-200 bg-red-50/50 p-4 min-h-[100px] flex flex-col justify-center">
                <p className="text-xs font-semibold text-red-650 mb-1 uppercase tracking-wider">
                  Disagree
                </p>
                <p className="text-sm md:text-base font-semibold text-zinc-900 leading-snug">
                  I do not agree with the statement above.
                </p>
              </div> */}

              <div className="py-4">
                <div className="flex items-center justify-center gap-1.5 sm:gap-2.5 md:gap-3">
                  {scale.map(({ value, label, sublabel }) => (
                    <div
                      key={value}
                      className="flex flex-col items-center gap-2 w-14 sm:w-16"
                    >
                      <span
                        className={`text-[8px] sm:text-[10px] font-bold text-zinc-500 uppercase tracking-wider text-center select-none h-4 flex items-center justify-center leading-none ${value === 3 ? "text-zinc-400" : ""}`}
                      >
                        {sublabel}
                      </span>
                      <button
                        onClick={() => handleAnswer(value)}
                        className={`flex h-12 w-full items-center justify-center rounded-lg border-2 text-xs font-bold transition-all duration-200 cursor-pointer ${
                          currentAnswer === value
                            ? value === 1
                              ? "border-red-655 bg-red-600 text-white shadow-md shadow-red-600/20"
                              : value === 2
                                ? "border-red-500 bg-red-500 text-white shadow-md shadow-red-500/20"
                                : value === 3
                                  ? "border-zinc-500 bg-zinc-500 text-white shadow-md shadow-zinc-500/20"
                                  : value === 4
                                    ? "border-emerald-500 bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                                    : "border-emerald-500 bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                            : value === 1
                              ? "border-red-400 bg-red-50 hover:bg-red-600 hover:text-white text-zinc-800 hover:border-red-500"
                              : value === 2
                                ? "border-rose-200 bg-rose-50/50 hover:bg-rose-500 hover:text-white text-zinc-800 hover:border-rose-300"
                                : value === 3
                                  ? "border-zinc-200 bg-zinc-50 text-zinc-800 hover:border-zinc-400 hover:bg-zinc-400 hover:text-white"
                                  : value === 4
                                    ? "border-emerald-100 bg-emerald-50/50 text-zinc-800 hover:border-emerald-300 hover:bg-emerald-300 hover:text-white"
                                    : "border-emerald-300 bg-emerald-50 text-zinc-800 hover:border-emerald-400 hover:bg-emerald-400 hover:text-white"
                        }`}
                      >
                        {label}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* <div className="rounded-lg border border-emerald-200 bg-emerald-50/30 p-4 min-h-[100px] flex flex-col justify-center">
                <p className="text-xs font-semibold text-emerald-650 mb-1 uppercase tracking-wider">
                  Agree
                </p>
                <p className="text-sm md:text-base font-semibold text-zinc-900 leading-snug">
                  I agree with the statement above.
                </p>
              </div> */}
            </div>

            <div className="p-2 mb-3 md:mb-6 flex flex-col items-center gap-3">
              <p className="text-center text-xs text-zinc-500 leading-relaxed">
                Choose a level of{" "}
                <span className="font-semibold text-emerald-500">
                  Agreement
                </span>{" "}
                or{" "}
                <span className="font-semibold text-red-500">Disagreement</span>
                , or select{" "}
                <span className="font-semibold text-zinc-500">Neutral</span> if
                you neither agree nor disagree.
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
              totalQuestions={oceanQuestions.length}
              isAnswered={isAnswered}
              handlePrevious={handlePrevious}
              handleNext={handleNext}
              containerClass="flex justify-between items-center border-t border-zinc-100 pt-6 max-w-2xl mx-auto w-full"
            />
          </div>
        </section>
      </div>

      <div className="flex flex-col items-center justify-center w-full pb-8 bg-zinc-100 border-t border-zinc-200/50 pt-4">
        <Link
          href="/ocean-book"
          className="px-5 py-2 bg-amber-400 hover:bg-amber-500 text-black text-sm font-bold rounded-full transition-all shadow-md inline-flex items-center gap-1.5 hover:scale-105"
        >
          <BookMarked size={16} />
          Learn more about Big Five (OCEAN) traits
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
