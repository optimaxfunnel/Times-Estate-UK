import type { Metadata } from "next";
import { LegalPlaceholderPage } from "@/components/layout/LegalPlaceholderPage";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPolicyPage() {
  return <LegalPlaceholderPage title="Privacy Policy" />;
}
