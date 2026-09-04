import ATPathCrumbs from "@/components/at-path-crumbs";
import RecordMetadata from "@/components/record-metadata";
import BlueskyFollowRecord from "@/components/records/bluesky-follow";
import BlueskyLikeRecord from "@/components/records/bluesky-like";
import BlueskyPostRecord from "@/components/records/bluesky-post";
import BlueskyProfileRecord from "@/components/records/bluesky-profile";
import RecordViewer from "@/components/record-viewer";
import { cachedResolveDidDoc } from "@/lib/did";
import { cachedFetchRecord } from "@/lib/records";
import {
  AppBskyActorProfile,
  AppBskyFeedLike,
  AppBskyFeedPost,
  AppBskyGraphFollow,
  AtUri,
} from "@atproto/api";
import { getPds } from "@atproto/identity";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { LoaderCircleIcon } from "lucide-react";

export default async function RecordPage({
  params,
}: {
  params: Promise<{ did: string; collection: string; rkey: string }>;
}) {
  return (
    <Suspense fallback={<LoaderCircleIcon className="animate-spin" />}>
      <RecordPageContent params={params} />
    </Suspense>
  );
}

async function RecordPageContent({
  params,
}: {
  params: Promise<{ did: string; collection: string; rkey: string }>;
}) {
  const {
    did: uriEncodedDid,
    collection: uriEncodedCollection,
    rkey: uriEncodedRkey,
  } = await params;
  const did = decodeURIComponent(uriEncodedDid);
  const collection = decodeURIComponent(uriEncodedCollection);
  const rkey = decodeURIComponent(uriEncodedRkey);

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
    collection,
    rkey,
  });

  if (!record) {
    notFound();
  }

  return (
    <div>
      <ATPathCrumbs aturi={AtUri.make(did, collection, rkey).toString()} />
      <div className="grid grid-cols-1 md:grid-cols-5 gap-x-8 md:gap-x-16 gap-y-8">
        <div className="col-span-1 md:col-span-2 space-y-8">
          <RecordMetadata
            did={doc.id}
            pds={pds}
            cid={record.cid}
            record={record.value as object}
          />
          <RecordWrapper did={did} pds={pds} value={record} />
        </div>
        <div className="col-span-1 md:col-span-3">
          <RecordViewer
            pds={pds}
            did={doc.id}
            collection={collection}
            rkey={rkey}
            record={record.value as object}
          />
        </div>
      </div>
    </div>
  );
}

function RecordWrapper({
  did,
  pds,
  value,
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
