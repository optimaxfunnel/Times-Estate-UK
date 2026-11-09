import type { Lead } from "@/lib/leads/types";
import { emailConfig, sendStaffEmail } from "@/lib/leads/email";

/**
 * Internal-notification boundary.
 *
 * Since 2026-11-09 a real staff email is sent through the business's
 * 20i StackMail, but ONLY when it is configured and switched on with
 * EMAIL_NOTIFICATIONS=on (lib/leads/email.ts). That switch is the owner's
 * go-ahead on recipient and wording (CLAUDE.md Rule 4). Until then, and
 * always in tests, each notification is recorded on the lead as "not
 * sent", and the failure path is exercised with a simulated outage.
 * Either way the outcome is stored on the lead and shown to staff.
 */

export interface NotificationResult {
  status: "not_sent" | "sent" | "failed";
  log: string;
}

/**
 * Demonstration-only "delivery" used purely to exercise the failure path
 * in tests: a contact email containing "faildelivery" simulates a
 * provider outage, so /TEST_REPORT.md can show real failure-logging
 * behaviour rather than an untested code path. This has no effect once a
 * real provider is connected — that implementation would call a genuine
 * API instead of this string check.
 */
function simulateDeliveryOutcome(lead: Lead): "sent" | "failed" {
  if (lead.contactEmail.toLowerCase().includes("faildelivery")) {
    return "failed";
  }
  return "sent";
}

export function logNotificationAttempt(lead: Lead): NotificationResult {
  const timestamp = new Date().toISOString();
  const outcome = simulateDeliveryOutcome(lead);

  if (outcome === "failed") {
    const log = `[${timestamp}] DELIVERY FAILED (simulated) for lead ${lead.id} (${lead.category}). No real email provider is connected — see /INTEGRATIONS.md. Staff must check the admin leads list directly until one is approved.`;
    console.error(log);
    return { status: "failed", log };
  }

  const log = `[${timestamp}] NOT SENT (no email provider approved) — lead ${lead.id} (${lead.category}) logged for the ${assignedTeamFor(lead)} team. View it at /admin/leads/${lead.id}.`;
  console.log(log);
  return { status: "not_sent", log };
}

/**
 * The one entry point used when a lead is created. Sends a real staff
 * email when email notifications are configured and switched on
 * (lib/leads/email.ts); otherwise records "not sent", as before.
 */
export async function notifyStaff(lead: Lead): Promise<NotificationResult> {
  const config = emailConfig();
  if (!config) return logNotificationAttempt(lead);
  const timestamp = new Date().toISOString();
  const result = await sendStaffEmail(lead, config);
  if (result.ok) {
    const log = `[${timestamp}] SENT staff notification for lead ${lead.id} (${lead.category}) to the ${assignedTeamFor(lead)} team.`;
    console.log(log);
    return { status: "sent", log };
  }
  const log = `[${timestamp}] DELIVERY FAILED for lead ${lead.id} (${lead.category}): ${result.error}. Staff must check the admin leads list directly.`;
  console.error(log);
  return { status: "failed", log };
}

function assignedTeamFor(lead: Lead): string {
  switch (lead.category) {
    case "sales_valuation":
    case "buyer_registration":
      return "sales";
    case "rental_valuation":
    case "tenant_registration":
      return "lettings";
    case "commercial_sales_valuation":
    case "commercial_rental_valuation":
    case "commercial_enquiry":
      return "commercial";
    case "management_enquiry":
    case "repair_report":
      return "property management";
    case "viewing_request":
      return lead.extra?.assignedStaff &&
        lead.extra.assignedStaff !== "unassigned"
        ? `assigned staff member (${lead.extra.assignedStaff})`
        : "branch/negotiator (no staff member assigned to this property)";
    default:
      return "general enquiries";
  }
}
