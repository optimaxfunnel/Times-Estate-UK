import { ButtonLink } from "@/components/ui/ButtonLink";

/**
 * The homepage's landlord/vendor section (SITEMAP.md §2, item 5): two
 * equally-weighted panels rather than one CTA competing with the other,
 * since sellers and landlords are two different audiences with two
 * different next steps.
 */
export function SellLetCtaBand() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div className="rounded-lg bg-accent-tint p-8">
        <h3 className="text-xl font-semibold text-ink">Thinking of selling?</h3>
        <p className="mt-2 text-sm text-ink/70">
          Book a valuation and get a straight answer on price — never an
          automated figure, always a real visit from our team.
        </p>
        <ButtonLink href="/sell" className="mt-5">
          Book a Valuation
        </ButtonLink>
      </div>
      <div className="rounded-lg bg-ink p-8 text-white">
        <h3 className="text-xl font-semibold">Thinking of letting?</h3>
        <p className="mt-2 text-sm text-white/70">
          Request a rental valuation and see the difference between letting only
          and full property management.
        </p>
        <ButtonLink href="/let" variant="inverted" className="mt-5">
          Request a Rental Valuation
        </ButtonLink>
      </div>
    </div>
  );
}
