"use client";

import Image from "next/image";
import PageTitle from "../ui/PageTitle";
import { MoveRight } from "lucide-react";
import { useState } from "react";

const steps = [
  {
    leftTitle: "Confused student",
    rightTitle: "Career clarity & guidance",
    problem: "Too many choices, no clear direction before enrolling.",
    solution: "We start with career clarity and map what fits you.",
    Icon: MoveRight,
    leftImg: "/Lifepath/Asset5.png",
    rightImg: "/Logo/Asset2.png",
  },
  {
    leftTitle: "Unclear strengths",
    rightTitle: "Personalized direction",
    problem: "Uncertain which path matches strengths and interests.",
    solution: "Personal guidance turns into a focused path.",
    Icon: MoveRight,
    leftImg: "/Lifepath/Asset6.png",
    rightImg: "/Logo/Asset2.png",
  },
  {
    leftTitle: "Random learning",
    rightTitle: "Structured learning",
    problem: "Courses feel scattered without a plan or outcomes.",
    solution: "A step-by-step roadmap builds skills in the right order.",
    Icon: MoveRight,
    leftImg: "/Lifepath/Asset7.png",
    rightImg: "/Logo/Asset2.png",
  },
  {
    leftTitle: "Unsure what's next steps",
    rightTitle: "Confident next steps",
    problem: "Unsure how to translate skills into opportunities.",
    solution: "Portfolio, jobs, or freelancing with clear next steps.",
    Icon: MoveRight,
    leftImg: "/Logo/Asset8.png",
    rightImg: "/Logo/Asset2.png",
  },
];

export default function ProblemSolution() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <PageTitle
          title="From confusion to career clarity"
          subtitle="LifePath helps students decide first, then learn with confidence."
          titleClassName="text-3xl md:text-5xl font-semibold text-blue-600 mb-3"
          subtitleClassName="text-base md:text-lg text-zinc-700"
          containerClassName="text-center max-w-3xl mx-auto"
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mt-14">
          {steps.map((item, index) => {
            const Icon = item.Icon;

            return (
              <div
                key={index}
                className="group relative min-h-105 rounded-[28px] overflow-hidden border border-blue-100 bg-linear-to-br from-[#0f172a] via-[#1636b8] to-[#335CFF] p-6 md:p-7 flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(51,92,255,0.22)]"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-linear(circle_at_top_right,rgba(255,255,255,0.18),transparent_35%)]" />

                {/* Top Label */}
                <div className="relative z-10 flex items-start justify-between">
                  {/* Problem label */}
                  <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs md:text-sm font-medium text-blue-100 backdrop-blur-sm transition-all duration-500 group-hover:opacity-0">
                    Problem {index + 1}
                  </span>

                  {/* Solution label */}
                  <span className="absolute rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs md:text-sm font-medium text-blue-100 backdrop-blur-sm opacity-0 transition-all duration-500 group-hover:opacity-100">
                    Solution {index + 1}
                  </span>

                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/80 transition-all duration-500 group-hover:bg-white group-hover:text-[#335CFF]">
                    <Icon size={18} />
                  </div>
                </div>
                {/* Center Image */}
                <div className="flex justify-center py-4 ">
                  <Image
                    src={hoveredIndex === index ? item.rightImg : item.leftImg}
                    alt={
                      hoveredIndex === index ? item.rightTitle : item.leftTitle
                    }
                    width={140}
                    height={140}
                    className={`h-24 w-auto object-contain transition-all duration-500 ${
                      hoveredIndex === index ? "opacity-75" : "opacity-50"
                    }`}
                  />
                </div>

                {/* Content */}
                <div className="relative z-10 mt-auto">
                  {/* Problem content */}
                  <div className="transition-all duration-500 group-hover:opacity-0 group-hover:-translate-y-6">
                    <h3 className="text-2xl md:text-3xl font-semibold text-white mb-3">
                      {item.leftTitle}
                    </h3>

                    <div className="h-px w-12 bg-white/30 mb-4" />

                    <p className="text-sm md:text-[15px] text-blue-50/90 leading-6">
                      {item.problem}
                    </p>
                  </div>

                  {/* Solution content */}
                  <div className="absolute inset-0 translate-y-8 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <h3 className="text-2xl md:text-3xl font-semibold text-white mb-3">
                      {item.rightTitle}
                    </h3>

                    <div className="h-px w-12 bg-white/30 mb-4" />

                    <p className="text-sm md:text-[15px] text-blue-50/90 leading-6">
                      {item.solution}
                    </p>
                  </div>
                </div>

                {/* bottom blur */}
                <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-black/25 to-transparent pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
