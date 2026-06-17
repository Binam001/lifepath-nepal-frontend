"use client";

import { useState, useEffect } from "react";
import { CheckCircle, BookMarked, Clock } from "lucide-react";
import Link from "next/link";
import {
  sleepChronotypeAssessment,
  calculateChronotype,
  ChronotypeCode,
} from "@/data/SleepChonotype-test";
import SleepChronotypeResultSection from "./SleepChronotypeResultSection";
import ConfirmDeleteModal from "./components/ConfirmDeleteModal";
import SavedResultBanner from "./components/SavedResultBanner";
import TestHeader from "./components/TestHeader";
import TestNavigation from "./components/TestNavigation";

export default function SleepChronotypeTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, ChronotypeCode>>({});
  const [result, setResult] = useState<{
    resultCode: ChronotypeCode;
    resultName: string;
    breakdown: Record<ChronotypeCode, number>;
  } | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [isInitialized, setIsInitialized] = useState(false);
  const [hasSavedResult, setHasSavedResult] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    const savedAnswers = localStorage.getItem("sleep_chronotype_answers");
    const savedQuestion = localStorage.getItem(
      "sleep_chronotype_current_question",
    );
    const savedResult = localStorage.getItem("sleep_chronotype_result");
    const savedShowResult = localStorage.getItem(
      "sleep_chronotype_show_result",
    );

    let hasBackup = !!localStorage.getItem("sleep_chronotype_saved_result");

    if (savedAnswers) {
      try {
        setAnswers(JSON.parse(savedAnswers));
      } catch (e) {
        console.error("Failed to parse saved Sleep Chronotype answers:", e);
      }
    }
    if (savedQuestion) {
      const qIndex = parseInt(savedQuestion, 10);
      if (
        !isNaN(qIndex) &&
        qIndex >= 0 &&
        qIndex < sleepChronotypeAssessment.length
      ) {
        setCurrentQuestion(qIndex);
      }
    }
    if (savedResult) {
      try {
        const parsedResult = JSON.parse(savedResult);
        setResult(parsedResult);
        if (!hasBackup && savedShowResult === "true") {
          localStorage.setItem(
            "sleep_chronotype_saved_answers",
            savedAnswers || "{}",
          );
          localStorage.setItem("sleep_chronotype_saved_result", savedResult);
          hasBackup = true;
        }
      } catch (e) {
        console.error("Failed to parse saved Sleep Chronotype result:", e);
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

  const handleAnswer = (category: ChronotypeCode) => {
    const questionId = sleepChronotypeAssessment[currentQuestion].id;
    const updatedAnswers = {
      ...answers,
      [questionId]: category,
    };
    setAnswers(updatedAnswers);
    localStorage.setItem(
      "sleep_chronotype_answers",
      JSON.stringify(updatedAnswers),
    );
  };

  const handleNext = () => {
    if (currentQuestion < sleepChronotypeAssessment.length - 1) {
      const nextQuestion = currentQuestion + 1;
      setCurrentQuestion(nextQuestion);
      localStorage.setItem(
        "sleep_chronotype_current_question",
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
        "sleep_chronotype_current_question",
        prevQuestion.toString(),
      );
    }
  };

  const calculateResult = () => {
    const answersList = Object.values(answers);
    const computedResult = calculateChronotype(answersList);

    setResult(computedResult);
    setShowConfetti(true);
    setShowResult(true);
    setHasSavedResult(true);
    localStorage.setItem(
      "sleep_chronotype_result",
      JSON.stringify(computedResult),
    );
    localStorage.setItem("sleep_chronotype_show_result", "true");
    localStorage.setItem(
      "sleep_chronotype_saved_result",
      JSON.stringify(computedResult),
    );
    localStorage.setItem(
      "sleep_chronotype_saved_answers",
      JSON.stringify(answers),
    );
  };

  const progress =
    ((currentQuestion + 1) / sleepChronotypeAssessment.length) * 100;
  const isAnswered =
    answers[sleepChronotypeAssessment[currentQuestion]?.id] !== undefined;
  const currentAnswerCategory =
    answers[sleepChronotypeAssessment[currentQuestion]?.id];

  const handleRetake = () => {
    setShowConfetti(false);
    setShowResult(false);
    setCurrentQuestion(0);
    setAnswers({});
    setResult(null);
    localStorage.removeItem("sleep_chronotype_answers");
    localStorage.removeItem("sleep_chronotype_current_question");
    localStorage.removeItem("sleep_chronotype_result");
    localStorage.removeItem("sleep_chronotype_show_result");
  };

  const handleRestoreResult = () => {
    const savedAnswers = localStorage.getItem("sleep_chronotype_saved_answers");
    const savedResult = localStorage.getItem("sleep_chronotype_saved_result");
    if (savedResult && savedAnswers) {
      try {
        const parsedAnswers = JSON.parse(savedAnswers);
        const parsedResult = JSON.parse(savedResult);
        setAnswers(parsedAnswers);
        setResult(parsedResult);
        setShowResult(true);
        localStorage.setItem("sleep_chronotype_answers", savedAnswers);
        localStorage.setItem("sleep_chronotype_result", savedResult);
        localStorage.setItem("sleep_chronotype_show_result", "true");
        localStorage.removeItem("sleep_chronotype_current_question");
        setCurrentQuestion(0);
      } catch (e) {
        console.error("Failed to restore saved Sleep Chronotype result:", e);
      }
    }
  };

  const handleDeleteSavedResult = () => {
    localStorage.removeItem("sleep_chronotype_saved_result");
    localStorage.removeItem("sleep_chronotype_saved_answers");
    setHasSavedResult(false);
  };

  if (!isInitialized) {
    return (
      <div className="min-h-screen pt-16 bg-zinc-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 bg-white p-8 rounded-2xl border border-zinc-200 shadow-md">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-zinc-700 font-semibold text-lg animate-pulse">
            Loading your test progress...
          </p>
        </div>
      </div>
    );
  }

  if (showResult && result) {
    return (
      <SleepChronotypeResultSection
        result={result}
        showConfetti={showConfetti}
        windowSize={windowSize}
        handleRetake={handleRetake}
      />
    );
  }

  const currentQuestionData = sleepChronotypeAssessment[currentQuestion];

  return (
    <div className="min-h-screen pt-16 bg-zinc-100 overflow-hidden flex flex-col justify-between">
      <div>
        <TestHeader
          title="Sleep Chronotype Assessment"
          description="Identify your biological clock animal archetype (Lion, Bear, Wolf, or Dolphin) to optimize sleep and productivity"
          durationText="5 Minutes"
          icon={<Clock size={32} className="text-white animate-pulse" />}
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
                Question {currentQuestion + 1} of{" "}
                {sleepChronotypeAssessment.length}
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
            <h2 className="text-lg md:text-xl font-semibold text-zinc-900 text-center leading-relaxed mb-8 min-h-[48px] flex items-center justify-center">
              {currentQuestionData.text}
            </h2>

            <div className="space-y-4 max-w-2xl mx-auto mb-8">
              {currentQuestionData.options.map((option) => {
                const isSelected = currentAnswerCategory === option.category;

                return (
                  <button
                    key={option.id}
                    onClick={() => handleAnswer(option.category)}
                    className={`w-full flex items-center gap-4 text-left p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer group ${
                      isSelected
                        ? "border-primary bg-primary/5 text-primary shadow-xs"
                        : "border-zinc-200 bg-zinc-50/50 hover:bg-zinc-50 hover:border-primary/50 text-zinc-800"
                    }`}
                  >
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold transition-all border ${
                        isSelected
                          ? "bg-primary text-white border-primary"
                          : "bg-white text-zinc-500 border-zinc-250 group-hover:border-primary/50"
                      }`}
                    >
                      <span translate="no" className="english-label notranslate">{option.id}</span>
                      <span translate="no" className="nepali-label notranslate">
                        {option.id === "A" ? "क" : option.id === "B" ? "ख" : option.id === "C" ? "ग" : option.id === "D" ? "घ" : option.id}
                      </span>
                    </span>
                    <span className="text-sm md:text-base font-medium">
                      {option.text}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="p-2 mb-6 flex flex-col items-center gap-3">
              <p className="text-center text-xs text-zinc-500 leading-relaxed">
                Select the statement that best reflects your typical habits and
                preferences.
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
              totalQuestions={sleepChronotypeAssessment.length}
              isAnswered={isAnswered}
              handlePrevious={handlePrevious}
              handleNext={handleNext}
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
