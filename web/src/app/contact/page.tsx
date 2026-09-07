import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { PlaceholderNotice } from "@/components/ui/PlaceholderNotice";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = { title: "Contact Us" };

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Get in touch" />

      <Section className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-ink">Registered office</h2>
            <p className="mt-2 text-sm text-ink/70">
              {siteConfig.registeredOffice.value}
            </p>
          </div>
          <PlaceholderNotice status="missing">
            Public phone number, email address and opening hours have not yet
            been supplied by the owner (see /CONTENT_REQUIRED.md), so they
            are not shown here. Please use the form to get in touch for now.
          </PlaceholderNotice>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-ink">Send us a message</h2>
          <div className="mt-4">
            <EnquiryForm
              formType="general-contact"
              submitLabel="Send Message"
              showAddressField={false}
            />
          </div>
        </div>
      </Section>
    </>
  );
}
