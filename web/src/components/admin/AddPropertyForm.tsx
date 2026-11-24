"use client";

import { useActionState, useState } from "react";
import {
  createPropertyAction,
  updatePropertyDetailsAction,
  type CreatePropertyState,
} from "@/lib/property/create-action";
import {
  COMMERCIAL_USES,
  COMMERCIAL_USE_LABELS,
  PRICE_QUALIFIER_LABELS,
  RESIDENTIAL_PROPERTY_TYPES,
  RESIDENTIAL_PROPERTY_TYPE_LABELS,
  type PriceQualifier,
  type Property,
} from "@/lib/property/types";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";

const initialState: CreatePropertyState = { status: "idle" };
const input =
  "w-full rounded-sm border border-border-strong bg-surface px-3 py-2 text-sm";
const label = "block text-sm font-medium text-ink";

const SALE_QUALIFIERS: PriceQualifier[] = [
  "guide_price",
  "offers_in_excess_of",
  "offers_in_region_of",
  "fixed_price",
  "poa",
];
const LET_QUALIFIERS: PriceQualifier[] = [
  "per_calendar_month",
  "per_annum",
  "per_sq_ft_per_annum",
  "poa",
];
const TENURES = [
  ["freehold", "Freehold"],
  ["leasehold", "Leasehold"],
  ["share_of_freehold", "Share of freehold"],
  ["commonhold", "Commonhold"],
] as const;

function Field({
  id,
  text,
  hint,
  children,
}: {
  id: string;
  text: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className={label}>
        {text}
      </label>
      {children}
      {hint && (
        <p id={`${id}-hint`} className="text-xs text-ink/60">
          {hint}
        </p>
      )}
    </div>
  );
}

/**
 * Add a property, or (with `property`) edit an existing one's details.
 * In edit mode the summary, description and status are edited in their
 * own form above, so they are not repeated here.
 */
export function AddPropertyForm({ property }: { property?: Property } = {}) {
  const editing = Boolean(property);
  const [state, formAction, isPending] = useActionState(
    editing ? updatePropertyDetailsAction : createPropertyAction,
    initialState,
  );
  const [category, setCategory] = useState<"residential" | "commercial">(
    property?.category ?? "residential",
  );
  const [listingType, setListingType] = useState<"sale" | "letting">(
    property?.listingType ?? "sale",
  );
  const r = property?.residential;
  const c = property?.commercial;
  const v = (x: number | string | undefined | null) => (x === undefined || x === null ? "" : String(x));
  const qualifiers = listingType === "sale" ? SALE_QUALIFIERS : LET_QUALIFIERS;

  return (
    <form action={formAction} className="space-y-8">
      {property && <input type="hidden" name="id" value={property.id} />}
      {state.status === "error" && state.message && (
        <Alert tone="danger">{state.message}</Alert>
      )}

      <fieldset className="grid gap-4 rounded-sm border border-border bg-surface p-5 sm:grid-cols-2">
        <legend className="px-1 font-semibold text-ink">Type of listing</legend>
        <Field id="category" text="Category">
          <select
            id="category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as typeof category)}
            className={input}
          >
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
          </select>
        </Field>
        <Field id="listingType" text="For sale or to let">
          <select
            id="listingType"
            name="listingType"
            value={listingType}
            onChange={(e) => setListingType(e.target.value as typeof listingType)}
            className={input}
          >
            <option value="sale">For sale</option>
            <option value="letting">To let</option>
          </select>
        </Field>
      </fieldset>

      <fieldset className="grid gap-4 rounded-sm border border-border bg-surface p-5 sm:grid-cols-2">
        <legend className="px-1 font-semibold text-ink">Address</legend>
        <div className="sm:col-span-2">
          <Field
            id="privateAddress"
            text="Full address (private)"
            hint="Staff only. Never shown on the website."
          >
            <input id="privateAddress" name="privateAddress" defaultValue={property?.privateAddress} required aria-describedby="privateAddress-hint" className={input} />
          </Field>
        </div>
        <Field
          id="displayAddress"
          text="Address shown on the website"
          hint="Usually the street and area only, e.g. “Mitcham Road, Tooting”."
        >
          <input id="displayAddress" name="displayAddress" defaultValue={property?.displayAddress} required aria-describedby="displayAddress-hint" className={input} />
        </Field>
        <Field id="postcode" text="Postcode" hint="The full postcode. Only the first part is shown publicly.">
          <input id="postcode" name="postcode" defaultValue={property?.postcode} required autoComplete="off" aria-describedby="postcode-hint" className={input} />
        </Field>
      </fieldset>

      <fieldset className="grid gap-4 rounded-sm border border-border bg-surface p-5 sm:grid-cols-2">
        <legend className="px-1 font-semibold text-ink">Price</legend>
        <Field id="price" text={listingType === "sale" ? "Price (£)" : "Rent (£)"} hint="Leave blank for POA.">
          <input id="price" name="price" defaultValue={v(property?.price)} inputMode="numeric" aria-describedby="price-hint" className={input} />
        </Field>
        <Field id="priceQualifier" text="Shown as">
          <select id="priceQualifier" name="priceQualifier" key={listingType} defaultValue={property && qualifiers.includes(property.priceQualifier) ? property.priceQualifier : undefined} className={input}>
            {qualifiers.map((q) => (
              <option key={q} value={q}>
                {PRICE_QUALIFIER_LABELS[q]}
              </option>
            ))}
          </select>
        </Field>
      </fieldset>

      {category === "residential" ? (
        <fieldset className="grid gap-4 rounded-sm border border-border bg-surface p-5 sm:grid-cols-3">
          <legend className="px-1 font-semibold text-ink">Home details</legend>
          <Field id="propertyType" text="Property type">
            <select id="propertyType" name="propertyType" defaultValue={r?.propertyType} className={input}>
              {RESIDENTIAL_PROPERTY_TYPES.map((t) => (
                <option key={t} value={t}>
                  {RESIDENTIAL_PROPERTY_TYPE_LABELS[t]}
                </option>
              ))}
            </select>
          </Field>
          <Field id="bedrooms" text="Bedrooms">
            <input id="bedrooms" name="bedrooms" defaultValue={v(r?.bedrooms)} type="number" min={0} max={20} required className={input} />
          </Field>
          <Field id="bathrooms" text="Bathrooms">
            <input id="bathrooms" name="bathrooms" defaultValue={v(r?.bathrooms)} type="number" min={0} max={20} required className={input} />
          </Field>
          <Field id="receptionRooms" text="Reception rooms">
            <input id="receptionRooms" name="receptionRooms" defaultValue={v(r?.receptionRooms)} type="number" min={0} max={20} className={input} />
          </Field>
          <Field id="tenure" text="Tenure">
            <select id="tenure" name="tenure" defaultValue={r?.tenure ?? ""} className={input}>
              <option value="">Not stated</option>
              {TENURES.map(([v, l]) => (
                <option key={v} value={v}>
                  {l}
                </option>
              ))}
            </select>
          </Field>
          <Field id="furnishing" text="Furnishing">
            <select id="furnishing" name="furnishing" defaultValue={r?.furnishing ?? ""} className={input}>
              <option value="">Not stated</option>
              <option value="furnished">Furnished</option>
              <option value="part_furnished">Part furnished</option>
              <option value="unfurnished">Unfurnished</option>
            </select>
          </Field>
          <Field id="epcRating" text="EPC rating" hint="Must match the real certificate.">
            <select id="epcRating" name="epcRating" defaultValue={r?.epcRating ?? ""} aria-describedby="epcRating-hint" className={input}>
              <option value="">Not yet known</option>
              {["A", "B", "C", "D", "E", "F", "G", "exempt"].map((r) => (
                <option key={r} value={r}>
                  {r === "exempt" ? "Exempt" : r}
                </option>
              ))}
            </select>
          </Field>
          <Field id="councilTaxBand" text="Council tax band">
            <select id="councilTaxBand" name="councilTaxBand" defaultValue={r?.councilTaxBand ?? ""} className={input}>
              <option value="">Not yet known</option>
              {["A", "B", "C", "D", "E", "F", "G", "H"].map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </Field>
          <Field id="leaseLengthYears" text="Lease years remaining" hint="Leasehold only.">
            <input id="leaseLengthYears" name="leaseLengthYears" type="number" min={0} max={999} defaultValue={v(r?.leaseLengthYears)} aria-describedby="leaseLengthYears-hint" className={input} />
          </Field>
          <Field id="serviceCharge" text="Service charge (£ a year)">
            <input id="serviceCharge" name="serviceCharge" inputMode="numeric" defaultValue={v(r?.serviceCharge)} className={input} />
          </Field>
          <Field id="groundRent" text="Ground rent (£ a year)">
            <input id="groundRent" name="groundRent" inputMode="numeric" defaultValue={v(r?.groundRent)} className={input} />
          </Field>
          {listingType === "sale" ? (
            <Field id="chainStatus" text="Chain">
              <select id="chainStatus" name="chainStatus" defaultValue={r?.chainStatus ?? ""} className={input}>
                <option value="">Not stated</option>
                <option value="no_chain">No chain</option>
                <option value="chain_free_seller">Chain-free seller</option>
                <option value="in_a_chain">In a chain</option>
              </select>
            </Field>
          ) : (
            <>
              <Field id="deposit" text="Deposit (£)">
                <input id="deposit" name="deposit" inputMode="numeric" defaultValue={v(r?.deposit)} className={input} />
              </Field>
              <Field id="availableFrom" text="Available from">
                <input id="availableFrom" name="availableFrom" type="date" defaultValue={r?.availableFrom ?? ""} className={input} />
              </Field>
            </>
          )}
        </fieldset>
      ) : (
        <fieldset className="grid gap-4 rounded-sm border border-border bg-surface p-5 sm:grid-cols-3">
          <legend className="px-1 font-semibold text-ink">Commercial details</legend>
          <Field id="commercialUse" text="Use">
            <select id="commercialUse" name="commercialUse" defaultValue={c?.commercialUse} className={input}>
              {COMMERCIAL_USES.map((u) => (
                <option key={u} value={u}>
                  {COMMERCIAL_USE_LABELS[u]}
                </option>
              ))}
            </select>
          </Field>
          <Field id="floorAreaSqFt" text="Floor area (sq ft)">
            <input id="floorAreaSqFt" name="floorAreaSqFt" defaultValue={v(c?.floorAreaSqFt)} type="number" min={0} required className={input} />
          </Field>
          <Field id="commercialTenure" text="Tenure">
            <select id="commercialTenure" name="commercialTenure" defaultValue={c?.tenure ?? ""} className={input}>
              <option value="">Not stated</option>
              {TENURES.map(([v, l]) => (
                <option key={v} value={v}>
                  {l}
                </option>
              ))}
            </select>
          </Field>
          <Field id="useClass" text="Use class" hint="e.g. E, B2, B8, Sui generis.">
            <input id="useClass" name="useClass" maxLength={20} defaultValue={c?.useClass ?? ""} aria-describedby="useClass-hint" className={input} />
          </Field>
          <Field id="businessRatesPayable" text="Business rates (£ a year)">
            <input id="businessRatesPayable" name="businessRatesPayable" inputMode="numeric" defaultValue={v(c?.businessRatesPayable)} className={input} />
          </Field>
          <Field id="serviceChargePerAnnum" text="Service charge (£ a year)">
            <input id="serviceChargePerAnnum" name="serviceChargePerAnnum" inputMode="numeric" defaultValue={v(c?.serviceChargePerAnnum)} className={input} />
          </Field>
          <Field id="vatPosition" text="VAT">
            <select id="vatPosition" name="vatPosition" defaultValue={c?.vatPosition ?? ""} className={input}>
              <option value="">Not stated</option>
              <option value="vat_applicable">VAT applicable</option>
              <option value="vat_not_applicable">VAT not applicable</option>
              <option value="tbc">To be confirmed</option>
            </select>
          </Field>
          <Field id="energyRating" text="EPC rating" hint="Must match the real certificate.">
            <select id="energyRating" name="energyRating" defaultValue={c?.energyRating ?? ""} aria-describedby="energyRating-hint" className={input}>
              <option value="">Not yet known</option>
              {["A+", "A", "B", "C", "D", "E", "F", "G", "exempt"].map((x) => (
                <option key={x} value={x}>
                  {x === "exempt" ? "Exempt" : x}
                </option>
              ))}
            </select>
          </Field>
          <Field id="possessionDate" text="Possession date">
            <input id="possessionDate" name="possessionDate" type="date" defaultValue={c?.possessionDate ?? ""} className={input} />
          </Field>
          <div className="sm:col-span-3">
            <Field id="leaseTermsSummary" text="Lease terms" hint="A short summary, e.g. “New 10-year FRI lease, rent review at year 5”.">
              <textarea id="leaseTermsSummary" name="leaseTermsSummary" rows={2} maxLength={2000} defaultValue={c?.leaseTermsSummary ?? ""} aria-describedby="leaseTermsSummary-hint" className={input} />
            </Field>
          </div>
        </fieldset>
      )}

      <fieldset className="space-y-4 rounded-sm border border-border bg-surface p-5">
        <legend className="px-1 font-semibold text-ink">{editing ? "Features and tour" : "Description"}</legend>
        {!editing && (
          <>
        <Field id="summary" text="Short summary" hint="One sentence, shown on listing cards.">
          <input id="summary" name="summary" required minLength={10} maxLength={200} aria-describedby="summary-hint" className={input} />
        </Field>
        <Field id="description" text="Full description">
          <textarea id="description" name="description" required minLength={20} rows={6} className={input} />
        </Field>
          </>
        )}
        <Field id="features" text="Key features" hint="One per line, up to 20.">
          <textarea id="features" name="features" defaultValue={property?.features.join("\n")} rows={4} aria-describedby="features-hint" className={input} />
        </Field>
        <Field id="virtualTourUrl" text="Video or virtual tour link (optional)" hint="A full https:// address, e.g. a YouTube or Matterport link.">
          <input id="virtualTourUrl" name="virtualTourUrl" type="url" inputMode="url" defaultValue={property?.media.virtualTourUrl} aria-describedby="virtualTourUrl-hint" className={input} />
        </Field>
      </fieldset>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving…" : editing ? "Save details" : "Save as draft"}
        </Button>
        {editing ? (
          state.status === "success" &&
          state.message && <p role="status" className="text-sm text-success">{state.message}</p>
        ) : (
          <p className="text-sm text-ink/70">
            Drafts are never shown on the website. Submit it for approval from
            the next screen.
          </p>
        )}
      </div>
    </form>
  );
}
