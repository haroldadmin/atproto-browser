"use client";

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useParams } from "next/navigation";

type PathParams = {
  did: string;
  collection?: string;
  rkey?: string;
};

export default function ATPathCrumbs() {
  const { did, collection, rkey } = useParams<PathParams>();

  return (
    <Breadcrumb className="my-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href={`/at/${did}`}>
            {decodeURIComponent(did)}
          </BreadcrumbLink>
        </BreadcrumbItem>
        {collection && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/at/${did}/${collection}`}>
                {decodeURIComponent(collection)}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        )}
        {rkey && collection && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/at/${did}/${collection}/${rkey}`}>
                {decodeURIComponent(rkey)}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
