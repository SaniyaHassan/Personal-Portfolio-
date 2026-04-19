import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

// WCAG 2.1 relative luminance
function luminance(hex: string): number {
  const rgb = hex
    .replace("#", "")
    .match(/.{2}/g)!
    .map((c) => parseInt(c, 16) / 255)
    .map((v) =>
      v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4),
    );
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
}

function contrast(a: string, b: string): number {
  const la = luminance(a);
  const lb = luminance(b);
  const [lighter, darker] = la > lb ? [la, lb] : [lb, la];
  return (lighter + 0.05) / (darker + 0.05);
}

describe("design tokens — contrast", () => {
  const CREAM = "#F7F2EC";
  const INK = "#1C1618";
  const TAUPE = "#8A7B7E";
  const PLUM = "#5B3A4A";
  const ROSE = "#C8A4A9";

  it("light mode: ink on cream meets WCAG AA body (≥ 4.5:1)", () => {
    expect(contrast(INK, CREAM)).toBeGreaterThanOrEqual(4.5);
  });

  it("dark mode: cream on ink meets WCAG AA body (≥ 4.5:1)", () => {
    expect(contrast(CREAM, INK)).toBeGreaterThanOrEqual(4.5);
  });

  it("plum on cream meets WCAG AA body (≥ 4.5:1) for accent text", () => {
    expect(contrast(PLUM, CREAM)).toBeGreaterThanOrEqual(4.5);
  });

  it("rose on ink meets WCAG AA large text (≥ 3:1) for dark-mode accent", () => {
    expect(contrast(ROSE, INK)).toBeGreaterThanOrEqual(3);
  });

  it("taupe (muted) on cream meets WCAG AA large text (≥ 3:1)", () => {
    expect(contrast(TAUPE, CREAM)).toBeGreaterThanOrEqual(3);
  });

  it("tokens.css contains all four theme-mode × motif combinations", () => {
    const css = readFileSync(resolve(__dirname, "../tokens.css"), "utf-8");
    expect(css).toMatch(/\[data-theme-mode="light"\]/);
    expect(css).toMatch(/\[data-theme-mode="dark"\]/);
    expect(css).toMatch(/\[data-theme-motif="constellation"\]/);
    expect(css).toMatch(/\[data-theme-motif="floral"\]/);
  });
});
