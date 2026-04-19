import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { CommandPalette } from "../CommandPalette";

function renderPalette() {
  return render(
    <ThemeProvider>
      <CommandPalette />
    </ThemeProvider>,
  );
}

describe("CommandPalette", () => {
  beforeEach(() => {
    localStorage.clear();
    delete document.documentElement.dataset.themeMode;
    delete document.documentElement.dataset.themeMotif;

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

  it("is closed by default (no dialog in the document)", () => {
    renderPalette();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens when the user presses Ctrl+K", async () => {
    const user = userEvent.setup();
    renderPalette();
    await user.keyboard("{Control>}k{/Control}");
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("opens when the user presses Meta+K (Cmd+K on mac)", async () => {
    const user = userEvent.setup();
    renderPalette();
    await user.keyboard("{Meta>}k{/Meta}");
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("closes when Escape is pressed", async () => {
    const user = userEvent.setup();
    renderPalette();
    await user.keyboard("{Control>}k{/Control}");
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("filters commands when the user types", async () => {
    const user = userEvent.setup();
    renderPalette();
    await user.keyboard("{Control>}k{/Control}");

    // all commands visible initially
    expect(screen.getByText(/go to hero/i)).toBeInTheDocument();
    expect(screen.getByText(/switch to dark mode/i)).toBeInTheDocument();

    await user.type(screen.getByRole("combobox"), "dark");

    // non-matching commands hidden, dark-related command visible
    expect(screen.getByText(/switch to dark mode/i)).toBeInTheDocument();
    expect(screen.queryByText(/go to hero/i)).not.toBeInTheDocument();
  });

  it("flips the theme to dark when selecting the 'Switch to Dark Mode' command", async () => {
    const user = userEvent.setup();
    renderPalette();
    await user.keyboard("{Control>}k{/Control}");
    await user.type(screen.getByRole("combobox"), "dark");
    await user.keyboard("{Enter}");
    expect(document.documentElement.dataset.themeMode).toBe("dark");
    // closes after running command
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("offers a Download CV command that links to /cv.pdf", async () => {
    const user = userEvent.setup();
    renderPalette();
    await user.keyboard("{Control>}k{/Control}");
    await user.type(screen.getByRole("combobox"), "download cv");
    const link = screen
      .getAllByRole("option")
      .find((el) => /download cv/i.test(el.textContent ?? ""));
    expect(link).toBeDefined();
    // The download command is rendered as an anchor linking to the PDF.
    const anchor = link!.querySelector("a") ?? (link as HTMLAnchorElement);
    expect(anchor.getAttribute("href")).toBe("/cv.pdf");
  });

  it("navigates down and up through filtered options with arrow keys", async () => {
    const user = userEvent.setup();
    renderPalette();
    await user.keyboard("{Control>}k{/Control}");

    // First option is selected by default (aria-selected=true)
    const options = screen.getAllByRole("option");
    expect(options[0]).toHaveAttribute("aria-selected", "true");

    await user.keyboard("{ArrowDown}");
    expect(screen.getAllByRole("option")[1]).toHaveAttribute(
      "aria-selected",
      "true",
    );

    await user.keyboard("{ArrowUp}");
    expect(screen.getAllByRole("option")[0]).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });
});
