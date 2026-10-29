import { z } from "zod";
import {
  PROPERTY_STATUSES,
  RESIDENTIAL_PROPERTY_TYPES,
  COMMERCIAL_USES,
} from "@/lib/property/types";

/**
 * Server-side validation for creating/editing a property in the admin
 * area. Mirrors the mandatory/optional split documented in
 * /DATA_MODEL.md — this is not just client-side convenience, it runs
 * again on the server regardless of what the browser sent.
 */

const priceQualifierEnum = z.enum([
  "guide_price",
  "offers_in_excess_of",
  "offers_in_region_of",
  "fixed_price",
  "poa",
  "per_calendar_month",
  "per_annum",
  "per_sq_ft_per_annum",
]);

const residentialDetailsSchema = z.object({
  propertyType: z.enum(RESIDENTIAL_PROPERTY_TYPES),
  bedrooms: z.coerce.number().int().min(0).max(20),
  bathrooms: z.coerce.number().int().min(0).max(20),
  receptionRooms: z.coerce.number().int().min(0).max(20).optional(),
  tenure: z
    .enum(["freehold", "leasehold", "share_of_freehold", "commonhold"])
    .optional(),
  councilTaxBand: z.string().max(4).optional(),
  epcRating: z.enum(["A", "B", "C", "D", "E", "F", "G", "exempt"]).optional(),
  deposit: z.coerce.number().min(0).optional(),
  furnishing: z.enum(["furnished", "unfurnished", "part_furnished"]).optional(),
  availableFrom: z.string().optional(),
  leaseLengthYears: z.coerce.number().min(0).max(999).optional(),
  serviceCharge: z.coerce.number().min(0).optional(),
  groundRent: z.coerce.number().min(0).optional(),
  chainStatus: z
    .enum(["no_chain", "chain_free_seller", "in_a_chain"])
    .optional(),
});

const commercialDetailsSchema = z.object({
  commercialUse: z.enum(COMMERCIAL_USES),
  useClass: z.string().max(20).optional(),
  floorAreaSqFt: z.coerce.number().min(0),
  units: z.coerce.number().int().min(1).optional(),
  tenure: z
    .enum(["freehold", "leasehold", "share_of_freehold", "commonhold"])
    .optional(),
  rentPerAnnum: z.coerce.number().min(0).optional(),
  businessRatesPayable: z.coerce.number().min(0).optional(),
  serviceChargePerAnnum: z.coerce.number().min(0).optional(),
  vatPosition: z
    .enum(["vat_applicable", "vat_not_applicable", "tbc"])
    .optional(),
  leaseTermsSummary: z.string().max(2000).optional(),
  possessionDate: z.string().optional(),
  energyRating: z
    .enum(["A+", "A", "B", "C", "D", "E", "F", "G", "exempt"])
    .optional(),
  investmentYieldPercent: z
    .object({ value: z.coerce.number().min(0).max(100), verified: z.boolean() })
    .optional(),
});

export const propertySchema = z
  .object({
    id: z.string().min(1),
    privateAddress: z.string().trim().min(5, "Enter the full private address."),
    displayAddress: z
      .string()
      .trim()
      .min(5, "Enter the public display address."),
    postcode: z.string().trim().min(5, "Enter a valid postcode."),
    listingType: z.enum(["sale", "letting"]),
    category: z.enum(["residential", "commercial"]),
    price: z.coerce.number().min(0).optional(),
    priceQualifier: priceQualifierEnum,
    status: z.enum(PROPERTY_STATUSES),
    summary: z
      .string()
      .trim()
      .min(10, "Summary must be at least 10 characters."),
    description: z
      .string()
      .trim()
      .min(20, "Description must be at least 20 characters."),
    features: z.array(z.string()).default([]),
    branch: z.string().optional(),
    verification: z.enum(["verified", "unverified"]).default("unverified"),
    residential: residentialDetailsSchema.optional(),
    commercial: commercialDetailsSchema.optional(),
  })
  .refine(
    (data) => data.category !== "residential" || Boolean(data.residential),
    {
      message: "Residential details are required for a residential property.",
      path: ["residential"],
    },
  )
  .refine(
    (data) => data.category !== "commercial" || Boolean(data.commercial),
    {
      message: "Commercial details are required for a commercial property.",
      path: ["commercial"],
    },
  );

export type PropertyFormValues = z.infer<typeof propertySchema>;
