import { z } from "zod";

/**
 * Environment-variable validation.
 *
 * No real secrets exist yet — every value here has a safe local-development
 * default. When real integrations are approved (Day 5+), their required
 * variables must be added here with no default, so a missing value fails
 * fast at build/start time instead of silently breaking a page.
 */
const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
});

export const env = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
});
