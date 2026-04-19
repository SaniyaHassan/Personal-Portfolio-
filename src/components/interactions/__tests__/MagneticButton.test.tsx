import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { MagneticLink } from "../MagneticButton";

describe("MagneticLink", () => {
  beforeEach(() => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  });

  it("renders an anchor with the given href", () => {
    render(<MagneticLink href="/projects">See projects</MagneticLink>);
    const link = screen.getByRole("link", { name: /see projects/i });
    expect(link).toHaveAttribute("href", "/projects");
  });

  it("applies primary variant classes by default", () => {
    render(<MagneticLink href="/x">Go</MagneticLink>);
    const link = screen.getByRole("link");
    expect(link.className).toMatch(/bg-primary-deep/);
  });

  it("applies outline variant when requested", () => {
    render(
      <MagneticLink href="/x" variant="outline">
        Go
      </MagneticLink>,
    );
    const link = screen.getByRole("link");
    expect(link.className).toMatch(/border/);
  });
});
