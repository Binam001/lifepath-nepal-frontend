"use client";

import { useEffect, useState } from "react";
import Loader from "@/components/ui/loader";

const SESSION_KEY = "lifepath-preloader-shown";
const DISPLAY_MS = 3000;
const EXIT_MS = 250;
type PreloaderState = "visible" | "leaving" | "hidden";

export default function SitePreloader() {
  const [state, setState] = useState<PreloaderState>("visible");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isShown = window.sessionStorage.getItem(SESSION_KEY) === "true";
      if (isShown) {
        setState("hidden");
        return;
      }
    }

    const leaveTimer = window.setTimeout(() => {
      setState("leaving");
    }, DISPLAY_MS);

    const completeTimer = window.setTimeout(() => {
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem(SESSION_KEY, "true");
      }
      setState("hidden");
    }, DISPLAY_MS + EXIT_MS);

    const failSafeTimer = window.setTimeout(() => {
      setState("hidden");
    }, DISPLAY_MS + EXIT_MS + 1000);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(completeTimer);
      window.clearTimeout(failSafeTimer);
    };
  }, []);

  if (state === "hidden") {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-9999 bg-white transition-opacity duration-200 ${
        state === "leaving" ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      role="status"
      aria-live="polite"
      aria-label="Loading website"
    >
      <Loader />
    </div>
  );
}
