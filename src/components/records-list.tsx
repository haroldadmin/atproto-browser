"use client";

import { Agent, AtUri } from "@atproto/api";
import type { Record } from "@atproto/api/dist/client/types/com/atproto/repo/listRecords";
import { concat } from "lodash";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import LinkSpan from "./link-span";

async function* recordsGenerator<T extends Record>(
  did: string,
  collection: string,
  pds: string,
  cursor?: string
) {
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

  yield res.data.records as T[];
}

type RecordsListProps<T extends Record> = {
  initialData: T[];
  cursor?: string;
  did: string;
  collection: string;
  pds: string;
};

export default function RecordsList<T extends Record>({
  initialData,
  cursor,
  did,
  collection,
  pds,
}: RecordsListProps<T>) {
  const [records, setRecords] = useState(initialData);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const { ref, inView } = useInView({
    skip: !hasMore || loading,
  });

  const generator = useRef(recordsGenerator<T>(did, collection, pds, cursor));

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

        setRecords(concat(records, next.value));
      })
      .catch(() => {
        setHasMore(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [inView, loading, records]);

  return (
    <div>
      <ul className="space-y-2">
        {records.map((record) => (
          <RecordItem key={record.uri} record={record} />
        ))}
        {hasMore && <LoaderCircle ref={ref} className="animate-spin" />}
      </ul>
      {!hasMore && (
        <p className="text-sm text-gray-500 mt-4">No more records</p>
      )}
    </div>
  );
}

function RecordItem<T extends Record>({ record }: { record: T }) {
  const { rkey, host, collection } = new AtUri(record.uri);

  return (
    <li key={record.cid}>
      <Link href={`/at/${host}/${collection}/${rkey}`}>
        <LinkSpan>{rkey}</LinkSpan>
      </Link>
    </li>
  );
}
