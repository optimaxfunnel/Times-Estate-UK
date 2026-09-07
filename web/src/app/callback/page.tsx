import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { LeadForm } from "@/components/forms/LeadForm";

export const metadata: Metadata = { title: "Request a Callback" };

export default function CallbackPage() {
  return (
    <>
      <PageHero
        eyebrow="Callback"
        title="Request a callback"
        intro="Leave your number and a good time to call, and a member of the team will ring you — no need to fill in a longer form."
      />
      <Section className="max-w-md">
        <LeadForm
          category="callback_request"
          sourcePage="/callback"
          submitLabel="Request Callback"
          fields={[
            {
              type: "select",
              name: "bestTimeToCall",
              label: "Best time to call",
              required: true,
              options: [
                { value: "morning", label: "Morning" },
                { value: "afternoon", label: "Afternoon" },
                { value: "evening", label: "Evening" },
              ],
            },
            {
              type: "textarea",
              name: "message",
              label: "What's this about? (optional)",
            },
          ]}
        />
      </Section>
    </>
  );
}
