/**
 * Decorative section divider. Renders both the constellation and floral
 * variants; globals.css hides the inactive one via the `.motif-*` visibility
 * rule (same mechanism as the hero motif layers), so only one paints at a
 * time.
 *
 * Not a replacement for every `border-t border-border` on a section — opt-in
 * ornament used between a couple of high-value section transitions. Always
 * `aria-hidden` because it carries no meaning beyond flourish.
 */
export function SectionDivider({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      role="presentation"
      className={`w-full flex items-center justify-center py-8 px-6 md:px-12 lg:px-20 ${className}`}
      data-section-divider
    >
      {/* Constellation variant — orbit-dash line with star endpoints */}
      <svg
        className="motif motif-constellation opacity-60"
        width="240"
        height="16"
        viewBox="0 0 240 16"
        fill="none"
      >
        <circle cx="6" cy="8" r="2.4" fill="var(--ornament-primary)" />
        <circle cx="6" cy="8" r="0.9" fill="var(--ornament-secondary)" />
        <line
          x1="14"
          y1="8"
          x2="226"
          y2="8"
          stroke="var(--ornament-primary)"
          strokeWidth="0.8"
          strokeLinecap="round"
          strokeDasharray="2 5"
          opacity="0.75"
        />
        <circle cx="120" cy="8" r="1.3" fill="var(--ornament-tertiary)" />
        <circle cx="234" cy="8" r="2.4" fill="var(--ornament-primary)" />
        <circle cx="234" cy="8" r="0.9" fill="var(--ornament-secondary)" />
      </svg>

      {/* Floral variant — hairline with botanical end-glyphs */}
      <svg
        className="motif motif-floral opacity-70"
        width="240"
        height="16"
        viewBox="0 0 240 16"
        fill="none"
      >
        {/* Left sprig */}
        <g
          transform="translate(6, 8)"
          stroke="var(--ornament-primary)"
          strokeWidth="0.8"
          strokeLinecap="round"
          fill="none"
        >
          <path d="M -3 -3 Q 0 -5 3 -3" />
          <path d="M -3 3 Q 0 5 3 3" />
          <circle cx="0" cy="0" r="1.4" fill="var(--ornament-secondary)" stroke="none" />
        </g>

        {/* Center line */}
        <line
          x1="14"
          y1="8"
          x2="226"
          y2="8"
          stroke="var(--ornament-primary)"
          strokeWidth="0.7"
          strokeLinecap="round"
          opacity="0.7"
        />

        {/* Middle bud */}
        <g transform="translate(120, 8)">
          <circle r="1.4" fill="var(--ornament-tertiary)" />
        </g>

        {/* Right sprig */}
        <g
          transform="translate(234, 8)"
          stroke="var(--ornament-primary)"
          strokeWidth="0.8"
          strokeLinecap="round"
          fill="none"
        >
          <path d="M -3 -3 Q 0 -5 3 -3" />
          <path d="M -3 3 Q 0 5 3 3" />
          <circle cx="0" cy="0" r="1.4" fill="var(--ornament-secondary)" stroke="none" />
        </g>
      </svg>
    </div>
  );
}
