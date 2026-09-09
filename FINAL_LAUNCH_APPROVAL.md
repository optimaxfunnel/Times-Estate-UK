# FINAL LAUNCH APPROVAL REQUEST — Times Estates

**Prepared:** 2026-09-09 (Phase 7). **Status: awaiting your decision.**
Nothing below has been actioned. Full detail behind every line: `DEPLOYMENT.md`,
`EMAIL_AND_FORM_ROUTING.md`, `TECHNICAL_HANDOVER.md`, `QA_REPORT.md`,
`COMPLIANCE_REGISTER.md`, `LAUNCH_CHECKLIST.md`.

## My recommendation: do not approve launch yet

**One confirmed critical defect makes this unsafe to launch regardless
of approval.** A server hang, triggered by certain form submissions, is
still present — I reproduced it live in Phase 6 via a genuine click,
watched the server go fully unresponsive, and had to kill and restart
it. A single visitor could take the entire site offline for everyone
else, with no fix identified yet. Separately, the site has no
persistent database today — every lead is lost if the server ever
restarts, including from that same defect being recovered from. I
recommend fixing (or at minimum root-causing and mitigating) the hang
defect, and connecting a real database, before this request is
approved.

## If approved anyway — exact actions this would authorise, nothing more

| # | Action | Cost | Risk | Rollback |
|---|---|---|---|---|
| 1 | Create a hosting account (recommend an always-on host — Railway or similar, ~£5–15/month; see `DEPLOYMENT.md` §1 for the full comparison) and deploy this codebase to it | ~£5–20/month, ongoing | Exposes the app, including the unresolved hang defect, to real visitors | Redeploy previous version via host's own rollback feature; or stop the deployment |
| 2 | Point `timesestates.co.uk`'s DNS at that hosting account | Domain renewal only, if not already covered | Site downtime during propagation if misconfigured; **I do not have verified access to or a copy of the domain's current DNS records** — you or whoever holds registrar access must capture these before any change, per `DEPLOYMENT.md` §4 | Restore the captured pre-change DNS records |
| 3 | Set `NEXT_PUBLIC_SITE_URL` to the real domain and redeploy | None | Low | Revert the environment variable, redeploy |
| 4 | Create real mailboxes/aliases with a chosen email provider (Google Workspace, Microsoft 365, or Zoho — comparison in `EMAIL_AND_FORM_ROUTING.md` §1) and the associated MX/SPF/DKIM/DMARC DNS records | From free (Zoho, limited) to ~£5–7/user/month | A DMARC record set to enforce too early can silently block legitimate mail — the staged rollout in `EMAIL_AND_FORM_ROUTING.md` §3 exists specifically to avoid this | Remove the DNS records; mail simply stops routing through the new provider |
| 5 | Connect a transactional email sender so forms actually notify staff | Usually free at this volume, or a few £/month | None connected today — this is the change that makes leads finally reach a real person | Disconnect the sender; forms revert to recording only, as today |
| 6 | (Optional, your choice, not assumed) Connect an analytics tool | £0–14/month depending on choice — see `DEPLOYMENT.md` §6 | Requires a real cookie-consent mechanism first if the chosen tool sets cookies | Remove the script |
| 7 | Connect uptime/error monitoring | Often free at this scale | None | Remove the integration |

**Not included in this list, and not authorised by approving it:**
replacing `/admin`'s mock authentication, connecting a real database,
or fixing the hang defect — those are prerequisites I'm recommending
happen *before* this request is approved, not actions this approval
would itself perform. If you want me to proceed with those first,
say so and I will, and bring a corrected request back afterward.

## Outstanding, unresolved (this approval does not and cannot clear these)

- The critical server-hang defect (`QA_REPORT.md` §9) — blocks launch
  outright regardless of this approval.
- No persistent database — every lead is lost on any restart.
- `/admin` authentication is still a development-only mock.
- Every "Requires verification"/"Missing" row in `COMPLIANCE_REGISTER.md`
  (redress scheme, CMP, deposit scheme, PII schedule, real fees,
  solicitor review of the legal pages, opening hours).
- Domain ownership/DNS access has never been independently verified by
  this project.

## To proceed anyway

If, having read the above, you still want these seven actions carried
out, reply with exactly:

> **"I approve production launch and the listed external changes."**

I will treat that as covering only the seven numbered actions above,
at the scope and cost ranges stated — nothing broader, and nothing
until you've told me the hang defect and database gap have been
addressed or that you're knowingly accepting that risk. If you'd
rather address the blockers first, just say so — that's what I'd
recommend.
