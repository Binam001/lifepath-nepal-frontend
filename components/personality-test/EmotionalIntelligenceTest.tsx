"use client";

import { useState, useEffect } from "react";
import { CheckCircle, Brain } from "lucide-react";
import {
  selfReportQuestions,
  scenarioQuestions,
  calculateEIScores,
  EIResult,
} from "@/data/EmotionalIntelligence-test";
import EmotionalIntelligenceResultSection from "./EmotionalIntelligenceResultSection";
import ConfirmDeleteModal from "./components/ConfirmDeleteModal";
import SavedResultBanner from "./components/SavedResultBanner";
import TestHeader from "./components/TestHeader";
import TestNavigation from "./components/TestNavigation";

export default function EmotionalIntelligenceTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selfReportAnswers, setSelfReportAnswers] = useState<{
    [key: number]: number;
  }>({});
  const [scenarioAnswers, setScenarioAnswers] = useState<{
    [key: number]: string;
  }>({});
  const [result, setResult] = useState<EIResult | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [isInitialized, setIsInitialized] = useState(false);
  const [hasSavedResult, setHasSavedResult] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const totalQuestionsLength =
    selfReportQuestions.length + scenarioQuestions.length;

  const scale = [
    { value: 1, label: "100%", sublabel: "Strong Disagree" },
    { value: 2, label: "75%", sublabel: "Disagree" },
    { value: 3, label: "50%", sublabel: "Neutral" },
    { value: 4, label: "75%", sublabel: "Agree" },
    { value: 5, label: "100%", sublabel: "Strong Agree" },
  ];

  useEffect(() => {
    const savedSelfReportAnswers = localStorage.getItem(
      "ei_self_report_answers",
    );
    const savedScenarioAnswers = localStorage.getItem("ei_scenario_answers");
    const savedQuestion = localStorage.getItem("ei_current_question");
    const savedResult = localStorage.getItem("ei_result");
    const savedShowResult = localStorage.getItem("ei_show_result");

    let hasBackup = !!localStorage.getItem("ei_saved_result");

    if (savedSelfReportAnswers) {
      try {
        setSelfReportAnswers(JSON.parse(savedSelfReportAnswers));
      } catch (e) {
        console.error("Failed to parse saved EI self-report answers:", e);
      }
    }
    if (savedScenarioAnswers) {
      try {
        setScenarioAnswers(JSON.parse(savedScenarioAnswers));
      } catch (e) {
        console.error("Failed to parse saved EI scenario answers:", e);
      }
    }
    if (savedQuestion) {
      const qIndex = parseInt(savedQuestion, 10);
      if (!isNaN(qIndex) && qIndex >= 0 && qIndex < totalQuestionsLength) {
        setCurrentQuestion(qIndex);
      }
    }
    if (savedResult) {
      try {
        const parsedResult = JSON.parse(savedResult);
        setResult(parsedResult);
        if (!hasBackup && savedShowResult === "true") {
          localStorage.setItem(
            "ei_saved_self_report_answers",
            savedSelfReportAnswers || "{}",
          );
          localStorage.setItem(
            "ei_saved_scenario_answers",
            savedScenarioAnswers || "{}",
          );
          localStorage.setItem("ei_saved_result", savedResult);
          hasBackup = true;
        }
      } catch (e) {
        console.error("Failed to parse saved EI result:", e);
      }
    }
    if (savedShowResult === "true") {
      setShowResult(true);
    }
    if (hasBackup) {
      setHasSavedResult(true);
    }
    setIsInitialized(true);
  }, [totalQuestionsLength]);

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

  const handleSelfReportAnswer = (questionId: number, value: number) => {
    const updatedAnswers = {
      ...selfReportAnswers,
      [questionId]: value,
    };
    setSelfReportAnswers(updatedAnswers);
    localStorage.setItem(
      "ei_self_report_answers",
      JSON.stringify(updatedAnswers),
    );
  };

  const handleScenarioAnswer = (scenarioId: number, optionId: string) => {
    const updatedAnswers = {
      ...scenarioAnswers,
      [scenarioId]: optionId,
    };
    setScenarioAnswers(updatedAnswers);
    localStorage.setItem("ei_scenario_answers", JSON.stringify(updatedAnswers));
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestionsLength - 1) {
      const nextQuestion = currentQuestion + 1;
      setCurrentQuestion(nextQuestion);
      localStorage.setItem("ei_current_question", nextQuestion.toString());
    } else {
      calculateResult();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      const prevQuestion = currentQuestion - 1;
      setCurrentQuestion(prevQuestion);
      localStorage.setItem("ei_current_question", prevQuestion.toString());
    }
  };

  const calculateResult = () => {
    // Map scenario option selection to weight
    const userScenarioAnswersWeights: Record<number, number> = {};
    scenarioQuestions.forEach((s) => {
      const selectedOptionId = scenarioAnswers[s.id];
      if (selectedOptionId) {
        const option = s.options.find((o) => o.id === selectedOptionId);
        if (option) {
          userScenarioAnswersWeights[s.id] = option.weight;
        }
      }
    });

    const scores = calculateEIScores(
      selfReportAnswers,
      userScenarioAnswersWeights,
    );

    setResult(scores);
    setShowConfetti(true);
    setShowResult(true);
    setHasSavedResult(true);
    localStorage.setItem("ei_result", JSON.stringify(scores));
    localStorage.setItem("ei_show_result", "true");
    localStorage.setItem("ei_saved_result", JSON.stringify(scores));
    localStorage.setItem(
      "ei_saved_self_report_answers",
      JSON.stringify(selfReportAnswers),
    );
    localStorage.setItem(
      "ei_saved_scenario_answers",
      JSON.stringify(scenarioAnswers),
    );
  };

  const handleRetake = () => {
    setShowConfetti(false);
    setShowResult(false);
    setCurrentQuestion(0);
    setSelfReportAnswers({});
    setScenarioAnswers({});
    setResult(null);
    localStorage.removeItem("ei_self_report_answers");
    localStorage.removeItem("ei_scenario_answers");
    localStorage.removeItem("ei_current_question");
    localStorage.removeItem("ei_result");
    localStorage.removeItem("ei_show_result");
  };

  const handleRestoreResult = () => {
    const savedSelfReport = localStorage.getItem(
      "ei_saved_self_report_answers",
    );
    const savedScenario = localStorage.getItem("ei_saved_scenario_answers");
    const savedRes = localStorage.getItem("ei_saved_result");
    if (savedRes && savedSelfReport && savedScenario) {
      try {
        const parsedSelfReport = JSON.parse(savedSelfReport);
        const parsedScenario = JSON.parse(savedScenario);
        const parsedResult = JSON.parse(savedRes);

        setSelfReportAnswers(parsedSelfReport);
        setScenarioAnswers(parsedScenario);
        setResult(parsedResult);
        setShowResult(true);

        localStorage.setItem("ei_self_report_answers", savedSelfReport);
        localStorage.setItem("ei_scenario_answers", savedScenario);
        localStorage.setItem("ei_result", savedRes);
        localStorage.setItem("ei_show_result", "true");
        localStorage.removeItem("ei_current_question");
        setCurrentQuestion(0);
      } catch (e) {
        console.error("Failed to restore saved EI result:", e);
      }
    }
  };

  const handleDeleteSavedResult = () => {
    localStorage.removeItem("ei_saved_result");
    localStorage.removeItem("ei_saved_self_report_answers");
    localStorage.removeItem("ei_saved_scenario_answers");
    setHasSavedResult(false);
  };

  if (!isInitialized) {
    return (
      <div className="min-h-screen pt-16 bg-zinc-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 bg-white p-8 rounded-2xl border border-zinc-200 shadow-md">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-zinc-700 font-semibold text-lg animate-pulse">
            Loading your assessment progress...
          </p>
        </div>
      </div>
    );
  }

  if (showResult && result) {
    return (
      <EmotionalIntelligenceResultSection
        result={result}
        showConfetti={showConfetti}
        windowSize={windowSize}
        handleRetake={handleRetake}
        selfReportAnswers={selfReportAnswers}
        scenarioAnswers={scenarioAnswers}
      />
    );
  }

  // Determine if active question is Layer 1 (Self Report) or Layer 2 (Scenario)
  const isSelfReport = currentQuestion < selfReportQuestions.length;
  const activeQuestionIndex = isSelfReport
    ? currentQuestion
    : currentQuestion - selfReportQuestions.length;

  const currentSelfReportQ = isSelfReport
    ? selfReportQuestions[activeQuestionIndex]
    : null;
  const currentScenarioQ = !isSelfReport
    ? scenarioQuestions[activeQuestionIndex]
    : null;

  const progress = ((currentQuestion + 1) / totalQuestionsLength) * 100;
  const isAnswered = isSelfReport
    ? selfReportAnswers[currentSelfReportQ?.id ?? 0] !== undefined
    : scenarioAnswers[currentScenarioQ?.id ?? 0] !== undefined;

  const currentSelfReportVal = currentSelfReportQ
    ? selfReportAnswers[currentSelfReportQ.id]
    : undefined;
  const currentScenarioVal = currentScenarioQ
    ? scenarioAnswers[currentScenarioQ.id]
    : undefined;

  return (
    <div className="min-h-screen pt-16 bg-zinc-100 overflow-hidden flex flex-col justify-between">
      <div>
        <TestHeader
          title="Emotional Intelligence Test (EQ)"
          description="Discover your scores across 5 EQ domains, and analyze your self-awareness alignment gaps."
          durationText="8 Minutes"
          typeText="3-Layer Framework"
          resultText="40 Questions"
          icon={<Brain size={32} className="text-white animate-pulse" />}
        />

        <section className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
          {hasSavedResult && (
            <SavedResultBanner
              onDelete={() => setIsDeleteModalOpen(true)}
              onRestore={handleRestoreResult}
              message="You have a previously calculated EQ result available."
            />
          )}

          {/* Progress Section */}
          <div className="mb-8 max-w-2xl mx-auto w-full">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-semibold text-zinc-700">
                Question {currentQuestion + 1} of {totalQuestionsLength}
                {/* <span className="ml-2 text-xs text-zinc-400 font-normal">
                  (
                  {isSelfReport
                    ? "Phase 1: Self-Perception"
                    : "Phase 2: Situational Decisions"}
                  )
                </span> */}
              </span>
              <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full bg-zinc-200 rounded-full h-2.5 shadow-inner">
              <div
                className="bg-linear-to-r from-blue-600 to-blue-700 h-2.5 rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-zinc-200 shadow-md">
            {isSelfReport && currentSelfReportQ ? (
              // Phase 1 Likert Scale UI
              <div>
                <div className="mb-4 text-center">
                  <span className="inline-block text-xs font-black tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase">
                    Phase 1: Self-Perception Statement
                  </span>
                </div>
                <h2 className="text-lg md:text-2xl font-semibold text-zinc-900 text-center leading-relaxed mb-8 min-h-[64px] flex items-center justify-center">
                  {currentSelfReportQ.text}
                </h2>

                <div className="mb-6 flex justify-center items-center py-4">
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
                          onClick={() =>
                            handleSelfReportAnswer(currentSelfReportQ.id, value)
                          }
                          className={`flex h-12 w-full items-center justify-center rounded-lg border-2 text-xs font-bold transition-all duration-200 cursor-pointer ${
                            currentSelfReportVal === value
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
                                    ? "border-zinc-200 bg-zinc-50 hover:bg-zinc-450 hover:text-white text-zinc-800"
                                    : value === 4
                                      ? "border-emerald-100 bg-emerald-50/50 hover:bg-emerald-500 hover:text-white text-zinc-800"
                                      : "border-emerald-300 bg-emerald-50 hover:bg-emerald-600 hover:text-white text-zinc-800"
                          }`}
                        >
                          {label}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-center text-xs text-zinc-500 leading-relaxed max-w-lg mx-auto mb-6">
                  Select a response depending on how closely the statement
                  represents you.
                </p>
              </div>
            ) : (
              // Phase 2 Multiple Choice Scenarios UI
              currentScenarioQ && (
                <div>
                  <div className="mb-4 text-center">
                    <span className="inline-block text-xs font-black tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase">
                      Phase 2: Situational Decisions
                    </span>
                  </div>
                  <h2 className="text-lg md:text-xl font-bold text-zinc-900 leading-relaxed mb-8 max-w-2xl mx-auto">
                    {currentScenarioQ.text}
                  </h2>

                  <div className="space-y-3 md:space-y-4 max-w-2xl mx-auto mb-8">
                    {currentScenarioQ.options.map((opt) => {
                      const isSelected = currentScenarioVal === opt.id;
                      return (
                        <button
                          key={opt.id}
                          onClick={() =>
                            handleScenarioAnswer(currentScenarioQ.id, opt.id)
                          }
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
                            {opt.id.toUpperCase()}
                          </div>
                          <span className="text-sm sm:text-base leading-snug">
                            {opt.text}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-center text-xs text-zinc-500 leading-relaxed max-w-lg mx-auto mb-6">
                    Select a response depending on how you really are, not how
                    you would like to be.
                  </p>
                </div>
              )
            )}

            {/* Answer check indicator for mobile */}
            <div className="h-7 flex md:hidden items-center justify-center mb-3">
              {isAnswered && (
                <div className="flex items-center gap-1.5 text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-100">
                  <CheckCircle size={14} />
                  <span>Answered</span>
                </div>
              )}
            </div>

            <TestNavigation
              currentQuestion={currentQuestion}
              totalQuestions={totalQuestionsLength}
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
