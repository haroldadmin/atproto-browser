import RecordsList from "@/components/records-list";
import { cachedResolveDidDoc } from "@/lib/did";
import { getPds } from "@atproto/identity";
import { notFound } from "next/navigation";

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ did: string; collection: string }>;
}) {
  const { did, collection } = await params;
  const doc = await cachedResolveDidDoc(decodeURIComponent(did));
  if (!doc) {
    notFound();
  }

  const pds = getPds(doc);
  if (!pds) {
    notFound();
  }

  return (
    <RecordsList
      did={decodeURIComponent(did)}
      collection={decodeURIComponent(collection)}
      pds={pds}
    />
  );
}
