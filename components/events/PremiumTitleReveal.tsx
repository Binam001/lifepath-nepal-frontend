"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger, SplitText);

type PremiumTitleRevealProps = {
  title?: string;
};

export default function PremiumTitleReveal({
  title = "My Vision for Prosperous Nepal",
}: PremiumTitleRevealProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const underlineRef = useRef<HTMLDivElement | null>(null);
  const shimmerRef = useRef<HTMLSpanElement | null>(null);

  useGSAP(
    () => {
      const titleElement = titleRef.current;
      const underlineElement = underlineRef.current;
      const shimmerElement = shimmerRef.current;

      if (!titleElement || !underlineElement || !shimmerElement) {
        return;
      }

      const split = SplitText.create(titleElement, {
        type: "chars",
        charsClass: "title-char",
      });

      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        },
      });

      gsap.set(shimmerElement, {
        xPercent: -440,
        opacity: 0,
      });

      timeline
        .fromTo(
          split.chars,
          {
            autoAlpha: 0,
            y: 26,
            scale: 0.92,
            filter: "blur(5px)",
          },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.9,
            stagger: {
              each: 0.03,
              from: "center",
            },
          },
        )
        .fromTo(
          underlineElement,
          {
            autoAlpha: 0,
            scaleX: 0.72,
            y: 10,
          },
          {
            autoAlpha: 1,
            scaleX: 1,
            y: 0,
            duration: 0.6,
          },
          "-=0.45",
        )
        .to(
          shimmerElement,
          {
            opacity: 1,
            duration: 0.15,
          },
          "-=0.25",
        )
        .to(shimmerElement, {
          xPercent: 140,
          duration: 1,
          ease: "power2.inOut",
        })
        .to(shimmerElement, {
          opacity: 0,
          duration: 0.2,
        });

      return () => {
        timeline.scrollTrigger?.kill();
        timeline.kill();
        split.revert();
      };
    },
    { scope: sectionRef },
  );

  return (
    <div
      ref={sectionRef}
      className="relative isolate overflow-hidden rounded-[28px] border-2 border-blue-500/95 bg-white shadow-[0_18px_70px_-28px_rgba(37,99,235,0.45)]"
    >
      <div className="absolute inset-0">
        <Image
          src="/essay/bg.png"
          alt="Essay title background"
          fill
          priority={false}
          className=""
          sizes="100vw"
        />
      </div>

      <div className="absolute inset-0 bg-linear-to-r from-white/72 via-white/36 to-white/72" />
      <div className="absolute inset-0 bg-linear-to-b from-white/42 via-transparent to-white/72" />
      <div className="absolute inset-x-0 top-0 h-14 bg-linear-to-b from-white/65 via-white/20 to-transparent sm:h-16" />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-white via-white/65 to-transparent sm:h-20" />

      <div className="pointer-events-none absolute left-4 top-4 grid grid-cols-3 gap-2 opacity-80 sm:left-6 sm:top-5">
        {Array.from({ length: 6 }).map((_, index) => (
          <span
            key={`top-dot-${index}`}
            className="h-1.5 w-1.5 rounded-full bg-blue-400/70"
          />
        ))}
      </div>

      <div className="pointer-events-none absolute bottom-4 right-4 grid grid-cols-3 gap-2 opacity-80 sm:bottom-5 sm:right-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <span
            key={`bottom-dot-${index}`}
            className="h-1.5 w-1.5 rounded-full bg-blue-400/70"
          />
        ))}
      </div>

      <div className="relative mx-auto flex h-40 max-w-6xl items-center justify-center px-5 sm:px-8 lg:px-12">
        <div className="relative w-full max-w-5xl overflow-hidden text-center">
          <h2
            ref={titleRef}
            className="relative text-balance px-2 text-lg font-semibold leading-none tracking-[-0.06em] text-blue-600 drop-shadow-[0_2px_18px_rgba(255,255,255,0.85)] sm:text-2xl lg:text-3xl"
          >
            {title}
          </h2>

          <div className="absolute inset-0 -z-10 backdrop-blur-[3px]" />

          <span
            ref={shimmerRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-[-32%] w-1/4 -skew-x-12 bg-linear-to-r from-transparent via-white/95 to-blue-500/15 opacity-0 mix-blend-screen"
          />

          <div
            ref={underlineRef}
            className="mx-auto mt-4 flex max-w-[260px] items-center justify-center gap-3 sm:mt-5 sm:max-w-[340px] sm:gap-4"
          >
            <span className="h-px flex-1 bg-linear-to-r from-transparent via-blue-500/80 to-blue-500/10" />
            <span className="relative block h-3.5 w-3.5 rotate-45 rounded-[4px] border border-blue-500/75 bg-white/70 shadow-[0_0_18px_rgba(59,130,246,0.35)]" />
            <span className="h-px flex-1 bg-linear-to-l from-transparent via-blue-500/80 to-blue-500/10" />
          </div>
        </div>
      </div>
    </div>
  );
}
