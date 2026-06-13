"use client";

import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";

export type NodeStatus = "pending" | "learning" | "done" | "skipped";

// ---------------------------------------------------------------------------
// External store: global maps partitioned by roadmap slug.
// Subscribed to via useSyncExternalStore.
// ---------------------------------------------------------------------------
type ProgressMap = Record<string, NodeStatus>;

const stores: Record<string, ProgressMap> = {};
const listenersMap: Record<string, Set<() => void>> = {};
const didHydrateMap: Record<string, boolean> = {};

function getStore(slug: string): ProgressMap {
  if (!stores[slug]) {
    stores[slug] = {};
  }
  return stores[slug];
}

function getListeners(slug: string): Set<() => void> {
  if (!listenersMap[slug]) {
    listenersMap[slug] = new Set();
  }
  return listenersMap[slug];
}

function emit(slug: string) {
  const listeners = getListeners(slug);
  for (const fn of listeners) fn();
}

function subscribeFor(slug: string) {
  return (fn: () => void) => {
    const listeners = getListeners(slug);
    listeners.add(fn);
    return () => {
      listeners.delete(fn);
    };
  };
}

const SERVER_SNAPSHOT: ProgressMap = {};
function getServerSnapshot(): ProgressMap {
  return SERVER_SNAPSHOT;
}

function getLocalStorageKey(slug: string) {
  return `lifepath:roadmap:${slug}:v1`;
}

function writeToStorage(slug: string, next: ProgressMap) {
  try {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(getLocalStorageKey(slug), JSON.stringify(next));
    }
  } catch {
    // ignore
  }
}

function hydrateOnce(slug: string) {
  if (didHydrateMap[slug]) return;
  didHydrateMap[slug] = true;
  try {
    const raw = window.localStorage.getItem(getLocalStorageKey(slug));
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object") {
        stores[slug] = parsed;
        emit(slug);
      }
    }
  } catch {
    // ignore
  }
}

export function useProgress(slug: string = "frontend") {
  const subscribe = useCallback((fn: () => void) => subscribeFor(slug)(fn), [slug]);
  const getSnapshot = useCallback(() => getStore(slug), [slug]);

  const progress = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // After mount, pull saved state from localStorage exactly once.
  const hydratedRef = useRef(false);
  useEffect(() => {
    hydrateOnce(slug);
  }, [slug]);

  const setStatus = useCallback((id: string, status: NodeStatus) => {
    const next: ProgressMap = { ...getStore(slug) };
    if (status === "pending") {
      delete next[id];
    } else {
      next[id] = status;
    }
    stores[slug] = next;
    writeToStorage(slug, next);
    emit(slug);
  }, [slug]);

  const reset = useCallback(() => {
    stores[slug] = {};
    writeToStorage(slug, {});
    emit(slug);
  }, [slug]);

  const getStatus = useCallback(
    (id: string): NodeStatus => progress[id] ?? "pending",
    [progress],
  );

  return { progress, setStatus, getStatus, reset };
}

