import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import CvPage from "../page";
import { cv } from "@/content/cv";

describe("/cv route", () => {
  it("renders Saniya's name as the primary heading", () => {
    render(<CvPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: /saniya hassan/i }),
    ).toBeInTheDocument();
  });

  it("renders all four projects by title", () => {
    render(<CvPage />);
    for (const project of cv.projects) {
      expect(screen.getByText(project.title)).toBeInTheDocument();
    }
    expect(cv.projects).toHaveLength(4);
  });

  it("renders all three education entries", () => {
    render(<CvPage />);
    for (const entry of cv.education) {
      expect(screen.getByText(entry.institution)).toBeInTheDocument();
    }
    expect(cv.education).toHaveLength(3);
  });

  it("has a Download PDF link pointing to /cv.pdf", () => {
    render(<CvPage />);
    const link = screen.getByRole("link", { name: /download pdf/i });
    expect(link).toHaveAttribute("href", "/cv.pdf");
  });

  it('has a "back" link pointing to /', () => {
    render(<CvPage />);
    const link = screen.getByRole("link", { name: /back/i });
    expect(link).toHaveAttribute("href", "/");
  });
});
