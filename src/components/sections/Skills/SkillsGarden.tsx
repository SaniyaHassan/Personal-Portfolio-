"use client";

import { useMemo, useRef, useState } from "react";
import { skills, categoryLabel, type Skill, type SkillCategory } from "@/content/skills";

/**
 * SkillsGarden — botanical variant of the Skills section, rendered when the
 * Floral motif is active. A single continuous garden bed spans the full
 * width: all skills rooted on one baseline, arranged in category order,
 * stem heights vary with proficiency but blooms are a single normalized
 * size so the composition reads as a cohesive garden, not a scatter plot.
 *
 * Interaction parity with SkillsConstellation: hover/focus highlights a
 * sprig (tints bloom, lights the category color beneath), click pins
 * a selection, keyboard tabs between sprigs. Detail panel below is
 * shape-identical to the constellation's.
 */

const CATEGORY_ORDER: readonly SkillCategory[] = [
  "language",
  "core",
  "backend",
  "tool",
];

// Per-category tint — just for the tiny category-label strip under the
// baseline; blooms and stems keep the uniform ornament palette so the
// garden feels unified.
const CATEGORY_TINT: Record<SkillCategory, string> = {
  language: "var(--ornament-secondary)",
  core: "var(--ornament-primary)",
  backend: "var(--ornament-tertiary)",
  tool: "var(--ornament-secondary)",
};

// Normalized bloom size — all flowers are the same visual size regardless
// of proficiency so they read as one garden, not a bar chart.
const BLOOM_RADIUS = 7;

// Stem height varies with proficiency so you can still feel mastery visually.
const STEM_HEIGHT_BY_PROF = { 1: 55, 2: 70, 3: 88 } as const;

const VIEWBOX_W = 800;
const VIEWBOX_H = 200;
const BASELINE = 172; // y-coord of the "soil" line
const MARGIN_X = 40;

function layout(items: readonly Skill[]) {
  const grouped = CATEGORY_ORDER.flatMap((cat) =>
    items.filter((s) => s.category === cat),
  );
  const n = grouped.length;
  const usable = VIEWBOX_W - MARGIN_X * 2;
  const step = usable / Math.max(1, n - 1);
  return grouped.map((skill, i) => ({
    skill,
    x: MARGIN_X + step * i,
  }));
}

export function SkillsGarden() {
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const [stickyId, setStickyId] = useState<string | null>(null);

  const activeId = focusedId ?? stickyId;
  const activeSkill = activeId ? skills.find((s) => s.id === activeId) : null;

  const placed = useMemo(() => layout(skills), []);
  const refs = useRef<Record<string, SVGGElement | null>>({});

  const toggleSticky = (id: string) =>
    setStickyId((curr) => (curr === id ? null : id));

  return (
    <div className="relative hidden sm:block" data-testid="skills-garden">
      <svg
        viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-auto"
        role="group"
        aria-label="Skills garden — interactive botanical arrangement of skills and categories"
      >
        {/* Soil baseline */}
        <line
          x1={0}
          y1={BASELINE}
          x2={VIEWBOX_W}
          y2={BASELINE}
          stroke="var(--ornament-primary)"
          strokeWidth={0.75}
          strokeOpacity={0.5}
        />
        <line
          x1={0}
          y1={BASELINE + 2}
          x2={VIEWBOX_W}
          y2={BASELINE + 2}
          stroke="var(--ornament-primary)"
          strokeWidth={0.4}
          strokeOpacity={0.25}
          strokeDasharray="2 3"
        />

        {/* Category label strip below the baseline */}
        {CATEGORY_ORDER.map((cat) => {
          const inCat = placed.filter((p) => p.skill.category === cat);
          if (inCat.length === 0) return null;
          const xs = inCat.map((p) => p.x);
          const x1 = Math.min(...xs) - 16;
          const x2 = Math.max(...xs) + 16;
          const midX = (x1 + x2) / 2;
          return (
            <g key={cat}>
              <line
                x1={x1}
                y1={BASELINE + 10}
                x2={x2}
                y2={BASELINE + 10}
                stroke={CATEGORY_TINT[cat]}
                strokeWidth={1.25}
                strokeOpacity={0.7}
                strokeLinecap="round"
              />
              <text
                x={midX}
                y={BASELINE + 22}
                textAnchor="middle"
                className="font-mono"
                fill="var(--fg-muted)"
                style={{
                  fontSize: 9,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                }}
              >
                {categoryLabel[cat]}
              </text>
            </g>
          );
        })}

        {/* Sprigs */}
        {placed.map(({ skill, x }) => {
          const stemH = STEM_HEIGHT_BY_PROF[skill.proficiency];
          const bloomY = BASELINE - stemH;
          const isActive = activeId === skill.id;
          const dimmed =
            activeId !== null && activeId !== skill.id ? true : false;

          return (
            <g
              key={skill.id}
              ref={(el) => {
                refs.current[skill.id] = el;
              }}
              tabIndex={0}
              role="button"
              aria-label={`${skill.label}. ${categoryLabel[skill.category]}. ${skill.description}`}
              aria-pressed={stickyId === skill.id}
              data-skill-id={skill.id}
              onMouseEnter={() => setFocusedId(skill.id)}
              onMouseLeave={() => setFocusedId(null)}
              onFocus={() => setFocusedId(skill.id)}
              onBlur={() => setFocusedId(null)}
              onClick={() => toggleSticky(skill.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggleSticky(skill.id);
                } else if (e.key === "Escape") {
                  setStickyId(null);
                  setFocusedId(null);
                }
              }}
              style={{
                cursor: "pointer",
                outline: "none",
                opacity: dimmed ? 0.32 : 1,
                transition: "opacity 180ms ease-out",
              }}
            >
              {/* stem — gentle curve, derived from id so no two identical */}
              <path
                d={`M ${x} ${BASELINE} Q ${x + ((skill.id.charCodeAt(0) % 5) - 2)} ${BASELINE - stemH / 2} ${x} ${bloomY + BLOOM_RADIUS - 1}`}
                stroke="var(--ornament-primary)"
                strokeWidth={isActive ? 1.4 : 1}
                strokeLinecap="round"
                fill="none"
                strokeOpacity={isActive ? 0.95 : 0.75}
                style={{
                  transition:
                    "stroke-opacity 180ms ease-out, stroke-width 180ms ease-out",
                }}
              />

              {/* one leaf, side alternates by index */}
              <path
                d={`M ${x} ${BASELINE - stemH * 0.45} q ${(skill.id.charCodeAt(1) % 2 === 0 ? -1 : 1) * 9} -3 ${(skill.id.charCodeAt(1) % 2 === 0 ? -1 : 1) * 14} 2 q ${(skill.id.charCodeAt(1) % 2 === 0 ? 1 : -1) * 6} 3 ${(skill.id.charCodeAt(1) % 2 === 0 ? 1 : -1) * -14} -2 z`}
                fill="var(--ornament-tertiary)"
                fillOpacity={isActive ? 0.5 : 0.28}
                stroke="var(--ornament-primary)"
                strokeWidth={0.6}
                strokeOpacity={0.6}
              />

              {/* bloom — normalized size, color: secondary always */}
              <g transform={`translate(${x}, ${bloomY})`}>
                {[0, 60, 120, 180, 240, 300].map((deg) => (
                  <ellipse
                    key={deg}
                    rx={BLOOM_RADIUS * 0.42}
                    ry={BLOOM_RADIUS * 0.88}
                    cx={0}
                    cy={-BLOOM_RADIUS * 0.6}
                    transform={`rotate(${deg})`}
                    fill="var(--ornament-secondary)"
                    fillOpacity={isActive ? 0.75 : 0.48}
                    stroke="var(--ornament-secondary)"
                    strokeWidth={0.5}
                    style={{ transition: "fill-opacity 180ms ease-out" }}
                  />
                ))}
                <circle
                  r={BLOOM_RADIUS * 0.4}
                  fill="var(--ornament-primary)"
                  stroke="var(--bg)"
                  strokeWidth={1}
                />
                {isActive ? (
                  <circle
                    r={BLOOM_RADIUS + 6}
                    fill="var(--ornament-secondary)"
                    fillOpacity={0.14}
                  />
                ) : null}
              </g>

              {/* label above bloom */}
              <text
                x={x}
                y={bloomY - BLOOM_RADIUS - 6}
                textAnchor="middle"
                fill="var(--fg)"
                className="font-mono"
                style={{
                  fontSize: 10,
                  letterSpacing: "0.04em",
                  pointerEvents: "none",
                  userSelect: "none",
                }}
              >
                {skill.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Shared detail panel — shape-identical to Constellation's */}
      <div
        aria-live="polite"
        className="mt-6 min-h-[3.5rem] rounded-lg border border-border bg-bg/60 px-4 py-3 text-sm text-fg"
      >
        {activeSkill ? (
          <div>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-accent-natural">
              {categoryLabel[activeSkill.category]}
            </p>
            <p className="mt-1">
              <span className="font-display text-lg text-primary-deep">
                {activeSkill.label}
              </span>
              <span className="mx-2 text-fg-muted" aria-hidden="true">
                ·
              </span>
              <span className="text-fg-muted">{activeSkill.description}</span>
            </p>
          </div>
        ) : (
          <p className="text-fg-muted">
            Hover or focus a sprig to see how each skill connects.
          </p>
        )}
      </div>
    </div>
  );
}
