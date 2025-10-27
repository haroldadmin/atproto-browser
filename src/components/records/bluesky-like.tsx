import { atUriToBrowserUri } from "@/lib/uris";
import { AppBskyFeedLike, AppBskyFeedPost, AtUri } from "@atproto/api";
import Link from "next/link";
import { Suspense, use } from "react";
import { cachedFetchRecord } from "../../lib/records";
import LinkSpan from "../link-span";
import BlueskyPostRecord from "./bluesky-post";

export default function BlueskyLikeRecord({
  record,
  pds,
}: {
  record: AppBskyFeedLike.Record;
  pds: string;
}) {
  const subjectUri = new AtUri(record.subject.uri);
  const browserUri = atUriToBrowserUri(subjectUri);

  return (
    <div className="space-y-4">
      Liked{" "}
      <Link href={browserUri}>
        <LinkSpan>{subjectUri.rkey}</LinkSpan>
      </Link>
      <Suspense fallback={<p>Loading post...</p>}>
        <EmbeddedPost uri={subjectUri} pds={pds} />
      </Suspense>
    </div>
  );
}

type EmbeddedPostProps = {
  uri: AtUri;
  pds: string;
};

function EmbeddedPost({ uri, pds }: EmbeddedPostProps) {
  const post = use(
    cachedFetchRecord({
      did: uri.host,
      collection: uri.collection,
      rkey: uri.rkey,
      pds,
    }),
  );

  if (!AppBskyFeedPost.isRecord(post.value)) {
    return null;
  }

  const validation = AppBskyFeedPost.validateRecord(post.value);
  if (!validation.success) {
    throw new Error(`Invalid ${post.value.$type} record`);
  }

  return <BlueskyPostRecord record={validation.value} showReplies={false} />;
}
