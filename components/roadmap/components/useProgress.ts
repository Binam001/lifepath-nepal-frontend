"use client";

import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";

export type NodeStatus = "pending" | "learning" | "done" | "skipped";

const KEY = "lifepath:roadmap:frontend:v1";

// ---------------------------------------------------------------------------
// External store: a tiny global map subscribed to via useSyncExternalStore.
// Using a store sidesteps "set-state-in-effect" while still letting us hydrate
// from localStorage on the client without producing hydration mismatches.
// ---------------------------------------------------------------------------
type ProgressMap = Record<string, NodeStatus>;

let current: ProgressMap = {};
let didHydrate = false;
const listeners = new Set<() => void>();

function emit() {
  for (const fn of listeners) fn();
}

function subscribe(fn: () => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

function getSnapshot(): ProgressMap {
  return current;
}

// Server snapshot must be a stable empty object so SSR is consistent.
const SERVER_SNAPSHOT: ProgressMap = {};
function getServerSnapshot(): ProgressMap {
  return SERVER_SNAPSHOT;
}

function writeToStorage(next: ProgressMap) {
  try {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(KEY, JSON.stringify(next));
    }
  } catch {
    // ignore
  }
}

function hydrateOnce() {
  if (didHydrate) return;
  didHydrate = true;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object") {
        current = parsed;
        emit();
      }
    }
  } catch {
    // ignore
  }
}

export function useProgress() {
  const progress = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // After mount, pull saved state from localStorage exactly once.
  // The store handles re-render via emit(), so we don't need setState here.
  const hydratedRef = useRef(false);
  useEffect(() => {
    if (hydratedRef.current) return;
    hydratedRef.current = true;
    hydrateOnce();
  }, []);

  const setStatus = useCallback((id: string, status: NodeStatus) => {
    const next: ProgressMap = { ...current };
    if (status === "pending") {
      delete next[id];
    } else {
      next[id] = status;
    }
    current = next;
    writeToStorage(next);
    emit();
  }, []);

  const reset = useCallback(() => {
    current = {};
    writeToStorage(current);
    emit();
  }, []);

  const getStatus = useCallback(
    (id: string): NodeStatus => progress[id] ?? "pending",
    [progress],
  );

  return { progress, setStatus, getStatus, reset };
}
