import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { DraftLegalNotice } from "@/components/layout/DraftLegalNotice";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description:
    "How accessible this website is, what we've tested, and how to tell us about a problem.",
  alternates: { canonical: "/accessibility" },
};

export default function AccessibilityPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Accessibility Statement" />
      <Section className="max-w-3xl space-y-8">
        <DraftLegalNotice />

        <div>
          <h2 className="text-xl font-semibold text-ink">Our commitment</h2>
          <p className="mt-2 text-ink/80">
            We want everyone who visits this website to be able to find
            information, search for a property, and get in touch, whatever
            technology or assistive tools they use. We are working to meet the
            Web Content Accessibility Guidelines (WCAG) version 2.2 at Level AA.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-ink">
            How we&rsquo;ve tested this site
          </h2>
          <p className="mt-2 text-ink/80">
            We use a combination of automated scanning and manual testing:
            keyboard-only navigation through every page and form, checking
            colour contrast against WCAG&rsquo;s minimum ratios, checking that
            every image has appropriate alternative text, and checking that
            screen readers announce page structure, form errors, and dynamic
            updates (such as a chat reply) correctly. The full, dated results of
            this testing are recorded in{" "}
            <code className="text-xs">/ACCESSIBILITY.md</code> and{" "}
            <code className="text-xs">/TEST_REPORT.md</code> in this
            project&rsquo;s technical documentation, including anything we found
            and fixed, and anything not yet resolved.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-ink">
            What we know still needs work
          </h2>
          <p className="mt-2 text-ink/80">
            This site does not yet have real property photography, so
            alternative text for images is limited to what a sample photo can
            honestly describe. Some pages have not been tested with a physical
            screen reader on every device and browser combination — see{" "}
            <code className="text-xs">/ACCESSIBILITY.md</code> for the specific
            scope of today&rsquo;s testing. We will keep testing and improving
            this as the site develops.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-ink">
            Reporting an accessibility problem
          </h2>
          <p className="mt-2 text-ink/80">
            If you find a problem not listed in{" "}
            <code className="text-xs">/ACCESSIBILITY.md</code>, or you need
            information from this site in a different format, please tell us
            using our{" "}
            <a href="/contact" className="text-accent underline">
              Contact form
            </a>
            . A dedicated accessibility contact address has not yet been
            published — see{" "}
            <code className="text-xs">/CONTENT_REQUIRED.md</code>.
          </p>
        </div>

        <p className="text-xs text-ink/70">Last drafted: 7 September 2026.</p>
      </Section>
    </>
  );
}
