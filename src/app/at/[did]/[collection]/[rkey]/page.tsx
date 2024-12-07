import BlueskyFollowRecord from "@/components/records/bluesky-follow";
import BlueskyLikeRecord from "@/components/records/bluesky-like";
import BlueskyPostRecord from "@/components/records/bluesky-post";
import BlueskyProfileRecord from "@/components/records/bluesky-profile";
import { cachedResolveDidDoc } from "@/lib/did";
import { cachedFetchRecord, extractPDSUrl } from "@/lib/records";
import {
  AppBskyActorProfile,
  AppBskyFeedLike,
  AppBskyFeedPost,
  AppBskyGraphFollow,
} from "@atproto/api";
import { notFound } from "next/navigation";

export default async function RecordPage({
  params,
}: {
  params: Promise<{ did: string; collection: string; rkey: string }>;
}) {
  const { did, collection, rkey } = await params;

  const doc = await cachedResolveDidDoc(decodeURIComponent(did));
  if (!doc) {
    notFound();
  }

  const pds = extractPDSUrl(doc);
  if (!pds) {
    notFound();
  }

  const record = await cachedFetchRecord({
    pds,
    did: doc.id,
    collection: decodeURIComponent(collection),
    rkey: decodeURIComponent(rkey),
  });

  if (!record) {
    notFound();
  }

  return (
    <div className="space-y-4">
      <RecordWrapper value={record.value} pds={pds} did={did} />
      <pre className="prose dark:prose-invert text-sm overflow-auto">
        {JSON.stringify(record, null, 2)}
      </pre>
    </div>
  );
}

function RecordWrapper({
  value,
  pds,
  did,
}: {
  value: unknown;
  pds: string;
  did: string;
}) {
  if (AppBskyGraphFollow.isRecord(value)) {
    return <BlueskyFollowRecord record={value} pds={pds} />;
  }

  if (AppBskyFeedLike.isRecord(value)) {
    return <BlueskyLikeRecord record={value} pds={pds} />;
  }

  if (AppBskyFeedPost.isRecord(value)) {
    return <BlueskyPostRecord record={value} />;
  }

  if (AppBskyActorProfile.isRecord(value)) {
    return <BlueskyProfileRecord record={value} did={did} />;
  }

  return null;
}
