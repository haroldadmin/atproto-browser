import LinkSpan from "@/components/link-span";
import BlueskyFollowRecord from "@/components/records/bluesky-follow";
import BlueskyLikeRecord from "@/components/records/bluesky-like";
import { resolveDidDoc } from "@/lib/did";
import { extractPDSUrl, fetchRecord } from "@/lib/records";
import {
  AppBskyFeedLike,
  AppBskyFeedPost,
  AppBskyGraphFollow,
  AtUri,
} from "@atproto/api";
import Link from "next/link";
import { notFound } from "next/navigation";
import BlueskyPostRecord from "../../../../../components/records/bluesky-post";

export default async function RecordPage({
  params,
}: {
  params: Promise<{ did: string; collection: string; rkey: string }>;
}) {
  const { did, collection, rkey } = await params;

  const doc = await resolveDidDoc(decodeURIComponent(did));
  if (!doc) {
    notFound();
  }

  const pds = extractPDSUrl(doc);
  if (!pds) {
    notFound();
  }

  const record = await fetchRecord({
    pds,
    did: doc.id,
    collection: decodeURIComponent(collection),
    rkey: decodeURIComponent(rkey),
  });

  if (!record) {
    notFound();
  }

  if (AppBskyGraphFollow.isRecord(record.value)) {
    return <BlueskyFollowRecord record={record.value} />;
  }

  if (AppBskyFeedLike.isRecord(record.value)) {
    return <BlueskyLikeRecord record={record.value} />;
  }

  if (AppBskyFeedPost.isRecord(record.value)) {
    return <BlueskyPostRecord record={record.value} />;
  }

  return <pre>{JSON.stringify(record, null, 2)}</pre>;
}

function RecordUri({ uri }: { uri: string }) {
  const parsedUri = new AtUri(uri);

  return (
    <Link
      href={`/at/${parsedUri.host}/${parsedUri.collection}/${parsedUri.rkey}`}
    >
      <LinkSpan>{uri}</LinkSpan>
    </Link>
  );
}
