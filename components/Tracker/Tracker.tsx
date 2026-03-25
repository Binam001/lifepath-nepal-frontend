"use client";

/**
 * Tracker.tsx
 * Drop this into your lifepathnepal.com frontend.
 *
 * 1. Add to your frontend .env:
 *    BACKEND_API_URL=https://api.lifepathnepal.com/api/v1/lifepath
 *
 * 2. Add <Tracker /> inside your root layout.tsx (inside <body>)
 */

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const API_PROXY_PATH = "/backend";
const INTERVAL_MS = 30_000;

function getSessionId(): string {
  let sid = sessionStorage.getItem("_lp_sid");
  if (!sid) {
    sid = Math.random().toString(36).slice(2) + Date.now().toString(36);
    sessionStorage.setItem("_lp_sid", sid);
  }
  return sid;
}

function sendHeartbeat(page: string): void {
  fetch(`${API_PROXY_PATH}/api/track/heartbeat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sessionId: getSessionId(), page }),
    keepalive: true,
  }).catch(() => {});
}

export default function Tracker() {
  const pathname = usePathname();

  // Fire on every route change
  useEffect(() => {
    sendHeartbeat(pathname);
  }, [pathname]);

  // Keep session alive on interval
  useEffect(() => {
    const id = setInterval(() => sendHeartbeat(pathname), INTERVAL_MS);
    return () => clearInterval(id);
  }, [pathname]);

  return null; // renders nothing
}
