"use client";

import { useState, useEffect } from "react";
import { CheckCircle, Brain } from "lucide-react";
import {
  iqTestQuestions,
  UserResponse,
  defaultPopulationStats,
  calculateRawScore,
  calculateFinalIQ,
} from "@/data/IQ-test";
import IQResultSection from "./IQResultSection";
import ConfirmDeleteModal from "./components/ConfirmDeleteModal";
import SavedResultBanner from "./components/SavedResultBanner";
import TestHeader from "./components/TestHeader";
import TestNavigation from "./components/TestNavigation";

export default function IQTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<{ rawScore: number; iq: number } | null>(
    null,
  );
  const [showResult, setShowResult] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [isInitialized, setIsInitialized] = useState(false);
  const [hasSavedResult, setHasSavedResult] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    const savedAnswers = localStorage.getItem("iq_answers");
    const savedQuestion = localStorage.getItem("iq_current_question");
    const savedResult = localStorage.getItem("iq_result");
    const savedShowResult = localStorage.getItem("iq_show_result");

    let hasBackup = !!localStorage.getItem("iq_saved_result");

    if (savedAnswers) {
      try {
        setAnswers(JSON.parse(savedAnswers));
      } catch (e) {
        console.error("Failed to parse saved IQ answers:", e);
      }
    }
    if (savedQuestion) {
      const qIndex = parseInt(savedQuestion, 10);
      if (!isNaN(qIndex) && qIndex >= 0 && qIndex < iqTestQuestions.length) {
        setCurrentQuestion(qIndex);
      }
    }
    if (savedResult) {
      try {
        const parsedResult = JSON.parse(savedResult);
        setResult(parsedResult);
        if (!hasBackup && savedShowResult === "true") {
          localStorage.setItem("iq_saved_answers", savedAnswers || "{}");
          localStorage.setItem("iq_saved_result", savedResult);
          hasBackup = true;
        }
      } catch (e) {
        console.error("Failed to parse saved IQ result:", e);
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

  const handleAnswer = (valueIdx: number) => {
    const updatedAnswers = {
      ...answers,
      [iqTestQuestions[currentQuestion].id]: valueIdx,
    };
    setAnswers(updatedAnswers);
    localStorage.setItem("iq_answers", JSON.stringify(updatedAnswers));
  };

  const handleNext = () => {
    if (currentQuestion < iqTestQuestions.length - 1) {
      const nextQuestion = currentQuestion + 1;
      setCurrentQuestion(nextQuestion);
      localStorage.setItem("iq_current_question", nextQuestion.toString());
    } else {
      calculateResult();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      const prevQuestion = currentQuestion - 1;
      setCurrentQuestion(prevQuestion);
      localStorage.setItem("iq_current_question", prevQuestion.toString());
    }
  };

  const calculateResult = () => {
    const userResponses: UserResponse[] = iqTestQuestions.map((q) => {
      const selectedIdx = answers[q.id];
      const isCorrect = selectedIdx === q.correctAnswerIndex;
      return {
        questionId: q.id,
        isCorrect,
        timeTakenSeconds: 0,
      };
    });

    const raw = calculateRawScore(userResponses);
    const finalIQ = calculateFinalIQ(raw, defaultPopulationStats);

    const computedResult = { rawScore: raw, iq: finalIQ };

    setResult(computedResult);
    setShowConfetti(true);
    setShowResult(true);
    setHasSavedResult(true);
    localStorage.setItem("iq_result", JSON.stringify(computedResult));
    localStorage.setItem("iq_show_result", "true");
    localStorage.setItem("iq_saved_result", JSON.stringify(computedResult));
    localStorage.setItem("iq_saved_answers", JSON.stringify(answers));
  };

  const progress = ((currentQuestion + 1) / iqTestQuestions.length) * 100;
  const isAnswered =
    answers[iqTestQuestions[currentQuestion]?.id] !== undefined;
  const currentAnswer = answers[iqTestQuestions[currentQuestion]?.id];

  const handleRetake = () => {
    setShowConfetti(false);
    setShowResult(false);
    setCurrentQuestion(0);
    setAnswers({});
    setResult(null);
    localStorage.removeItem("iq_answers");
    localStorage.removeItem("iq_current_question");
    localStorage.removeItem("iq_result");
    localStorage.removeItem("iq_show_result");
  };

  const handleRestoreResult = () => {
    const savedAnswers = localStorage.getItem("iq_saved_answers");
    const savedResult = localStorage.getItem("iq_saved_result");
    if (savedResult && savedAnswers) {
      try {
        const parsedAnswers = JSON.parse(savedAnswers);
        const parsedResult = JSON.parse(savedResult);
        setAnswers(parsedAnswers);
        setResult(parsedResult);
        setShowResult(true);
        localStorage.setItem("iq_answers", savedAnswers);
        localStorage.setItem("iq_result", savedResult);
        localStorage.setItem("iq_show_result", "true");
        localStorage.removeItem("iq_current_question");
        setCurrentQuestion(0);
      } catch (e) {
        console.error("Failed to restore saved IQ result:", e);
      }
    }
  };

  const handleDeleteSavedResult = () => {
    localStorage.removeItem("iq_saved_result");
    localStorage.removeItem("iq_saved_answers");
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
      <IQResultSection
        rawScore={result.rawScore}
        iqScore={result.iq}
        answers={answers}
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
          title="Cognitive Ability Test (IQ)"
          description="Evaluate your abstract logic, sequence identification, verbal analogies, and applied mental arithmetic."
          durationText="10 Minutes"
          typeText="24 Questions"
          resultText="Instant Score Profile"
          icon={<Brain size={32} className="text-white animate-pulse" />}
        />

        <section className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
          {hasSavedResult && (
            <SavedResultBanner
              onDelete={() => setIsDeleteModalOpen(true)}
              onRestore={handleRestoreResult}
              message="You have a previously completed IQ test result available."
            />
          )}

          <div className="mb-8 max-w-2xl mx-auto w-full">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-semibold text-zinc-700">
                Question {currentQuestion + 1} of {iqTestQuestions.length}
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
            <div className="mb-4 text-center">
              <span className="inline-block text-xs font-black tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase">
                Category:{" "}
                {iqTestQuestions[currentQuestion].category.toUpperCase()}
              </span>
            </div>
            <h2 className="text-lg md:text-xl font-semibold text-zinc-900 text-center leading-relaxed mb-8 min-h-[64px] flex items-center justify-center">
              {iqTestQuestions[currentQuestion].prompt}
            </h2>

            <div className="space-y-3 md:space-y-4 max-w-2xl mx-auto mb-8">
              {iqTestQuestions[currentQuestion].options.map((opt, optIdx) => {
                const isSelected = currentAnswer === optIdx;
                const letter = String.fromCharCode(65 + optIdx);
                return (
                  <button
                    key={optIdx}
                    onClick={() => handleAnswer(optIdx)}
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
                          : "bg-zinc-50 text-zinc-500 border-zinc-200"
                      }`}
                    >
                      {letter}
                    </div>
                    <span className="text-sm sm:text-base leading-snug">
                      {opt}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="p-2 mb-3 md:mb-6 flex flex-col items-center gap-3">
              <p className="text-center text-xs text-zinc-500 leading-relaxed max-w-lg mx-auto">
                Read the question carefully and select the best answer from the
                choices.
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
              totalQuestions={iqTestQuestions.length}
              isAnswered={isAnswered}
              handlePrevious={handlePrevious}
              handleNext={handleNext}
              containerClass="flex justify-between items-center border-t border-zinc-100 pt-6 max-w-2xl mx-auto w-full"
            />
          </div>
        </section>
      </div>

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteSavedResult}
      />
    </div>
  );
}
