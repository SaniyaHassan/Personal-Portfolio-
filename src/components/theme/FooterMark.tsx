/**
 * Footer wordmark glyph that reacts to the active motif. Both glyphs are
 * always rendered; globals.css hides whichever doesn't match the current
 * `data-theme-motif` via the `.motif-constellation` / `.motif-floral`
 * visibility rule — the same mechanism used by the hero motif layers.
 *
 * Kept as a server component: no state, no effects, no interactivity.
 */
export function FooterMark() {
  return (
    <span
      aria-hidden="true"
      className="inline-block leading-none"
      style={{
        color: "var(--ornament-primary)",
        fontSize: "16px",
      }}
    >
      <span className="motif motif-constellation">✦</span>
      <span className="motif motif-floral">❀</span>
    </span>
  );
}
