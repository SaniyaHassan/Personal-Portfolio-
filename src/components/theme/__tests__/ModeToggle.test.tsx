import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach } from "vitest";
import { ThemeProvider } from "../ThemeProvider";
import { ModeToggle } from "../ModeToggle";

describe("ModeToggle", () => {
  beforeEach(() => {
    localStorage.clear();
    delete document.documentElement.dataset.themeMode;
  });

  it("renders a button with aria-label naming current mode", () => {
    render(
      <ThemeProvider>
        <ModeToggle />
      </ThemeProvider>,
    );
    const btn = screen.getByRole("button");
    expect(btn).toHaveAttribute(
      "aria-label",
      expect.stringMatching(/light|dark/i),
    );
  });

  it("toggles mode on click", async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider>
        <ModeToggle />
      </ThemeProvider>,
    );
    const btn = screen.getByRole("button");
    const initial = document.documentElement.dataset.themeMode;
    await user.click(btn);
    const next = document.documentElement.dataset.themeMode;
    expect(next).not.toBe(initial);
    expect(["light", "dark"]).toContain(next);
  });

  it("sets aria-pressed based on mode (dark = pressed)", async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider>
        <ModeToggle />
      </ThemeProvider>,
    );
    const btn = screen.getByRole("button");
    expect(btn).toHaveAttribute("aria-pressed", "false");
    await user.click(btn);
    expect(btn).toHaveAttribute("aria-pressed", "true");
  });
});
