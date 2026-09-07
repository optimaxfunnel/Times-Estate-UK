import type { Metadata } from "next";
import { LegalPlaceholderPage } from "@/components/layout/LegalPlaceholderPage";

export const metadata: Metadata = { title: "Cookie Policy" };

export default function CookiePolicyPage() {
  return <LegalPlaceholderPage title="Cookie Policy" />;
}
