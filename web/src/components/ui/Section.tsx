import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";

export function Section({
  className,
  containerClassName,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement> & { containerClassName?: string }) {
  return (
    <section className={cn("py-12 sm:py-16", className)} {...props}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
