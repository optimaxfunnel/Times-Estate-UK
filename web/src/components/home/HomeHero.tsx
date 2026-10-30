import { Container } from "@/components/ui/Container";
import { HeroSearchCard } from "@/components/home/HeroSearchCard";
import { SkylineBackdrop } from "@/components/home/SkylineBackdrop";

/**
 * Homepage hero to the owner's 2026-10-20 reference: dark full-bleed
 * band, eyebrow + headline + intro on the left, the quick-search card
 * on the right. The reference's photography is stood in for by the
 * skyline illustration until real images are supplied.
 */
export function HomeHero() {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      <SkylineBackdrop />
      <Container
        size="wide"
        className="relative grid gap-10 py-14 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:py-20 xl:grid-cols-[1.2fr_1fr]"
      >
        <div className="max-w-xl">
          <p className="flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.35em] text-white/85">
            London Property Experts
            <span aria-hidden className="h-px w-12 bg-accent-vivid" />
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-[1.05] text-white sm:text-5xl lg:text-6xl text-balance">
            Browse London Properties
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-white/80 sm:text-lg">
            Homes and commercial property to buy and rent, from our office
            on Upper Tooting Road in South West London.
          </p>
        </div>
        <HeroSearchCard />
      </Container>
    </section>
  );
}
