import Link from "next/link";
import type { CaseStudy } from "@/content/case-studies";

/**
 * Shared page-level layout for all /projects/[slug] deep-dive routes.
 * Per-case-study pages compose: hero → problem → what I built → key
 * decisions → outcomes → links. Scramble-text numbers in Outcomes handled
 * client-side by a later enhancement; v1 renders as static text.
 */
export function CaseStudyPage({ study }: { study: CaseStudy }) {
  return (
    <main id="main">
    <article className="mx-auto max-w-3xl px-6 py-16 md:px-10 lg:px-0">
      <Link
        href="/#projects"
        className="inline-flex items-center gap-1 text-xs uppercase tracking-widest text-fg-muted hover:text-primary-deep focus-visible:outline-focus-ring"
      >
        <span aria-hidden="true">←</span> Back to work
      </Link>

      <header className="mt-10 border-b border-border pb-10">
        <p className="text-xs uppercase tracking-[0.22em] text-fg-muted font-mono">
          {study.role} · {study.yearRange}
        </p>
        <h1 className="mt-4 font-display font-medium tracking-tight leading-[1.02] text-4xl md:text-6xl">
          {study.title}
        </h1>
        <p className="mt-4 text-base md:text-lg text-fg-muted max-w-2xl">
          {study.subtitle}
        </p>
        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technology stack">
          {study.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-full bg-primary/10 text-primary-deep px-3 py-1 text-xs font-mono"
            >
              {tech}
            </li>
          ))}
        </ul>
      </header>

      <CaseStudySection title="The problem">
        <p className="text-base md:text-lg text-fg/90 leading-relaxed">
          {study.problem}
        </p>
      </CaseStudySection>

      <CaseStudySection title="What I built">
        <div className="flex flex-col gap-5 text-base md:text-lg text-fg/90 leading-relaxed">
          {study.whatIBuilt.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        {study.diagram ? (
          <figure className="mt-10 rounded-2xl border border-border p-8 text-center">
            <div
              role="img"
              aria-label={study.diagram.alt}
              className="h-48 flex items-center justify-center text-fg-muted"
            >
              {/* per-study diagrams slot in here; placeholder for v1 */}
              <span className="text-xs font-mono">
                [ architecture diagram · {study.diagram.svgId ?? "v1 placeholder"} ]
              </span>
            </div>
            <figcaption className="mt-4 text-xs text-fg-muted">
              {study.diagram.caption}
            </figcaption>
          </figure>
        ) : null}
      </CaseStudySection>

      <CaseStudySection title="Key decisions">
        <ol className="grid gap-4 md:grid-cols-2">
          {study.decisions.map((d, i) => (
            <li
              key={i}
              className="rounded-xl border border-border p-5 bg-bg/60"
            >
              <p className="font-display text-lg text-primary-deep">
                {d.decision}
              </p>
              <p className="mt-2 text-sm text-fg-muted">
                <span className="uppercase tracking-widest text-[10px] font-mono">
                  alternative ·
                </span>{" "}
                {d.alternative}
              </p>
              <p className="mt-3 text-sm text-fg/90 leading-relaxed">
                {d.why}
              </p>
            </li>
          ))}
        </ol>
      </CaseStudySection>

      <CaseStudySection title="Outcomes">
        <ul
          aria-label="Outcome metrics"
          className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 list-none p-0 m-0"
        >
          {study.outcomes.map((o) => (
            <li
              key={o.label}
              className="rounded-xl border border-border p-5"
            >
              <p className="text-[10px] uppercase tracking-widest text-fg-muted font-mono">
                {o.label}
              </p>
              <p className="mt-2 font-display text-3xl text-primary-deep">
                {o.value}
              </p>
              {o.note ? (
                <p className="mt-2 text-xs text-fg-muted">{o.note}</p>
              ) : null}
            </li>
          ))}
        </ul>
      </CaseStudySection>

      {study.links.length > 0 ? (
        <CaseStudySection title="Links">
          <ul className="flex flex-wrap gap-3">
            {study.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:border-primary-deep hover:text-primary-deep focus-visible:outline-focus-ring"
                >
                  {link.label}
                  <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </CaseStudySection>
      ) : null}
    </article>
    </main>
  );
}

function CaseStudySection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-14 pt-14 border-t border-border">
      <h2 className="font-display text-2xl md:text-3xl font-medium tracking-tight">
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}
