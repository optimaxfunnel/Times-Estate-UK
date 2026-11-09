// Rewritten 2026-11-09 after the original test files were lost (RECOVERY_REPORT_2026-11-09.md).
import { describe, expect, it } from "vitest";
import {
  canChangeLeadStage,
  canRecordValuation,
  isTodayOrLater,
  VALUATION_CATEGORIES,
} from "@/lib/leads/controls";

const valuationLead = { category: "sales_valuation" as const };

describe("valuation controls", () => {
  it("lets a Manager record an initial appraisal figure", () => {
    expect(canRecordValuation("manager", valuationLead, "initial_appraisal").allowed).toBe(true);
  });

  it("never records an automated estimate as a valuation", () => {
    const d = canRecordValuation("administrator", valuationLead, "automated_estimate");
    expect(d.allowed).toBe(false);
    if (!d.allowed) expect(d.reason).toMatch(/automated estimate/i);
  });

  it("stops a Property Editor or Enquiry Viewer confirming a figure", () => {
    for (const role of ["property_editor", "enquiry_viewer", "content_editor"] as const)
      expect(canRecordValuation(role, valuationLead, "initial_appraisal").allowed).toBe(false);
  });

  it("needs the valuer's reference for formal and regulated valuations", () => {
    for (const basis of ["formal_valuation", "regulated_valuation"]) {
      expect(canRecordValuation("manager", valuationLead, basis).allowed).toBe(false);
      expect(canRecordValuation("manager", valuationLead, basis, "  ").allowed).toBe(false);
      expect(canRecordValuation("manager", valuationLead, basis, "J Smith MRICS, ref 123").allowed).toBe(true);
    }
  });

  it("refuses an unknown basis and non-valuation enquiries", () => {
    expect(canRecordValuation("manager", valuationLead, "guess").allowed).toBe(false);
    expect(
      canRecordValuation("manager", { category: "general_enquiry" }, "initial_appraisal").allowed,
    ).toBe(false);
  });

  it("covers all four valuation enquiry types", () => {
    expect([...VALUATION_CATEGORIES].sort()).toEqual(
      [
        "commercial_rental_valuation",
        "commercial_sales_valuation",
        "rental_valuation",
        "sales_valuation",
      ],
    );
  });
});

describe("viewing controls", () => {
  const viewing = { category: "viewing_request" as const };

  it("never marks a viewing as booked until access is confirmed", () => {
    expect(canChangeLeadStage("manager", viewing, "appointment_booked", false).allowed).toBe(false);
    expect(canChangeLeadStage("manager", viewing, "appointment_booked", true).allowed).toBe(true);
  });

  it("allows other stage changes without the access check", () => {
    expect(canChangeLeadStage("manager", viewing, "acknowledged", false).allowed).toBe(true);
  });

  it("stops roles that cannot manage leads", () => {
    expect(canChangeLeadStage("enquiry_viewer", viewing, "acknowledged", true).allowed).toBe(false);
    expect(canChangeLeadStage("property_editor", viewing, "acknowledged", true).allowed).toBe(false);
  });
});

describe("follow-up dates", () => {
  const today = new Date("2026-11-09T12:00:00Z");
  it("accepts today and later, rejects the past and nonsense", () => {
    expect(isTodayOrLater("2026-11-09", today)).toBe(true);
    expect(isTodayOrLater("2027-01-01", today)).toBe(true);
    expect(isTodayOrLater("2026-11-08", today)).toBe(false);
    expect(isTodayOrLater("09/11/2026", today)).toBe(false);
    expect(isTodayOrLater("", today)).toBe(false);
  });
});
