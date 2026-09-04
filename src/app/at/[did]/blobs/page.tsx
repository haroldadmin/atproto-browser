import BlobsList from "@/components/blobs-list";
import { cachedResolveDidDoc } from "@/lib/did";
import { getPds } from "@atproto/identity";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ATPathCrumbs from "@/components/at-path-crumbs";
import { AtUri } from "@atproto/syntax";
import ListSkeleton from "@/components/list-skeleton";

export type BlobsPageParams = {
  did: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<BlobsPageParams>;
}): Promise<Metadata> {
  const { did } = await params;
  return {
    title: `Blobs - ${decodeURIComponent(did)}`,
  };
}

export default function BlobsPage({
  params,
}: {
  params: Promise<BlobsPageParams>;
}) {
  return (
    <Suspense fallback={<ListSkeleton rows={5} />}>
      <BlobsPageContent params={params} />
    </Suspense>
  );
}

async function BlobsPageContent({
  params,
}: {
  params: Promise<BlobsPageParams>;
}) {
  const { did } = await params;

  const doc = await cachedResolveDidDoc(decodeURIComponent(did));
  if (!doc) {
    notFound();
  }

  const pds = getPds(doc);
  if (!pds) {
    notFound();
  }

  return (
    <div>
      <ATPathCrumbs aturi={AtUri.make(doc.id).toString()} />
      <BlobsList did={doc.id} pds={pds} />
    </div>
  );
}
