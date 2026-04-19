"use client";

import { useEffect, useState } from "react";

/**
 * Reduced-motion preference, merged from two sources:
 *  1. OS-level `prefers-reduced-motion: reduce` media query.
 *  2. User-level override stored under `reduce-motion` in localStorage
 *     (exposed via ⌘K palette, reflected to `<html data-force-reduce="true">`).
 *
 * Any animation/interaction component should call this instead of reaching
 * for matchMedia directly, so the palette override applies consistently.
 */
export const STORAGE_KEY_REDUCE_MOTION = "reduce-motion";

function readForced(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(STORAGE_KEY_REDUCE_MOTION) === "true";
  } catch {
    return false;
  }
}

function readOsPref(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useReducedMotionPreference(): boolean {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const update = () => setReduce(readForced() || readOsPref());
    update();

    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    mq?.addEventListener?.("change", update);

    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY_REDUCE_MOTION) update();
    };
    window.addEventListener("storage", onStorage);

    // Custom event fired by the palette toggle so same-tab listeners respond
    // without relying on the cross-tab `storage` event.
    const onCustom = () => update();
    window.addEventListener("reduce-motion:changed", onCustom);

    return () => {
      mq?.removeEventListener?.("change", update);
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("reduce-motion:changed", onCustom);
    };
  }, []);

  return reduce;
}

/** Toggle the user-level override. Fires a `reduce-motion:changed` event. */
export function setForcedReducedMotion(value: boolean) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY_REDUCE_MOTION, String(value));
  } catch {
    /* storage disabled */
  }
  document.documentElement.dataset.forceReduce = value ? "true" : "false";
  window.dispatchEvent(new CustomEvent("reduce-motion:changed"));
}

/** Read the current forced override (no subscription). */
export function isForcedReducedMotion(): boolean {
  return readForced();
}
