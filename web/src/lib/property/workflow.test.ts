// Written 2026-11-09 after the original test files were lost (RECOVERY_REPORT_2026-11-09.md);
// adjusted to the original workflow.ts restored from git (commit 5284b25).
import { describe, expect, it } from "vitest";
import { canChangeStatus, canEditContent, isPublic } from "@/lib/property/workflow";
import { PROPERTY_STATUSES, PUBLICLY_VISIBLE_STATUSES } from "@/lib/property/types";
import { ROLES } from "@/lib/auth/roles";

const PUBLIC = [...PUBLICLY_VISIBLE_STATUSES];
const APPROVER_ONLY_TARGETS = PROPERTY_STATUSES.filter((s) => s !== "draft" && s !== "awaiting_approval");

describe("property approval workflow", () => {
  it("lets a Property Editor move between Draft and Awaiting approval", () => {
    expect(canChangeStatus("property_editor", "draft", "awaiting_approval").allowed).toBe(true);
    expect(canChangeStatus("property_editor", "awaiting_approval", "draft").allowed).toBe(true);
  });

  it.each(APPROVER_ONLY_TARGETS)("stops a Property Editor moving a draft to %s", (to) => {
    expect(canChangeStatus("property_editor", "awaiting_approval", to).allowed).toBe(false);
  });

  it.each(PUBLIC)("stops a Property Editor taking a live (%s) listing off the site", (from) => {
    const d = canChangeStatus("property_editor", from, "draft");
    expect(d.allowed).toBe(false);
    if (!d.allowed) expect(d.reason).toMatch(/Manager or Administrator/);
  });

  it("lets Managers and Administrators make every move", () => {
    for (const role of ["manager", "administrator"] as const)
      for (const from of PROPERTY_STATUSES)
        for (const to of PROPERTY_STATUSES)
          expect(canChangeStatus(role, from, to).allowed).toBe(true);
  });

  it("refuses roles without property permissions, with a reason", () => {
    for (const role of ["content_editor", "enquiry_viewer"] as const) {
      const d = canChangeStatus(role, "draft", "awaiting_approval");
      expect(d.allowed).toBe(false);
      if (!d.allowed) expect(d.reason).toMatch(/cannot edit properties/);
    }
  });

  it("lets an editor change text only while the listing is not live", () => {
    for (const s of PROPERTY_STATUSES)
      expect(canEditContent("property_editor", s).allowed).toBe(!isPublic(s));
    for (const s of PUBLIC) expect(canEditContent("manager", s).allowed).toBe(true);
  });

  it("treats exactly the four public statuses as public", () => {
    expect(PROPERTY_STATUSES.filter(isPublic)).toEqual(["available", "under_offer", "sold_stc", "let_agreed"]);
  });

  it("has no role the rules forget about", () => {
    for (const role of ROLES) expect(canChangeStatus(role, "draft", "draft")).toHaveProperty("allowed");
  });
});
