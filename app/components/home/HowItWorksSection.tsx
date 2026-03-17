"use client";

import Image from "next/image";
// import { MoveRight } from "lucide-react";
import PageTitle from "../ui/PageTitle";
import { useEffect, useState } from "react";

const steps = [
  {
    step: "Step 01",
    title: "Know Yourself Deeply",
    description:
      "Understand your strengths, interests, and how you naturally think so you can choose a direction with confidence.",
    image: "/assets/wone.png",
    variant: "wide",
  },
  {
    step: "Step 02",
    title: "Choose the Right Path",
    description:
      "Get clear guidance to choose a career path that truly fits your personality, interests, and long-term goals.",
    variant: "small",
    image: "/assets/new.png",
  },
  {
    step: "Step 03",
    title: "Build Real Life Skills",
    description:
      "Learn practical skills through guided projects, real tools, and mentorship designed to prepare you for the real world.",
    variant: "small",
    image: "/assets/newone.png",
  },
  {
    step: "Step 04",
    title: "From Learning to Earning",
    description:
      "Move from learning to real opportunities with portfolios, freelancing, internships, or job-ready experience.",
    image: "/assets/jobone.png",
    variant: "wideBottom",
  },
];

// type StepCard = (typeof steps)[number];

// type CardProps = {
//   step: StepCard["step"];
//   title: StepCard["title"];
//   description: StepCard["description"];
//   image?: StepCard["image"];
//   className?: string;
// };

export default function HowItWorksSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
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
    <section id="how-it-works" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-0">
        <PageTitle
          title="Shape your future"
          subtitle="Discover your strengths, choose the right path, and take confident steps toward a fulfilling career."
          titleClassName="text-3xl md:text-5xl font-semibold text-blue-600 mb-3"
          subtitleClassName="text-base md:text-lg text-zinc-700"
          containerClassName="text-center max-w-3xl mx-auto"
          align="center"
        />

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-4">
          {/* {steps.map((item, index) => (
            <CardDemo
              key={index}
              step={item.step}
              title={item.title}
              description={item.description}
              image={item.image}
            />
          ))} */}
          {/* {steps.map((item, index) => (
            <Card
              key={index}
              step={item.step}
              title={item.title}
              description={item.description}
              image={item.image}
            />
          ))} */}
          {steps.map((item, index) => (
            <HoverCard
              key={index}
              step={item.step}
              title={item.title}
              description={item.description}
              image={item.image}
              isOpen={activeIndex === index}
              onToggle={() => {
                if (isMobile) {
                  setActiveIndex((prev) => (prev === index ? null : index));
                }
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// function Card({ step, title, description, image, className = "" }: CardProps) {
//   return (
//     <div
//       className={`group relative min-h-[440px] overflow-hidden rounded-[28px] border border-blue-100/20 bg-linear-to-br from-[#0f172a] via-[#1636b8] to-[#335CFF] p-6 md:p-7 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(51,92,255,0.22)] ${className}`}
//     >
//       {/* Hover background image */}
//       {image && (
//         <div className="absolute inset-0 z-0">
//           <Image
//             src={image}
//             alt={title}
//             fill
//             className="object-cover object-center opacity-0 scale-110 transition-all duration-500 group-hover:h-[200px] group-hover:opacity-100"
//           />
//         </div>
//       )}

//       {/* Dark overlay */}
//       <div className="absolute inset-0 z-1 bg-black/0 transition-all duration-500 group-hover:bg-black/45" />

//       {/* Bottom fade for readability */}
//       <div className="pointer-events-none absolute inset-x-0 bottom-0 z-2 h-48 bg-linear-to-t from-black/75 via-black/30 to-transparent" />

//       {/* Main content */}
//       <div className="relative z-10 flex h-full min-h-[390px] flex-col justify-between">
//         {/* Top row */}
//         <div className="flex items-start justify-between">
//           <span className="inline-flex rounded-full border border-white/20 px-3 py-1 text-xs font-medium text-blue-100 backdrop-blur-sm md:text-sm">
//             {step}
//           </span>
//         </div>

//         {/* Bottom content */}
//         <div className="relative mt-auto overflow-hidden">
//           <div className="max-h-[96px] translate-y-4 transition-all duration-500 group-hover:max-h-[236px] group-hover:translate-y-0">
//             <h3 className="mb-3 text-2xl font-semibold text-white md:text-3xl">
//               {title}
//             </h3>
//             <div className="h-px w-12 bg-white/30" />
//             <p className="mt-4 text-sm leading-6 text-blue-50/90 md:text-[15px]">
//               {description}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

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
  isOpen?: boolean;
  onToggle?: () => void;
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
  isOpen = false,
  onToggle,
}: HoverCardProps) {
  return (
    <div
      className={`group relative overflow-hidden rounded-[28px] min-h-120 ${className}`}
      onClick={onToggle}
    >
      <div
        className={`absolute inset-0 ${
          darkOverlay
            ? "bg-linear-to-br from-[#0f172a] via-[#1636b8] to-[#335CFF]"
            : greenOverlay
              ? "bg-linear-to-br from-[#0b3b7a] via-[#0f7ae5] to-[#35b6ff]"
              : "bg-linear-to-br from-[#0f172a]/80 via-[#1636b8] to-[#335CFF]"
        }`}
      />

      <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />

      {image && (
        <Image
          src={image}
          alt={title}
          fill
          className={`z-10 object-contain object-top transition-transform duration-700 ${
            isOpen ? "scale-105" : "group-hover:scale-105"
          }`}
        />
      )}

      <div className="absolute inset-0 p-4 flex flex-col justify-between z-20">
        <span
          className={`w-fit rounded-full border border-white/15 bg-white/10 p-1 text-sm font-semibold tracking-wide backdrop-blur-md ${
            textDark ? "text-white" : textLight ? "text-white" : "text-white"
          }`}
        >
          {step}
        </span>
      </div>
      {/* Card Content */}
      <div className="absolute inset-0 z-30 flex items-end p-2 pointer-events-none overflow-hidden ">
        <div
          className={`relative w-full max-w-full rounded-[24px] border border-white/15 bg-white/10 px-4 py-4 backdrop-blur-md transition-all duration-500 ${
            isOpen ? "min-h-36" : "min-h-28 group-hover:min-h-36"
          }`}
        >
          <div
            className={`transition-all duration-500 ${
              isOpen
                ? "-translate-y-6 opacity-0"
                : "group-hover:-translate-y-6 group-hover:opacity-0"
            }`}
          >
            <h3
              className={`text-2xl md:text-3xl pb-3 font-semibold leading-tight max-w-[14ch] ${
                textDark ? "text-white" : "text-white"
              }`}
            >
              {title}
            </h3>
          </div>

          <div
            className={`absolute inset-0 px-4 py-4 transition-all duration-500 ${
              isOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
            }`}
          >
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

// export function HoverCard2({
//   step,
//   title,
//   description,
//   image,
//   className = "",
// }: HoverCardProps) {
//   return (
//     <div
//       className={`group relative min-h-120 w-full cursor-pointer overflow-hidden rounded-[32px] border border-white/10 bg-linear-to-br from-[#0f172a] via-[#1636b8] to-[#335CFF] transition-all duration-500 hover:shadow-2xl ${className}`}
//     >
//       {/* 1. Background Image */}
//       {image && (
//         <div className="absolute inset-0 z-0">
//           <Image
//             src={image}
//             alt={title}
//             fill
//             className="object-cover opacity-80 transition-transform duration-1000 group-hover:scale-110"
//           />
//         </div>
//       )}

//       {/* 2. Content Wrapper */}
//       <div className="relative z-10 flex h-full flex-col justify-between">
//         {/* Top: Step Badge - Pushed to top-left with consistent padding */}
//         <div className="p-6">
//           <div className="inline-block rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md">
//             {step}
//           </div>
//         </div>

//         {/* Bottom: Glassmorphic Block - Edge-to-Edge feel */}
//         <div className="p-4 transition-transform duration-500 group-hover:-translate-y-2">
//           <div className="relative overflow-hidden rounded-[24px] border border-white/20 bg-white/10 p-5 backdrop-blur-2xl shadow-2xl transition-all duration-500">
//             {/* Glossy Top-Light Reflection */}
//             <div className="absolute inset-0 bg-linear-to-br from-white/15 to-transparent pointer-events-none" />

//             <h3 className="relative z-10 text-xl font-bold tracking-tight text-white md:text-2xl">
//               {title}
//             </h3>

//             {/* Description: Zero-latency Expandable Grid */}
//             <div className="grid transition-all duration-500 ease-in-out grid-rows-[0fr] group-hover:grid-rows-[1fr]">
//               <div className="overflow-hidden opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:mt-3">
//                 <p className="text-sm leading-relaxed text-zinc-200">
//                   {description}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// type newCardProps = {
//   step: string;
//   title: string;
//   description: string;
//   image: string;
//   className?: string;
//   darkOverlay?: boolean;
//   greenOverlay?: boolean;
//   textDark?: boolean;
//   textLight?: boolean;
// };
// function CardDemo({
//   step,
//   title,
//   description,
//   image,
//   className = "",
// }: newCardProps) {
//   return (
//     <article
//       className={`group flex min-h-120 max-h-120 flex-col overflow-hidden rounded-3xl border border-blue-700 bg-white ${className}`}
//     >
//       {/* Image area */}
//       <div className="relative h-[350px] shrink-0 overflow-hidden bg-linear-to-br from-[#0f172a] via-[#1636b8] to-[#335CFF] transition-all duration-500 ease-out group-hover:h-[300px]">
//         <Image
//           src={image}
//           alt={title}
//           fill
//           className="object-cover transition-transform duration-500 ease-out "
//         />
//       </div>

//       {/* Content area */}
//       <div className="flex flex-1 flex-col justify-end p-5">
//         <div className="transition-transform duration-500 ease-out group-hover:-translate-y-2">
//           <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
//             {step}
//           </p>

//           <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
//             {title}
//           </h3>
//         </div>
//         <div className=" max-h-0 opacity-0 translate-y-4 transition-all duration-500 ease-out  group-hover:mt-3 group-hover:max-h-24 group-hover:opacity-100 group-hover:translate-y-0">
//           <p className="text-sm leading-6 text-slate-600 line-clamp-3">
//             {description}
//           </p>
//         </div>
//       </div>
//     </article>
//   );
// }
