import { propertySchema } from "@/lib/property/schema";
import type { Property } from "@/lib/property/types";

/** A form value, or undefined when the field was left blank. */
export function opt(fd: FormData, name: string): string | undefined {
  const v = fd.get(name);
  return typeof v === "string" && v.trim() !== "" ? v.trim() : undefined;
}

/** "£1,800" → "1800", so staff can type money the way they write it. */
const money = (v: string | undefined) => v?.replace(/[£,\s]/g, "");

/**
 * Reads the add/edit property form into a candidate record and validates
 * it with the shared server-side schema (schema.ts). Shared by "Add a
 * property" and "Edit property details", so both apply the same rules.
 *
 * `existing` (edit only): fields the form does not show — coordinates,
 * internal notes, an investment yield — are kept as they were, never
 * wiped by an edit.
 */
export function parsePropertyForm(
  fd: FormData,
  base: { id: string; status: Property["status"]; summary: string; description: string },
  existing?: Property,
):
  | { ok: true; data: Omit<Property, "isDemo" | "media" | "createdAt" | "updatedAt"> }
  | { ok: false; message: string } {
  const category = opt(fd, "category");
  const candidate = {
    ...(existing ?? {}),
    id: base.id,
    privateAddress: opt(fd, "privateAddress") ?? "",
    displayAddress: opt(fd, "displayAddress") ?? "",
    postcode: (opt(fd, "postcode") ?? "").toUpperCase(),
    listingType: opt(fd, "listingType"),
    category,
    price: money(opt(fd, "price")),
    priceQualifier: opt(fd, "priceQualifier"),
    status: base.status,
    summary: base.summary,
    description: base.description,
    features: (opt(fd, "features") ?? "")
      .split("\n")
      .map((f) => f.trim())
      .filter(Boolean)
      .slice(0, 20),
    verification: existing?.verification ?? "unverified",
    residential:
      category === "residential"
        ? {
            ...(existing?.residential ?? {}),
            propertyType: opt(fd, "propertyType"),
            bedrooms: opt(fd, "bedrooms"),
            bathrooms: opt(fd, "bathrooms"),
            receptionRooms: opt(fd, "receptionRooms"),
            tenure: opt(fd, "tenure"),
            councilTaxBand: opt(fd, "councilTaxBand"),
            epcRating: opt(fd, "epcRating"),
            furnishing: opt(fd, "furnishing"),
            leaseLengthYears: opt(fd, "leaseLengthYears"),
            serviceCharge: money(opt(fd, "serviceCharge")),
            groundRent: money(opt(fd, "groundRent")),
            chainStatus: opt(fd, "chainStatus"),
            deposit: money(opt(fd, "deposit")),
            availableFrom: opt(fd, "availableFrom"),
          }
        : undefined,
    commercial:
      category === "commercial"
        ? {
            ...(existing?.commercial ?? {}),
            commercialUse: opt(fd, "commercialUse"),
            floorAreaSqFt: opt(fd, "floorAreaSqFt"),
            tenure: opt(fd, "commercialTenure"),
            useClass: opt(fd, "useClass"),
            businessRatesPayable: money(opt(fd, "businessRatesPayable")),
            serviceChargePerAnnum: money(opt(fd, "serviceChargePerAnnum")),
            vatPosition: opt(fd, "vatPosition"),
            energyRating: opt(fd, "energyRating"),
            possessionDate: opt(fd, "possessionDate"),
            leaseTermsSummary: opt(fd, "leaseTermsSummary"),
          }
        : undefined,
  };

  const parsed = propertySchema.safeParse(candidate);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return {
      ok: false,
      message: issue
        ? `${issue.path.length ? `${issue.path.join(" › ")}: ` : ""}${issue.message}`
        : "Check the form.",
    };
  }
  // The schema only knows the editable fields; anything else on the
  // existing record (coordinates, notes, staff) is carried over as-is.
  return {
    ok: true,
    data: {
      ...(existing ?? {}),
      ...(parsed.data as unknown as Property),
    },
  };
}

/** Video or virtual-tour link: a full https:// address, or blank. */
export function readTourUrl(fd: FormData): { ok: true; url?: string } | { ok: false; message: string } {
  const raw = opt(fd, "virtualTourUrl");
  if (!raw) return { ok: true, url: undefined };
  try {
    const u = new URL(raw);
    if (u.protocol !== "https:" || raw.length > 300) throw new Error();
    return { ok: true, url: u.href };
  } catch {
    return { ok: false, message: "The video or tour link must be a full web address starting with https://" };
  }
}
