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
                <td className="py-2 pr-4 font-mono text-xs">dev_mock_role</td>
                <td className="py-2 pr-4">Cookie (httpOnly)</td>
                <td className="py-2 pr-4">
                  Remembers a development-only demonstration role in the staff
                  admin area. It carries no personal data and does not exist for
                  any visitor browsing the public site — see{" "}
                  <code className="text-xs">/ADMIN_AND_CMS.md</code>. It will be
                  replaced entirely once real staff authentication is built.
                </td>
                <td className="py-2">Strictly necessary</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-mono text-xs">
                  times-estate-favourites
                </td>
                <td className="py-2 pr-4">Browser local storage</td>
                <td className="py-2 pr-4">
                  Remembers which properties you have saved, only on your own
                  device, so your saved list is still there if you return.
                  Nothing is sent to us or to any third party.
                </td>
                <td className="py-2">Strictly necessary</td>
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
            Because everything above is strictly necessary for the feature it
            supports, there is nothing on this site to opt out of today. You can
            still clear your browser&rsquo;s cookies and local storage at any
            time using your browser&rsquo;s own settings — doing so will simply
            sign you out of the demonstration admin area and clear your
            saved-properties list.
          </p>
        </div>

        <p className="text-xs text-ink/70">Last drafted: 7 September 2026.</p>
      </Section>
    </>
  );
}
