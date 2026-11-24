// Config for the PAID live AI test set only (src/**/*.eval.ts).
// `npm test` never runs these. See src/lib/ai/eval/live.eval.ts.
import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  resolve: { alias: { "@": path.resolve(import.meta.dirname, "./src") } },
  test: {
    include: ["src/**/*.eval.ts"],
    environment: "node",
    testTimeout: 60 * 60_000,
    hookTimeout: 60_000,
  },
});
