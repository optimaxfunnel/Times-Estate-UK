/**
 * Repair-reporting reference data.
 *
 * The emergency guidance below quotes well-known, publicly published UK
 * safety numbers (999, the National Gas Emergency Service, and the
 * national power-cut number) — these are general public safety facts,
 * not a Times Estate Ltd-specific procedure, so they are stated directly.
 *
 * What IS marked "Requires professional review" is anything about what
 * Times Estate Ltd itself will do next (response times, out-of-hours
 * contractor process) — none of that has been confirmed by the owner,
 * so no definitive operational promise is made. See
 * /CONTENT_VERIFICATION_REGISTER.md.
 */

export const REPAIR_ISSUE_CATEGORIES = [
  { value: "heating_hot_water", label: "Heating / hot water" },
  { value: "plumbing_leak", label: "Plumbing / leak" },
  { value: "electrical", label: "Electrical" },
  { value: "windows_doors", label: "Windows / doors / locks" },
  { value: "roof_guttering", label: "Roof / guttering" },
  { value: "appliance", label: "Appliance fault" },
  { value: "pest", label: "Pest control" },
  { value: "structural", label: "Structural (walls, ceilings, floors)" },
  { value: "other", label: "Other" },
] as const;

export const REPAIR_URGENCY_OPTIONS = [
  { value: "routine", label: "Routine — not urgent" },
  { value: "urgent", label: "Urgent — needs attention soon" },
  {
    value: "emergency",
    label: "Emergency — immediate risk to safety or the property",
  },
] as const;

export interface EmergencyGuidanceItem {
  title: string;
  guidance: string;
}

export const EMERGENCY_GUIDANCE: EmergencyGuidanceItem[] = [
  {
    title: "Immediate danger to life",
    guidance:
      "Call 999 immediately. Do this before reporting anything on this website.",
  },
  {
    title: "Suspected gas leak",
    guidance:
      "Do not operate light switches or naked flames. Open windows and doors if safe, leave the property, and call the National Gas Emergency Service free on 0800 111 999.",
  },
  {
    title: "Fire",
    guidance: "Leave the property immediately and call 999.",
  },
  {
    title: "Serious flooding",
    guidance:
      "If it is safe to do so, turn off the water at the stopcock. Do not touch electrical switches or sockets near standing water. Call 999 if anyone is at risk.",
  },
  {
    title: "Total loss of electricity",
    guidance:
      "Check your own fuse box/meter first. If neighbouring properties are also affected, this is likely a power cut — call 105, the free national power-cut number, rather than reporting it here.",
  },
];

/**
 * What Times Estate Ltd will actually do after a repair is reported
 * (response times, who attends, out-of-hours contractor arrangements)
 * has not been confirmed by the owner and must not be invented — see
 * CLAUDE.md Rule 1 and Rule 5. This placeholder is shown instead of a
 * fabricated promise until that process is supplied and, where it
 * touches contractual/safety obligations, professionally reviewed.
 */
export const REPAIR_PROCESS_STATUS = "requires-professional-review" as const;
