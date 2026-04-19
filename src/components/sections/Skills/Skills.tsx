import { SkillsConstellation } from "./SkillsConstellation";
import { SkillsGarden } from "./SkillsGarden";
import { SkillsList } from "./SkillsList";

/**
 * Skills section.
 *
 * Currently renders only the Constellation variant — a star-map graph of
 * skills and the edges between related skills. A later milestone will
 * introduce a `SkillsGarden` renderer for the Floral motif; when that lands,
 * select the renderer here based on the active motif (e.g. via a ThemeProvider
 * hook or a CSS-driven show/hide). The `skills` data module in
 * `src/content/skills.ts` is already shape-shared for both variants, so no
 * content changes will be needed.
 *
 * Accessibility:
 * - The SVG constellation is visually exposed on >=sm viewports.
 * - `SkillsList srOnly` renders an always-on text alternative for screen
 *   readers (every skill + description).
 * - On narrow viewports (<sm), a visible chip-list fallback replaces the SVG.
 */
export function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="px-6 py-24 md:px-12 lg:px-20 border-t border-border"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <h2
          id="skills-heading"
          className="font-display text-3xl md:text-4xl font-medium text-primary-deep"
        >
          Skills
        </h2>
        {/* Motif-specific lede. Only the active one paints. */}
        <p className="skills-variant skills-variant-constellation max-w-md text-sm text-fg-muted">
          A constellation of the tools I reach for most. Hover a star to see
          how each skill feeds into the next.
        </p>
        <p className="skills-variant skills-variant-floral max-w-md text-sm text-fg-muted">
          A garden of the tools I reach for most. Each sprig is a skill,
          grouped by family, with taller stems for the ones I use daily.
        </p>
      </div>

      {/* Screen-reader-only full list — mirrors every node in the SVG. */}
      <SkillsList srOnly />

      {/* Both variants render; CSS (globals.css `.skills-variant-*` rules)
          hides the inactive one based on the active motif. This keeps Skills
          a server component. */}
      <div className="mt-10">
        <div className="skills-variant skills-variant-constellation">
          <SkillsConstellation />
        </div>
        <div className="skills-variant skills-variant-floral">
          <SkillsGarden />
        </div>
        {/* Visible fallback for narrow viewports where the SVG is hidden. */}
        <div className="sm:hidden">
          <SkillsList />
        </div>
      </div>
    </section>
  );
}
