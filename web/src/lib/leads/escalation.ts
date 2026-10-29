import type { Lead } from "@/lib/leads/types";

/**
 * When a lead needs a person's attention. Pure, tested, shown as a flag
 * on the admin leads list. Nothing is sent or phoned automatically — the
 * flag tells staff; escalation to a manager is a person's decision.
 *
 * Proposed response targets (owner to confirm — AUTOMATION_WORKFLOWS.md):
 *  - emergency repair: acknowledge immediately (target 15 minutes)
 *  - urgent:           acknowledge within 2 hours
 *  - routine:          acknowledge within 1 working day (24 hours here)
 * A follow-up date in the past is always flagged as overdue.
 */
export type Escalation =
  { level: "none" } | { level: "due_soon" | "overdue"; reason: string };

const TARGET_MINUTES: Record<Lead["priority"], number> = {
  emergency: 15,
  urgent: 120,
  routine: 24 * 60,
};

const OPEN_UNACKNOWLEDGED: Lead["stage"][] = ["new"];
const CLOSED: Lead["stage"][] = [
  "instruction_won",
  "instruction_lost",
  "closed",
];

export function escalationFor(
  lead: Pick<Lead, "priority" | "stage" | "createdAt" | "followUpDate">,
  now = new Date(),
): Escalation {
  if (CLOSED.includes(lead.stage)) return { level: "none" };

  if (lead.followUpDate) {
    const today = now.toISOString().slice(0, 10);
    if (lead.followUpDate < today) {
      return {
        level: "overdue",
        reason: `Follow-up was due ${lead.followUpDate}`,
      };
    }
  }

  if (OPEN_UNACKNOWLEDGED.includes(lead.stage)) {
    const ageMin = (now.getTime() - new Date(lead.createdAt).getTime()) / 60000;
    const target = TARGET_MINUTES[lead.priority];
    if (ageMin > target) {
      return {
        level: "overdue",
        reason: `Not acknowledged within the ${lead.priority} target`,
      };
    }
    if (ageMin > target * 0.75) {
      return {
        level: "due_soon",
        reason: `Acknowledge soon (${lead.priority} target)`,
      };
    }
  }
  return { level: "none" };
}
