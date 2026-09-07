/**
 * The four valuation terms this project uses, and what each one may and
 * may not be called. See AI_SAFETY_RULES.md and AUTOMATION_WORKFLOWS.md
 * for how this is enforced in the AI assistant and the lead workflow.
 *
 * Today, Times Estate Ltd's website only ever offers the first of these
 * (an initial market appraisal, given in person by a member of staff).
 * No automated estimate feature exists — if one is built later (e.g. an
 * instant online price guide), it must use the "Automated estimate"
 * wording below and must never be presented as a formal or regulated
 * valuation.
 */
export const VALUATION_TERMS = {
  initial_appraisal: {
    label: "Initial market appraisal",
    description:
      "A free, non-binding opinion of likely asking price or rent, given in person by a member of the Times Estate Ltd team after visiting the property. This is what booking a 'valuation' on this website actually arranges.",
  },
  automated_estimate: {
    label: "Automated estimate",
    description:
      "A computer-generated instant price guide based on data, with no one visiting the property. Times Estate Ltd's website does not offer this today. If it is added later, it must always be labelled 'Automated estimate — not a formal valuation' wherever it appears, per AI_SAFETY_RULES.md.",
  },
  formal_valuation: {
    label: "Formal valuation",
    description:
      "A written valuation report prepared by a qualified professional for a specific purpose (e.g. probate, matrimonial, tax). This is a paid, separate service from a free market appraisal and is never generated automatically.",
  },
  regulated_valuation: {
    label: "Regulated valuation",
    description:
      "A formal valuation carried out under a specific regulatory framework (e.g. RICS 'Red Book' standards), typically required for mortgage lending or statutory purposes. This requires a qualified, regulated valuer and is never something this website or its AI assistant can provide or approximate.",
  },
} as const;

export type ValuationTermKey = keyof typeof VALUATION_TERMS;
