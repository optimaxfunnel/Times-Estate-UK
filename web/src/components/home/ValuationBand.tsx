import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { SkylineBackdrop } from "@/components/home/SkylineBackdrop";
import { IconArrowRight, IconCheck, IconQuote } from "@/components/icons";

/**
 * The dark valuation band above the footer. "Free" is accurate: what the
 * site books is an initial market appraisal, which lib/valuation-terms.ts
 * defines as free and non-binding. The three points are things the
 * business can stand behind today rather than trust claims it can't
 * evidence yet.
 *
 * The reference shows a client testimonial in the right-hand slot. None
 * has been supplied, and Rule 1 forbids inventing one, so the slot
 * shows its status instead — it will carry verified reviews as soon as
 * the owner supplies them (CONTENT_REGISTER.md).
 */
const POINTS = [
  "Local market knowledge",
  "An in-person appraisal — never an automated figure",
  "No obligation to go ahead",
];

export function ValuationBand() {
  return (
    <section
      aria-labelledby="valuation-band-heading"
      className="relative isolate overflow-hidden bg-ink text-white"
    >
      <SkylineBackdrop />
      <Container
        size="wide"
        className="relative grid gap-8 py-12 lg:grid-cols-[1.1fr_1fr_1fr] lg:items-center"
      >
        <div>
          <h2
            id="valuation-band-heading"
            className="text-2xl font-bold leading-tight text-white sm:text-3xl text-balance"
          >
            Get Your Free Property Valuation
          </h2>
          <p className="mt-2 text-sm text-white/80">
            Expert advice. No obligation. A real visit, not a formula.
          </p>
          <Link
            href="/sell"
            className="mt-5 inline-flex items-center gap-2 rounded-sm bg-accent px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
          >
            Book a Free Valuation
            <IconArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <ul className="space-y-3 text-sm text-white/90">
          {POINTS.map((point) => (
            <li key={point} className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-accent-vivid text-accent-vivid">
                <IconCheck className="h-3 w-3" strokeWidth={2.5} />
              </span>
              {point}
            </li>
          ))}
        </ul>

        <div className="rounded-sm border border-white/15 bg-white/5 p-5">
          <IconQuote className="h-7 w-7 text-accent-vivid" />
          <p className="mt-2 flex flex-wrap items-center gap-2 text-sm font-semibold">
            Client reviews
            <Badge status="missing" className="bg-white/95" />
          </p>
          <p className="mt-2 text-sm leading-relaxed text-white/70">
            Verified client reviews will be published here once supplied by
            Times Estate Ltd. Nothing is shown until it can be.
          </p>
        </div>
      </Container>
    </section>
  );
}
