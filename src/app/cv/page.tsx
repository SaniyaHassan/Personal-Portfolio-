import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { cv } from "@/content/cv";

export const metadata: Metadata = {
  title: "CV — Saniya Hassan",
  description:
    "Full curriculum vitae for Saniya Hassan — Software Engineering student at NUST. Inline view with PDF download.",
};

/**
 * Canonical CV page.
 *
 * Server Component — renders `web/src/content/cv.ts` as the single source of
 * truth for the TS side. `/cv.pdf` is the static download (copied from the
 * LaTeX source in `cv/saniya_hassan_cv.tex`).
 *
 * Print styles live in `globals.css` under `@media print` — the top action
 * bar is hidden so `Cmd+P` produces a clean document.
 */
export default function CvPage() {
  return (
    <main id="main" className="bg-bg text-fg" data-cv-root>
      <article className="mx-auto max-w-2xl px-6 py-12 md:px-0 md:py-20">
        {/* Action bar — hidden in print */}
        <div
          className="mb-12 flex items-center justify-between gap-4"
          data-cv-actions
        >
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-fg-muted transition-colors hover:text-fg"
          >
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            <span>Back</span>
          </Link>
          <a
            href="/cv.pdf"
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "no-underline",
            )}
            download
          >
            <Download aria-hidden="true" />
            Download PDF
          </a>
        </div>

        {/* Header */}
        <header className="border-b border-border pb-8">
          <h1 className="font-display text-4xl font-medium tracking-tight text-fg md:text-5xl">
            {cv.header.name}
          </h1>
          <p className="font-body mt-2 text-sm text-fg-muted md:text-base">
            {cv.header.headline}
          </p>
          <ul className="font-body mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-fg-muted md:text-sm">
            <li>
              <a
                href={`tel:${cv.header.phone.replace(/\s|-/g, "")}`}
                className="text-primary underline underline-offset-4"
              >
                {cv.header.phone}
              </a>
            </li>
            <li aria-hidden="true">·</li>
            <li>
              <a
                href={`mailto:${cv.header.email}`}
                className="text-primary underline underline-offset-4"
              >
                {cv.header.email}
              </a>
            </li>
            <li aria-hidden="true">·</li>
            <li>
              <a
                href={cv.header.links.github}
                className="text-primary underline underline-offset-4"
              >
                GitHub
              </a>
            </li>
            <li aria-hidden="true">·</li>
            <li>
              <a
                href={cv.header.links.linkedin}
                className="text-primary underline underline-offset-4"
              >
                LinkedIn
              </a>
            </li>
            {cv.header.links.portfolio ? (
              <>
                <li aria-hidden="true">·</li>
                <li>
                  <a
                    href={cv.header.links.portfolio}
                    className="text-primary underline underline-offset-4"
                  >
                    Portfolio
                  </a>
                </li>
              </>
            ) : null}
          </ul>
        </header>

        <Section title="Profile">
          <p className="font-body text-sm leading-relaxed text-fg md:text-base">
            {cv.profile}
          </p>
          <p className="font-body mt-3 text-sm font-medium leading-relaxed text-fg md:text-base">
            {cv.profileHighlight}
          </p>
        </Section>

        <Section title="Education">
          <ul className="space-y-5">
            {cv.education.map((entry) => (
              <li
                key={entry.institution}
                className="grid grid-cols-[1fr_auto] gap-x-6 gap-y-1"
              >
                <p className="font-body text-sm font-medium text-fg md:text-base">
                  {entry.institution}
                </p>
                <p className="font-mono text-right text-xs tabular-nums text-fg-muted md:text-sm">
                  {entry.dates}
                </p>
                <p className="font-body text-sm text-fg-muted md:text-[15px]">
                  {entry.degree}
                </p>
                {entry.detail ? (
                  <p className="font-mono text-right text-xs tabular-nums text-fg-muted md:text-sm">
                    {entry.detail}
                  </p>
                ) : (
                  <span aria-hidden="true" />
                )}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Technical Skills">
          <dl className="space-y-3">
            {cv.skills.map((group) => (
              <div
                key={group.label}
                className="grid grid-cols-1 gap-1 md:grid-cols-[200px_1fr] md:gap-4"
              >
                <dt className="font-body text-sm font-medium text-fg md:text-[15px]">
                  {group.label}
                </dt>
                <dd className="font-body text-sm text-fg-muted md:text-[15px]">
                  {group.items.join(", ")}
                </dd>
              </div>
            ))}
          </dl>
        </Section>

        {cv.experience.length > 0 && (
          <Section title="Experience">
            <ul className="space-y-6">
              {cv.experience.map((role) => (
                <li key={`${role.organization}-${role.role}`}>
                  <div className="grid grid-cols-[1fr_auto] gap-x-6">
                    <p className="font-body text-sm font-medium text-fg md:text-base">
                      {role.role}
                      <span className="text-fg-muted"> · {role.organization}</span>
                    </p>
                    <p className="font-mono text-right text-xs tabular-nums text-fg-muted md:text-sm">
                      {role.employmentType
                        ? `${role.employmentType} · ${role.dates}`
                        : role.dates}
                    </p>
                  </div>
                  <ul className="mt-2 list-disc space-y-1 pl-5 marker:text-fg-muted">
                    {role.bullets.map((b) => (
                      <li
                        key={b}
                        className="font-body text-sm text-fg-muted md:text-[15px]"
                      >
                        {b}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </Section>
        )}

        <Section title="Projects">
          <ul className="space-y-6">
            {cv.projects.map((project) => (
              <li key={project.title}>
                <p className="font-body text-sm font-medium text-fg md:text-base">
                  {project.url ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-primary underline underline-offset-4 decoration-primary/40 hover:decoration-primary"
                    >
                      {project.title}
                    </a>
                  ) : (
                    project.title
                  )}
                </p>
                <p className="font-mono mt-0.5 text-xs text-fg-muted md:text-sm">
                  {project.stack.join(", ")}
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-5 marker:text-fg-muted">
                  {project.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="font-body text-sm text-fg-muted md:text-[15px]"
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Certifications">
          <ul className="list-disc space-y-1 pl-5 marker:text-fg-muted">
            {cv.certifications.map((item) => (
              <li
                key={item}
                className="font-body text-sm text-fg-muted md:text-[15px]"
              >
                {item}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Achievements">
          <ul className="list-disc space-y-1 pl-5 marker:text-fg-muted">
            {cv.achievements.map((item) => (
              <li
                key={item}
                className="font-body text-sm text-fg-muted md:text-[15px]"
              >
                {item}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Leadership">
          <ul className="space-y-3">
            {cv.leadership.map((role) => (
              <li key={role.title}>
                <p className="font-body text-sm font-medium text-fg md:text-base">
                  {role.title}
                </p>
                {role.bullets && role.bullets.length > 0 ? (
                  <ul className="mt-1 list-disc space-y-1 pl-5 marker:text-fg-muted">
                    {role.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="font-body text-sm text-fg-muted md:text-[15px]"
                      >
                        {bullet}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        </Section>

        <p className="font-mono mt-16 text-center text-[0.7rem] text-fg-muted">
          Last updated: {cv.lastUpdated}
        </p>
      </article>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b border-border py-8">
      <h2 className="font-display mb-4 text-[0.7rem] font-medium tracking-[0.24em] text-primary-deep uppercase">
        {title}
      </h2>
      {children}
    </section>
  );
}
