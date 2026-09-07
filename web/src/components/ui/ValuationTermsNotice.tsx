import { VALUATION_TERMS } from "@/lib/valuation-terms";

/**
 * Shown wherever a visitor might book a "valuation," so the term is never
 * ambiguous. See /AI_SAFETY_RULES.md — the AI assistant must never call
 * this an "automated estimate" or a "formal valuation."
 */
export function ValuationTermsNotice() {
  return (
    <div className="rounded-sm border border-border bg-secondary/5 p-4 text-sm text-ink/80">
      <p className="font-semibold text-ink">What you&rsquo;ll get: an initial market appraisal</p>
      <p className="mt-1">{VALUATION_TERMS.initial_appraisal.description}</p>
      <p className="mt-2 text-xs text-ink/60">
        This is not an automated estimate, a formal valuation, or a
        regulated (RICS Red Book) valuation — those are different
        services with different requirements.
      </p>
    </div>
  );
}
