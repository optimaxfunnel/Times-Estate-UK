import { Section } from "@/components/ui/Section";

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  children?: React.ReactNode;
}) {
  return (
    <Section className="border-b border-border bg-surface">
      <div className="max-w-3xl">
        {eyebrow && (
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-accent">
            {eyebrow}
          </p>
        )}
        <h1 className="text-3xl font-semibold text-ink sm:text-4xl">{title}</h1>
        {intro && <p className="mt-4 text-lg text-ink/80">{intro}</p>}
        {children && (
          <div className="mt-6 flex flex-wrap gap-3">{children}</div>
        )}
      </div>
    </Section>
  );
}
