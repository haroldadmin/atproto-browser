import BlobsList from "@/components/blobs-list";
import { cachedResolveDidDoc } from "@/lib/did";
import { getPds } from "@atproto/identity";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export type BlobsPageParams = {
  did: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<BlobsPageParams>;
}): Promise<Metadata> {
  const { did } = await params;
  return {
    title: `Blobs - ${decodeURIComponent(did)}`,
  };
}

export default async function BlobsPage({
  params,
}: {
  params: Promise<BlobsPageParams>;
}) {
  const { did } = await params;

  const doc = await cachedResolveDidDoc(decodeURIComponent(did));
  if (!doc) {
    notFound();
  }

  const pds = getPds(doc);
  if (!pds) {
    notFound();
  }

  return (
    <div>
      <BlobsList did={doc.id} pds={pds} />
    </div>
  );
}
