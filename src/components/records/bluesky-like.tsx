import { AppBskyFeedLike, AppBskyFeedPost, AtUri } from "@atproto/api";
import Link from "next/link";
import LinkSpan from "../link-span";
import { cachedFetchRecord } from "../../lib/records";
import { Suspense, use } from "react";
import BlueskyPostRecord from "./bluesky-post";

export default function BlueskyLikeRecord({
  record,
  pds,
}: {
  record: AppBskyFeedLike.Record;
  pds: string;
}) {
  const subjectUri = new AtUri(record.subject.uri);
  return (
    <div>
      Liked{" "}
      <Link
        href={`/at/${subjectUri.host}/${subjectUri.collection}/${subjectUri.rkey}`}
      >
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
    })
  );

  if (!AppBskyFeedPost.isRecord(post.value)) {
    return null;
  }

  return <BlueskyPostRecord record={post.value} />;
}
