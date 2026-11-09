import { describe, expect, it, vi } from "vitest";
import { askAssistant } from "@/lib/ai/actions";
import { aiProvider } from "@/lib/ai/demo-provider";

vi.mock("next/headers", () => ({
  headers: async () => new Headers({ "x-forwarded-for": "203.0.113.21" }),
}));

describe("askAssistant when the AI provider is down", () => {
  it("returns a safe message that escalates to a person", async () => {
    vi.spyOn(aiProvider, "respond").mockRejectedValueOnce(
      new Error("provider outage"),
    );
    const r = await askAssistant([], "Do you have flats to rent?");
    expect(r.content).toMatch(/isn't available right now/);
    expect(r.suggestsHumanFollowUp).toBe(true);
    expect(r.sources[0]?.href).toBe("/contact");
  });

  it("answers normally when the provider is up", async () => {
    const r = await askAssistant([], "how do I report a repair?");
    expect(r.sources[0]?.href).toBe("/report-a-repair");
  });
});
