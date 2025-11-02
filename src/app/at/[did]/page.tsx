import CollectionsList from "@/components/collections-list";
import { Download} from "lucide-react"
import DIDDocument from "@/components/did-document";
import RawRecord from "@/components/raw-record";
import { Separator } from "@/components/ui/separator";
import { cachedResolveDidDoc } from "@/lib/did";
import { extractPDSUrl } from "@/lib/records";
import { notFound } from "next/navigation";
import Link from "next/link"
import { Button } from "@/components/ui/button";

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
      <div className="flex flex-row justify-between items-center gap-4">
      <h1 className="text-4xl font-bold">Repository</h1>
        <Link href={`/at/${did}/export`} target='_blank'>
          <Button variant='ghost'>
            <Download/>
            Export
          </Button>
        </Link>
    </div>
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
