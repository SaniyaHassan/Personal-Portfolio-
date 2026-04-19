import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import LunacyCaseStudyPage from "../page";
import { lunacy } from "@/content/case-studies/lunacy";

describe("/projects/lunacy route", () => {
  it("renders the case-study title as the primary heading", () => {
    render(<LunacyCaseStudyPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: /lunacy/i }),
    ).toBeInTheDocument();
  });

  it('has a "Back to work" link pointing to /#projects', () => {
    render(<LunacyCaseStudyPage />);
    const link = screen.getByRole("link", { name: /back to work/i });
    expect(link).toHaveAttribute("href", "/#projects");
  });

  it("renders every key-decision card", () => {
    render(<LunacyCaseStudyPage />);
    for (const decision of lunacy.decisions) {
      expect(screen.getByText(decision.decision)).toBeInTheDocument();
    }
    expect(lunacy.decisions.length).toBeGreaterThanOrEqual(3);
  });

  it("renders every outcome metric", () => {
    render(<LunacyCaseStudyPage />);
    for (const outcome of lunacy.outcomes) {
      expect(screen.getByText(outcome.label)).toBeInTheDocument();
      expect(screen.getByText(outcome.value)).toBeInTheDocument();
    }
    expect(lunacy.outcomes.length).toBeGreaterThanOrEqual(3);
  });
});
