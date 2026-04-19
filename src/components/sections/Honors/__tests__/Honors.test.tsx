import { render, screen, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Honors } from "../Honors";

describe("Honors section", () => {
  it("wires section to heading via aria-labelledby", () => {
    const { container } = render(<Honors />);
    const section = container.querySelector("section");
    expect(section).toHaveAttribute("aria-labelledby", "honors-heading");
    expect(screen.getByRole("heading", { name: /honors/i })).toHaveAttribute(
      "id",
      "honors-heading",
    );
  });

  it("renders all three column labels", () => {
    render(<Honors />);
    expect(screen.getByText(/^Achievements$/i)).toBeInTheDocument();
    expect(screen.getByText(/^Certifications$/i)).toBeInTheDocument();
    expect(screen.getByText(/^Leadership$/i)).toBeInTheDocument();
  });

  it("renders the NASA Space Apps achievement", () => {
    render(<Honors />);
    expect(screen.getByText(/NASA Space Apps/i)).toBeInTheDocument();
    expect(screen.getByText(/Global Nominee/i)).toBeInTheDocument();
  });

  it("renders IEEE Publications Executive in the Leadership column", () => {
    render(<Honors />);
    const leadershipHeading = screen.getByText(/^Leadership$/i);
    // The column container is the nearest ancestor with a list inside it.
    const column = leadershipHeading.parentElement as HTMLElement;
    expect(column).not.toBeNull();
    expect(
      within(column).getByText(/Publications Executive/i),
    ).toBeInTheDocument();
    expect(
      within(column).getByText(/IEEE NUST Student Chapter/i),
    ).toBeInTheDocument();
  });
});
