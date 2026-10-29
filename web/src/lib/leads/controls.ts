import { hasPermission, type Role } from "@/lib/auth/roles";
import type { Lead, LeadCategory, LeadStage } from "@/lib/leads/types";
import type { ValuationTermKey } from "@/lib/valuation-terms";

/**
 * Valuation and viewing controls (Day 5 Task 2). Pure functions, unit
 * tested, called by the admin server actions.
 *
 * Valuations — four different things (lib/valuation-terms.ts):
 *  - initial market appraisal: what this website books; free, in person
 *  - automated estimate: NOT offered; can never be recorded as a valuation
 *  - formal valuation / regulated valuation: written reports by a
 *    qualified (for regulated: RICS-registered) valuer
 * A figure is only ever recorded by an authorised person (Manager or
 * Administrator) and is stamped with who confirmed it and when. Nothing
 * on the website produces or publishes a figure automatically.
 *
 * Viewings — a request is never a booking. Moving a viewing request to
 * "Appointment booked" requires a person to confirm that access has been
 * agreed with the occupier (tenant, owner or landlord).
 */

export const VALUATION_CATEGORIES: readonly LeadCategory[] = [
  "sales_valuation",
  "rental_valuation",
  "commercial_sales_valuation",
  "commercial_rental_valuation",
];

/** Bases a recorded figure may have. "automated_estimate" is deliberately absent. */
export const RECORDABLE_VALUATION_BASES = [
  "initial_appraisal",
  "formal_valuation",
  "regulated_valuation",
] as const satisfies readonly ValuationTermKey[];
export type RecordableValuationBasis =
  (typeof RECORDABLE_VALUATION_BASES)[number];

export interface ValuationRecord {
  figure: number;
  basis: RecordableValuationBasis;
  /** Who confirmed it (role today; a named person once real accounts exist). */
  confirmedBy: string;
  confirmedAt: string;
  /** For formal/regulated: the qualified valuer and their report reference. */
  valuerReference?: string;
}

export type Decision = { allowed: true } | { allowed: false; reason: string };
const OK: Decision = { allowed: true };

export function canRecordValuation(
  role: Role,
  lead: Pick<Lead, "category">,
  basis: string,
  valuerReference?: string,
): Decision {
  if (!VALUATION_CATEGORIES.includes(lead.category)) {
    return {
      allowed: false,
      reason: "This enquiry is not a valuation request.",
    };
  }
  if (!hasPermission(role, "approve_property")) {
    return {
      allowed: false,
      reason: "Only a Manager or Administrator can confirm a valuation figure.",
    };
  }
  if (basis === "automated_estimate") {
    return {
      allowed: false,
      reason:
        "An automated estimate is never recorded as a valuation. Record the figure from an in-person appraisal instead.",
    };
  }
  if (!(RECORDABLE_VALUATION_BASES as readonly string[]).includes(basis)) {
    return { allowed: false, reason: "Choose what kind of valuation this is." };
  }
  if (
    (basis === "formal_valuation" || basis === "regulated_valuation") &&
    !valuerReference?.trim()
  ) {
    return {
      allowed: false,
      reason:
        "A formal or regulated valuation needs the qualified valuer's name and report reference.",
    };
  }
  return OK;
}

export function canChangeLeadStage(
  role: Role,
  lead: Pick<Lead, "category">,
  to: LeadStage,
  accessConfirmed: boolean,
): Decision {
  if (!hasPermission(role, "manage_leads")) {
    return { allowed: false, reason: "Your current role cannot manage leads." };
  }
  if (
    lead.category === "viewing_request" &&
    to === "appointment_booked" &&
    !accessConfirmed
  ) {
    return {
      allowed: false,
      reason:
        "Confirm that access has been agreed with the occupier (and the landlord or owner where needed) before marking a viewing as booked.",
    };
  }
  return OK;
}

/** True if an ISO date (yyyy-mm-dd) is today or later. */
export function isTodayOrLater(isoDate: string, today = new Date()): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(isoDate)) return false;
  const t = today.toISOString().slice(0, 10);
  return isoDate >= t;
}
