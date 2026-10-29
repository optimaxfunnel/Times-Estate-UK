import { describe, expect, it } from "vitest";
import { escalationFor } from "@/lib/leads/escalation";

const now = new Date("2026-10-29T12:00:00Z");
const minsAgo = (m: number) =>
  new Date(now.getTime() - m * 60000).toISOString();

describe("lead escalation flags", () => {
  it("flags an unacknowledged emergency after 15 minutes", () => {
    expect(
      escalationFor(
        { priority: "emergency", stage: "new", createdAt: minsAgo(20) },
        now,
      ).level,
    ).toBe("overdue");
  });

  it("gives an urgent lead two hours and warns before then", () => {
    expect(
      escalationFor(
        { priority: "urgent", stage: "new", createdAt: minsAgo(100) },
        now,
      ).level,
    ).toBe("due_soon");
    expect(
      escalationFor(
        { priority: "urgent", stage: "new", createdAt: minsAgo(130) },
        now,
      ).level,
    ).toBe("overdue");
  });

  it("stops flagging once a lead is acknowledged", () => {
    expect(
      escalationFor(
        {
          priority: "routine",
          stage: "acknowledged",
          createdAt: minsAgo(5000),
        },
        now,
      ).level,
    ).toBe("none");
  });

  it("flags a past follow-up date on any open lead", () => {
    expect(
      escalationFor(
        {
          priority: "routine",
          stage: "contact_attempted",
          createdAt: minsAgo(10),
          followUpDate: "2026-10-28",
        },
        now,
      ).level,
    ).toBe("overdue");
  });

  it("never flags a closed lead", () => {
    expect(
      escalationFor(
        {
          priority: "emergency",
          stage: "closed",
          createdAt: minsAgo(9999),
          followUpDate: "2026-01-01",
        },
        now,
      ).level,
    ).toBe("none");
  });
});
