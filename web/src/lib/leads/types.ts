/**
 * Lead data model. See /AUTOMATION_WORKFLOWS.md for how each lead category
 * is created, notified and followed up, and /PRIVACY_DATA_MAP.md for what
 * personal data each one holds and why.
 */

export const LEAD_CATEGORIES = [
  "sales_valuation",
  "rental_valuation",
  "commercial_sales_valuation",
  "commercial_rental_valuation",
  "management_enquiry",
  "buyer_registration",
  "tenant_registration",
  "commercial_enquiry",
  "viewing_request",
  "repair_report",
  "callback_request",
  "general_enquiry",
  "landlord_vendor_enquiry",
] as const;
export type LeadCategory = (typeof LEAD_CATEGORIES)[number];

export const LEAD_CATEGORY_LABELS: Record<LeadCategory, string> = {
  sales_valuation: "Sales valuation",
  rental_valuation: "Rental valuation",
  commercial_sales_valuation: "Commercial sales valuation",
  commercial_rental_valuation: "Commercial rental valuation",
  management_enquiry: "Management enquiry",
  buyer_registration: "Buyer registration",
  tenant_registration: "Tenant registration",
  commercial_enquiry: "Commercial enquiry",
  viewing_request: "Viewing request",
  repair_report: "Repair report",
  callback_request: "Callback request",
  general_enquiry: "General enquiry",
  landlord_vendor_enquiry: "Landlord or vendor enquiry",
};

export const LEAD_STAGES = [
  "new",
  "acknowledged",
  "assigned",
  "contact_attempted",
  "appointment_booked",
  "qualified",
  "instruction_won",
  "instruction_lost",
  "closed",
] as const;
export type LeadStage = (typeof LEAD_STAGES)[number];

export const LEAD_STAGE_LABELS: Record<LeadStage, string> = {
  new: "New",
  acknowledged: "Acknowledged",
  assigned: "Assigned",
  contact_attempted: "Contact attempted",
  appointment_booked: "Appointment booked",
  qualified: "Qualified",
  instruction_won: "Instruction won",
  instruction_lost: "Instruction lost",
  closed: "Closed",
};

export type LeadPriority = "routine" | "urgent" | "emergency";

export const LEAD_PRIORITY_LABELS: Record<LeadPriority, string> = {
  routine: "Routine",
  urgent: "Urgent",
  emergency: "Emergency",
};

export interface LeadNote {
  timestamp: string;
  author: string; // role name today — see /lib/auth/session.ts
  text: string;
}

export interface Lead {
  id: string;
  createdAt: string;
  updatedAt: string;
  category: LeadCategory;
  sourcePage: string;
  propertyReference?: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  /** Free-text detail specific to the category (message, issue description, requirement, etc.). */
  detail: string;
  /** Structured extra fields specific to the category — kept loose deliberately, see AUTOMATION_WORKFLOWS.md. */
  extra?: Record<string, string>;
  consentGiven: boolean;
  consentTimestamp: string;
  marketingConsent?: boolean;
  assignedTo?: string; // role name today, a real staff member once real auth/CRM exists
  priority: LeadPriority;
  stage: LeadStage;
  followUpDate?: string;
  notes: LeadNote[];
  /**
   * Whether the (not-yet-connected) outbound notification succeeded. See
   * /lib/leads/notify.ts — today this is always "not_sent" because no
   * email provider is approved (CLAUDE.md Rule 4).
   */
  notificationStatus: "not_sent" | "sent" | "failed";
  notificationLog: string[];
  /** Internal only — a figure confirmed by an authorised person (lib/leads/controls.ts). Never shown publicly. */
  valuation?: import("@/lib/leads/controls").ValuationRecord;
}
