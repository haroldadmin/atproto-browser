"use client";

import { atUriToBrowserUri } from "@/lib/uris";
import { Agent, AtUri } from "@atproto/api";
import { concat } from "lodash";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import LinkSpan from "./link-span";

async function* generateRecords(
  did: string,
  collection: string,
  pds: string,
  cursor?: string
) {
  if (!cursor) {
    return;
  }

  const agent = new Agent(pds);

  const res = await agent.com.atproto.repo.listRecords({
    repo: did,
    collection,
    cursor,
  });
  cursor = res.data.cursor;

  if (res.data.records.length === 0) {
    return;
  }

  yield res.data.records.map((r) => r.uri);
}

type RecordsListProps = {
  initialData: string[];
  cursor?: string;
  did: string;
  collection: string;
  pds: string;
};

export default function RecordsList({
  initialData,
  cursor,
  did,
  collection,
  pds,
}: RecordsListProps) {
  const [recordUris, setRecordUris] = useState(initialData);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const { ref, inView } = useInView({
    skip: !hasMore || loading,
  });

  const generator = useRef(generateRecords(did, collection, pds, cursor));

  useEffect(() => {
    if (!inView || loading || !hasMore) {
      return;
    }

    setLoading(true);

    generator.current
      .next()
      .then((next) => {
        if (next.done) {
          setHasMore(false);
          return;
        }

        setRecordUris(concat(recordUris, next.value));
      })
      .catch(() => {
        setHasMore(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [inView, loading, recordUris, hasMore]);

  return (
    <div>
      <ul className="space-y-2">
        {recordUris.map((recordUri) => (
          <RecordItem key={recordUri} recordUri={recordUri} />
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
