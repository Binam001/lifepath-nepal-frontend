"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }

    // Fix for mobile layout shifts and pinning issues
    ScrollTrigger.config({
      ignoreMobileResize: true,
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
    });

    // Normalize scroll handles address bar resizing on mobile by intercepting the scroll
    ScrollTrigger.normalizeScroll(true);

    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
      orientation: "vertical",
      gestureOrientation: "vertical",
      lerp: 0.07,
      wheelMultiplier: 0.8,
      touchMultiplier: 2, // Slightly increased for better mobile response
      infinite: false,
    });

    lenisInstance.on("scroll", ScrollTrigger.update);

    // Synchronize Lenis with GSAP ticker
    const tickerCallback = (time: number) => {
      lenisInstance.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);

    gsap.ticker.lagSmoothing(0);

    // Watch for content height changes and refresh
    const resizeObserver = new ResizeObserver(() => {
      lenisInstance.resize();

      // Prevent ScrollTrigger.refresh() on mobile to avoid layout jumps
      // caused by the address bar appearing/disappearing.
      if (window.innerWidth > 1024) {
        ScrollTrigger.refresh();
      }
    });

    if (document.body) {
      resizeObserver.observe(document.body);
    }

    lenisRef.current = lenisInstance;

    // Cleanup
    return () => {
      gsap.ticker.remove(tickerCallback);
      resizeObserver.disconnect();
      lenisInstance.destroy();
      lenisRef.current = null;
      if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
        window.history.scrollRestoration = "auto";
      }
    };
  }, []);

  // Scroll to top on route change using the user's exact logic
  useEffect(() => {
    const instance = lenisRef.current;
    if (!instance) return;

    instance.stop();
    instance.scrollTo(0, { immediate: true, force: true });

    // Immediate start and refresh
    instance.start();

    const id = setTimeout(() => {
      ScrollTrigger.refresh();
      instance.resize();
    }, 200);

    return () => clearTimeout(id);
  }, [pathname]);

  // Listen for manual scroll-to-top custom events from other components
  useEffect(() => {
    const handleScrollToTop = (e: Event) => {
      const customEvent = e as CustomEvent<{ immediate?: boolean }>;
      const immediate = customEvent.detail?.immediate ?? true;
      const instance = lenisRef.current;
      if (instance) {
        instance.stop();
        instance.scrollTo(0, { immediate, force: true });
        instance.start();
        setTimeout(() => {
          ScrollTrigger.refresh();
          instance.resize();
        }, 100);
      } else {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener("scroll-to-top", handleScrollToTop);
    return () => {
      window.removeEventListener("scroll-to-top", handleScrollToTop);
    };
  }, []);

  return null;
}
