"use client";

import { useEffect, useState } from "react";
import Loader from "@/components/ui/loader";

const SESSION_KEY = "lifepath-preloader-shown";
const DISPLAY_MS = 3000;
const EXIT_MS = 250;

export default function SitePreloader() {
  const [shouldRender, setShouldRender] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const alreadyShown = window.sessionStorage.getItem(SESSION_KEY) === "true";

    if (alreadyShown) {
      setShouldRender(false);
      return;
    }

    if (!shouldRender) {
      return;
    }

    const leaveTimer = window.setTimeout(() => {
      setIsLeaving(true);
    }, DISPLAY_MS);

    const completeTimer = window.setTimeout(() => {
      window.sessionStorage.setItem(SESSION_KEY, "true");
      setShouldRender(false);
    }, DISPLAY_MS + EXIT_MS);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(completeTimer);
    };
  }, [shouldRender]);

  if (!shouldRender) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-9999 bg-white transition-opacity duration-200 ${
        isLeaving ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      role="status"
      aria-live="polite"
      aria-label="Loading website"
    >
      <Loader />
    </div>
  );
}
