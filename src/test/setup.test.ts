import { describe, it, expect } from "vitest";

describe("test infrastructure", () => {
  it("runs vitest with jsdom", () => {
    const el = document.createElement("div");
    el.textContent = "hello";
    expect(el.textContent).toBe("hello");
  });
});
