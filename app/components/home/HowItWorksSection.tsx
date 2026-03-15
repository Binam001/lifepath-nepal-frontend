"use client";

import Image from "next/image";
import { MoveRight } from "lucide-react";
import PageTitle from "../ui/PageTitle";

const steps = [
  {
    step: "Step 01",
    title: "Know Yourself Deeply",
    description:
      "Science-backed assessments reveal how you think, what energizes you.",
    image: "/Lifepath/image1.png",
    variant: "wide",
  },
  {
    step: "Step 02",
    title: "Choose the Right Path",
    description:
      "Match your personality and interests to careers that truly fit you.",
    variant: "small",
    image: "/Lifepath/image2.png",
  },
  {
    step: "Step 03",
    title: "Build Real Life Skills",
    description:
      "Hands-on projects, real tools, and mentorship that keep you moving.",
    variant: "small",
    image: "/heroImages/happy.png",
  },
  {
    step: "Step 04",
    title: "From Learning to Earning",
    description:
      "Finish ready for paid work, freelancing, or a confident career.",
    image: "/heroImages/life3.png",
    variant: "wideBottom",
  },
];

type StepCard = (typeof steps)[number];

type CardProps = {
  step: StepCard["step"];
  title: StepCard["title"];
  description: StepCard["description"];
  image?: StepCard["image"];
  className?: string;
};

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-0">
        <PageTitle
          title="From self-discovery to paid work, no guesswork, just momentum"
          subtitle="Discover your strengths, choose the right path, and take confident steps toward a fulfilling career."
          titleClassName="text-3xl md:text-5xl font-semibold text-blue-600 mb-3"
          subtitleClassName="text-base md:text-lg text-zinc-700"
          containerClassName="text-center max-w-3xl mx-auto"
          align="center"
        />

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-4">
          {steps.map((item, index) => (
            <HoverCard2
              key={index}
              step={item.step}
              title={item.title}
              description={item.description}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({ step, title, description, image, className = "" }: CardProps) {
  return (
    <div
      className={`group relative flex min-h-105 flex-col justify-between overflow-hidden rounded-[28px] border border-blue-100 bg-linear-to-br from-[#0f172a] via-[#1636b8] to-[#335CFF] p-6 md:p-7 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(51,92,255,0.22)] ${className}`}
    >
      <div className="relative z-10 flex items-start justify-between">
        <span className="inline-flex rounded-full border border-white/20   py-1 text-xs font-medium text-blue-100 backdrop-blur-sm md:text-sm">
          {step}
        </span>

        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15  text-white/80 transition-all duration-500 group-hover:bg-white group-hover:text-[#335CFF]">
          <MoveRight size={18} />
        </div>
      </div>

      <div className="relative z-10 flex justify-center overflow-hidden py-4">
        {image && (
          <Image
            src={image}
            alt={title}
            width={140}
            height={140}
            className="h-24 w-auto z-20 object-top object-cover opacity-70 transition-all duration-500 group-hover:opacity-100"
          />
        )}
      </div>

      <div className="relative z-10 mt-auto">
        <div className="transition-all duration-500 group-hover:-translate-y-6 group-hover:opacity-0">
          <h3 className="mb-3 text-2xl font-semibold text-white md:text-3xl">
            {title}
          </h3>
          <div className="mb-4 h-px w-12 bg-white/30" />
          <p className="text-sm leading-6 text-blue-50/90 md:text-[15px]">
            {description}
          </p>
        </div>

        <div className="absolute inset-0 translate-y-8 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <h3 className="mb-3 text-2xl font-semibold text-white md:text-3xl">
            {title}
          </h3>
          <div className="mb-4 h-px w-12 bg-white/30" />
          <p className="text-sm leading-6 text-blue-50/90 md:text-[15px]">
            {description}
          </p>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-black/25 to-transparent" />
    </div>
  );
}

type HoverCardProps = {
  step: string;
  title: string;
  description: string;
  image?: string;
  className?: string;
  darkOverlay?: boolean;
  greenOverlay?: boolean;
  textDark?: boolean;
  textLight?: boolean;
};

function HoverCard({
  step,
  title,
  description,
  image,
  className = "",
  darkOverlay = false,
  greenOverlay = false,
  textDark = false,
  textLight = false,
}: HoverCardProps) {
  return (
    <div
      className={`group relative overflow-hidden rounded-[28px] min-h-120 ${className}`}
    >
      <div
        className={`absolute inset-0 ${
          darkOverlay
            ? "bg-linear-to-br from-[#0f172a] via-[#1636b8] to-[#335CFF]"
            : greenOverlay
              ? "bg-linear-to-br from-[#0b3b7a] via-[#0f7ae5] to-[#35b6ff]"
              : "bg-linear-to-br from-[#0f172a] via-[#1636b8] to-[#335CFF]"
        }`}
      />

      <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />

      {image && (
        <Image
          src={image}
          alt={title}
          fill
          className="z-10 object-contain object-top transition-transform duration-700 group-hover:scale-105"
        />
      )}

      <div className="absolute inset-0 p-2 flex flex-col justify-between z-20">
        <span
          className={`w-fit rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-sm font-semibold tracking-wide backdrop-blur-md ${
            textDark ? "text-white" : textLight ? "text-white" : "text-white"
          }`}
        >
          {step}
        </span>
      </div>

      <div className="absolute inset-0 z-30 flex items-end p-2 pointer-events-none">
        <div className="relative w-fit max-w-full min-h-28 rounded-[24px] border border-white/15 bg-white/10 px-4 py-4 backdrop-blur-md">
          <div className="transition-all duration-500 group-hover:-translate-y-6 group-hover:opacity-0">
            <h3
              className={`text-2xl md:text-3xl pb-3 font-semibold leading-tight max-w-[14ch] ${
                textDark ? "text-white" : "text-white"
              }`}
            >
              {title}
            </h3>
          </div>

          <div className="absolute inset-0 px-4 py-4 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <div
              className={`w-12 h-px mb-4 ${textDark ? "bg-white" : "bg-white"}`}
            />
            <p
              className={`text-sm md:text-base leading-6 max-w-[30ch] ${
                textDark ? "text-white" : "text-white"
              }`}
            >
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HoverCard2({
  step,
  title,
  description,
  image,
  className = "",
}: HoverCardProps) {
  return (
    <div
      className={`group relative min-h-[450px] w-full cursor-pointer overflow-hidden rounded-[32px] border border-white/10 bg-linear-to-br from-[#0f172a] via-[#1636b8] to-[#335CFF] transition-all duration-500 hover:shadow-2xl ${className}`}
    >
      {/* 1. Background Image - Now Visible */}
      {image && (
        <div className="absolute inset-0 z-0">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover opacity-80 transition-transform duration-1000 group-hover:scale-110"
          />
          {/* Subtle dark overlay to ensure text legibility */}
          {/* <div className="absolute inset-0 bg-linear-to-b from-[#0f172a]/2 via-[#0f172a]/4 to-[#0f172a]" /> */}
        </div>
      )}

      {/* 2. Content Wrapper */}
      <div className="relative z-10 flex h-full flex-col justify-between">
        {/* Top: Step Badge - Pushed to top-left with consistent padding */}
        <div className="p-6">
          <div className="inline-block rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md">
            {step}
          </div>
        </div>

        {/* Bottom: Glassmorphic Block - Edge-to-Edge feel */}
        <div className="p-4 transition-transform duration-500 group-hover:-translate-y-2">
          <div className="relative overflow-hidden rounded-[24px] border border-white/20 bg-white/10 p-5 backdrop-blur-2xl shadow-2xl transition-all duration-500">
            {/* Glossy Top-Light Reflection */}
            <div className="absolute inset-0 bg-linear-to-br from-white/15 to-transparent pointer-events-none" />

            <h3 className="relative z-10 text-xl font-bold tracking-tight text-white md:text-2xl">
              {title}
            </h3>

            {/* Description: Zero-latency Expandable Grid */}
            <div className="grid transition-all duration-500 ease-in-out grid-rows-[0fr] group-hover:grid-rows-[1fr]">
              <div className="overflow-hidden opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:mt-3">
                <p className="text-sm leading-relaxed text-zinc-200">
                  {description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function Final() {
  const finalStep = steps[3];

  return (
    <div className="group max-w-sm overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Image Section */}
      <div className="relative h-48 w-full overflow-hidden bg-linear-to-br from-[#0f172a] via-[#1636b8] to-[#335CFF]">
        <Image
          src={finalStep.image}
          alt={finalStep.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h3 className="mb-2 text-xl font-bold tracking-tight text-zinc-900">
          {finalStep.title}
        </h3>
        <p className="text-sm leading-relaxed text-zinc-600">
          {finalStep.description}
        </p>
      </div>
    </div>
  );
}
