"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type DividerProp = {
  prop: number;
};

// const TEXT =
//   "We start with your psychology and strengths, help you build practical skills, and prepare you for future job demand.";
const TEXT =
  "Your future is not something that suddenly appears tomorrow. It is created today through the knowledge you gain, the skills you build, and the mentor you choose.";

const TEXT2 =
  "We start with your psychology and strengths, help you build practical skills, and prepare you for future job demand.";

const TEXT3 =
  "Your success is  not delayed by your weaknesses, but by not knowing your strengths.";

const TEXT4 =
  "Everybody is a genius. But if you judge a fish by its ability to climb a tree, it will live its whole life believing that it is stupid.- Albert Einstein.";

export default function Divider({ prop }: DividerProp) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  let text;

  switch (prop) {
    case 1:
      text = TEXT;
      break;
    case 2:
      text = TEXT2;
      break;
    case 3:
      text = TEXT3;
      break;
    case 4:
      text = TEXT4;
      break;
    default:
      text = TEXT;
  }

  useEffect(() => {
    if (!containerRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const words = containerRef.current.querySelectorAll(".reveal-word");
    gsap.set(words, { opacity: 0.15 });

    gsap.to(words, {
      opacity: 1,
      duration: 0.2,
      stagger: 0.07,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "bottom 40%",
        scrub: true,
      },
    });
  }, []);

  return (
    <section className="relative px-4 md:px-8 bg-zinc-100 to-black py-8 md:py-16 overflow-hidden">
      <div ref={containerRef} className="relative max-w-4xl mx-auto">
        <p className="text-center text-2xl md:text-2xl lg:text-3xl font-medium leading-snug text-blue-600">
          {text.split(" ").map((w, i) => (
            <span key={i} className="reveal-word inline-block mr-2">
              {w}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
