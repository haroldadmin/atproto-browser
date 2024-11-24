import { resolveDidDoc } from "@/lib/did";

export default async function DIDPage({
  params,
}: {
  params: Promise<{ did: string }>;
}) {
  const { did: encodedDid } = await params;
  const did = decodeURIComponent(encodedDid);
  const didDoc = await resolveDidDoc(did);

  return <div>{JSON.stringify(didDoc, null, 2)}</div>;
}
