import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { AtUri } from "@atproto/syntax";
import { Fragment, ReactNode, useMemo } from "react";

export type ATPathCrumbsProps = {
  aturi: string;
};

export default function ATPathCrumbs({ aturi }: ATPathCrumbsProps) {
  const crumbs = useMemo(() => {
    const { did, collection, rkey } = AtUri.make(aturi);
    const steps: ReactNode[] = [];

    if (did) {
      const url = `/at/${did}`;
      steps.push(
        <BreadcrumbItem key={url}>
          <BreadcrumbLink href={url}>{did}</BreadcrumbLink>
        </BreadcrumbItem>,
      );
    }

    if (collection) {
      const url = `/at/${did}/${collection}`;
      steps.push(
        <Fragment key={url}>
          <BreadcrumbSeparator />
          <BreadcrumbItem key={collection}>
            <BreadcrumbLink href={url}>{collection}</BreadcrumbLink>
          </BreadcrumbItem>
        </Fragment>,
      );
    }

    if (rkey) {
      const url = `/at/${did}/${collection}/${rkey}`;
      steps.push(
        <Fragment key={url}>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={url}>{rkey}</BreadcrumbLink>
          </BreadcrumbItem>
        </Fragment>,
      );
    }

    return steps;
  }, [aturi]);

  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbList>{crumbs}</BreadcrumbList>
    </Breadcrumb>
  );
}
