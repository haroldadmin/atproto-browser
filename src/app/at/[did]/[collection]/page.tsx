import LinkSpan from "@/components/link-span";
import { cachedResolveDidDoc } from "@/lib/did";
import { cachedFetchRecords, extractPDSUrl } from "@/lib/records";
import { AtUri } from "@atproto/syntax";
import Link from "next/link";
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

  const records = await cachedFetchRecords({ did: doc.id, collection, pds });
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
