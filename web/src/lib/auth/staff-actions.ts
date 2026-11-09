"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createSupabaseServer, isSupabaseAuthConfigured } from "@/lib/auth/supabase";
import { getStaffAccess } from "@/lib/auth/session";
import { pathFor } from "@/lib/auth/access";
import { recordAuditEvent } from "@/lib/auth/audit-log";
import { checkRateLimit } from "@/lib/security/rate-limit";

/**
 * Staff sign-in steps (Supabase Auth). Plain form actions: they work with
 * or without JavaScript, and are never bound with .bind() (the Day 7
 * server-hang rule). Errors come back as a short code in the address bar,
 * shown as a plain-English message by the page. Refusals are written to
 * the activity log WITHOUT the typed email address (no personal data in
 * the log for failed attempts).
 */

function requireConfigured() {
  if (!isSupabaseAuthConfigured()) redirect("/admin/sign-in");
}

const signInSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1),
});

export async function staffSignInAction(formData: FormData): Promise<void> {
  requireConfigured();
  const limit = await checkRateLimit("admin-sign-in");
  if (!limit.allowed) redirect("/admin/sign-in?error=too_many");
  const parsed = signInSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) redirect("/admin/sign-in?error=invalid");

  const supabase = await createSupabaseServer();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error) {
    await recordAuditEvent({ actor: "unknown", action: "denied", propertyId: "-", details: "Staff sign-in refused: wrong email or password" });
    redirect("/admin/sign-in?error=invalid");
  }
  redirect("/admin/two-step");
}

const codeSchema = z.object({
  factorId: z.string().min(1),
  code: z.string().trim().regex(/^\d{6}$/),
});

export async function verifyTwoStepCodeAction(formData: FormData): Promise<void> {
  requireConfigured();
  const limit = await checkRateLimit("admin-two-step");
  if (!limit.allowed) redirect("/admin/two-step?error=too_many");
  const parsed = codeSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) redirect("/admin/two-step?error=code");

  const supabase = await createSupabaseServer();
  const { data: claimsData } = await supabase.auth.getClaims();
  if (!claimsData?.claims?.sub) redirect("/admin/sign-in");

  const { error } = await supabase.auth.mfa.challengeAndVerify({
    factorId: parsed.data.factorId,
    code: parsed.data.code,
  });
  if (error) {
    await recordAuditEvent({ actor: "unknown", action: "denied", propertyId: "-", details: "Two-step code refused" });
    redirect("/admin/two-step?error=code");
  }

  const { decision, userId } = await getStaffAccess();
  if (decision.state === "allowed") {
    await recordAuditEvent({ actor: decision.role, action: "sign_in", propertyId: "-", details: `Staff sign-in with two-step verification (${userId})` });
    redirect("/admin/properties");
  }
  if (decision.state === "no_role") {
    await recordAuditEvent({ actor: "unknown", action: "denied", propertyId: "-", details: `Signed in but no staff role assigned (${userId})` });
    await supabase.auth.signOut();
  }
  redirect(pathFor(decision));
}

const passwordSchema = z
  .object({
    password: z.string().min(12),
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, { path: ["confirm"] });

/** After an invitation or password-reset link: choose a new password. */
export async function setPasswordAction(formData: FormData): Promise<void> {
  requireConfigured();
  const parsed = passwordSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    const tooShort = parsed.error.issues.some((i) => i.path[0] === "password");
    redirect(`/admin/set-password?error=${tooShort ? "short" : "mismatch"}`);
  }
  const supabase = await createSupabaseServer();
  const { data: claimsData } = await supabase.auth.getClaims();
  if (!claimsData?.claims?.sub) redirect("/admin/sign-in?error=link");
  const { error } = await supabase.auth.updateUser({ password: parsed.data.password });
  if (error) redirect("/admin/set-password?error=rejected");
  redirect("/admin/two-step");
}

const emailSchema = z.object({ email: z.string().trim().email() });

/** Always answers the same way, so it never reveals who has an account. */
export async function forgotPasswordAction(formData: FormData): Promise<void> {
  requireConfigured();
  const limit = await checkRateLimit("admin-forgot-password");
  if (!limit.allowed) redirect("/admin/forgot-password?error=too_many");
  const parsed = emailSchema.safeParse(Object.fromEntries(formData.entries()));
  if (parsed.success) {
    const h = await headers();
    const origin = `${h.get("x-forwarded-proto") ?? "http"}://${h.get("host")}`;
    const supabase = await createSupabaseServer();
    await supabase.auth.resetPasswordForEmail(parsed.data.email, {
      redirectTo: `${origin}/admin/auth/confirm`,
    });
  }
  redirect("/admin/forgot-password?sent=1");
}
