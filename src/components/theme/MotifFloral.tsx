/**
 * Floral motif. A loose scattering of line-drawn botanical glyphs across
 * the full canvas, with a few larger blooms anchored near the corners
 * and smaller sprigs and pollen dots filling the middle. Colors consume
 * --ornament-primary / --ornament-secondary / --ornament-tertiary so the
 * palette follows the current mode automatically.
 *
 * Visibility is controlled by CSS rules keyed on `data-theme-motif`; the
 * inactive motif is display:none.
 */

function Bloom({
  tx,
  ty,
  scale = 1,
  seed = 0,
}: {
  tx: number;
  ty: number;
  scale?: number;
  seed?: number;
}) {
  const rot = seed * 17;
  return (
    <g transform={`translate(${tx}, ${ty}) scale(${scale}) rotate(${rot})`}>
      {/* petals */}
      {[0, 72, 144, 216, 288].map((deg) => (
        <path
          key={deg}
          d="M 0 0 Q 2.2 -3.2 0 -5.8 Q -2.2 -3.2 0 0 Z"
          transform={`rotate(${deg})`}
          fill="var(--ornament-secondary)"
          fillOpacity="0.28"
          stroke="var(--ornament-secondary)"
          strokeWidth="0.18"
        />
      ))}
      {/* center */}
      <circle r="0.9" fill="var(--ornament-primary)" />
    </g>
  );
}

function Sprig({
  tx,
  ty,
  scale = 1,
  flip = false,
}: {
  tx: number;
  ty: number;
  scale?: number;
  flip?: boolean;
}) {
  const dir = flip ? -1 : 1;
  return (
    <g
      transform={`translate(${tx}, ${ty}) scale(${scale * dir}, ${scale})`}
      fill="none"
      stroke="var(--ornament-primary)"
      strokeWidth="0.35"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M 0 0 Q 2 -3 4 -6 Q 6 -9 8 -12" strokeOpacity="0.8" />
      <path
        d="M 2 -3 Q 5 -4 6 -2 Q 3 -1 2 -3 Z"
        fill="var(--ornament-tertiary)"
        fillOpacity="0.26"
        strokeWidth="0.2"
      />
      <path
        d="M 5 -8 Q 1 -9 -1 -7 Q 3 -5 5 -8 Z"
        fill="var(--ornament-tertiary)"
        fillOpacity="0.26"
        strokeWidth="0.2"
      />
      <circle
        cx="8"
        cy="-12"
        r="0.6"
        fill="var(--ornament-secondary)"
        stroke="none"
      />
    </g>
  );
}

function Pollen({ cx, cy, r = 0.4 }: { cx: number; cy: number; r?: number }) {
  return (
    <circle
      cx={cx}
      cy={cy}
      r={r}
      fill="var(--ornament-secondary)"
      fillOpacity="0.55"
    />
  );
}

export function MotifFloral({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Big corner blooms */}
      <Bloom tx={86} ty={10} scale={3.2} seed={1} />
      <Bloom tx={12} ty={88} scale={3.0} seed={2} />
      <Bloom tx={92} ty={70} scale={2.2} seed={3} />
      <Bloom tx={6} ty={22} scale={2.4} seed={4} />

      {/* Mid-range blooms scattered */}
      <Bloom tx={70} ty={42} scale={1.6} seed={5} />
      <Bloom tx={34} ty={52} scale={1.4} seed={6} />
      <Bloom tx={56} ty={78} scale={1.7} seed={7} />
      <Bloom tx={22} ty={32} scale={1.3} seed={8} />
      <Bloom tx={80} ty={26} scale={1.2} seed={9} />
      <Bloom tx={48} ty={16} scale={1.3} seed={10} />
      <Bloom tx={64} ty={60} scale={1.1} seed={11} />
      <Bloom tx={42} ty={72} scale={1.2} seed={12} />

      {/* Sprigs with leaves + bud */}
      <Sprig tx={20} ty={20} scale={0.9} />
      <Sprig tx={78} ty={82} scale={1.0} flip />
      <Sprig tx={50} ty={28} scale={0.7} />
      <Sprig tx={30} ty={78} scale={0.85} flip />
      <Sprig tx={74} ty={14} scale={0.75} flip />
      <Sprig tx={8} ty={58} scale={0.8} />
      <Sprig tx={90} ty={48} scale={0.9} flip />
      <Sprig tx={44} ty={62} scale={0.7} />

      {/* Pollen dots — small accents */}
      <Pollen cx={28} cy={14} />
      <Pollen cx={62} cy={8} r={0.35} />
      <Pollen cx={96} cy={40} />
      <Pollen cx={72} cy={56} r={0.35} />
      <Pollen cx={40} cy={42} />
      <Pollen cx={18} cy={68} r={0.35} />
      <Pollen cx={58} cy={66} />
      <Pollen cx={84} cy={58} r={0.35} />
      <Pollen cx={66} cy={84} />
      <Pollen cx={26} cy={60} r={0.35} />
      <Pollen cx={38} cy={24} />
      <Pollen cx={88} cy={82} r={0.35} />
      <Pollen cx={14} cy={40} />
      <Pollen cx={76} cy={36} r={0.35} />
      <Pollen cx={48} cy={88} />
    </svg>
  );
}
