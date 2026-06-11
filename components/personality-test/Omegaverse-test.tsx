"use client";

import { useState, useEffect, useMemo } from "react";
import { Sparkles, CheckCircle, BookMarked } from "lucide-react";
import Link from "next/link";
import { omegaverseQuestions } from "@/data/omegaverse-test";
import OmegaverseResultSection from "./OmegaverseResultSection";
import ConfirmDeleteModal from "./components/ConfirmDeleteModal";
import SavedResultBanner from "./components/SavedResultBanner";
import TestHeader from "./components/TestHeader";
import TestNavigation from "./components/TestNavigation";

export default function OmegaverseTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{
    [key: number]: "A" | "B" | "C" | "D";
  }>({});
  const [result, setResult] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [isInitialized, setIsInitialized] = useState(false);
  const [hasSavedResult, setHasSavedResult] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const computedScores = useMemo(() => {
    const totals = {
      ALPHA: 0,
      BETA: 0,
      OMEGA: 0,
      SIGMA: 0,
      DELTA: 0,
      GAMMA: 0,
    };

    omegaverseQuestions.forEach((q) => {
      const selectedOption = answers[q.id];
      if (selectedOption && q.scoreMap[selectedOption]) {
        const scores = q.scoreMap[selectedOption];
        totals.ALPHA += scores.ALPHA;
        totals.BETA += scores.BETA;
        totals.OMEGA += scores.OMEGA;
        totals.SIGMA += scores.SIGMA;
        totals.DELTA += scores.DELTA;
        totals.GAMMA += scores.GAMMA;
      }
    });

    return totals;
  }, [answers]);

  useEffect(() => {
    const savedAnswers = localStorage.getItem("omegaverse_answers");
    const savedQuestion = localStorage.getItem("omegaverse_current_question");
    const savedResult = localStorage.getItem("omegaverse_result");
    const savedShowResult = localStorage.getItem("omegaverse_show_result");

    let hasBackup = !!localStorage.getItem("omegaverse_saved_result");

    if (savedAnswers) {
      try {
        const parsed = JSON.parse(savedAnswers);
        setAnswers(parsed);
        if (!hasBackup && savedShowResult === "true" && savedResult) {
          localStorage.setItem("omegaverse_saved_answers", savedAnswers);
          localStorage.setItem("omegaverse_saved_result", savedResult);
          hasBackup = true;
        }
      } catch (e) {
        console.error("Failed to parse saved answers:", e);
      }
    }
    if (savedQuestion) {
      const qIndex = parseInt(savedQuestion, 10);
      if (
        !isNaN(qIndex) &&
        qIndex >= 0 &&
        qIndex < omegaverseQuestions.length
      ) {
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentQuestion]);

  const handleAnswer = (option: "A" | "B" | "C" | "D") => {
    const updatedAnswers = {
      ...answers,
      [omegaverseQuestions[currentQuestion].id]: option,
    };
    setAnswers(updatedAnswers);
    localStorage.setItem("omegaverse_answers", JSON.stringify(updatedAnswers));
  };

  const handleNext = () => {
    if (currentQuestion < omegaverseQuestions.length - 1) {
      const nextQuestion = currentQuestion + 1;
      setCurrentQuestion(nextQuestion);
      localStorage.setItem(
        "omegaverse_current_question",
        nextQuestion.toString(),
      );
    } else {
      calculateResult();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      const prevQuestion = currentQuestion - 1;
      setCurrentQuestion(prevQuestion);
      localStorage.setItem(
        "omegaverse_current_question",
        prevQuestion.toString(),
      );
    }
  };

  const calculateResult = () => {
    const totals = {
      ALPHA: 0,
      BETA: 0,
      OMEGA: 0,
      SIGMA: 0,
      DELTA: 0,
      GAMMA: 0,
    };

    omegaverseQuestions.forEach((q) => {
      const selectedOption = answers[q.id];
      if (selectedOption && q.scoreMap[selectedOption]) {
        const scores = q.scoreMap[selectedOption];
        totals.ALPHA += scores.ALPHA;
        totals.BETA += scores.BETA;
        totals.OMEGA += scores.OMEGA;
        totals.SIGMA += scores.SIGMA;
        totals.DELTA += scores.DELTA;
        totals.GAMMA += scores.GAMMA;
      }
    });

    // Determine highest scoring dynamic
    const type = Object.keys(totals).reduce((a, b) =>
      totals[a as keyof typeof totals] > totals[b as keyof typeof totals]
        ? a
        : b,
    ) as keyof typeof totals;

    setResult(type);
    setShowConfetti(true);
    setShowResult(true);
    setHasSavedResult(true);
    localStorage.setItem("omegaverse_result", type);
    localStorage.setItem("omegaverse_show_result", "true");
    localStorage.setItem("omegaverse_saved_result", type);
    localStorage.setItem("omegaverse_saved_answers", JSON.stringify(answers));
  };

  const progress = ((currentQuestion + 1) / omegaverseQuestions.length) * 100;
  const currentAnswer = answers[omegaverseQuestions[currentQuestion]?.id];
  const isAnswered = currentAnswer !== undefined;

  const handleRetake = () => {
    setShowConfetti(false);
    setShowResult(false);
    setCurrentQuestion(0);
    setAnswers({});
    setResult(null);
    localStorage.removeItem("omegaverse_answers");
    localStorage.removeItem("omegaverse_current_question");
    localStorage.removeItem("omegaverse_result");
    localStorage.removeItem("omegaverse_show_result");
  };

  const handleRestoreResult = () => {
    const savedAnswers = localStorage.getItem("omegaverse_saved_answers");
    const savedResult = localStorage.getItem("omegaverse_saved_result");
    if (savedResult && savedAnswers) {
      try {
        const parsedAnswers = JSON.parse(savedAnswers);
        setAnswers(parsedAnswers);
        setResult(savedResult);
        setShowResult(true);
        // Also restore active keys in localStorage
        localStorage.setItem("omegaverse_answers", savedAnswers);
        localStorage.setItem("omegaverse_result", savedResult);
        localStorage.setItem("omegaverse_show_result", "true");
        // Remove active current question so if they click retake again it starts from 0
        localStorage.removeItem("omegaverse_current_question");
        setCurrentQuestion(0);
      } catch (e) {
        console.error("Failed to restore saved result:", e);
      }
    }
  };

  const handleDeleteSavedResult = () => {
    localStorage.removeItem("omegaverse_saved_result");
    localStorage.removeItem("omegaverse_saved_answers");
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
      <OmegaverseResultSection
        result={result}
        showConfetti={showConfetti}
        windowSize={windowSize}
        handleRetake={handleRetake}
        computedScores={computedScores}
      />
    );
  }

  const q = omegaverseQuestions[currentQuestion];
  const options = [
    { key: "A" as const, text: q.optionA },
    { key: "B" as const, text: q.optionB },
    { key: "C" as const, text: q.optionC },
    { key: "D" as const, text: q.optionD },
  ];

  return (
    <div className="min-h-screen pt-16 bg-zinc-100 overflow-hidden flex flex-col justify-between">
      <div>
        <TestHeader
          title="Omegaverse Classification Test"
          description="Determine your dynamic archetype (Alpha, Beta, Omega, Sigma, Delta, or Gamma)"
          durationText="6 Minutes"
          icon={<Sparkles size={32} className="text-white animate-pulse" />}
        />

        <section className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
          {hasSavedResult && (
            <SavedResultBanner
              onDelete={() => setIsDeleteModalOpen(true)}
              onRestore={handleRestoreResult}
            />
          )}

          {/* Progress Bar */}
          <div className="mb-8 max-w-2xl mx-auto w-full">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-semibold text-zinc-700">
                Question {currentQuestion + 1} of {omegaverseQuestions.length}
              </span>
              <span className="text-sm font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full bg-zinc-200 rounded-full h-2.5 shadow-inner">
              <div
                className="bg-linear-to-r from-blue-600 to-indigo-600 h-2.5 rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white rounded-[24px] p-6 md:p-8 border border-zinc-200 shadow-md">
            <h2 className="text-lg md:text-2xl font-bold text-zinc-900 text-center leading-relaxed mb-8">
              {q.question}
            </h2>

            {/* Multiple Choice Options List */}
            <div className="space-y-3 md:space-y-4 max-w-2xl mx-auto mb-4 md:mb-8">
              {options.map((opt) => {
                const isSelected = currentAnswer === opt.key;
                return (
                  <button
                    key={opt.key}
                    onClick={() => handleAnswer(opt.key)}
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 text-left cursor-pointer w-full transition-all duration-200 ${
                      isSelected
                        ? "border-blue-600 bg-blue-50/50 text-blue-950 font-bold shadow-xs"
                        : "border-zinc-200 bg-white hover:border-blue-300 hover:bg-blue-50/10 text-zinc-700 font-medium"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 border transition-all ${
                        isSelected
                          ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                          : "bg-zinc-50 text-zinc-500 border-zinc-200 group-hover:bg-zinc-100"
                      }`}
                    >
                      {opt.key}
                    </div>
                    <span className="text-sm sm:text-base leading-snug">
                      {opt.text}
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="text-center text-xs text-zinc-500 leading-relaxed max-w-lg mx-auto mb-6">
              Select a response depending on how you really are, not how you
              would like to be.
            </p>
            <div className="h-7 flex md:hidden items-center justify-center mb-3 md:mb-6">
              {isAnswered && (
                <div className="flex items-center gap-1.5 text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-100 animate-in fade-in duration-200">
                  <CheckCircle size={14} />
                  <span>Selected</span>
                </div>
              )}
            </div>

            <TestNavigation
              currentQuestion={currentQuestion}
              totalQuestions={omegaverseQuestions.length}
              isAnswered={isAnswered}
              handlePrevious={handlePrevious}
              handleNext={handleNext}
              statusText="Selected"
            />
          </div>
        </section>
      </div>

      <div className="flex flex-col items-center justify-center w-full pb-8 bg-zinc-100 border-t border-zinc-200/50 pt-4">
        <Link
          href="/omegaverse-book"
          className="px-5 py-2 bg-amber-400 hover:bg-amber-500 text-black text-sm font-bold rounded-full transition-all shadow-md inline-flex items-center gap-1.5 hover:scale-105"
        >
          <BookMarked size={16} />
          Learn more about Omegaverse types
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
