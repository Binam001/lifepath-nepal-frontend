"use client";
 
import { useEffect } from "react";
import Lenis from "lenis";
 
export default function SmoothScroll() {
  useEffect(() => {
    // Reset browser's automatic scroll restoration on reload
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Scroll window to top immediately on refresh/mount
    window.scrollTo(0, 0);

    // Initialize Lenis with optimized settings
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    // Reset Lenis scroll position to top immediately to match window.scrollTo
    lenis.scrollTo(0, { immediate: true });

    // Add lenis class to html element
    document.documentElement.classList.add("lenis", "lenis-smooth");
 
    // Animation frame loop - optimized
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
 
    rafId = requestAnimationFrame(raf);
 
    // Cleanup
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      document.documentElement.classList.remove("lenis", "lenis-smooth");
      if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
        window.history.scrollRestoration = "auto";
      }
    };
  }, []);
 
  return null;
}
