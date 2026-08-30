import RawRecord from "@/components/raw-record";
import RecordCID from "@/components/record-cid";
import BlueskyFollowRecord from "@/components/records/bluesky-follow";
import BlueskyLikeRecord from "@/components/records/bluesky-like";
import BlueskyPostRecord from "@/components/records/bluesky-post";
import BlueskyProfileRecord from "@/components/records/bluesky-profile";
import { cachedResolveDidDoc } from "@/lib/did";
import { cachedFetchRecord } from "@/lib/records";
import {
  AppBskyActorProfile,
  AppBskyFeedLike,
  AppBskyFeedPost,
  AppBskyGraphFollow,
} from "@atproto/api";
import { getPds } from "@atproto/identity";
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

  const pds = getPds(doc);
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

  const wrapped = RecordWrapper(record.value, pds, did);

  return (
    <div className="flex flex-col md:flex-row flex-wrap md:flex-nowrap gap-x-8 gap-y-4">
      {wrapped && <div className="flex-1">{wrapped}</div>}
      <div className="grow">
        {record.cid && <RecordCID cid={record.cid} />}
        <RawRecord record={record.value} did={doc.id} pds={pds} />
      </div>
    </div>
  );
}

function RecordWrapper(value: unknown, pds: string, did: string) {
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
