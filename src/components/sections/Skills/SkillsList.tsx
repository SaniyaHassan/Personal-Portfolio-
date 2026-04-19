import { categoryLabel, skills, type SkillCategory } from "@/content/skills";

type SkillsListProps = {
  /**
   * When true, the list is visually hidden with `.sr-only` and exposed only
   * to assistive tech as a text-alternative to the SVG constellation. When
   * false, it renders as the visible mobile-narrow fallback chip list.
   */
  srOnly?: boolean;
  /** Optional className for wrapper layout overrides. */
  className?: string;
};

const ORDER: readonly SkillCategory[] = [
  "language",
  "core",
  "backend",
  "tool",
];

export function SkillsList({ srOnly = false, className }: SkillsListProps) {
  const grouped = ORDER.map((category) => ({
    category,
    entries: skills.filter((s) => s.category === category),
  })).filter((g) => g.entries.length > 0);

  const wrapperClass = srOnly
    ? "sr-only"
    : `mt-10 grid gap-8 md:grid-cols-2 ${className ?? ""}`.trim();

  return (
    <div className={wrapperClass} data-testid="skills-list">
      {grouped.map(({ category, entries }) => {
        // Avoid landmark duplication: when srOnly (four copies stacked
        // off-screen) use a plain div; when visible, use a semantic section.
        const Wrapper = srOnly ? "div" : "section";
        return (
          <Wrapper
            key={category}
            aria-labelledby={srOnly ? undefined : `skills-cat-${category}`}
            className={srOnly ? undefined : "flex flex-col gap-3"}
          >
            <h3
              id={`skills-cat-${category}`}
              className={
                srOnly
                  ? undefined
                  : "font-mono text-[0.7rem] uppercase tracking-[0.18em] text-accent-natural"
              }
            >
              {categoryLabel[category]}
            </h3>
            <ul
              className={srOnly ? undefined : "flex flex-wrap gap-2"}
              aria-label={`${categoryLabel[category]} skills`}
            >
              {entries.map((skill) => (
                <li
                  key={skill.id}
                  className={
                    srOnly
                      ? undefined
                      : "rounded-full border border-border bg-primary/10 px-3 py-1 font-mono text-[0.7rem] text-primary-deep"
                  }
                >
                  <span>{skill.label}</span>
                  {srOnly ? <span> — {skill.description}</span> : null}
                </li>
              ))}
            </ul>
          </Wrapper>
        );
      })}
    </div>
  );
}
