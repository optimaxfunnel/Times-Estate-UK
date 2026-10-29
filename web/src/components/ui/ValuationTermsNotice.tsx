import { VALUATION_TERMS, type ValuationTermKey } from "@/lib/valuation-terms";

/**
 * Shown wherever a visitor might book a "valuation", so the four terms
 * are never confused. Only the first is something this website books.
 * See /AI_SAFETY_RULES.md — the assistant follows the same wording.
 */
const ROWS: { key: ValuationTermKey; offered: string }[] = [
  { key: "initial_appraisal", offered: "What you can book here — free" },
  { key: "automated_estimate", offered: "Not offered by this website" },
  {
    key: "formal_valuation",
    offered: "Separate service by a qualified valuer",
  },
  {
    key: "regulated_valuation",
    offered: "Separate service by a RICS-registered valuer",
  },
];

export function ValuationTermsNotice() {
  return (
    <section
      aria-labelledby="valuation-terms-heading"
      className="rounded-sm border border-border bg-secondary/5 p-4 text-sm text-ink/80"
    >
      <h2
        id="valuation-terms-heading"
        className="font-sans text-base font-semibold text-ink"
      >
        What you&rsquo;ll get: an initial market appraisal
      </h2>
      <p className="mt-1">
        A person from our team visits and gives an opinion of likely price or
        rent. No figure is produced by this website, and the figure is confirmed
        only by an authorised member of staff.
      </p>
      <dl className="mt-3 grid gap-2 sm:grid-cols-2">
        {ROWS.map(({ key, offered }) => (
          <div key={key} className="rounded-sm bg-surface p-3">
            <dt className="font-semibold text-ink">
              {VALUATION_TERMS[key].label}
            </dt>
            <dd className="mt-0.5 text-xs text-secondary">{offered}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
