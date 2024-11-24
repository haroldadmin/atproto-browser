import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { resolveDidDoc } from "@/lib/did";
import { DidDocument } from "@atproto/identity";
import { CircleAlert } from "lucide-react";

export default async function DIDPage({
  params,
}: {
  params: Promise<{ did: string }>;
}) {
  const { did: encodedDid } = await params;
  const did = decodeURIComponent(encodedDid);

  const didDoc = await resolveDidDoc(did);

  return (
    <section className="max-w-lg">
      {!didDoc && <UnresolvedDID />}
      {didDoc && <DIDDoc doc={didDoc} />}
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

function DIDDoc({ doc }: DIDDocProps) {
  return <pre>{JSON.stringify(doc, null, 2)}</pre>;
}
