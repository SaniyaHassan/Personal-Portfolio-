import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    // `forks` pool fails on Windows with spaces in project path (URL-encoding
    // confuses worker spawn). Threads are robust on Windows.
    pool: "threads",
  },
  resolve: {
    alias: { "@": resolve(__dirname, "./src") },
  },
});
