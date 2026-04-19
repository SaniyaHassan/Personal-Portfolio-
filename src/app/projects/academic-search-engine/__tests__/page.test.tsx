import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import AcademicSearchEnginePage from "../page";
import { academicSearchEngine } from "@/content/case-studies/academic-search-engine";

describe("/projects/academic-search-engine route", () => {
  it("renders the case-study title as an h1", () => {
    render(<AcademicSearchEnginePage />);
    expect(
      screen.getByRole("heading", { level: 1, name: /academic search engine/i }),
    ).toBeInTheDocument();
  });

  it("has a back link pointing to /#projects", () => {
    render(<AcademicSearchEnginePage />);
    const link = screen.getByRole("link", { name: /back to work/i });
    expect(link).toHaveAttribute("href", "/#projects");
  });

  it("renders every decision with its alternative and rationale", () => {
    render(<AcademicSearchEnginePage />);
    for (const decision of academicSearchEngine.decisions) {
      expect(screen.getByText(decision.decision)).toBeInTheDocument();
      expect(screen.getByText(decision.alternative, { exact: false })).toBeInTheDocument();
      expect(screen.getByText(decision.why)).toBeInTheDocument();
    }
  });

  it("renders every outcome as a label/value pair", () => {
    render(<AcademicSearchEnginePage />);
    for (const outcome of academicSearchEngine.outcomes) {
      expect(screen.getByText(outcome.label)).toBeInTheDocument();
      expect(screen.getByText(outcome.value)).toBeInTheDocument();
    }
  });
});
