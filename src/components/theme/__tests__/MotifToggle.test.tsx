import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach } from "vitest";
import { ThemeProvider } from "../ThemeProvider";
import { MotifToggle } from "../MotifToggle";

describe("MotifToggle", () => {
  beforeEach(() => {
    localStorage.clear();
    delete document.documentElement.dataset.themeMotif;
  });

  it("renders as a radiogroup with two options", () => {
    render(
      <ThemeProvider>
        <MotifToggle />
      </ThemeProvider>,
    );
    const group = screen.getByRole("radiogroup", {
      name: /motif|theme style/i,
    });
    expect(group).toBeInTheDocument();
    const radios = screen.getAllByRole("radio");
    expect(radios).toHaveLength(2);
  });

  it("marks constellation as selected by default", () => {
    render(
      <ThemeProvider>
        <MotifToggle />
      </ThemeProvider>,
    );
    const constellation = screen.getByRole("radio", { name: /constellation/i });
    const floral = screen.getByRole("radio", { name: /floral/i });
    expect(constellation).toHaveAttribute("aria-checked", "true");
    expect(floral).toHaveAttribute("aria-checked", "false");
  });

  it("switches motif when the user selects floral", async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider>
        <MotifToggle />
      </ThemeProvider>,
    );
    await user.click(screen.getByRole("radio", { name: /floral/i }));
    expect(document.documentElement.dataset.themeMotif).toBe("floral");
  });

  it("uses roving tabindex: only the selected radio is in the tab order", () => {
    render(
      <ThemeProvider>
        <MotifToggle />
      </ThemeProvider>,
    );
    const constellation = screen.getByRole("radio", { name: /constellation/i });
    const floral = screen.getByRole("radio", { name: /floral/i });
    expect(constellation).toHaveAttribute("tabindex", "0");
    expect(floral).toHaveAttribute("tabindex", "-1");
  });

  it("arrow keys navigate between radios and move focus with selection", async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider>
        <MotifToggle />
      </ThemeProvider>,
    );
    const constellation = screen.getByRole("radio", { name: /constellation/i });
    constellation.focus();
    expect(constellation).toHaveFocus();

    await user.keyboard("{ArrowRight}");
    const floral = screen.getByRole("radio", { name: /floral/i });
    expect(document.documentElement.dataset.themeMotif).toBe("floral");
    expect(floral).toHaveFocus();
    expect(floral).toHaveAttribute("tabindex", "0");
    expect(constellation).toHaveAttribute("tabindex", "-1");

    // ArrowLeft wraps back to constellation
    await user.keyboard("{ArrowLeft}");
    expect(document.documentElement.dataset.themeMotif).toBe("constellation");
    expect(constellation).toHaveFocus();
  });
});
