"use client";

import { Section } from "@/components/ui/Section";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Section>
      <Alert tone="danger" title="Something went wrong">
        An unexpected error occurred while loading this page. You can try
        again, or contact us directly if the problem continues.
      </Alert>
      <Button className="mt-4" onClick={() => reset()}>
        Try again
      </Button>
    </Section>
  );
}
