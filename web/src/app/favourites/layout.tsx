import type { Metadata } from "next";

/** A visitor's own saved list — nothing here is worth indexing. */
export const metadata: Metadata = {
  title: "Saved Properties",
  robots: { index: false, follow: true },
};

export default function FavouritesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
