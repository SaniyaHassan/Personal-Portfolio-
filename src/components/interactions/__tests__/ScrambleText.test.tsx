import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { ScrambleText } from "../ScrambleText";

describe("ScrambleText", () => {
  beforeEach(() => {
    // default to no reduced motion preference
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

  it("renders the first word on mount", () => {
    render(<ScrambleText words={["alpha", "beta"]} />);
    expect(screen.getByTestId("scramble-text")).toHaveTextContent("alpha");
  });

  it("declares aria-live='polite' for screen readers", () => {
    render(<ScrambleText words={["alpha"]} />);
    expect(screen.getByTestId("scramble-text")).toHaveAttribute(
      "aria-live",
      "polite",
    );
  });

  it("renders static first word when prefers-reduced-motion is reduce", () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query.includes("reduce"),
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
    render(<ScrambleText words={["alpha", "beta"]} />);
    expect(screen.getByTestId("scramble-text")).toHaveTextContent("alpha");
  });
});
