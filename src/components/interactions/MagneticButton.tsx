"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { useReducedMotionPreference } from "@/lib/useReducedMotionPreference";
import {
  type AnchorHTMLAttributes,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type CommonProps = {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "outline";
  pullStrength?: number; // 0..1, fraction of cursor offset applied
  maxTranslate?: number; // cap in px
};

type LinkProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string;
  };

const variantClasses: Record<NonNullable<CommonProps["variant"]>, string> = {
  primary:
    "bg-primary-deep text-primary-fg hover:bg-primary focus-visible:outline-focus-ring",
  outline:
    "bg-transparent border border-fg text-fg hover:bg-fg/5 focus-visible:outline-focus-ring",
};

/**
 * Pill-shaped link that subtly tracks the cursor when it comes near.
 * - Disabled on touch (pointer:coarse) and prefers-reduced-motion users.
 * - Uses framer-motion spring for natural snap-back on leave.
 */
export function MagneticLink({
  href,
  children,
  className = "",
  variant = "primary",
  pullStrength = 0.28,
  maxTranslate = 14,
  ...anchorProps
}: LinkProps) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 22, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 260, damping: 22, mass: 0.5 });
  const [enabled, setEnabled] = useState(true);
  const reduced = useReducedMotionPreference();

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    setEnabled(!coarse);
  }, []);

  const onMove = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (!enabled || reduced) return;
      const node = ref.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      const tx = Math.max(-maxTranslate, Math.min(maxTranslate, dx * pullStrength));
      const ty = Math.max(-maxTranslate, Math.min(maxTranslate, dy * pullStrength));
      x.set(tx);
      y.set(ty);
    },
    [enabled, reduced, maxTranslate, pullStrength, x, y],
  );

  const onLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.span
      style={reduced ? undefined : { x: sx, y: sy }}
      className="inline-flex"
    >
      <Link
        ref={ref}
        href={href}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={[
          "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm transition-colors",
          variantClasses[variant],
          className,
        ].join(" ")}
        {...anchorProps}
      >
        {children}
      </Link>
    </motion.span>
  );
}
