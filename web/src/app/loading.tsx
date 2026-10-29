import { Container } from "@/components/ui/Container";
import {
  LoadingRegion,
  PropertyCardSkeleton,
  Skeleton,
} from "@/components/ui/Skeleton";

/** Route-level loading state: page-shaped skeleton, announced once. */
export default function Loading() {
  return (
    <Container size="wide" className="py-10">
      <LoadingRegion label="Loading page…">
        <Skeleton className="h-8 w-1/3" />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <PropertyCardSkeleton />
          <PropertyCardSkeleton />
          <PropertyCardSkeleton />
        </div>
      </LoadingRegion>
    </Container>
  );
}
