import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ProjectCard } from "../ProjectCard";
import type { Project } from "@/content/projects";

const baseProject: Project = {
  slug: "lunacy",
  title: "LUNACY",
  subtitle: "NASA NeoWs Space Visualization System",
  stack: ["Godot Engine", "NASA NeoWs API", "Data Automation"],
  pitch: "A 3D visualization of near-Earth asteroid trajectories.",
  metric: "live NASA feed",
  metricLabel: "Data source",
};

describe("ProjectCard", () => {
  it("renders as an anchor linking to /projects/[slug] when slug is provided", () => {
    render(<ProjectCard project={baseProject} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/projects/lunacy");
  });

  it("renders as an article (no anchor) when slug is null", () => {
    const noSlug: Project = { ...baseProject, slug: null, title: "VEMS" };
    render(<ProjectCard project={noSlug} />);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(screen.getByRole("article")).toBeInTheDocument();
  });

  it("renders the title and all stack chips", () => {
    render(<ProjectCard project={baseProject} />);
    expect(
      screen.getByRole("heading", { level: 3, name: /LUNACY/i }),
    ).toBeInTheDocument();
    for (const tech of baseProject.stack) {
      expect(screen.getByText(tech)).toBeInTheDocument();
    }
  });
});
