import type { Lead } from "@/lib/leads/types";
import { LEAD_CATEGORY_LABELS, LEAD_PRIORITY_LABELS } from "@/lib/leads/types";

/**
 * Staff email notifications through the business's existing 20i StackMail
 * (owner decision 2026-11-09). Sends ONLY when every setting is present
 * AND EMAIL_NOTIFICATIONS=on — the owner's go-ahead on recipient and
 * wording (CLAUDE.md Rule 4). Never sends under the test runner.
 *
 * PRIVACY BY DESIGN: the email carries no customer personal data — only
 * the enquiry type, reference, priority, time and a link. Staff sign in
 * (with two-step verification) to see names, phone numbers and messages,
 * so a compromised inbox leaks nothing about customers.
 */
export interface EmailConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  from: string;
  to: string;
  siteUrl: string;
}

export function emailConfig(): EmailConfig | null {
  if (process.env.VITEST) return null;
  if (process.env.EMAIL_NOTIFICATIONS !== "on") return null;
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, EMAIL_FROM, STAFF_NOTIFY_TO } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD || !EMAIL_FROM || !STAFF_NOTIFY_TO) return null;
  return {
    host: SMTP_HOST,
    port: Number(SMTP_PORT || 465),
    user: SMTP_USER,
    password: SMTP_PASSWORD,
    from: EMAIL_FROM,
    to: STAFF_NOTIFY_TO,
    siteUrl: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100").replace(/\/$/, ""),
  };
}

export interface StaffEmail {
  subject: string;
  text: string;
}

/** The exact wording staff receive. Pure, so it is unit-tested. */
export function buildStaffEmail(lead: Pick<Lead, "id" | "category" | "priority" | "createdAt">, siteUrl: string): StaffEmail {
  const type = LEAD_CATEGORY_LABELS[lead.category];
  const priority = LEAD_PRIORITY_LABELS[lead.priority];
  const when = new Date(lead.createdAt).toLocaleString("en-GB", { timeZone: "Europe/London", dateStyle: "medium", timeStyle: "short" });
  const prefix = lead.priority === "emergency" ? "EMERGENCY — " : lead.priority === "urgent" ? "Urgent — " : "";
  return {
    subject: `${prefix}New ${type.toLowerCase()} (${lead.id})`,
    text: [
      `A new ${type.toLowerCase()} has arrived through the website.`,
      "",
      `Type:      ${type}`,
      `Priority:  ${priority}`,
      `Received:  ${when} (UK time)`,
      `Reference: ${lead.id}`,
      "",
      `Open it (staff sign-in required): ${siteUrl}/admin/leads/${lead.id}`,
      "",
      lead.priority === "emergency"
        ? "This was reported as an EMERGENCY. Check it now. The customer was told to call the emergency services first if anyone is in danger."
        : "Customer details are kept in the admin area only, not in this email.",
      "",
      "— Times Estate Ltd website (automatic message; replies are not read)",
    ].join("\n"),
  };
}

/** Sends the staff notification. Never throws; reports what happened. */
export async function sendStaffEmail(
  lead: Lead,
  config: EmailConfig,
): Promise<{ ok: true; info: string } | { ok: false; error: string }> {
  try {
    const nodemailer = (await import("nodemailer")).default;
    const transport = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.port === 465,
      auth: { user: config.user, pass: config.password },
      connectionTimeout: 15_000,
    });
    const email = buildStaffEmail(lead, config.siteUrl);
    const sent = await transport.sendMail({ from: config.from, to: config.to, subject: email.subject, text: email.text });
    return { ok: true, info: sent.messageId ?? "sent" };
  } catch (error) {
    // Never include settings or passwords in what is logged.
    const message = error instanceof Error ? error.message : String(error);
    return { ok: false, error: message.replace(config.password, "***") };
  }
}
