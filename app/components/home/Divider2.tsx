"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TEXT =
  "We start with your psychology and strengths, help you build practical skills, and prepare you for future job demand.";

export default function Divider() {
  const containerRef = useRef<HTMLDivElement | null>(null);

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
          {TEXT.split(" ").map((w, i) => (
            <span key={i} className="reveal-word inline-block mr-2">
              {w}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
