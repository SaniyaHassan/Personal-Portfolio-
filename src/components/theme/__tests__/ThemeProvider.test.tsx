import { render, screen, act } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { ThemeProvider, useTheme } from "../ThemeProvider";

function Consumer() {
  const { mode, motif, toggleMode, setMotif } = useTheme();
  return (
    <>
      <span data-testid="mode">{mode}</span>
      <span data-testid="motif">{motif}</span>
      <button onClick={toggleMode}>toggle-mode</button>
      <button onClick={() => setMotif("floral")}>set-floral</button>
    </>
  );
}

describe("ThemeProvider", () => {
  beforeEach(() => {
    localStorage.clear();
    delete document.documentElement.dataset.themeMode;
    delete document.documentElement.dataset.themeMotif;
  });

  it("defaults to light + constellation when no storage and light system preference", () => {
    render(
      <ThemeProvider>
        <Consumer />
      </ThemeProvider>,
    );
    expect(screen.getByTestId("mode")).toHaveTextContent("light");
    expect(screen.getByTestId("motif")).toHaveTextContent("constellation");
  });

  it("reflects mode onto document.documentElement.dataset.themeMode", () => {
    render(
      <ThemeProvider>
        <Consumer />
      </ThemeProvider>,
    );
    act(() => {
      screen.getByText("toggle-mode").click();
    });
    expect(document.documentElement.dataset.themeMode).toBe("dark");
  });

  it("reflects motif onto document.documentElement.dataset.themeMotif", () => {
    render(
      <ThemeProvider>
        <Consumer />
      </ThemeProvider>,
    );
    act(() => {
      screen.getByText("set-floral").click();
    });
    expect(document.documentElement.dataset.themeMotif).toBe("floral");
  });

  it("persists mode to localStorage", () => {
    render(
      <ThemeProvider>
        <Consumer />
      </ThemeProvider>,
    );
    act(() => {
      screen.getByText("toggle-mode").click();
    });
    expect(localStorage.getItem("theme-mode")).toBe("dark");
  });

  it("persists motif to localStorage", () => {
    render(
      <ThemeProvider>
        <Consumer />
      </ThemeProvider>,
    );
    act(() => {
      screen.getByText("set-floral").click();
    });
    expect(localStorage.getItem("theme-motif")).toBe("floral");
  });

  it("reads existing localStorage on mount", () => {
    localStorage.setItem("theme-mode", "dark");
    localStorage.setItem("theme-motif", "floral");
    render(
      <ThemeProvider>
        <Consumer />
      </ThemeProvider>,
    );
    expect(screen.getByTestId("mode")).toHaveTextContent("dark");
    expect(screen.getByTestId("motif")).toHaveTextContent("floral");
  });

  it("ignores invalid localStorage values and falls back to defaults", () => {
    localStorage.setItem("theme-mode", "neon");
    localStorage.setItem("theme-motif", "cursed");
    render(
      <ThemeProvider>
        <Consumer />
      </ThemeProvider>,
    );
    expect(screen.getByTestId("mode")).toHaveTextContent("light");
    expect(screen.getByTestId("motif")).toHaveTextContent("constellation");
  });

  it("useTheme throws outside the provider", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<Consumer />)).toThrow(/useTheme must be used within/);
    spy.mockRestore();
  });
});
