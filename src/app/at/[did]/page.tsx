import CollectionsList from "@/components/collections-list";
import DIDDocument from "@/components/did-document";
import RawRecord from "@/components/raw-record";
import { Separator } from "@/components/ui/separator";
import { cachedResolveDidDoc } from "@/lib/did";
import { extractPDSUrl } from "@/lib/records";
import { notFound } from "next/navigation";

export default async function CollectionsPage({
  params,
}: {
  params: Promise<{ did: string }>;
}) {
  const { did } = await params;
  const doc = await cachedResolveDidDoc(decodeURIComponent(did));
  if (!doc) {
    notFound();
  }

  const pdsUrl = extractPDSUrl(doc);
  if (!pdsUrl) {
    notFound();
  }

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 my-4">
        <CollectionsList did={doc.id} pds={pdsUrl} />
        <div className="col-span-1 lg:col-span-2">
          <DIDDocument didDocument={doc} />
        </div>
      </div>
      <Separator className="my-4" />
      <RawRecord record={doc} />
    </div>
  );
}
