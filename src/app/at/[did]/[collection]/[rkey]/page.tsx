import RawRecord from "@/components/raw-record";
import BlueskyFollowRecord from "@/components/records/bluesky-follow";
import BlueskyLikeRecord from "@/components/records/bluesky-like";
import BlueskyPostRecord from "@/components/records/bluesky-post";
import BlueskyProfileRecord from "@/components/records/bluesky-profile";
import { Separator } from "@/components/ui/separator";
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
    <div>
      <RecordWrapper value={record.value} pds={pds} did={did} />
      <Separator className="my-4" />
      <RawRecord record={record.value} />
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
    const validation = AppBskyGraphFollow.validateRecord(value);
    if (!validation.success) {
      throw new Error(`Invalid ${value.$type} record`);
    }

    return <BlueskyFollowRecord record={validation.value} pds={pds} />;
  }

  if (AppBskyFeedLike.isRecord(value)) {
    const validation = AppBskyFeedLike.validateRecord(value);
    if (!validation.success) {
      throw new Error(`Invalid ${value.$type} record`);
    }

    return <BlueskyLikeRecord record={validation.value} pds={pds} />;
  }

  if (AppBskyFeedPost.isRecord(value)) {
    const validation = AppBskyFeedPost.validateRecord(value);
    if (!validation.success) {
      throw new Error(`Invalid ${value.$type} record`);
    }

    return <BlueskyPostRecord record={validation.value} />;
  }

  if (AppBskyActorProfile.isRecord(value)) {
    const validation = AppBskyActorProfile.validateRecord(value);
    if (!validation.success) {
      throw new Error(`Invalid ${value.$type} record`);
    }

    return <BlueskyProfileRecord record={validation.value} did={did} />;
  }

  return null;
}
