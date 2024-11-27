import { AppBskyFeedPost } from "@atproto/api";

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "full",
});

export default function BlueskyPostRecord({
  record,
}: {
  record: AppBskyFeedPost.Record;
}) {
  return (
    <div className="prose dark:prose-invert">
      <blockquote>
        <p>{record.text}</p>
      </blockquote>
      <p className="mt-4 italic">
        Posted on {dateFormatter.format(new Date(record.createdAt))}
      </p>
    </div>
  );
}
