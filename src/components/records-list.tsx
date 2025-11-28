"use client";

import { atUriToBrowserUri } from "@/lib/uris";
import { AtUri } from "@atproto/api";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import LinkSpan from "./link-span";
import { useGenerator } from "@/hooks/useGenerator";
import { generateRecords } from "@/lib/records";

type RecordsListProps = {
  did: string;
  collection: string;
  pds: string;
};

export default function RecordsList({
  did,
  collection,
  pds,
}: RecordsListProps) {
  const {
    generate,
    items: records,
    hasMore,
    loading,
  } = useGenerator(() => generateRecords(did, collection, pds));

  const { ref, inView } = useInView({
    skip: !hasMore || loading,
  });

  useEffect(() => {
    if (!inView || loading || !hasMore) {
      return;
    }

    generate();
  }, [inView, loading, records, hasMore, generate]);

  return (
    <div>
      <ul className="space-y-2">
        {records.map((record) => (
          <RecordItem key={record.cid} recordUri={record.uri} />
        ))}
        {hasMore && <LoaderCircle ref={ref} className="animate-spin" />}
      </ul>
      {!hasMore && (
        <p className="text-sm text-gray-500 mt-4">No more records</p>
      )}
    </div>
  );
}

function RecordItem({ recordUri }: { recordUri: string }) {
  const atUri = new AtUri(recordUri);
  const browserUri = atUriToBrowserUri(atUri);

  return (
    <li>
      <Link href={browserUri} prefetch={false}>
        <LinkSpan>{atUri.rkey}</LinkSpan>
      </Link>
    </li>
  );
}
