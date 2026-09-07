import { EMERGENCY_GUIDANCE } from "@/lib/repair-terms";

/**
 * Shown prominently on the repair-reporting page, before the form.
 * These are general public safety facts (999, the National Gas
 * Emergency Service, the national power-cut number) — not an AI or
 * automated judgement of what category a specific report falls into.
 * The visitor decides for themselves whether their situation is an
 * emergency; nothing here makes that classification for them.
 */
export function EmergencyGuidance() {
  return (
    <div className="rounded-sm border-2 border-danger/50 bg-danger/5 p-5">
      <p className="text-sm font-semibold uppercase tracking-wide text-danger">
        In an emergency, act first — report to us afterwards
      </p>
      <dl className="mt-3 space-y-3">
        {EMERGENCY_GUIDANCE.map((item) => (
          <div key={item.title}>
            <dt className="text-sm font-semibold text-ink">{item.title}</dt>
            <dd className="text-sm text-ink/80">{item.guidance}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 text-xs text-ink/70">
        This is general safety information, not a judgement on your
        specific situation — if in doubt, treat it as an emergency and
        call the relevant number above.
      </p>
    </div>
  );
}
