import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Learning Sphere — Saniya Hassan",
  description:
    "Java OOP desktop application built as an end-semester classroom project, demonstrating inheritance, polymorphism, and encapsulation.",
};

export default function LearningSpherePage() {
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
            Classroom project · 2025
          </p>
          <h1 className="mt-4 font-display font-medium tracking-tight leading-[1.02] text-4xl md:text-6xl">
            Learning Sphere
          </h1>
          <p className="mt-4 text-base md:text-lg text-fg-muted max-w-2xl">
            End-semester Java OOP project. A desktop application built to
            exercise the core object-oriented principles on a real feature
            surface instead of contrived textbook exercises.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technology stack">
            {["Java", "Object-Oriented Design", "Desktop UI"].map((tech) => (
              <li
                key={tech}
                className="rounded-full bg-primary/10 text-primary-deep px-3 py-1 text-xs font-mono"
              >
                {tech}
              </li>
            ))}
          </ul>
        </header>

        <section className="mt-14 pt-14 border-t border-border">
          <h2 className="font-display text-2xl md:text-3xl font-medium tracking-tight">
            What it is
          </h2>
          <div className="mt-6 flex flex-col gap-5 text-base md:text-lg text-fg/90 leading-relaxed">
            <p>
              Learning Sphere was the capstone for our object-oriented
              programming course at NUST. The brief was open-ended. Build
              something substantial enough to showcase inheritance,
              polymorphism, and encapsulation without collapsing into a
              single toy class hierarchy.
            </p>
            <p>
              The team built a desktop learning application with a proper UI,
              domain model, and feature set. Inheritance models the content
              hierarchy: course, module, lesson, exercise. Polymorphism shows
              up in the exercise-submission pipeline, where each exercise
              type implements a shared grading contract differently.
              Encapsulation is enforced through private state and validated
              setters on every domain object.
            </p>
            <p>
              The demo video below is the end-of-semester presentation
              posted on a teammate&apos;s LinkedIn. It walks through the UI
              and the grading flow. Source stayed private to the cohort, so
              the feature details are in the recording.
            </p>
          </div>
        </section>

        <section className="mt-14 pt-14 border-t border-border">
          <h2 className="font-display text-2xl md:text-3xl font-medium tracking-tight">
            Demo
          </h2>
          <p className="mt-4 text-sm text-fg-muted">
            LinkedIn post embed. Click through to the full post for comments
            and context.
          </p>
          <div className="mt-8 flex justify-center">
            <div
              className="rounded-2xl border border-border overflow-hidden bg-bg shadow-sm"
              style={{ width: "min(100%, 504px)" }}
            >
              <iframe
                src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7337922720262709248?collapsed=1"
                title="Learning Sphere — end-of-semester demo on LinkedIn"
                className="block w-full"
                style={{ height: "541px", border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
          <p className="mt-6 text-xs text-fg-muted text-center">
            <a
              href="https://www.linkedin.com/posts/fatima-zunaira-8a25a9313_excited-to-share-our-end-semester-project-activity-7337922889926561793-OWai"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 decoration-primary hover:text-fg"
            >
              Open on LinkedIn →
            </a>
          </p>
        </section>

        <section className="mt-14 pt-14 border-t border-border">
          <h2 className="font-display text-2xl md:text-3xl font-medium tracking-tight">
            What it exercised
          </h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-3 list-none p-0 m-0">
            {[
              {
                label: "Inheritance",
                value: "Content hierarchy",
                note: "Course → module → lesson → exercise",
              },
              {
                label: "Polymorphism",
                value: "Shared grading contract",
                note: "Multiple exercise types, one submit pipeline",
              },
              {
                label: "Encapsulation",
                value: "Validated state",
                note: "Private fields, invariant-guarding setters",
              },
            ].map((item) => (
              <li
                key={item.label}
                className="rounded-xl border border-border p-5"
              >
                <p className="text-[10px] uppercase tracking-widest text-fg-muted font-mono">
                  {item.label}
                </p>
                <p className="mt-2 font-display text-xl text-primary-deep">
                  {item.value}
                </p>
                <p className="mt-2 text-xs text-fg-muted">{item.note}</p>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </main>
  );
}
