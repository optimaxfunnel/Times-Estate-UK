// Rewritten 2026-11-09 after the original test files were lost (RECOVERY_REPORT_2026-11-09.md).
import { describe, expect, it } from "vitest";
import { getAuditLog, recordAuditEvent } from "@/lib/auth/audit-log";

describe("audit log", () => {
  it("records events newest first with an id and timestamp", () => {
    recordAuditEvent({ actor: "manager", action: "update", propertyId: "p-1", details: "first" });
    recordAuditEvent({ actor: "property_editor", action: "denied", propertyId: "p-1", details: "second" });
    const log = getAuditLog();
    expect(log[0].details).toBe("second");
    expect(log[0].action).toBe("denied");
    expect(log[0].id).toMatch(/^audit-\d+$/);
    expect(Number.isNaN(Date.parse(log[0].timestamp))).toBe(false);
  });

  it("cannot be edited through what it returns", () => {
    const before = getAuditLog().length;
    const copy = getAuditLog() as unknown as unknown[];
    copy.length = 0;
    expect(getAuditLog()).toHaveLength(before);
  });
});
