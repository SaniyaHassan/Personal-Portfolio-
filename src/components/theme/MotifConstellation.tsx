/**
 * Constellation motif. A dense starfield with hairline connecting lines,
 * painted behind the hero. Colors consume --ornament-primary /
 * --ornament-secondary / --ornament-tertiary so dark/light mode recolor
 * automatically via tokens.css.
 *
 * A subset of stars carry the `.twinkle` class and animate opacity in a
 * slow pulse; CSS in globals.css activates the animation only in dark
 * mode (brighter, more alive) and disables it when prefers-reduced-motion
 * is set.
 */
type Star = {
  cx: number;
  cy: number;
  r: number;
  tint: 1 | 2 | 3;
  /** delay fraction 0..1 so twinkle is staggered across the field */
  tw?: number;
};

const STARS: readonly Star[] = [
  // top strip
  { cx: 4, cy: 4, r: 0.7, tint: 1, tw: 0.1 },
  { cx: 10, cy: 9, r: 1, tint: 2 },
  { cx: 16, cy: 3, r: 0.9, tint: 1, tw: 0.4 },
  { cx: 22, cy: 7, r: 1.3, tint: 2 },
  { cx: 28, cy: 4, r: 0.8, tint: 1 },
  { cx: 34, cy: 10, r: 1.1, tint: 3, tw: 0.2 },
  { cx: 40, cy: 5, r: 1.4, tint: 1 },
  { cx: 46, cy: 9, r: 0.9, tint: 2, tw: 0.7 },
  { cx: 52, cy: 3, r: 1.1, tint: 1 },
  { cx: 58, cy: 11, r: 0.8, tint: 3 },
  { cx: 64, cy: 5, r: 1.2, tint: 2, tw: 0.3 },
  { cx: 70, cy: 9, r: 1, tint: 1 },
  { cx: 77, cy: 3, r: 1.3, tint: 2 },
  { cx: 83, cy: 8, r: 0.9, tint: 3, tw: 0.6 },
  { cx: 89, cy: 5, r: 1, tint: 1 },
  { cx: 95, cy: 10, r: 1.1, tint: 2 },

  // upper-middle band
  { cx: 6, cy: 18, r: 0.9, tint: 2 },
  { cx: 14, cy: 22, r: 1.1, tint: 1, tw: 0.5 },
  { cx: 24, cy: 17, r: 0.8, tint: 3 },
  { cx: 33, cy: 21, r: 1.3, tint: 1 },
  { cx: 42, cy: 16, r: 0.9, tint: 2, tw: 0.15 },
  { cx: 51, cy: 23, r: 1.1, tint: 1 },
  { cx: 60, cy: 18, r: 0.8, tint: 3 },
  { cx: 68, cy: 22, r: 1.2, tint: 2, tw: 0.8 },
  { cx: 77, cy: 17, r: 1, tint: 1 },
  { cx: 86, cy: 21, r: 0.9, tint: 2 },
  { cx: 94, cy: 18, r: 1.2, tint: 3, tw: 0.45 },

  // middle band (sparser — hero text sits near here)
  { cx: 3, cy: 36, r: 0.8, tint: 1 },
  { cx: 15, cy: 32, r: 0.9, tint: 2 },
  { cx: 28, cy: 38, r: 1, tint: 3, tw: 0.25 },
  { cx: 42, cy: 31, r: 1.1, tint: 1 },
  { cx: 58, cy: 35, r: 0.8, tint: 2, tw: 0.55 },
  { cx: 72, cy: 30, r: 1, tint: 1 },
  { cx: 84, cy: 34, r: 1.2, tint: 3 },
  { cx: 96, cy: 38, r: 0.9, tint: 1, tw: 0.35 },

  // lower-middle band (also sparse)
  { cx: 5, cy: 52, r: 1, tint: 2, tw: 0.9 },
  { cx: 18, cy: 56, r: 0.8, tint: 1 },
  { cx: 36, cy: 50, r: 0.9, tint: 3 },
  { cx: 54, cy: 54, r: 1.2, tint: 1, tw: 0.05 },
  { cx: 72, cy: 51, r: 1, tint: 2 },
  { cx: 88, cy: 57, r: 1.1, tint: 3, tw: 0.5 },
  { cx: 97, cy: 52, r: 0.8, tint: 1 },

  // lower band
  { cx: 2, cy: 70, r: 0.9, tint: 2 },
  { cx: 11, cy: 66, r: 1.3, tint: 1, tw: 0.65 },
  { cx: 20, cy: 72, r: 0.9, tint: 3 },
  { cx: 30, cy: 68, r: 1.1, tint: 1 },
  { cx: 40, cy: 74, r: 0.8, tint: 2, tw: 0.15 },
  { cx: 50, cy: 70, r: 1.2, tint: 1 },
  { cx: 60, cy: 66, r: 1, tint: 3, tw: 0.4 },
  { cx: 70, cy: 74, r: 0.9, tint: 2 },
  { cx: 80, cy: 70, r: 1.1, tint: 1 },
  { cx: 90, cy: 66, r: 0.8, tint: 2, tw: 0.7 },
  { cx: 98, cy: 72, r: 1.3, tint: 3 },

  // bottom strip
  { cx: 5, cy: 86, r: 1.1, tint: 1 },
  { cx: 14, cy: 92, r: 0.9, tint: 2, tw: 0.2 },
  { cx: 24, cy: 88, r: 1.3, tint: 3 },
  { cx: 34, cy: 94, r: 0.8, tint: 1, tw: 0.85 },
  { cx: 44, cy: 90, r: 1, tint: 2 },
  { cx: 54, cy: 86, r: 1.2, tint: 1 },
  { cx: 64, cy: 94, r: 0.9, tint: 3, tw: 0.3 },
  { cx: 74, cy: 88, r: 1.1, tint: 2 },
  { cx: 84, cy: 92, r: 1, tint: 1, tw: 0.6 },
  { cx: 94, cy: 88, r: 0.9, tint: 3 },
];

// Pairs that share a hairline connecting line. Dense enough to read as a
// galactic web, sparse enough not to look like a flat graph.
const LINES: ReadonlyArray<readonly [number, number]> = [
  [0, 1], [1, 2], [2, 3], [3, 4], [5, 6], [6, 7], [8, 9], [10, 11],
  [12, 13], [14, 15],
  [16, 17], [17, 27], [18, 19], [19, 20], [21, 22], [24, 25],
  [28, 29], [30, 31], [31, 40], [32, 33], [36, 37],
  [41, 42], [43, 44], [45, 46], [47, 48],
  [52, 53], [53, 54], [55, 56], [57, 58], [59, 60],
];

const TINTS = {
  1: "var(--ornament-primary)",
  2: "var(--ornament-secondary)",
  3: "var(--ornament-tertiary)",
} as const;

export function MotifConstellation({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
    >
      <g stroke="var(--ornament-primary)" strokeWidth="0.08" strokeOpacity="0.4">
        {LINES.map(([a, b], i) => (
          <line
            key={`l${i}`}
            x1={STARS[a].cx}
            y1={STARS[a].cy}
            x2={STARS[b].cx}
            y2={STARS[b].cy}
          />
        ))}
      </g>
      <g>
        {STARS.map((s, i) => {
          const twinkle = s.tw !== undefined;
          const r = s.r * 0.24;
          return (
            <g key={`s${i}`}>
              {/* faint glow halo for twinkling stars */}
              {twinkle ? (
                <circle
                  cx={s.cx}
                  cy={s.cy}
                  r={r * 3}
                  fill={TINTS[s.tint]}
                  fillOpacity={0.18}
                  className="twinkle-halo"
                  style={{ animationDelay: `${((s.tw ?? 0) * 4).toFixed(2)}s` }}
                />
              ) : null}
              <circle
                cx={s.cx}
                cy={s.cy}
                r={r}
                fill={TINTS[s.tint]}
                className={twinkle ? "twinkle" : undefined}
                style={
                  twinkle
                    ? { animationDelay: `${((s.tw ?? 0) * 4).toFixed(2)}s` }
                    : undefined
                }
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
}
