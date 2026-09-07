import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/ButtonLink";

export default function NotFound() {
  return (
    <Section>
      <h1 className="text-3xl font-semibold text-ink">Page not found</h1>
      <p className="mt-4 max-w-xl text-ink/70">
        The page you were looking for doesn&rsquo;t exist, or may have moved.
      </p>
      <ButtonLink href="/" className="mt-6">
        Back to homepage
      </ButtonLink>
    </Section>
  );
}
