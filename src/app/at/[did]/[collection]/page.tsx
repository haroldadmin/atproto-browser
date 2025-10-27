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

  const result = await cachedFetchRecords({
    did: doc.id,
    collection,
    pds,
  });

  if (!result) {
    notFound();
  }

  return (
    <RecordsList
      initialData={result.records.map((r) => r.uri)}
      did={decodeURIComponent(did)}
      collection={decodeURIComponent(collection)}
      pds={pds}
      cursor={result.cursor}
    />
  );
}
