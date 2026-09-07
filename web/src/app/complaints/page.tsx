import type { Metadata } from "next";
import { LegalPlaceholderPage } from "@/components/layout/LegalPlaceholderPage";

export const metadata: Metadata = { title: "Complaints Handling Procedure" };

export default function ComplaintsPage() {
  return <LegalPlaceholderPage title="Complaints Handling Procedure" />;
}
