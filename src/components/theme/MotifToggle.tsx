"use client";

import { useRef, type KeyboardEvent } from "react";
import { useTheme } from "./ThemeProvider";
import { MOTIFS, type Motif } from "@/config/themes";
import { featureFlags } from "@/config/features";

const LABELS: Record<Motif, { name: string; glyph: string }> = {
  constellation: { name: "Constellation", glyph: "✦" },
  floral: { name: "Floral", glyph: "❀" },
};

const NAV_KEYS = new Set([
  "ArrowLeft",
  "ArrowRight",
  "ArrowUp",
  "ArrowDown",
  "Home",
  "End",
]);

export function MotifToggle() {
  const { motif, setMotif } = useTheme();
  const enabledMotifs = MOTIFS.filter((m) => featureFlags.motifs[m]);
  const refs = useRef<Partial<Record<Motif, HTMLButtonElement | null>>>({});

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!NAV_KEYS.has(e.key)) return;
    e.preventDefault();
    if (enabledMotifs.length < 2) return;

    const currentIdx = Math.max(0, enabledMotifs.indexOf(motif));
    const last = enabledMotifs.length - 1;
    let nextIdx = currentIdx;

    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      nextIdx = currentIdx === 0 ? last : currentIdx - 1;
    } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      nextIdx = currentIdx === last ? 0 : currentIdx + 1;
    } else if (e.key === "Home") {
      nextIdx = 0;
    } else if (e.key === "End") {
      nextIdx = last;
    }

    const next = enabledMotifs[nextIdx];
    setMotif(next);
    refs.current[next]?.focus();
  };

  return (
    <div
      role="radiogroup"
      aria-label="Motif / theme style"
      onKeyDown={onKeyDown}
      className="inline-flex items-center rounded-full border border-border p-1 text-sm"
    >
      {enabledMotifs.map((m) => {
        const selected = motif === m;
        return (
          <button
            key={m}
            ref={(el) => {
              refs.current[m] = el;
            }}
            type="button"
            role="radio"
            aria-checked={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => setMotif(m)}
            className={[
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1 transition-colors",
              "focus-visible:outline-focus-ring",
              selected
                ? "bg-primary-deep text-primary-fg"
                : "text-fg-muted hover:text-fg",
            ].join(" ")}
          >
            <span aria-hidden="true">{LABELS[m].glyph}</span>
            <span>{LABELS[m].name}</span>
          </button>
        );
      })}
    </div>
  );
}
