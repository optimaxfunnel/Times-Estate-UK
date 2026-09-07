import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { DraftLegalNotice } from "@/components/layout/DraftLegalNotice";
import { PlaceholderNotice } from "@/components/ui/PlaceholderNotice";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Times Estate Ltd collects, uses and protects personal data.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" />
      <Section className="max-w-3xl space-y-8">
        <DraftLegalNotice />

        <div>
          <h2 className="text-xl font-semibold text-ink">Who we are</h2>
          <p className="mt-2 text-ink/80">
            {siteConfig.legalName.value} (company number{" "}
            {siteConfig.companiesHouseNumber.value}), registered office{" "}
            {siteConfig.registeredOffice.value}, is the data controller for
            personal data collected through this website.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-ink">What we collect, and why</h2>
          <p className="mt-2 text-ink/80">
            When you use a form on this site — a valuation request, a
            viewing request, a repair report, a callback request, a
            registration, or a general enquiry — we collect your name,
            email address, phone number, and the details of your enquiry
            (which may include a property address, a preferred appointment
            time, or a description of an issue). We use this only to
            respond to you and to carry out the service you asked for.
          </p>
          <p className="mt-2 text-ink/80">
            We do not collect payment details, government ID numbers, or
            any special category of personal data (such as health or
            religious information) through these forms, and you should not
            include any in a free-text field.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-ink">Our lawful basis</h2>
          <p className="mt-2 text-ink/80">
            We rely on your <strong>consent</strong>, given by ticking the
            consent box on each form, which we timestamp and record against
            your enquiry. A repair report additionally asks for a separate
            consent before we would share your details with a contractor.
            You can withdraw consent at any time by contacting us (see
            &ldquo;Your rights&rdquo; below) — this does not affect anything
            already done on the basis of consent already given.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-ink">Our AI assistant</h2>
          <p className="mt-2 text-ink/80">
            This site includes an AI assistant, currently running in a
            demonstration mode: it does not connect to any external AI
            provider, and does not send anything you type to a third
            party. It cannot access private information about other
            customers and will not answer as if it can. See{" "}
            <code className="text-xs">/AI_SAFETY_RULES.md</code> in this
            project&rsquo;s technical documentation for its full rules.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-ink">Where your data is held</h2>
          <p className="mt-2 text-ink/80">
            Today, this website is a development build: submitted enquiries
            are held only in the server&rsquo;s own memory while it is
            running, are not backed up, and are lost when the server
            restarts. No enquiry data is shared with any third party or
            external system — no CRM, email provider, or analytics service
            is currently connected (see{" "}
            <code className="text-xs">/INTEGRATIONS.md</code>). Before this
            site handles real enquiries in production, a proper,
            access-controlled database will replace this arrangement, and
            this policy will be updated to describe it.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-ink">Who can see it</h2>
          <p className="mt-2 text-ink/80">
            Only staff with an appropriate role (a manager or
            administrator) can view or manage enquiries submitted through
            this site; a limited &ldquo;enquiry viewer&rdquo; role can see
            enquiries but not act on them. Every access is intended to be
            controlled by role — see{" "}
            <code className="text-xs">/PRIVACY_DATA_MAP.md</code> for full
            detail, including the current limitation that real staff
            login has not yet been built.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-ink">How long we keep it</h2>
          <PlaceholderNotice status="missing" className="mt-2">
            A specific retention period has not yet been decided by the
            business owner. Until it is, no enquiry is kept for longer than
            this development server keeps running, and this section will be
            completed once a retention period is confirmed and reviewed.
          </PlaceholderNotice>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-ink">Cookies</h2>
          <p className="mt-2 text-ink/80">
            See our{" "}
            <a href="/cookie-policy" className="text-accent underline">
              Cookie Policy
            </a>{" "}
            for what this site stores in your browser and why.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-ink">Your rights</h2>
          <p className="mt-2 text-ink/80">
            Under UK data protection law, you have the right to ask for a
            copy of the personal data we hold about you, to have it
            corrected, to have it deleted, to restrict or object to how we
            use it, and to receive it in a portable format. To exercise any
            of these rights, please use our{" "}
            <a href="/contact" className="text-accent underline">
              Contact form
            </a>{" "}
            for now — a dedicated privacy contact address has not yet been
            published (see{" "}
            <code className="text-xs">/CONTENT_REQUIRED.md</code>). You also
            have the right to complain to the Information Commissioner&rsquo;s
            Office (ico.org.uk) if you believe your data has been mishandled.
          </p>
        </div>

        <p className="text-xs text-ink/70">Last drafted: 7 September 2026.</p>
      </Section>
    </>
  );
}
