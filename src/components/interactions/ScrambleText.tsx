"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotionPreference } from "@/lib/useReducedMotionPreference";

const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const CYCLE_MS = 3500; // interval between word switches
const SCRAMBLE_STEP_MS = 35; // ms between scramble frames
const SCRAMBLE_PASSES = 18; // how many frames to scramble before settling

function randomChar() {
  return CHARSET[Math.floor(Math.random() * CHARSET.length)];
}

/**
 * Rotates through a list of words, playing a character-scramble animation
 * between each. Pauses while the containing page-element is hovered or
 * keyboard-focused (so readers can pin a value while scanning).
 *
 * Respects prefers-reduced-motion by rendering only the first word, static.
 */
export function ScrambleText({
  words,
  className,
}: {
  words: readonly string[];
  className?: string;
}) {
  const [idx, setIdx] = useState(0);
  const [display, setDisplay] = useState(words[0] ?? "");
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotionPreference();
  const spanRef = useRef<HTMLSpanElement | null>(null);
  const cycleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrambleTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // schedule next word cycle
  useEffect(() => {
    if (reducedMotion || paused || words.length < 2) return;
    cycleTimerRef.current = setTimeout(() => {
      setIdx((i) => (i + 1) % words.length);
    }, CYCLE_MS);
    return () => {
      if (cycleTimerRef.current) clearTimeout(cycleTimerRef.current);
    };
  }, [idx, paused, reducedMotion, words.length]);

  // scramble animation whenever idx changes
  useEffect(() => {
    const target = words[idx] ?? "";
    if (reducedMotion) {
      setDisplay(target);
      return;
    }
    let pass = 0;
    scrambleTimerRef.current = setInterval(() => {
      pass += 1;
      if (pass >= SCRAMBLE_PASSES) {
        setDisplay(target);
        if (scrambleTimerRef.current) clearInterval(scrambleTimerRef.current);
        return;
      }
      // progressively lock-in characters from the left.
      const locked = Math.floor((pass / SCRAMBLE_PASSES) * target.length);
      let out = "";
      for (let i = 0; i < target.length; i++) {
        if (i < locked || target[i] === " ") {
          out += target[i];
        } else {
          out += randomChar();
        }
      }
      setDisplay(out);
    }, SCRAMBLE_STEP_MS);
    return () => {
      if (scrambleTimerRef.current) clearInterval(scrambleTimerRef.current);
    };
  }, [idx, reducedMotion, words]);

  // hover / focus → pause
  useEffect(() => {
    const node = spanRef.current;
    if (!node) return;
    // pause when any ancestor gets focus (we listen at the span itself).
    const pause = () => setPaused(true);
    const resume = () => setPaused(false);
    node.addEventListener("mouseenter", pause);
    node.addEventListener("mouseleave", resume);
    node.addEventListener("focusin", pause);
    node.addEventListener("focusout", resume);
    return () => {
      node.removeEventListener("mouseenter", pause);
      node.removeEventListener("mouseleave", resume);
      node.removeEventListener("focusin", pause);
      node.removeEventListener("focusout", resume);
    };
  }, []);

  return (
    <span
      ref={spanRef}
      className={className}
      aria-live="polite"
      aria-atomic="true"
      data-testid="scramble-text"
    >
      {display}
    </span>
  );
}
