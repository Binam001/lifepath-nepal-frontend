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
  const labelRef = useRef<HTMLParagraphElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const underlineRef = useRef<HTMLSpanElement | null>(null);
  const shimmerRef = useRef<HTMLSpanElement | null>(null);

  useGSAP(
    () => {
      const titleElement = titleRef.current;
      const labelElement = labelRef.current;
      const underlineElement = underlineRef.current;
      const shimmerElement = shimmerRef.current;

      if (
        !titleElement ||
        !labelElement ||
        !underlineElement ||
        !shimmerElement
      ) {
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
          trigger: titleElement,
          start: "top 85%",
          once: true,
        },
      });

      gsap.set(shimmerElement, {
        xPercent: -140,
        opacity: 0,
      });

      timeline
        .fromTo(
          labelElement,
          {
            autoAlpha: 0,
            y: 14,
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
          },
        )
        .fromTo(
          split.chars,
          {
            autoAlpha: 0,
            y: 30,
            scale: 0.85,
            filter: "blur(6px)",
          },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.9,
            stagger: {
              each: 0.035,
              from: "center",
            },
          },
          "-=0.25",
        )
        .fromTo(
          underlineElement,
          {
            scaleX: 0,
          },
          {
            scaleX: 1,
            duration: 0.7,
            transformOrigin: "center center",
          },
          "-=0.45",
        )
        .to(
          shimmerElement,
          {
            opacity: 1,
            duration: 0.15,
          },
          "-=0.35",
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
      className="relative isolate overflow-hidden rounded-[28px] border-2 border-blue-500/95 bg-white "
    >
      <Image
        src="/essay/bg.png"
        alt="Essay title background"
        fill
        priority={false}
        className="absolute inset-0 "
      />

      <div className="absolute inset-x-0 top-0 h-24 bg-linear-to-b from-white/40 via-white/30 to-transparent sm:h-32" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-white/30 via-white/70 to-transparent sm:h-36" />

      <div className="relative mx-auto flex h-40 max-w-6xl items-center justify-center px-6 py-16 text-center sm:h-40 sm:px-10 sm:py-24 lg:px-16">
        <div className="relative max-w-5xl overflow-hidden">
          <h2
            ref={titleRef}
            className="relative text-2xl font-semibold tracking-[-0.07em] text-blue-500 sm:text-3xl lg:text-3xl"
          >
            {title}
          </h2>
          <span
            ref={shimmerRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-[-32%] w-1/4 -skew-x-12 bg-linear-to-r from-transparent via-white to-blue-500/20 opacity-0 mix-blend-screen"
          />

          <div className="mt-6 flex items-center justify-center gap-4 sm:mt-7 sm:gap-6">
            <span
              ref={underlineRef}
              aria-hidden="true"
              className="block h-px w-20 origin-right bg-linear-to-r from-blue-500/0 via-blue-500 to-blue-500 sm:w-32"
            />
            <span
              aria-hidden="true"
              className="block h-px w-20 origin-left bg-linear-to-l from-blue-500/0 via-blue-500 to-blue-500 sm:w-32"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
