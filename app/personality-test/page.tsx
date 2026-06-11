"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Brain,
  Sparkles,
  ArrowRight,
  Clock,
  CheckCircle,
  Bookmark,
  UserCheck,
  TrendingUp,
  Compass,
  ArrowLeft,
  BookOpen,
} from "lucide-react";

export default function PersonalitySelectionPage() {
  const [completedCount, setCompletedCount] = useState<number | null>(null);

  useEffect(() => {
    const mbti = localStorage.getItem("mbti_saved_result");
    const ocean = localStorage.getItem("ocean_saved_result");
    const omegaverse = localStorage.getItem("omegaverse_saved_result");
    const ei = localStorage.getItem("ei_saved_result");

    let count = 0;
    if (mbti) count++;
    if (ocean) count++;
    if (omegaverse) count++;
    if (ei) count++;

    setCompletedCount(count);
  }, []);

  const tests = [
    {
      id: "mbti",
      title: "MBTI Personality Test",
      tagline: "Cognitive Functions & Career Framework",
      description:
        "Discover your cognitive style using the famous 16 personalities model. Learn how you process information, make decisions, recharge your energy, and identify high growth career paths that match your core psychological strengths.",
      duration: "7 Minutes",
      questionsCount: 48,
      badge: "Most Popular",
      mainColor: "primary",
      secondaryColor: "primary/10",
      icon: Brain,
      formatLabel: "4 Personality Dimensions",
      details: [
        "Extraversion vs Introversion",
        "Sensing vs Intuition",
        "Thinking vs Feeling",
        "Judging vs Perceiving",
      ],
      buttonLabel: "Find Your Personality",
      bookUrl: "/mbti-book",
      bookLabel: "Learn more about MBTI",
    },
    {
      id: "omegaverse",
      title: "Omegaverse Classification",
      tagline: "Social Dynamics & Traits Archetype",
      description:
        "Uncover your instinctual role in groups and hierarchies. Determine whether your natural disposition and understand your social compatibility, leadership style, and team dynamics.",
      duration: "6 Minutes",
      questionsCount: 36,
      badge: "New Assessment",
      mainColor: "primary",
      secondaryColor: "primary/10",
      icon: Sparkles,
      formatLabel: "6 Social Archetypes",
      details: ["Alpha", "Beta", "Omega", "Sigma", "Delta", "Gamma"],
      buttonLabel: "Find Your Mindset",
      bookUrl: "/omegaverse-book",
      bookLabel: "Learn more about Omegaverse",
    },
    {
      id: "ocean",
      title: "Big Five Personality Test (OCEAN)",
      tagline: "Standard Psychological Trait Model",
      description:
        "Evaluate your scores across the five major domains of human personality: Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism. Understand your baseline traits, work style, and dynamic growth profiles.",
      duration: "6 Minutes",
      questionsCount: 30,
      badge: "Scientific Standard",
      mainColor: "primary",
      secondaryColor: "primary/10",
      icon: Compass,
      formatLabel: "5 Core Personality Traits",
      details: [
        "Openness to Experience",
        "Conscientiousness",
        "Extraversion",
        "Agreeableness",
        "Neuroticism",
      ],
      buttonLabel: "Find Your Baseline",
      bookUrl: "/ocean-book",
      bookLabel: "Learn more about OCEAN",
    },
    {
      id: "ei",
      title: "Emotional Intelligence (EQ)",
      tagline: "3-Layer Behavior Assessment",
      description:
        "Evaluate your EQ across 5 domains. This test synthesizes self-report perception with scenario-based behavioral responses to identify self-awareness gaps, blind spots, and imposter patterns.",
      duration: "8 Minutes",
      questionsCount: 40,
      badge: "Self-Awareness",
      mainColor: "primary",
      secondaryColor: "primary/10",
      icon: Brain,
      formatLabel: "5 EQ Core Domains",
      details: [
        "Self-Awareness",
        "Self-Regulation",
        "Motivation",
        "Empathy",
        "Social Skills",
      ],
      buttonLabel: "Assess Your EQ",
      bookUrl: "/ei-book",
      bookLabel: "Learn more about EQ",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-50/70 pt-16 pb-16">
      {/* Header section with modern gradient design */}
      <section className="relative overflow-hidden py-16 bg-linear-to-l from-primary to-black bg-black text-white">
        {/* Abstract background blur shapes */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">
            Discover Your True Self
          </h1>
          <p className="text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto font-light leading-relaxed">
            Take our premium, scientifically inspired assessments and
            personality tests to understand your traits, behaviors, career
            alignment, and compatibility.
          </p>
        </div>
      </section>

      {/* Grid listing the tests */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Synthesis Dashboard Promo Banner */}
        {/* Synthesis Dashboard Promo Banner */}
        {completedCount !== null && completedCount > 0 && (
          <div className="bg-linear-to-r from-blue-500/10 via-purple-500/5 to-transparent border border-zinc-200/80 rounded-3xl p-6 sm:p-8 mb-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs relative overflow-hidden animate-in fade-in duration-300">
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-2xl pointer-events-none"></div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20">
                <Sparkles size={24} className="animate-pulse" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-zinc-950 mb-1">
                  {completedCount === 3
                    ? "Congrats! You have completed all tests"
                    : "Unlock Your Triple Alignment Dashboard"}
                </h3>
                <p className="text-sm text-zinc-500 max-w-xl leading-relaxed">
                  {completedCount === 3
                    ? "Now see the complete comparison aligned dashboard."
                    : "Test more to see a complete comparison aligned dashboard."}
                </p>
              </div>
            </div>
            <Link
              href="/personality-test/comparison"
              className="shrink-0 w-full md:w-auto"
            >
              <button className="w-full md:w-auto py-3 px-6 font-bold rounded-full bg-primary hover:bg-primary/90 text-white text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm">
                {completedCount === 3
                  ? "See Complete Dashboard"
                  : "View Comparison Dashboard"}
                <ArrowRight size={16} />
              </button>
            </Link>
          </div>
        )}
        {/* <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch max-w-2xl md:max-w-none mx-auto"> */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto justify-center">
          {tests.map((test, index) => {
            const IconComponent = test.icon;
            const shadowColor =
              test.mainColor === "primary" ? "blue-500" : "blue-500";

            return (
              <div
                key={test.id}
                className="bg-white rounded-2xl border-2 border-zinc-200/85 p-8 flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-xl hover:border-primary/60 hover:-translate-y-1 group relative w-full md:max-w-lg mx-auto"
              >
                {/* Badge top-right */}
                {/*  <div className="absolute top-6 right-6">
                 <span
                    className={`text-xs font-bold px-3 py-1 rounded-full border bg-${test.secondaryColor} text-${test.mainColor} border-${test.secondaryColor} uppercase tracking-wider`}
                  >
                    {test.badge}
                  </span> 
                  
                </div>*/}

                <div>
                  <div className="flex items-center justify-between mb-6">
                    {/* Icon */}
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center border bg-${test.secondaryColor} text-${test.mainColor} border-${test.secondaryColor} transition-transform duration-300 group-hover:scale-110`}
                    >
                      <IconComponent size={24} />
                    </div>
                    <p className="text-xs font-bold text-zinc-500">
                      {test.duration} - {test.questionsCount} Questions
                    </p>
                  </div>

                  {/* Title & Tagline */}
                  <h2
                    className={`text-2xl font-bold text-zinc-950 mb-1 group-hover:text-${test.mainColor} transition-colors`}
                  >
                    {test.title}
                  </h2>
                  <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-4">
                    {test.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-zinc-600 text-sm leading-relaxed mb-6 font-medium">
                    {test.description}
                  </p>

                  {/* Format detailed badges */}
                  <div className="mb-8">
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3">
                      {test.formatLabel}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {test.details.map((detail, index) => (
                        <span
                          key={index}
                          className="text-[11px] font-semibold px-2.5 py-1 bg-primary/5 border border-zinc-200/60 rounded-full text-zinc-600 hover:bg-primary/5 hover:border-primary/20 hover:text-primary transition-all duration-200"
                        >
                          {detail}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="mt-auto flex flex-col gap-2.5">
                  <Link href={`/personality-test/${test.id}`} className="block">
                    <button
                      className={`w-full py-3.5 px-6 font-bold rounded-full transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-lg bg-${test.mainColor} hover:bg-${test.mainColor}/90 text-white shadow-${shadowColor}/20`}
                    >
                      {test.buttonLabel}
                      <ArrowRight size={18} />
                    </button>
                  </Link>

                  {test.id === "ocean" || test.id === "ei" ? (
                    <button
                      disabled
                      className="w-full py-3.5 px-6 font-bold rounded-full border border-zinc-200 text-zinc-400 bg-zinc-50 text-sm flex items-center justify-center gap-1.5 cursor-not-allowed"
                    >
                      Coming Soon
                    </button>
                  ) : (
                    <Link href={test.bookUrl} className="block">
                      <button className="w-full py-3.5 px-6 font-bold rounded-full border border-zinc-300 hover:border-zinc-400 text-zinc-700 hover:bg-zinc-50 transition-all text-sm flex items-center justify-center gap-1.5 cursor-pointer bg-white">
                        {/* <BookOpen size={16} /> */}
                        {test.bookLabel}
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Informative Grid detailing benefits */}
        <section className="mt-16 bg-white rounded-3xl border border-zinc-200/80 p-8 md:p-12 shadow-sm">
          <h2 className="text-2xl font-bold text-zinc-950 mb-8 text-center">
            Why Analyze Your Personality?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4 border border-blue-100">
                <UserCheck size={22} />
              </div>
              <h3 className="font-bold text-zinc-900 mb-2">Self-Awareness</h3>
              <p className="text-sm text-zinc-500 leading-relaxed max-w-xs">
                Recognize your cognitive biases, stress triggers, communication
                style, and fundamental traits.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-4 border border-purple-100">
                <TrendingUp size={22} />
              </div>
              <h3 className="font-bold text-zinc-900 mb-2">Career Alignment</h3>
              <p className="text-sm text-zinc-500 leading-relaxed max-w-xs">
                Match your core cognitive traits to optimal career roadmaps, job
                training fields, and industries.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mb-4 border border-amber-100">
                <Compass size={22} />
              </div>
              <h3 className="font-bold text-zinc-900 mb-2">
                Social Compatibility
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed max-w-xs">
                Learn how your traits complement and conflict with partners,
                coworkers, and group environments.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
