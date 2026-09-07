"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // user cancelled the native share sheet — fall through to copy
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — no-op, the visitor can copy the URL manually
    }
  }

  return (
    <Button type="button" variant="secondary" onClick={handleShare}>
      {copied ? "Link copied" : "Share this property"}
    </Button>
  );
}
