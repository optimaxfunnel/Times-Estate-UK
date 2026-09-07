import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { EmergencyGuidance } from "@/components/ui/EmergencyGuidance";
import { RepairReportForm } from "@/components/forms/RepairReportForm";
import { PlaceholderNotice } from "@/components/ui/PlaceholderNotice";

export const metadata: Metadata = { title: "Report a Repair" };

export default function ReportARepairPage() {
  return (
    <>
      <PageHero
        eyebrow="Property Management"
        title="Report a repair"
        intro="For managed tenants. Tell us what's wrong and we'll arrange for it to be looked at."
      />
      <Section containerClassName="grid gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          <EmergencyGuidance />
          <PlaceholderNotice status="requires-professional-review">
            Our exact response times and out-of-hours contractor process have
            not yet been confirmed or professionally reviewed, so no specific
            promise is made here — see /CONTENT_VERIFICATION_REGISTER.md.
          </PlaceholderNotice>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-ink">Report a repair</h2>
          <p className="mt-2 text-sm text-ink/70">
            A member of our property management team reviews every report —
            nothing here books a contractor automatically.
          </p>
          <div className="mt-4">
            <RepairReportForm />
          </div>
        </div>
      </Section>
    </>
  );
}
