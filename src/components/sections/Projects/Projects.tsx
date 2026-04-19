import { projects } from "@/content/projects";
import { ProjectCard } from "./ProjectCard";

export function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="px-6 py-24 md:px-12 lg:px-20 border-t border-border"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <h2
          id="projects-heading"
          className="font-display text-3xl md:text-4xl font-medium text-primary-deep"
        >
          Selected work
        </h2>
        <p className="max-w-md text-sm text-fg-muted">
          A few things I&apos;ve shipped. NASA-data asteroid viewer, a
          from-scratch search engine running on Azure, and a full-stack
          visitor management platform, to start.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.title}
            project={project}
          />
        ))}
      </div>
    </section>
  );
}
