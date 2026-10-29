import { describe, expect, it } from "vitest";
import {
  canChangeLeadStage,
  canRecordValuation,
  isTodayOrLater,
} from "@/lib/leads/controls";
import { VALUATION_TERMS } from "@/lib/valuation-terms";

const valuationLead = { category: "sales_valuation" as const };
const viewingLead = { category: "viewing_request" as const };

describe("valuation controls", () => {
  it("keeps the four kinds of valuation distinct", () => {
    expect(Object.keys(VALUATION_TERMS)).toEqual([
      "initial_appraisal",
      "automated_estimate",
      "formal_valuation",
      "regulated_valuation",
    ]);
    expect(VALUATION_TERMS.automated_estimate.description).toMatch(
      /not offer/i,
    );
  });

  it("only lets a Manager or Administrator confirm a figure", () => {
    expect(
      canRecordValuation("manager", valuationLead, "initial_appraisal").allowed,
    ).toBe(true);
    expect(
      canRecordValuation("administrator", valuationLead, "initial_appraisal")
        .allowed,
    ).toBe(true);
    for (const role of [
      "property_editor",
      "content_editor",
      "enquiry_viewer",
    ] as const) {
      expect(
        canRecordValuation(role, valuationLead, "initial_appraisal").allowed,
      ).toBe(false);
    }
  });

  it("never records an automated estimate as a valuation", () => {
    const d = canRecordValuation(
      "administrator",
      valuationLead,
      "automated_estimate",
    );
    expect(d.allowed).toBe(false);
  });

  it("requires the valuer's reference for formal and regulated valuations", () => {
    expect(
      canRecordValuation("manager", valuationLead, "formal_valuation").allowed,
    ).toBe(false);
    expect(
      canRecordValuation(
        "manager",
        valuationLead,
        "regulated_valuation",
        "A Valuer MRICS, report 123",
      ).allowed,
    ).toBe(true);
  });

  it("refuses a figure on an enquiry that is not a valuation request", () => {
    expect(
      canRecordValuation("manager", viewingLead, "initial_appraisal").allowed,
    ).toBe(false);
  });
});

describe("viewing controls", () => {
  it("never marks a viewing as booked without confirmed access", () => {
    expect(
      canChangeLeadStage("manager", viewingLead, "appointment_booked", false)
        .allowed,
    ).toBe(false);
    expect(
      canChangeLeadStage("manager", viewingLead, "appointment_booked", true)
        .allowed,
    ).toBe(true);
  });

  it("lets an Enquiry Viewer look but not change a lead", () => {
    expect(
      canChangeLeadStage("enquiry_viewer", viewingLead, "acknowledged", false)
        .allowed,
    ).toBe(false);
  });

  it("rejects viewing dates in the past", () => {
    const today = new Date("2026-10-29T12:00:00Z");
    expect(isTodayOrLater("2026-10-28", today)).toBe(false);
    expect(isTodayOrLater("2026-10-29", today)).toBe(true);
    expect(isTodayOrLater("not-a-date", today)).toBe(false);
  });
});
