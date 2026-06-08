"use client";

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
} from "lucide-react";

export default function PersonalitySelectionPage() {
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
    },
    {
      id: "omegaverse",
      title: "Omegaverse Classification",
      tagline: "Social Dynamics & Traits Archetype",
      description:
        "Uncover your instinctual role in groups and hierarchies. Determine whether your natural disposition and understand your social compatibility, leadership style, and team dynamics.",
      duration: "3 Minutes",
      questionsCount: 24,
      badge: "New Assessment",
      mainColor: "primary",
      secondaryColor: "primary/10",
      icon: Sparkles,
      formatLabel: "6 Social Archetypes",
      details: ["Alpha", "Beta", "Omega", "Sigma", "Delta", "Gamma"],
      buttonLabel: "Find Your Mindset",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-50/70 pt-20 pb-16">
      {/* Header section with modern gradient design */}
      <section className="relative overflow-hidden py-16 bg-linear-to-l from-primary to-black bg-black text-white">
        {/* Abstract background blur shapes */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none"></div>

        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
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
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {tests.map((test) => {
            const IconComponent = test.icon;
            const shadowColor =
              test.mainColor === "primary" ? "blue-500" : "blue-500";

            return (
              <div
                key={test.id}
                className={`bg-white rounded-[36px] border-2 border-zinc-200/85 p-8 flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-xl hover:border-primary/60 hover:-translate-y-1 group relative`}
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

                  {/* Stats */}
                  {/* <div className="grid grid-cols-2 gap-4 border-y border-zinc-100 py-4 mb-6">
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-zinc-400" />
                      <div>
                        <p className="text-[10px] font-bold text-zinc-400 uppercase leading-none">
                          Duration
                        </p>
                        <p className="text-xs font-bold text-zinc-800 mt-1">
                          {test.duration}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bookmark size={16} className="text-zinc-400" />
                      <div>
                        <p className="text-[10px] font-bold text-zinc-400 uppercase leading-none">
                          Length
                        </p>
                        <p className="text-xs font-bold text-zinc-800 mt-1">
                          {test.questionsCount} Questions
                        </p>
                      </div>
                    </div>
                  </div> */}

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

                {/* Button */}
                <div className="mt-auto">
                  <Link href={`/personality-test/${test.id}`} className="block">
                    <button
                      className={`w-full py-3.5 px-6 font-bold rounded-full transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-lg bg-${test.mainColor} hover:bg-${test.mainColor}/90 text-white shadow-${shadowColor}/20`}
                    >
                      {test.buttonLabel}
                      <ArrowRight size={18} />
                    </button>
                  </Link>
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
