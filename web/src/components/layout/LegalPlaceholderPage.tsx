import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { PlaceholderNotice } from "@/components/ui/PlaceholderNotice";

export function LegalPlaceholderPage({ title }: { title: string }) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} />
      <Section>
        <PlaceholderNotice status="requires-professional-review">
          This page has not yet been drafted. Legal and regulatory text
          (including this page) must be reviewed by a qualified solicitor before
          publication — see CLAUDE.md Rule 5 and /CONTENT_REQUIRED.md. No
          placeholder legal wording is shown here, since inaccurate legal text
          could be worse than none at all.
        </PlaceholderNotice>
      </Section>
    </>
  );
}
