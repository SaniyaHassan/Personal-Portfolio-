import { render, screen, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Journey } from "../Journey";
import { about, journey } from "@/content/journey";

describe("Journey", () => {
  it("renders the heading and wires aria-labelledby correctly", () => {
    const { container } = render(<Journey />);
    const section = container.querySelector("section");
    expect(section).not.toBeNull();
    expect(section).toHaveAttribute("aria-labelledby", "journey-heading");
    const heading = screen.getByRole("heading", { level: 2, name: /journey/i });
    expect(heading).toHaveAttribute("id", "journey-heading");
  });

  it("renders every About paragraph and the closing line", () => {
    render(<Journey />);
    for (const paragraph of about.paragraphs) {
      expect(screen.getByText(paragraph)).toBeInTheDocument();
    }
    expect(screen.getByText(about.closing)).toBeInTheDocument();
  });

  it("renders every education entry from content", () => {
    render(<Journey />);
    const educationEntries = journey.filter((e) => e.kind === "education");
    expect(educationEntries.length).toBeGreaterThan(0);
    for (const entry of educationEntries) {
      expect(
        screen.getByRole("heading", { level: 3, name: entry.title }),
      ).toBeInTheDocument();
      expect(screen.getByText(entry.dates)).toBeInTheDocument();
    }
  });

  it("does not render blank rows for empty experience entries", () => {
    render(<Journey />);
    const list = screen.getByRole("list", {
      name: /education and experience timeline/i,
    });
    const items = within(list).getAllByRole("listitem");
    // Only non-empty entries should be rendered (experience list is empty in v1).
    const expected = journey.filter(
      (e) => e.kind !== "experience" || e.title.length > 0,
    ).length;
    expect(items).toHaveLength(expected);
    // And none of the rendered labels should read "Experience" because the
    // experience slot is intentionally empty in v1.
    expect(screen.queryByText(/^experience$/i)).not.toBeInTheDocument();
  });
});
