/**
 * Anything the assistant (or any automation) wants to send to a person
 * outside Times Estate Ltd is created here as a DRAFT and nothing more.
 * There is no send function in this module by design: a member of staff
 * must review and send it themselves, once an email provider is approved
 * (Rule 4). Drafts are never created for sensitive topics (repairs with
 * safety risk, tenancy decisions, valuations, money) — those are always
 * written by a person.
 */
export interface OutboundDraft {
  status: "draft";
  requiresHumanApproval: true;
  channel: "email";
  toLeadId: string;
  subject: string;
  body: string;
  createdAt: string;
}

const SENSITIVE =
  /valuation|price|offer|deposit|rent arrears|tenancy|approved|eviction|gas|fire|flood|emergency|legal|mortgage/i;

export function createOutboundDraft(input: {
  toLeadId: string;
  subject: string;
  body: string;
}): OutboundDraft | { refused: true; reason: string } {
  if (SENSITIVE.test(`${input.subject} ${input.body}`)) {
    return {
      refused: true,
      reason:
        "This topic needs a message written by a member of staff, not a drafted one.",
    };
  }
  return {
    status: "draft",
    requiresHumanApproval: true,
    channel: "email",
    toLeadId: input.toLeadId,
    subject: input.subject,
    body: input.body,
    createdAt: new Date().toISOString(),
  };
}
