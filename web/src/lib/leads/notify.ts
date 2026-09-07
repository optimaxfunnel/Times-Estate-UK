import type { Lead } from "@/lib/leads/types";

/**
 * Internal-notification boundary.
 *
 * IMPORTANT: no real outbound email is sent anywhere in this codebase.
 * CLAUDE.md Rule 4 and today's brief both require the owner's explicit
 * approval of a recipient address, reply-to address, wording, retention
 * rule and service provider before any real email goes out — none of
 * that exists yet (see /INTEGRATIONS.md). Every "notification" today is
 * logged to the server console and recorded on the lead itself, so the
 * *behaviour* (including failure handling) can be built and tested now,
 * and swapped for a real provider later without changing any calling
 * code — same adapter pattern as `PropertyProvider`.
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
      return "branch/negotiator";
    default:
      return "general enquiries";
  }
}
