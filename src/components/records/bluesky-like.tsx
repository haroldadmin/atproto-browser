import { AppBskyFeedLike, AtUri } from "@atproto/api";
import Link from "next/link";
import LinkSpan from "../link-span";

export default function BlueskyLikeRecord({
  record,
}: {
  record: AppBskyFeedLike.Record;
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
    </div>
  );
}
