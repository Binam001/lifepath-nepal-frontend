"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText);

type PremiumTitleRevealProps = {
  label?: string;
  title?: string;
};

export default function PremiumTitleReveal({
  label = "Essay Competition Topic",
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
      className="relative border-2 border-blue-500 rounded-2xl isolate overflow-hidden py-10 sm:py-14"
    >
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-48 w-48 rounded-full bg-blue-500/10 blur-3xl sm:h-64 sm:w-64" />
      </div>

      <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
        <div className="relative mt-4 overflow-hidden">
          <h2
            ref={titleRef}
            className="relative text-2xl font-semibold tracking-[-0.06em] text-blue-500 sm:text-4xl lg:text-4xl"
          >
            {title}
          </h2>
          <span
            ref={shimmerRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-[-35%] w-1/3 -skew-x-12 bg-linear-to-r from-transparent via-white/85 to-blue-500/18 opacity-0 mix-blend-screen"
          />
        </div>

        <span
          ref={underlineRef}
          aria-hidden="true"
          className="mt-5 h-px w-24 bg-blue-500"
        />
      </div>
    </div>
  );
}
