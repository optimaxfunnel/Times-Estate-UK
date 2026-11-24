import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { DraftLegalNotice } from "@/components/layout/DraftLegalNotice";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "What this website stores in your browser, and why.",
  alternates: { canonical: "/cookie-policy" },
};

export default function CookiePolicyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Cookie Policy" />
      <Section className="max-w-3xl space-y-8">
        <DraftLegalNotice />

        <div>
          <h2 className="text-xl font-semibold text-ink">
            This site does not use tracking, advertising or analytics cookies
          </h2>
          <p className="mt-2 text-ink/80">
            No cookie consent banner is shown on this site because nothing
            requiring your consent under the UK Privacy and Electronic
            Communications Regulations (PECR) is currently in use — there is no
            analytics service, no advertising or social-media tracking, and no
            third-party script of any kind (see{" "}
            <code className="text-xs">/INTEGRATIONS.md</code>, which confirms
            none of these has been connected). If that changes — for example, if
            an analytics tool is approved in future — a proper consent banner,
            offering &ldquo;Accept all&rdquo; and &ldquo;Reject all&rdquo; with
            equal prominence, will be added before that technology is switched
            on, and this page will be updated to list it.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-ink">
            What this site does store in your browser
          </h2>
          {/* 2026-11-09: scroll box so the table no longer widens the page on phones (WCAG 1.4.10). */}
          <div
            className="mt-3 overflow-x-auto"
            role="region"
            aria-label="Cookies and browser storage"
            tabIndex={0}
          >
          <table className="w-full min-w-[36rem] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="py-2 pr-4 font-medium text-ink">Name</th>
                <th className="py-2 pr-4 font-medium text-ink">Type</th>
                <th className="py-2 pr-4 font-medium text-ink">Purpose</th>
                <th className="py-2 font-medium text-ink">PECR category</th>
              </tr>
            </thead>
            <tbody className="text-ink/80">
              <tr className="border-b border-border">
                <td className="py-2 pr-4 font-mono text-xs">te_admin_session</td>
                <td className="py-2 pr-4">Cookie (httpOnly)</td>
                <td className="py-2 pr-4">
                  Keeps a staff member signed in to the admin area. It is only set when staff sign in, never for visitors to the public site, and carries no customer data.
                </td>
                <td className="py-2">Strictly necessary</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 pr-4 font-mono text-xs">sb-…-auth-token</td>
                <td className="py-2 pr-4">Cookies (httpOnly; may be split into numbered parts)</td>
                <td className="py-2 pr-4">
                  Set by Supabase, the staff sign-in service, while a staff member is signed in, including the two-step verification step. Never set for visitors to the public site.
                </td>
                <td className="py-2">Strictly necessary</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 pr-4 font-mono text-xs">times-estate-favourites</td>
                <td className="py-2 pr-4">Browser local storage</td>
                <td className="py-2 pr-4">
                  Remembers which properties you have saved, only on your own device, so your saved list is still there if you return. Nothing is sent to us or to any third party.
                </td>
                <td className="py-2">Strictly necessary</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 pr-4 font-mono text-xs">times-estate-saved-searches</td>
                <td className="py-2 pr-4">Browser local storage</td>
                <td className="py-2 pr-4">
                  Remembers searches you chose to save with &ldquo;Save this search&rdquo;, only on your own device. Nothing is sent to us or to any third party.
                </td>
                <td className="py-2">Strictly necessary</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-mono text-xs">te_intro_seen</td>
                <td className="py-2 pr-4">Browser session storage (cleared when you close the tab)</td>
                <td className="py-2 pr-4">
                  Remembers that the short intro video has already played during this visit, so it does not play again on every page.
                </td>
                <td className="py-2">To be confirmed in the solicitor review</td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-ink">
            How to control this
          </h2>
          <p className="mt-2 text-ink/80">
            Nothing above is used for advertising or tracking, and nothing is
            shared with a third party, so there is no consent banner today
            (this is being confirmed in the solicitor review). You can
            still clear your browser&rsquo;s cookies and local storage at any
            time using your browser&rsquo;s own settings — doing so will simply
            sign staff out of the admin area and clear your saved
            properties and saved searches.
          </p>
        </div>

        <p className="text-xs text-ink/70">Last drafted: 7 September 2026. Table of cookies and browser storage corrected 24 November 2026; awaiting solicitor review.</p>
      </Section>
    </>
  );
}
