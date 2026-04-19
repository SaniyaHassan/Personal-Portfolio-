"use client";

import { useMemo, useRef, useState } from "react";
import { skills, categoryLabel, type Skill } from "@/content/skills";

/**
 * SkillsConstellation — star-map renderer for the Skills section.
 *
 * Nodes are skills, edges are the `related` pairs from the data module. A
 * focused or hovered node highlights its incident edges and dims the rest of
 * the graph. Keyboard users land on each node via Tab and trigger the same
 * highlight on focus; Enter/Space toggles a sticky selection.
 *
 * Rendering is pure SVG + CSS variables — no canvas, no WebGL. Colors resolve
 * through `--ornament-primary` so the Constellation motif recolors via tokens
 * when mode/motif changes on <html>.
 */

const VIEWBOX = { w: 800, h: 440 } as const;

// Hand-placed node coordinates — clusters roughly by category so related
// skills land near each other and edges read cleanly.
const NODE_POSITIONS: Record<string, { x: number; y: number }> = {
  // Languages — left cluster
  cpp: { x: 110, y: 130 },
  python: { x: 180, y: 260 },
  java: { x: 90, y: 340 },
  // Core CS — center-left
  dsa: { x: 280, y: 170 },
  "system-design": { x: 400, y: 250 },
  oop: { x: 200, y: 80 },
  // Backend & Web — center-right
  fastapi: { x: 500, y: 170 },
  react: { x: 620, y: 100 },
  // Tools & Platforms — right cluster
  git: { x: 690, y: 280 },
  linux: { x: 600, y: 360 },
  azure: { x: 470, y: 370 },
};

// Radius per proficiency level — stronger skills read as larger stars.
const RADIUS_BY_PROFICIENCY = { 1: 5.5, 2: 7.5, 3: 10 } as const;

type Edge = {
  a: string;
  b: string;
  key: string;
};

function buildEdges(list: readonly Skill[]): readonly Edge[] {
  const seen = new Set<string>();
  const edges: Edge[] = [];
  for (const skill of list) {
    for (const other of skill.related) {
      const [a, b] = [skill.id, other].sort();
      const key = `${a}::${b}`;
      if (seen.has(key)) continue;
      if (!NODE_POSITIONS[a] || !NODE_POSITIONS[b]) continue;
      seen.add(key);
      edges.push({ a, b, key });
    }
  }
  return edges;
}

export function SkillsConstellation() {
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const [stickyId, setStickyId] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const activeId = focusedId ?? stickyId;
  const edges = useMemo(() => buildEdges(skills), []);

  const activeSkill = activeId ? skills.find((s) => s.id === activeId) : null;
  const relatedSet = useMemo(() => {
    if (!activeSkill) return null;
    return new Set<string>([activeSkill.id, ...activeSkill.related]);
  }, [activeSkill]);

  const isEdgeActive = (edge: Edge) =>
    activeId !== null && (edge.a === activeId || edge.b === activeId);

  const isNodeDimmed = (id: string) => {
    if (!relatedSet) return false;
    return !relatedSet.has(id);
  };

  return (
    <div
      className="relative hidden sm:block"
      data-testid="skills-constellation"
    >
      <svg
        ref={svgRef}
        viewBox={`0 0 ${VIEWBOX.w} ${VIEWBOX.h}`}
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-auto"
        role="group"
        aria-label="Skills constellation — interactive graph of skills and their relationships"
      >
        {/* Edges first so circles paint above them. */}
        <g>
          {edges.map((edge) => {
            const a = NODE_POSITIONS[edge.a];
            const b = NODE_POSITIONS[edge.b];
            const active = isEdgeActive(edge);
            return (
              <line
                key={edge.key}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke="var(--ornament-primary)"
                strokeWidth={active ? 1.4 : 1}
                strokeOpacity={active ? 0.9 : 0.35}
                style={{
                  transition:
                    "stroke-opacity 180ms ease-out, stroke-width 180ms ease-out",
                }}
              />
            );
          })}
        </g>

        {/* Nodes. */}
        <g>
          {skills.map((skill) => {
            const pos = NODE_POSITIONS[skill.id];
            if (!pos) return null;
            const radius = RADIUS_BY_PROFICIENCY[skill.proficiency];
            const dimmed = isNodeDimmed(skill.id);
            const isActive = activeId === skill.id;
            return (
              <g
                key={skill.id}
                transform={`translate(${pos.x}, ${pos.y})`}
                tabIndex={0}
                role="button"
                aria-label={`${skill.label}. ${categoryLabel[skill.category]}. ${skill.description}`}
                aria-pressed={stickyId === skill.id}
                data-skill-id={skill.id}
                onMouseEnter={() => setFocusedId(skill.id)}
                onMouseLeave={() => setFocusedId(null)}
                onFocus={() => setFocusedId(skill.id)}
                onBlur={() => setFocusedId(null)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setStickyId((curr) =>
                      curr === skill.id ? null : skill.id,
                    );
                  } else if (event.key === "Escape") {
                    setStickyId(null);
                    setFocusedId(null);
                  }
                }}
                onClick={() =>
                  setStickyId((curr) =>
                    curr === skill.id ? null : skill.id,
                  )
                }
                style={{
                  cursor: "pointer",
                  outline: "none",
                  opacity: dimmed ? 0.35 : 1,
                  transition: "opacity 180ms ease-out",
                }}
              >
                {/* Focus / hover halo */}
                <circle
                  r={radius + 6}
                  fill="var(--ornament-primary)"
                  fillOpacity={isActive ? 0.18 : 0}
                  style={{ transition: "fill-opacity 180ms ease-out" }}
                />
                <circle
                  r={radius}
                  fill="var(--ornament-primary)"
                  stroke="var(--ornament-secondary)"
                  strokeWidth={isActive ? 1.25 : 0.75}
                />
                <text
                  x={radius + 8}
                  y={4}
                  fill="var(--fg)"
                  className="font-mono"
                  style={{
                    fontSize: 12,
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
        </g>
      </svg>

      {/* Tooltip / detail panel — below the graph so it never covers nodes. */}
      <div
        aria-live="polite"
        className="mt-4 min-h-[3.5rem] rounded-lg border border-border bg-bg/60 px-4 py-3 text-sm text-fg"
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
            Hover or focus a node to see how each skill connects.
          </p>
        )}
      </div>
    </div>
  );
}
