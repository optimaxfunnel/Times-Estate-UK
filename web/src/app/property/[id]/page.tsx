import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { PropertyGallery } from "@/components/property/PropertyGallery";
import { ShareButton } from "@/components/property/ShareButton";
import { FavouriteButton } from "@/components/property/FavouriteButton";
import { LeadForm } from "@/components/forms/LeadForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, propertyJsonLd } from "@/lib/seo/structured-data";
import { propertyProvider } from "@/lib/property/provider";
import {
  PUBLICLY_VISIBLE_STATUSES,
  RESIDENTIAL_PROPERTY_TYPE_LABELS,
  COMMERCIAL_USE_LABELS,
  toPublicProperty,
  toPublicCommercialDetails,
} from "@/lib/property/types";
import { formatPriceLabel, formatStatusLabel } from "@/lib/property/format";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const property = await propertyProvider.getById(id);
  if (!property || !PUBLICLY_VISIBLE_STATUSES.includes(property.status)) {
    return { title: "Property not found" };
  }
  const publicProperty = toPublicProperty(property);
  return {
    title: publicProperty.displayAddress,
    description: publicProperty.summary,
    // Every property today is fabricated demonstration data (see
    // /DATA_MODEL.md) — indexing it as a real, searchable listing would
    // mislead search engines and, eventually, buyers/tenants. Remove this
    // once real listings replace the demo data.
    robots: publicProperty.isDemo ? { index: false, follow: true } : undefined,
    alternates: { canonical: `/property/${publicProperty.id}` },
  };
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = await propertyProvider.getById(id);

  // Draft/unapproved/withdrawn/sold/let properties must never render
  // publicly, regardless of whether someone guesses or bookmarks the URL.
  if (!property || !PUBLICLY_VISIBLE_STATUSES.includes(property.status)) {
    notFound();
  }

  const publicProperty = toPublicProperty(property);
  const commercial = toPublicCommercialDetails(publicProperty.commercial);
  const residential = publicProperty.residential;

  const listingJsonLd = propertyJsonLd(publicProperty);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          {
            name: publicProperty.listingType === "sale" ? "Buy" : "Rent",
            path: publicProperty.listingType === "sale" ? "/buy" : "/rent",
          },
          {
            name: publicProperty.displayAddress,
            path: `/property/${publicProperty.id}`,
          },
        ])}
      />
      {listingJsonLd && <JsonLd data={listingJsonLd} />}
      <Section className="border-b border-border bg-surface">
        {publicProperty.isDemo && (
          <p className="mb-4 inline-block w-fit rounded-sm bg-warning px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
            Sample property — not a genuine Times Estate Ltd instruction
          </p>
        )}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-accent">
              {publicProperty.listingType === "sale" ? "For Sale" : "To Let"}{" "}
              &middot; {formatStatusLabel(publicProperty.status)}
            </p>
            <h1 className="text-3xl font-semibold text-ink sm:text-4xl">
              {publicProperty.displayAddress}
            </h1>
            <p className="mt-2 text-2xl font-semibold text-ink">
              {formatPriceLabel(publicProperty)}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <FavouriteButton propertyId={publicProperty.id} />
            <ShareButton title={publicProperty.displayAddress} />
          </div>
        </div>
      </Section>

      <Section containerClassName="grid gap-10 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <PropertyGallery images={publicProperty.media.images} />

          <div>
            <h2 className="text-xl font-semibold text-ink">Description</h2>
            <p className="mt-2 text-ink/80">{publicProperty.description}</p>
          </div>

          {publicProperty.features.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-ink">Features</h2>
              <ul className="mt-2 grid list-inside list-disc gap-1 text-ink/80 sm:grid-cols-2">
                {publicProperty.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {residential && (
            <div>
              <h2 className="text-xl font-semibold text-ink">
                Property information
              </h2>
              <dl className="mt-2 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
                <Info
                  label="Type"
                  value={
                    RESIDENTIAL_PROPERTY_TYPE_LABELS[residential.propertyType]
                  }
                />
                <Info label="Bedrooms" value={String(residential.bedrooms)} />
                <Info label="Bathrooms" value={String(residential.bathrooms)} />
                {residential.receptionRooms !== undefined && (
                  <Info
                    label="Reception rooms"
                    value={String(residential.receptionRooms)}
                  />
                )}
                {residential.tenure && (
                  <Info
                    label="Tenure"
                    value={residential.tenure.replace("_", " ")}
                  />
                )}
                {residential.councilTaxBand && (
                  <Info
                    label="Council tax band"
                    value={residential.councilTaxBand}
                  />
                )}
                {residential.epcRating && (
                  <Info label="EPC rating" value={residential.epcRating} />
                )}
                {residential.furnishing && (
                  <Info
                    label="Furnishing"
                    value={residential.furnishing.replace("_", " ")}
                  />
                )}
                {residential.deposit !== undefined && (
                  <Info
                    label="Deposit"
                    value={`£${residential.deposit.toLocaleString("en-GB")}`}
                  />
                )}
                {residential.availableFrom && (
                  <Info
                    label="Available from"
                    value={residential.availableFrom}
                  />
                )}
                {residential.leaseLengthYears !== undefined && (
                  <Info
                    label="Lease length remaining"
                    value={`${residential.leaseLengthYears} years`}
                  />
                )}
                {residential.serviceCharge !== undefined && (
                  <Info
                    label="Service charge"
                    value={`£${residential.serviceCharge.toLocaleString("en-GB")} pa`}
                  />
                )}
                {residential.groundRent !== undefined && (
                  <Info
                    label="Ground rent"
                    value={`£${residential.groundRent.toLocaleString("en-GB")} pa`}
                  />
                )}
                {residential.chainStatus && (
                  <Info
                    label="Chain"
                    value={residential.chainStatus.replace(/_/g, " ")}
                  />
                )}
              </dl>
            </div>
          )}

          {commercial && (
            <div>
              <h2 className="text-xl font-semibold text-ink">
                Property information
              </h2>
              <dl className="mt-2 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
                <Info
                  label="Use"
                  value={COMMERCIAL_USE_LABELS[commercial.commercialUse]}
                />
                <Info
                  label="Floor area"
                  value={`${commercial.floorAreaSqFt.toLocaleString("en-GB")} sq ft`}
                />
                {commercial.units !== undefined && (
                  <Info label="Units" value={String(commercial.units)} />
                )}
                {commercial.tenure && (
                  <Info
                    label="Tenure"
                    value={commercial.tenure.replace("_", " ")}
                  />
                )}
                {commercial.businessRatesPayable !== undefined && (
                  <Info
                    label="Business rates (indicative)"
                    value={`£${commercial.businessRatesPayable.toLocaleString("en-GB")} pa`}
                  />
                )}
                {commercial.serviceChargePerAnnum !== undefined && (
                  <Info
                    label="Service charge"
                    value={`£${commercial.serviceChargePerAnnum.toLocaleString("en-GB")} pa`}
                  />
                )}
                {commercial.vatPosition && (
                  <Info
                    label="VAT position"
                    value={commercial.vatPosition.replace(/_/g, " ")}
                  />
                )}
                {commercial.useClass && (
                  <Info label="Use class" value={commercial.useClass} />
                )}
                {commercial.energyRating && (
                  <Info label="EPC rating" value={commercial.energyRating} />
                )}
                {commercial.possessionDate && (
                  <Info label="Possession" value={commercial.possessionDate} />
                )}
                {commercial.investmentYieldPercent && (
                  <Info
                    label="Investment yield (verified)"
                    value={`${commercial.investmentYieldPercent.value}%`}
                  />
                )}
              </dl>
              {commercial.leaseTermsSummary && (
                <p className="mt-3 text-sm text-ink/70">
                  <span className="font-medium text-ink">Lease terms: </span>
                  {commercial.leaseTermsSummary}
                </p>
              )}
            </div>
          )}

          <div className="rounded-sm border border-dashed border-warning/60 bg-warning/5 p-4 text-xs text-ink/70">
            <p className="font-semibold uppercase tracking-wide text-warning-text">
              Material information &mdash; requires professional review
            </p>
            <p className="mt-1">
              A full, solicitor-reviewed material information / property
              particulars disclaimer has not yet been drafted for this site (see
              /CONTENT_REQUIRED.md). Nothing above should be relied upon as a
              legal description of the property until that review is complete.
            </p>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-sm border border-border bg-surface p-6">
            <h2 className="text-lg font-semibold text-ink">Book a viewing</h2>
            <p className="mt-2 text-sm text-ink/70">
              Interested in this property? Send a viewing request below.
            </p>
            <p className="mt-2 rounded-sm bg-warning/10 p-2 text-xs font-medium text-warning-text">
              This does not confirm a viewing — a member of the team will
              contact you to agree an exact time, including with the current
              occupier where applicable.
            </p>
            <div className="mt-4">
              <LeadForm
                category="viewing_request"
                sourcePage={`/property/${publicProperty.id}`}
                submitLabel="Request a Viewing"
                propertyReference={publicProperty.displayAddress}
                fields={[
                  {
                    type: "date",
                    name: "preferredDate1",
                    label: "Preferred date (1st choice)",
                    required: true,
                  },
                  {
                    type: "time",
                    name: "preferredTime1",
                    label: "Preferred time (1st choice)",
                    required: true,
                  },
                  {
                    type: "date",
                    name: "preferredDate2",
                    label: "Alternative date (optional)",
                  },
                  {
                    type: "time",
                    name: "preferredTime2",
                    label: "Alternative time (optional)",
                  },
                  {
                    type: "select",
                    name: "qualification",
                    label:
                      publicProperty.listingType === "sale"
                        ? "Are your finances in place?"
                        : "When would you like to move in?",
                    required: true,
                    options:
                      publicProperty.listingType === "sale"
                        ? [
                            { value: "cash_buyer", label: "Cash buyer" },
                            {
                              value: "mortgage_agreed",
                              label: "Mortgage agreed in principle",
                            },
                            {
                              value: "not_yet_arranged",
                              label: "Not yet arranged",
                            },
                          ]
                        : [
                            { value: "asap", label: "As soon as possible" },
                            { value: "1_3_months", label: "1–3 months" },
                            { value: "3_plus_months", label: "3+ months" },
                          ],
                  },
                  {
                    type: "textarea",
                    name: "message",
                    label:
                      "Any accessibility needs for the viewing? (optional)",
                  },
                ]}
              />
            </div>
          </div>
        </aside>
      </Section>
    </>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-secondary">
        {label}
      </dt>
      <dd className="text-ink">{value}</dd>
    </div>
  );
}
