import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createSupabaseServer, isSupabaseAuthConfigured } from "@/lib/auth/supabase";
import { getStaffAccess } from "@/lib/auth/session";
import { pathFor } from "@/lib/auth/access";
import { verifyTwoStepCodeAction } from "@/lib/auth/staff-actions";
import { AuthPage, TextInput, buttonClass } from "@/components/admin/AuthForm";

export const metadata: Metadata = { title: "Admin — Two-step verification" };
export const dynamic = "force-dynamic";

function qrSrc(qr: string): string {
  return qr.startsWith("data:") ? qr : `data:image/svg+xml;utf8,${encodeURIComponent(qr)}`;
}

export default async function TwoStepPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (!isSupabaseAuthConfigured()) redirect("/admin/sign-in");
  const { error } = await searchParams;
  const { decision } = await getStaffAccess();
  if (decision.state !== "needs_2fa_code" && decision.state !== "needs_2fa_setup") {
    redirect(pathFor(decision));
  }

  const supabase = await createSupabaseServer();
  const codeForm = (factorId: string) => (
    <form action={verifyTwoStepCodeAction} className="mt-6 space-y-4">
      <input type="hidden" name="factorId" value={factorId} />
      <TextInput
        label="6-digit code"
        name="code"
        inputMode="numeric"
        autoComplete="one-time-code"
        pattern="[0-9]{6}"
        maxLength={6}
      />
      <button type="submit" className={buttonClass}>
        Verify and sign in
      </button>
    </form>
  );

  // Already set up: ask for the current code.
  if (decision.state === "needs_2fa_code") {
    const { data } = await supabase.auth.mfa.listFactors();
    const factor = data?.totp?.[0];
    if (!factor) redirect("/admin/sign-in");
    return (
      <AuthPage
        title="Enter your 6-digit code"
        intro="Open your authenticator app and type the current code for Times Estate Ltd."
        error={error}
      >
        {codeForm(factor.id)}
      </AuthPage>
    );
  }

  // First sign-in: set up the authenticator app. Any half-finished set-up
  // from an earlier visit is removed first, so only one code is ever valid.
  const { data: list } = await supabase.auth.mfa.listFactors();
  for (const f of list?.all ?? []) {
    if (f.factor_type === "totp" && f.status !== "verified") {
      await supabase.auth.mfa.unenroll({ factorId: f.id });
    }
  }
  const { data: enrolled, error: enrollError } = await supabase.auth.mfa.enroll({
    factorType: "totp",
    friendlyName: `Times Estate Ltd admin ${new Date().toISOString().slice(0, 10)}`,
  });
  if (enrollError || !enrolled) redirect("/admin/sign-in?error=link");

  return (
    <AuthPage
      title="Set up two-step verification"
      intro={
        <>
          <p>
            Every staff sign-in needs a code from an authenticator app on your
            phone, such as Google Authenticator or Microsoft Authenticator.
          </p>
          <ol className="mt-3 list-decimal space-y-1 pl-5">
            <li>Open the app and choose to add an account.</li>
            <li>Scan the QR code below (or type the key shown under it).</li>
            <li>Enter the 6-digit code the app shows.</li>
          </ol>
        </>
      }
      error={error}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- inline SVG data from Supabase; nothing to optimise */}
      <img
        src={qrSrc(enrolled.totp.qr_code)}
        alt="QR code to add Times Estate Ltd to your authenticator app"
        width={192}
        height={192}
        className="rounded-sm border border-border bg-white p-2"
      />
      <p className="mt-3 text-sm text-ink/80">
        Can&rsquo;t scan? Enter this key in the app:{" "}
        <code className="break-all rounded-sm bg-secondary/10 px-1.5 py-0.5 text-ink">
          {enrolled.totp.secret}
        </code>
      </p>
      {codeForm(enrolled.id)}
    </AuthPage>
  );
}
