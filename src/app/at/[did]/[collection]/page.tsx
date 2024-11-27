import LinkSpan from "@/components/link-span";
import { cachedResolveDidDoc, resolveDidDoc } from "@/lib/did";
import { extractPDSUrl, fetchRecords } from "@/lib/records";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AtUri } from "@atproto/syntax";

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

  const records = await fetchRecords({ did: doc.id, collection, pds });
  return (
    <div>
      <ul className="space-y-2">
        {records.map((r) => {
          const uri = new AtUri(r.uri);
          return (
            <li key={r.cid}>
              <Link href={`/at/${did}/${collection}/${uri.rkey}`}>
                <LinkSpan>{uri.rkey}</LinkSpan>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
