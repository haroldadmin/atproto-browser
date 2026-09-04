import { Skeleton } from "@/components/ui/skeleton";
import { range } from "lodash";

type ListSkeletonProps = {
  rows: number;
};

export default function ListSkeleton({ rows }: ListSkeletonProps) {
  return (
    <ul className="flex flex-col gap-2 max-w-2xl">
      {range(0, rows).map((row) => (
        <li key={row}>
          <Skeleton className="h-4" />
        </li>
      ))}
    </ul>
  );
}
