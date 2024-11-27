import { AppBskyGraphFollow } from "@atproto/api";
import Link from "next/link";
import LinkSpan from "@/components/link-span";

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "full",
});

export default function BlueskyFollowRecord({
  record,
}: {
  record: AppBskyGraphFollow.Record;
}) {
  return (
    <div>
      <p>
        Followed{" "}
        <Link href={`/at/${record.subject}`}>
          <LinkSpan>{record.subject}</LinkSpan>
        </Link>{" "}
        on {dateFormatter.format(new Date(record.createdAt))}
      </p>
      <p></p>
    </div>
  );
}
