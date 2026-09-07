import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { LeadForm } from "@/components/forms/LeadForm";
import { PlaceholderNotice } from "@/components/ui/PlaceholderNotice";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Times Estate Ltd, a London estate agency, or request a callback.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Get in touch" />

      <Section containerClassName="grid gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-ink">
              Registered office
            </h2>
            <p className="mt-2 text-sm text-ink/70">
              {siteConfig.registeredOffice.value}
            </p>
          </div>
          <PlaceholderNotice status="missing">
            Public phone number, email address and opening hours have not yet
            been supplied by the owner (see /CONTENT_REQUIRED.md), so they are
            not shown here. Please use the form to get in touch for now.
          </PlaceholderNotice>
          <div className="rounded-sm border border-border bg-surface p-4">
            <p className="text-sm text-ink/80">
              Prefer a call instead of a form?
            </p>
            <ButtonLink href="/callback" variant="secondary" className="mt-3">
              Request a Callback
            </ButtonLink>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-ink">Send us a message</h2>
          <div className="mt-4">
            <LeadForm
              category="general_enquiry"
              sourcePage="/contact"
              submitLabel="Send Message"
              fields={[
                {
                  type: "textarea",
                  name: "message",
                  label: "Message",
                  required: true,
                },
              ]}
            />
          </div>
        </div>
      </Section>
    </>
  );
}
