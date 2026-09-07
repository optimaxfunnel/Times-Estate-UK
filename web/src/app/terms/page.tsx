import type { Metadata } from "next";
import { LegalPlaceholderPage } from "@/components/layout/LegalPlaceholderPage";

export const metadata: Metadata = { title: "Terms of Website Use" };

export default function TermsPage() {
  return <LegalPlaceholderPage title="Terms of Website Use" />;
}
