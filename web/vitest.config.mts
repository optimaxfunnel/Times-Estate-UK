import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    globals: true,
    // The in-app PostgreSQL (PGlite) takes a few seconds to start the first
    // time each test file uses the database (added 2026-11-09).
    testTimeout: 30_000,
    hookTimeout: 30_000,
  },
});
