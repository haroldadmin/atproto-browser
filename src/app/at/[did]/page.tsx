import LinkSpan from "@/components/link-span";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { resolveDidDoc } from "@/lib/did";
import { DidDocument } from "@atproto/identity";
import { CircleAlert, Library } from "lucide-react";
import Link from "next/link";
import { extractPDSUrl, fetchCollections } from "../../../lib/pds";

export default async function DIDPage({
  params,
}: {
  params: Promise<{ did: string }>;
}) {
  const { did } = await params;
  const doc = await resolveDidDoc(decodeURIComponent(did));

  return (
    <section>
      {!doc && <UnresolvedDID />}
      {doc && <DIDDoc doc={doc} />}
    </section>
  );
}

function UnresolvedDID() {
  return (
    <Alert variant="destructive">
      <CircleAlert />
      <AlertTitle>Could not resolve DID</AlertTitle>
      <AlertDescription>
        The DID or handle you entered could not be resolved.
      </AlertDescription>
    </Alert>
  );
}

type DIDDocProps = {
  doc: DidDocument;
};

async function DIDDoc({ doc }: DIDDocProps) {
  const pdsUrl = extractPDSUrl(doc);
  if (!pdsUrl) {
    throw new Error("PDS URL not found");
  }

  const collections = await fetchCollections({
    did: doc.id,
    pds: pdsUrl,
  });

  return <Collections did={doc.id} collections={collections} />;
}

async function Collections({
  did,
  collections,
}: {
  did: string;
  collections: string[];
}) {
  return (
    <div>
      <h2 className="text-muted-foreground font-mono my-2">at://{did}</h2>
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
