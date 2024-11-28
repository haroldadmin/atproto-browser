import LinkSpan from "@/components/link-span";
import { cachedResolveDidDoc } from "@/lib/did";
import { cachedFetchCollections, extractPDSUrl } from "@/lib/records";
import { Library } from "lucide-react";
import Link from "next/link";
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

  const collections = await cachedFetchCollections({
    did: doc.id,
    pds: pdsUrl,
  });

  return (
    <div>
      <ul className="flex flex-col gap-2">
        {collections.map((collection) => (
          <li className="flex flex-row items-center gap-2" key={collection}>
            <Library />
            <Link href={`/at/${did}/${collection}`}>
              <LinkSpan>{collection}</LinkSpan>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
