"use client";

import Image from "next/image";
import PageTitle from "../ui/PageTitle";
import { MoveRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// const steps = [
//   {
//     leftTitle: "Confused student",
//     rightTitle: "Career clarity & guidance",
//     problem: "Too many choices, no clear direction before enrolling.",
//     solution: "We start with career clarity and map what fits you.",
//     Icon: MoveRight,
//     leftImg: "/assets/Asset5(1).svg",
//     rightImg: "/Logo/Asset2.png",
//   },
//   {
//     leftTitle: "Unclear strengths",
//     rightTitle: "Personalized direction",
//     problem: "Uncertain which path matches strengths and interests.",
//     solution: "Personal guidance turns into a focused path.",
//     Icon: MoveRight,
//     leftImg: "/assets/Asset6(1).svg",
//     rightImg: "/Logo/Asset2.png",
//   },
//   {
//     leftTitle: "Random learning",
//     rightTitle: "Structured learning",
//     problem: "Courses feel scattered without a plan or outcomes.",
//     solution: "A step-by-step roadmap builds skills in the right order.",
//     Icon: MoveRight,
//     leftImg: "/assets/Asset7(1).svg",
//     rightImg: "/Logo/Asset2.png",
//   },
//   {
//     leftTitle: "Unsure what's next steps",
//     rightTitle: "Confident next steps",
//     problem: "Unsure how to translate skills into opportunities.",
//     solution: "Portfolio, jobs, or freelancing with clear next steps.",
//     Icon: MoveRight,
//     leftImg: "/assets/Asset8(1).svg",
//     rightImg: "/Logo/Asset2.png",
//   },
// ];

const steps = [
  {
    leftTitle: "Confused student",
    rightTitle: "Career clarity & guidance",
    problem: "Too many choices, no clear direction before enrolling.",
    solution:
      "We help you understand your strengths and guide you to a clear, right path.",
    Icon: MoveRight,
    leftImg: "/assets/Asset5(1).svg",
    rightImg: "/Logo/Asset2.png",
  },
  {
    leftTitle: "Unclear strengths",
    rightTitle: "Personalized direction",
    problem: "Uncertain which path matches strengths and interests.",
    solution:
      "Through mentorship and guidance, we help you identify your strengths and turn them into a focused learning path.",
    Icon: MoveRight,
    leftImg: "/assets/Asset6(1).svg",
    rightImg: "/Logo/Asset2.png",
  },
  {
    leftTitle: "Random learning",
    rightTitle: "Structured learning",
    problem: "Courses feel scattered without a plan or outcomes.",
    solution:
      "We provide a structured roadmap so you can build practical skills step-by-step with clarity and purpose.",
    Icon: MoveRight,
    leftImg: "/assets/Asset7(1).svg",
    rightImg: "/Logo/Asset2.png",
  },
  {
    leftTitle: "Unsure what's next steps",
    rightTitle: "Confident next steps",
    problem: "Unsure how to translate skills into opportunities.",
    solution:
      "From portfolios to jobs or freelancing, we guide you on the exact next steps to turn your skills into real opportunities.",
    Icon: MoveRight,
    leftImg: "/assets/Asset8(1).svg",
    rightImg: "/Logo/Asset2.png",
  },
];

export default function ProblemSolution() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);

    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <PageTitle
          title="From confusion to clarity"
          subtitle="LifePath helps students decide first, then learn with confidence."
          titleClassName="text-3xl md:text-5xl font-semibold text-blue-600 mb-3"
          subtitleClassName="text-base md:text-lg text-zinc-700"
          containerClassName="text-center max-w-3xl mx-auto"
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mt-14">
          {steps.map((item, index) => {
            const Icon = item.Icon;
            const isOpen = hoveredIndex === index;

            if (isMobile) {
              return (
                <MobileStackedCard key={index} index={index} item={item} />
              );
            }

            return (
              <div
                key={index}
                className="group relative h-80 sm:min-h-105 rounded-[28px] overflow-hidden border border-blue-100 bg-linear-to-br from-[#0f172a] via-[#1636b8] to-[#335CFF] p-6 md:p-7 flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(51,92,255,0.22)]"
                onMouseEnter={() => {
                  if (!isMobile) {
                    setHoveredIndex(index);
                  }
                }}
                onMouseLeave={() => {
                  if (!isMobile) {
                    setHoveredIndex(null);
                  }
                }}
              >
                {/* glow */}
                <div
                  className={`absolute inset-0 transition-opacity duration-500 bg-[radial-linear(circle_at_top_right,rgba(255,255,255,0.18),transparent_35%)] ${
                    isOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}
                />

                {/* Top Label */}
                <div className="relative z-10 flex items-start justify-between">
                  {/* Problem label */}
                  <span
                    className={`inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs md:text-sm font-medium text-blue-100 backdrop-blur-sm transition-all duration-500 ${
                      isOpen ? "opacity-0" : "group-hover:opacity-0"
                    }`}
                  >
                    Problem {index + 1}
                  </span>

                  {/* Solution label */}
                  <span
                    className={`absolute rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs md:text-sm font-medium text-blue-100 backdrop-blur-sm transition-all duration-500 ${
                      isOpen
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    Solution {index + 1}
                  </span>

                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/80 transition-all duration-500 ${
                      isOpen
                        ? "bg-white text-[#335CFF]"
                        : "group-hover:bg-white group-hover:text-[#335CFF]"
                    }`}
                  >
                    <Icon size={18} />
                  </div>
                </div>
                {/* Center Image */}
                <div className="flex justify-center py-4 ">
                  <Image
                    src={isOpen ? item.rightImg : item.leftImg}
                    alt={isOpen ? item.rightTitle : item.leftTitle}
                    width={140}
                    height={140}
                    className={`h-12 sm:h-24 w-auto object-contain transition-all duration-500 ${
                      isOpen ? "opacity-75" : "opacity-50"
                    }`}
                  />
                </div>

                {/* Content */}
                <div className="relative z-10 mt-auto">
                  {/* Problem content */}
                  <div
                    className={`transition-all duration-500 ${
                      isOpen
                        ? "opacity-0 -translate-y-6"
                        : "group-hover:opacity-0 group-hover:-translate-y-12"
                    }`}
                  >
                    <h3 className="text-2xl md:text-3xl font-semibold text-white mb-3">
                      {item.leftTitle}
                    </h3>

                    <div className="h-px w-12 bg-white/30 mb-4" />

                    <p className="text-sm md:text-[15px] text-blue-50/90 leading-6">
                      {item.problem}
                    </p>
                  </div>

                  {/* Solution content */}
                  <div
                    className={`absolute inset-0 transition-all duration-500 ${
                      isOpen
                        ? "-translate-y-14 opacity-100"
                        : "translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                    }`}
                  >
                    <h3 className="text-2xl md:text-3xl font-semibold text-white mb-3">
                      {item.rightTitle}
                    </h3>

                    <div className="h-px w-12 bg-white/30 mb-4" />

                    <p className="text-sm md:text-[15px] text-blue-50/90 leading-6 ">
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

type ProblemSolutionItem = (typeof steps)[number];

type MobileStackedCardProps = {
  index: number;
  item: ProblemSolutionItem;
};

function MobileStackedCard({ index, item }: MobileStackedCardProps) {
  const [showSolution, setShowSolution] = useState(false);
  const touchStartXRef = useRef<number | null>(null);
  const touchDeltaXRef = useRef(0);
  const Icon = item.Icon;

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartXRef.current = event.touches[0]?.clientX ?? null;
    touchDeltaXRef.current = 0;
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartXRef.current === null) {
      return;
    }

    touchDeltaXRef.current =
      (event.touches[0]?.clientX ?? 0) - touchStartXRef.current;
  };

  const handleTouchEnd = () => {
    if (Math.abs(touchDeltaXRef.current) > 40) {
      setShowSolution(touchDeltaXRef.current < 0);
    }

    touchStartXRef.current = null;
    touchDeltaXRef.current = 0;
  };

  const toggleCardFace = () => {
    setShowSolution((prev) => !prev);
  };

  return (
    <div className="relative h-96 overflow-hidden ">
      <div
        className={`absolute inset-y-3 left-6 right-0 rounded-[28px] border border-blue-100 bg-linear-to-br from-[#0f172a] via-[#1636b8] to-[#335CFF] p-6 transition-all duration-500 ease-out ${
          showSolution
            ? "z-20 translate-x-0 opacity-100"
            : "z-10 translate-x-6 opacity-95"
        }`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <MobileCardFace
          badge={`Solution ${index + 1}`}
          title={item.rightTitle}
          body={item.solution}
          image={item.rightImg}
          imageAlt={item.rightTitle}
          icon={<Icon size={18} className="rotate-180" />}
          onIconClick={toggleCardFace}
        />
      </div>

      <div
        className={`absolute inset-y-0 left-0 right-6 rounded-[28px] border border-blue-100 bg-linear-to-br from-[#0f172a] via-[#1636b8] to-[#335CFF] p-6 transition-all duration-500 ease-out
           ${
             showSolution
               ? "z-10 translate-x-0 opacity-95"
               : "z-20 translate-x-0 opacity-100"
           }
            `}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <MobileCardFace
          badge={`Problem ${index + 1}`}
          title={item.leftTitle}
          body={item.problem}
          image={item.leftImg}
          imageAlt={item.leftTitle}
          icon={<Icon size={18} />}
          onIconClick={toggleCardFace}
        />
      </div>
    </div>
  );
}

type MobileCardFaceProps = {
  badge: string;
  title: string;
  body: string;
  image: string;
  imageAlt: string;
  icon: React.ReactNode;
  onIconClick: () => void;
};

function MobileCardFace({
  badge,
  title,
  body,
  image,
  imageAlt,
  icon,
  onIconClick,
}: MobileCardFaceProps) {
  return (
    <div className="relative flex h-full flex-col justify-between overflow-hidden ">
      <div className="absolute inset-0 " />

      <div className="relative z-10 flex items-start justify-between">
        <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-blue-100 ">
          {badge}
        </span>

        <button
          type="button"
          onClick={onIconClick}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white text-[#335CFF]"
        >
          {icon}
        </button>
      </div>

      <div className="relative z-10 flex justify-center pt-12 sm:pt-0 py-4">
        <Image
          src={image}
          alt={imageAlt}
          width={140}
          height={140}
          className="h-16 w-auto object-contain opacity-80"
        />
      </div>

      <div className="relative z-10 mt-auto">
        <h3 className="mb-3 text-2xl font-semibold text-white">{title}</h3>
        <div className="mb-4 h-px w-12 " />
        <p className="text-sm leading-6 text-blue-50/90">{body}</p>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40" />
    </div>
  );
}
