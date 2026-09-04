import RecordsList from "@/components/records-list";
import { cachedResolveDidDoc } from "@/lib/did";
import { getPds } from "@atproto/identity";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ATPathCrumbs from "@/components/at-path-crumbs";
import { AtUri } from "@atproto/syntax";
import ListSkeleton from "@/components/list-skeleton";

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ did: string; collection: string }>;
}) {
  return (
    <Suspense fallback={<ListSkeleton rows={5} />}>
      <CollectionPageContent params={params} />
    </Suspense>
  );
}

async function CollectionPageContent({
  params,
}: {
  params: Promise<{ did: string; collection: string }>;
}) {
  const { did: uriEncodedDid, collection: uriEncodedCollection } = await params;

  const did = decodeURIComponent(uriEncodedDid);
  const collection = decodeURIComponent(uriEncodedCollection);

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
      <ATPathCrumbs aturi={AtUri.make(did, collection).toString()} />
      <RecordsList
        did={decodeURIComponent(did)}
        collection={decodeURIComponent(collection)}
        pds={pds}
      />
    </div>
  );
}
