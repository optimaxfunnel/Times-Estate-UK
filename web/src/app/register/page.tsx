import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { LeadForm } from "@/components/forms/LeadForm";

export const metadata: Metadata = {
  title: "Register Your Requirements",
  description:
    "Tell Times Estate Ltd what kind of property you are looking for to buy or rent, and we will be in touch.",
  alternates: { canonical: "/register" },
};

const budgetFields = (label: string) => [
  {
    type: "text" as const,
    name: "preferredAreas",
    label: "Preferred area(s)",
    required: true,
  },
  { type: "text" as const, name: "budget", label, required: true },
  {
    type: "select" as const,
    name: "minBedrooms",
    label: "Minimum bedrooms",
    options: [
      { value: "1", label: "1" },
      { value: "2", label: "2" },
      { value: "3", label: "3" },
      { value: "4", label: "4+" },
    ],
  },
  {
    type: "textarea" as const,
    name: "message",
    label: "Anything else we should know? (optional)",
  },
];

export default function RegisterPage() {
  return (
    <>
      <PageHero
        eyebrow="Register"
        title="Register your requirements"
        intro="Tell us what you're looking for so we can contact you directly when something suitable comes up — in addition to, or instead of, browsing search results yourself."
      />
      <Section containerClassName="grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="text-lg font-semibold text-ink">
            Register as a buyer
          </h2>
          <div className="mt-4">
            <LeadForm
              category="buyer_registration"
              sourcePage="/register"
              submitLabel="Register"
              fields={budgetFields("Budget (maximum price)")}
            />
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-ink">
            Register as a tenant
          </h2>
          <div className="mt-4">
            <LeadForm
              category="tenant_registration"
              sourcePage="/register"
              submitLabel="Register"
              fields={budgetFields("Budget (maximum rent, pcm)")}
            />
          </div>
        </div>
      </Section>
    </>
  );
}
