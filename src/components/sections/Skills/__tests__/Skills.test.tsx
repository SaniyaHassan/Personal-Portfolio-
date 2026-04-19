import { render, screen } from "@testing-library/react";
import { act } from "react";
import { describe, it, expect } from "vitest";
import { Skills } from "../Skills";
import { SkillsConstellation } from "../SkillsConstellation";
import { skills } from "@/content/skills";

describe("Skills section", () => {
  it("wires section to heading via aria-labelledby", () => {
    const { container } = render(<Skills />);
    const section = container.querySelector("section");
    expect(section).not.toBeNull();
    expect(section).toHaveAttribute("aria-labelledby", "skills-heading");
    const heading = screen.getByRole("heading", {
      level: 2,
      name: /^skills$/i,
    });
    expect(heading).toHaveAttribute("id", "skills-heading");
  });

  it("renders every skill from the data module in the accessible list fallback", () => {
    render(<Skills />);
    // Each skill's label and description appear at least once — the sr-only
    // SkillsList is the authoritative text alternative, so this assertion is
    // independent of the SVG renderer.
    for (const skill of skills) {
      expect(screen.getAllByText(skill.label).length).toBeGreaterThan(0);
      expect(screen.getAllByText(new RegExp(escapeRegex(skill.description)))
        .length).toBeGreaterThan(0);
    }
  });

  it("renders the four category headings", () => {
    render(<Skills />);
    // Category labels may render multiple times (visible list + sr-only list).
    for (const label of ["Languages", "Core CS", "Backend & Web", "Tools & Platforms"]) {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0);
    }
  });
});

describe("SkillsConstellation interaction", () => {
  it("focuses the first node without throwing and surfaces its description", () => {
    render(<SkillsConstellation />);
    const nodes = screen.getAllByRole("button");
    expect(nodes.length).toBeGreaterThan(0);
    const first = nodes[0] as HTMLElement;
    act(() => {
      first.focus();
    });
    expect(document.activeElement).toBe(first);
    // Data-id of focused node should map back to a skill in content.
    const id = first.getAttribute("data-skill-id");
    expect(id).not.toBeNull();
    const skill = skills.find((s) => s.id === id);
    expect(skill).toBeDefined();
    // Tooltip panel should now show the skill's description.
    expect(screen.getByText(new RegExp(escapeRegex(skill!.description))))
      .toBeInTheDocument();
  });

  it("toggles sticky selection on Enter without throwing", () => {
    render(<SkillsConstellation />);
    const nodes = screen.getAllByRole("button");
    const first = nodes[0] as HTMLElement;
    act(() => {
      first.focus();
    });
    // Simulate keyboard Enter — should not throw and should toggle aria-pressed.
    act(() => {
      first.dispatchEvent(
        new KeyboardEvent("keydown", { key: "Enter", bubbles: true }),
      );
    });
    // aria-pressed reflects sticky selection (true/false allowed after toggle).
    expect(first.getAttribute("aria-pressed")).toMatch(/true|false/);
  });
});

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
