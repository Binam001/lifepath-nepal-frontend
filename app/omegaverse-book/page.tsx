import React from "react";
import Link from "next/link";
import {
  Crown,
  Shield,
  Sparkles,
  Brain,
  ListChecks,
  Compass,
  ArrowLeft,
  CheckCircle,
  BookMarked,
} from "lucide-react";
import { omegaverseTypes, OmegaverseType } from "@/data/omegaverse-data";

const dynamicIcons: Record<
  string,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  ALPHA: Crown,
  BETA: Shield,
  OMEGA: Sparkles,
  SIGMA: Brain,
  DELTA: ListChecks,
  GAMMA: Compass,
};

const dynamicColors: Record<
  string,
  { bg: string; text: string; gradient: string; lightBg: string }
> = {
  ALPHA: {
    bg: "bg-blue-600",
    text: "text-blue-600",
    gradient: "from-blue-600 to-indigo-600",
    lightBg: "bg-blue-50",
  },
  BETA: {
    bg: "bg-blue-600",
    text: "text-blue-600",
    gradient: "from-blue-600 to-indigo-600",
    lightBg: "bg-blue-50",
  },
  OMEGA: {
    bg: "bg-blue-600",
    text: "text-blue-600",
    gradient: "from-blue-600 to-indigo-600",
    lightBg: "bg-blue-50",
  },
  SIGMA: {
    bg: "bg-blue-600",
    text: "text-blue-600",
    gradient: "from-blue-600 to-indigo-600",
    lightBg: "bg-blue-50",
  },
  DELTA: {
    bg: "bg-blue-600",
    text: "text-blue-600",
    gradient: "from-blue-600 to-indigo-600",
    lightBg: "bg-blue-50",
  },
  GAMMA: {
    bg: "bg-blue-600",
    text: "text-blue-600",
    gradient: "from-blue-600 to-indigo-600",
    lightBg: "bg-blue-50",
  },
};

export default function OmegaverseBookPage() {
  return (
    <main className="min-h-screen bg-linear-to-b from-white via-slate-50 to-slate-100 text-slate-900 pt-16">
      {/* Hero Banner */}
      <section className="bg-linear-to-l from-blue-700 to-black px-6 py-16 xl:py-24 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <div className="flex justify-center mb-6">
            <span className="inline-flex rounded-full bg-white px-4 py-1 text-sm font-medium text-slate-600 shadow-sm">
              Guidebook
            </span>
          </div>

          <h1 className="mt-6 text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight text-white">
            Guide to the 6 Social Dynamics
          </h1>

          <p className="mt-6 text-base leading-7 text-slate-200 sm:text-lg">
            Explore the core behaviors, strengths, work styles, and
            compatibility structures of the Alpha, Beta, Omega, Sigma, Delta,
            and Gamma archetypes.
          </p>

          <div className="mt-8 flex justify-center">
            <Link
              href="/personality-test"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Personality Test
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20 md:px-8">
        {/* Introduction */}
        <div className="py-8 space-y-2">
          <h2 className="text-xl xl:text-2xl font-semibold text-slate-950">
            What is the Omegaverse Model?
          </h2>
          <p className="text-slate-600 leading-relaxed text-base md:text-lg">
            Originating as a dynamic behavioral framework, the social dynamics
            system classifies individuals based on their leadership disposition,
            emotional intelligence, independence preferences, and role within
            team collaboration. It offers unique insights into group alignment,
            leadership behavior, and social compatibility.
          </p>
        </div>
        {/* Dynamic Types Grid */}
        <h2 className="text-xl xl:text-2xl font-semibold text-slate-950 mb-4">
          The 6 Social Archetypes
        </h2>

        <div className="grid gap-8 grid-cols-1">
          {Object.entries(omegaverseTypes).map(([key, profile]) => {
            const Icon = dynamicIcons[key] || Sparkles;
            const colors = dynamicColors[key] || {
              bg: "bg-blue-600",
              text: "text-blue-600",
              gradient: "from-blue-600 to-indigo-600",
              lightBg: "bg-blue-50",
            };

            return (
              <div
                key={key}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Card Header with unified blue gradient */}
                  <div
                    className={`bg-linear-to-r ${colors.gradient} px-6 py-6 text-white md:px-8 flex items-center justify-between`}
                  >
                    <div>
                      <h3 className="text-2xl xl:text-[1.8vw] font-bold mt-0.5">
                        {profile.name}
                      </h3>
                      <p className="text-base font-semibold text-white/80 mt-1 leading-snug">
                        {profile.tagline}
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white backdrop-blur-xs">
                      <Icon size={24} />
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 md:p-8 space-y-6">
                    <div>
                      <p className="text-xl xl:text-[1.4vw] font-semibold mb-1">
                        Overview
                      </p>
                      <p className="text-sm xl:text-[1vw] text-slate-600 leading-relaxed">
                        {profile.detailedDescription}
                      </p>
                    </div>

                    <div>
                      <p className="text-xl xl:text-[1.4vw] font-semibold mb-2">
                        Key Strengths
                      </p>
                      <div className="space-y-2.5">
                        {profile.strengths.map((strength, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <CheckCircle
                              size={18}
                              className="text-green-600 shrink-0 mt-0.5"
                              strokeWidth={2}
                            />
                            <p className="text-sm xl:text-[1vw] text-slate-600 leading-relaxed">
                              {strength}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-xl xl:text-[1.4vw] font-semibold mb-2">
                        Growth Challenges
                      </p>
                      <div className="space-y-2.5">
                        {profile.weaknesses.map((weakness, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                              <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                            </div>
                            <p className="text-sm xl:text-[1vw] text-slate-600 leading-relaxed">
                              {weakness}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <div>
                        <span className="text-xl xl:text-[1.4vw] font-semibold block">
                          Work Style
                        </span>
                        <span className="text-sm xl:text-[1vw] text-zinc-700 leading-normal block">
                          {profile.workStyle}
                        </span>
                      </div>
                      <div>
                        <span className="text-xl xl:text-[1.4vw] font-semibold block mb-2">
                          Careers
                        </span>
                        <div className="grid sm:grid-cols-2 gap-2">
                          {profile.careers.map((career, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl border border-slate-150 transition-all hover:border-blue-200"
                            >
                              <CheckCircle
                                size={14}
                                className="text-blue-600 shrink-0"
                              />
                              <span className="text-sm font-semibold text-slate-750">
                                {career}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-strat justify-between">
                      <span className="font-semibold">
                        Ideal Match:{" "}
                        <span className={colors.text}>
                          {profile.compatibility.bestMatch}
                        </span>
                      </span>
                      <span className="font-semibold">
                        Good Match:{" "}
                        <span className="text-slate-700">
                          {profile.compatibility.goodMatch}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
