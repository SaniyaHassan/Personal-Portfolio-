import Link from "next/link";
import type { Project } from "@/content/projects";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const headingId = `project-${project.slug ?? slugify(project.title)}-heading`;

  const cardBody = (
    <>
      <div className="flex flex-col gap-2">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-accent-natural">
          {project.subtitle}
        </p>
        <h3
          id={headingId}
          className="font-display text-2xl md:text-3xl font-medium text-primary-deep leading-tight"
        >
          {project.title}
        </h3>
      </div>

      <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tech stack">
        {project.stack.map((tech) => (
          <li
            key={tech}
            className="rounded-full bg-primary/10 px-3 py-1 font-mono text-[0.7rem] text-primary-deep"
          >
            {tech}
          </li>
        ))}
      </ul>

      <p className="mt-5 text-sm md:text-base text-fg">{project.pitch}</p>

      <div className="mt-6 pt-4 border-t border-border">
        <p className="text-[0.7rem] uppercase tracking-[0.18em] text-fg-muted">
          {project.metricLabel}
        </p>
        <p className="mt-1 font-display text-lg text-fg">{project.metric}</p>
      </div>
    </>
  );

  const cardClasses =
    "group block h-full rounded-xl border border-border bg-bg p-6 md:p-7 transition duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg hover:border-primary/40 focus-visible:outline-2 focus-visible:outline-focus-ring focus-visible:outline-offset-2";

  if (project.slug) {
    return (
      <article aria-labelledby={headingId} className="h-full">
        <Link href={`/projects/${project.slug}`} className={cardClasses}>
          {cardBody}
        </Link>
      </article>
    );
  }

  return (
    <article aria-labelledby={headingId} className={cardClasses}>
      {cardBody}
    </article>
  );
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
