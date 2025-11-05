"use client";

import { generateBlobs } from "@/lib/blobs";
import { LoaderCircle, File, ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import LinkSpan from "./link-span";
import { useGenerator } from "@/hooks/useGenerator";

export type BlobsListProps = {
  did: string;
  pds: string;
  limit?: number;
};

export default function BlobsList({ did, pds, limit }: BlobsListProps) {
  const {
    generate,
    items: cids,
    hasMore,
    loading,
  } = useGenerator(() => generateBlobs(did, pds, limit));

  const { ref, inView } = useInView({
    skip: !hasMore || loading,
  });

  useEffect(() => {
    if (!inView || loading || !hasMore) {
      return;
    }

    generate();
  }, [inView, loading, cids, hasMore]);

  return (
    <div>
      <h3 className="text-xl font-bold">Blobs</h3>
      <ul className="flex flex-col gap-2 mt-4">
        {cids.map((cid) => (
          <BlobListItem key={cid} cid={cid} did={did} pds={pds} />
        ))}
        {hasMore && <LoaderCircle ref={ref} className="animate-spin" />}
        {!hasMore && limit === undefined && <p>No more blobs</p>}
        <p className="text-sm mt-2 hover:underline">
          <Link href={`/at/${did}/blobs`}>View all</Link>
          <ArrowRight className="w-4 h-4 mb-0.5 ml-1 inline" />
        </p>
      </ul>
    </div>
  );
}

type BlobListItemProps = {
  cid: string;
  did: string;
  pds: string;
};

function BlobListItem({ cid, did, pds }: BlobListItemProps) {
  const blobUrl = new URL(`/xrpc/com.atproto.sync.getBlob`, pds);
  blobUrl.searchParams.append("did", did);
  blobUrl.searchParams.append("cid", cid);

  return (
    <li className="flex flex-row items-center gap-2">
      <div>
        <File className="w-4 h-4" />
      </div>
      <Link href={blobUrl.toString()}>
        <LinkSpan>{cid}</LinkSpan>
      </Link>
    </li>
  );
}
