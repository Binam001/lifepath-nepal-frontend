"use client";

import { useState, useEffect } from "react";
import { CheckCircle, Brain } from "lucide-react";
import {
  riasecQuestions,
  UserResponse,
  calculateHollandCode,
  LikertScore,
} from "@/data/RIASEC-test";
import RiasecResultSection from "./RiasecResultSection";
import ConfirmDeleteModal from "./components/ConfirmDeleteModal";
import SavedResultBanner from "./components/SavedResultBanner";
import TestHeader from "./components/TestHeader";
import TestNavigation from "./components/TestNavigation";

export default function RiasecTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<{
    hollandCode: string;
    scores: Record<string, number>;
  } | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [isInitialized, setIsInitialized] = useState(false);
  const [hasSavedResult, setHasSavedResult] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const scale = [
    {
      value: 1,
      label: "100%",
      sublabel: "Strongly Dislike",
      nepaliSublabel: "बिल्कुलै मन नपर्ने",
    },
    {
      value: 2,
      label: "75%",
      sublabel: "Dislike",
      nepaliSublabel: "मन नपर्ने",
    },
    {
      value: 3,
      label: "50%",
      sublabel: "Unsure",
      nepaliSublabel: "स्पष्ट छैन",
    },
    { value: 4, label: "75%", sublabel: "Like", nepaliSublabel: "मनपर्छ" },
    {
      value: 5,
      label: "100%",
      sublabel: "Strongly Like",
      nepaliSublabel: "अत्यन्त मनपर्छ",
    },
  ];

  useEffect(() => {
    const savedAnswers = localStorage.getItem("riasec_answers");
    const savedQuestion = localStorage.getItem("riasec_current_question");
    const savedResult = localStorage.getItem("riasec_result");
    const savedShowResult = localStorage.getItem("riasec_show_result");

    let hasBackup = !!localStorage.getItem("riasec_saved_result");

    if (savedAnswers) {
      try {
        setAnswers(JSON.parse(savedAnswers));
      } catch (e) {
        console.error("Failed to parse saved RIASEC answers:", e);
      }
    }
    if (savedQuestion) {
      const qIndex = parseInt(savedQuestion, 10);
      if (!isNaN(qIndex) && qIndex >= 0 && qIndex < riasecQuestions.length) {
        setCurrentQuestion(qIndex);
      }
    }
    if (savedResult) {
      try {
        const parsedResult = JSON.parse(savedResult);
        if (
          parsedResult &&
          typeof parsedResult.hollandCode === "object" &&
          parsedResult.hollandCode !== null
        ) {
          parsedResult.hollandCode = parsedResult.hollandCode.code || "";
        }
        setResult(parsedResult);
        if (!hasBackup && savedShowResult === "true") {
          localStorage.setItem("riasec_saved_answers", savedAnswers || "{}");
          localStorage.setItem("riasec_saved_result", savedResult);
          hasBackup = true;
        }
      } catch (e) {
        console.error("Failed to parse saved RIASEC result:", e);
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
      [riasecQuestions[currentQuestion].id]: value,
    };
    setAnswers(updatedAnswers);
    localStorage.setItem("riasec_answers", JSON.stringify(updatedAnswers));
  };

  const handleNext = () => {
    if (currentQuestion < riasecQuestions.length - 1) {
      const nextQuestion = currentQuestion + 1;
      setCurrentQuestion(nextQuestion);
      localStorage.setItem("riasec_current_question", nextQuestion.toString());
    } else {
      calculateResult();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      const prevQuestion = currentQuestion - 1;
      setCurrentQuestion(prevQuestion);
      localStorage.setItem("riasec_current_question", prevQuestion.toString());
    }
  };

  const calculateResult = () => {
    const responses: UserResponse[] = riasecQuestions.map((q) => ({
      questionId: q.id,
      score: (answers[q.id] || 3) as LikertScore,
    }));

    const hollandCode = calculateHollandCode(responses);

    const scorecard: Record<string, number> = {
      R: 0,
      I: 0,
      A: 0,
      S: 0,
      E: 0,
      C: 0,
    };
    responses.forEach((r) => {
      const q = riasecQuestions.find((qu) => qu.id === r.questionId);
      if (q) {
        scorecard[q.category] += r.score;
      }
    });

    const computedResult = {
      hollandCode,
      scores: scorecard,
    };

    setResult(computedResult);
    setShowConfetti(true);
    setShowResult(true);
    setHasSavedResult(true);
    localStorage.setItem("riasec_result", JSON.stringify(computedResult));
    localStorage.setItem("riasec_show_result", "true");
    localStorage.setItem("riasec_saved_result", JSON.stringify(computedResult));
    localStorage.setItem("riasec_saved_answers", JSON.stringify(answers));
  };

  const progress = ((currentQuestion + 1) / riasecQuestions.length) * 100;
  const isAnswered =
    answers[riasecQuestions[currentQuestion]?.id] !== undefined;
  const currentAnswer = answers[riasecQuestions[currentQuestion]?.id];

  const handleRetake = () => {
    setShowConfetti(false);
    setShowResult(false);
    setCurrentQuestion(0);
    setAnswers({});
    setResult(null);
    localStorage.removeItem("riasec_answers");
    localStorage.removeItem("riasec_current_question");
    localStorage.removeItem("riasec_result");
    localStorage.removeItem("riasec_show_result");
  };

  const handleRestoreResult = () => {
    const savedAnswers = localStorage.getItem("riasec_saved_answers");
    const savedResult = localStorage.getItem("riasec_saved_result");
    if (savedResult && savedAnswers) {
      try {
        const parsedAnswers = JSON.parse(savedAnswers);
        const parsedResult = JSON.parse(savedResult);
        if (
          parsedResult &&
          typeof parsedResult.hollandCode === "object" &&
          parsedResult.hollandCode !== null
        ) {
          parsedResult.hollandCode = parsedResult.hollandCode.code || "";
        }
        setAnswers(parsedAnswers);
        setResult(parsedResult);
        setShowResult(true);
        localStorage.setItem("riasec_answers", savedAnswers);
        localStorage.setItem("riasec_result", JSON.stringify(parsedResult));
        localStorage.setItem("riasec_show_result", "true");
        localStorage.removeItem("riasec_current_question");
        setCurrentQuestion(0);
      } catch (e) {
        console.error("Failed to restore saved RIASEC result:", e);
      }
    }
  };

  const handleDeleteSavedResult = () => {
    localStorage.removeItem("riasec_saved_result");
    localStorage.removeItem("riasec_saved_answers");
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
      <RiasecResultSection
        hollandCode={result.hollandCode}
        scores={result.scores}
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
          title="Career Interests Test (Holland Code / RIASEC)"
          description="Identify your top vocational themes and explore fitting career maps and study branches."
          durationText="6 Minutes"
          typeText="30 Questions"
          resultText="Holland Code Profile"
          icon={<Brain size={32} className="text-white animate-pulse" />}
        />

        <section className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
          {hasSavedResult && (
            <SavedResultBanner
              onDelete={() => setIsDeleteModalOpen(true)}
              onRestore={handleRestoreResult}
              message="You have a previously calculated Holland Code result available."
            />
          )}

          <div className="mb-8 max-w-2xl mx-auto w-full">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-semibold text-zinc-700">
                Question {currentQuestion + 1} of {riasecQuestions.length}
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
              {riasecQuestions[currentQuestion].text}
            </h2>

            <div className="mb-6 flex justify-center items-center">
              <div className="py-4">
                <div className="flex items-center justify-center gap-1.5 sm:gap-2.5 md:gap-3">
                  {scale.map(({ value, label, sublabel, nepaliSublabel }) => (
                    <div
                      key={value}
                      className="flex flex-col items-center gap-2 w-14 sm:w-16 md:w-20"
                    >
                      <span
                        className={`text-[8px] md:text-[10px] [html[lang='ne']_&]:text-sm font-bold text-zinc-500 uppercase tracking-wider text-center select-none h-4 flex items-center justify-center leading-none whitespace-nowrap ${value === 3 ? "text-zinc-400" : ""}`}
                      >
                        <span
                          translate="no"
                          className="english-label notranslate"
                        >
                          {sublabel}
                        </span>
                        <span
                          translate="no"
                          className="nepali-label notranslate"
                        >
                          {nepaliSublabel}
                        </span>
                      </span>
                      <button
                        onClick={() => handleAnswer(value)}
                        className={`flex h-12 w-full items-center justify-center rounded-lg border-2 text-xs font-bold transition-all duration-200 cursor-pointer ${
                          currentAnswer === value
                            ? value === 1
                              ? "border-red-600 bg-red-600 text-white shadow-md"
                              : value === 2
                                ? "border-red-500 bg-red-500 text-white shadow-md"
                                : value === 3
                                  ? "border-zinc-500 bg-zinc-500 text-white shadow-md"
                                  : value === 4
                                    ? "border-emerald-500 bg-emerald-500 text-white shadow-md"
                                    : "border-emerald-600 bg-emerald-600 text-white shadow-md"
                            : value === 1
                              ? "border-red-400 bg-red-50 hover:bg-red-600 hover:text-white text-zinc-800"
                              : value === 2
                                ? "border-rose-200 bg-rose-50/50 hover:bg-rose-500 hover:text-white text-zinc-800"
                                : value === 3
                                  ? "border-zinc-200 bg-zinc-50 hover:bg-zinc-400 hover:text-white text-zinc-800"
                                  : value === 4
                                    ? "border-emerald-100 bg-emerald-50/50 text-zinc-800 hover:border-emerald-300 hover:bg-emerald-300 hover:text-white"
                                    : "border-emerald-300 bg-emerald-50 text-zinc-800 hover:bg-emerald-600 hover:text-white"
                        }`}
                      >
                        {label}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-2 mb-3 md:mb-6 flex flex-col items-center gap-3">
              <p className="text-center text-xs text-zinc-500 leading-relaxed max-w-lg mx-auto">
                Rate each activity based on how much you would enjoy doing it,
                regardless of your current skills or pay.
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
              totalQuestions={riasecQuestions.length}
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
