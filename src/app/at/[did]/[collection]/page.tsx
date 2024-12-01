import RecordsList from "@/components/records-list";
import { cachedResolveDidDoc } from "@/lib/did";
import { cachedFetchRecords, extractPDSUrl } from "@/lib/records";
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

  const pds = extractPDSUrl(doc);
  if (!pds) {
    notFound();
  }

  const { records, cursor } = await cachedFetchRecords({
    did: doc.id,
    collection,
    pds,
  });

  return (
    <RecordsList
      initialData={records}
      did={decodeURIComponent(did)}
      collection={decodeURIComponent(collection)}
      pds={pds}
      cursor={cursor}
    />
  );
}
