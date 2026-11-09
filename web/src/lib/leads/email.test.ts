// Staff email notifications (20i StackMail; added 2026-11-09).
import { afterEach, describe, expect, it } from "vitest";
import { buildStaffEmail, emailConfig } from "@/lib/leads/email";

const lead = {
  id: "lead-abc123-ffffff",
  category: "sales_valuation" as const,
  priority: "routine" as const,
  createdAt: "2026-11-09T10:00:00.000Z",
};

const SETTINGS = {
  EMAIL_NOTIFICATIONS: "on",
  SMTP_HOST: "smtp.example.com",
  SMTP_PORT: "465",
  SMTP_USER: "noreply@example.com",
  SMTP_PASSWORD: "x",
  EMAIL_FROM: "Website <noreply@example.com>",
  STAFF_NOTIFY_TO: "hello@example.com",
};

afterEach(() => {
  for (const k of Object.keys(SETTINGS)) delete process.env[k];
});

describe("staff email wording", () => {
  it("names the enquiry type, reference, priority and a link", () => {
    const e = buildStaffEmail(lead, "https://www.timesestates.co.uk");
    expect(e.subject).toBe("New sales valuation (lead-abc123-ffffff)");
    expect(e.text).toContain("Type:      Sales valuation");
    expect(e.text).toContain("Priority:  Routine");
    expect(e.text).toContain("https://www.timesestates.co.uk/admin/leads/lead-abc123-ffffff");
    expect(e.text).toContain("Received:  9 Nov 2026, 10:00 (UK time)");
  });

  it("flags emergencies and urgent repairs in the subject", () => {
    expect(buildStaffEmail({ ...lead, category: "repair_report", priority: "emergency" }, "x").subject).toMatch(/^EMERGENCY — New repair report/);
    expect(buildStaffEmail({ ...lead, category: "repair_report", priority: "urgent" }, "x").subject).toMatch(/^Urgent — /);
  });

  it("carries no customer personal details, whatever the lead holds", () => {
    const full = {
      ...lead,
      contactName: "Private Person",
      contactEmail: "private.person@example.com",
      contactPhone: "020 7946 0003",
      detail: "Secret message",
    };
    const e = buildStaffEmail(full, "x");
    expect(`${e.subject}\n${e.text}`).not.toMatch(/Private Person|private\.person|7946|Secret message/);
  });
});

describe("when email is sent", () => {
  it("never sends under the test runner, even when fully configured", () => {
    Object.assign(process.env, SETTINGS);
    expect(emailConfig()).toBeNull();
  });
});
