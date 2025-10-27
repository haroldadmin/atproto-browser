import { BskyAvatar } from "@/components/bsky-avatar";
import { AppBskyActorProfile } from "@atproto/api";
import { differenceInDays } from "date-fns/differenceInDays";
import { parseISO } from "date-fns/parseISO";

export default function BlueskyProfileRecord({
  record,
  did,
}: {
  record: AppBskyActorProfile.Record;
  did: string;
}) {
  return (
    <div className="prose dark:prose-invert py-4">
      <div className="flex flex-row gap-4">
        <BskyAvatar avatar={record.avatar?.toJSON()} did={did} />
        <div className="flex flex-col justify-center">
          <h3 className="my-0">{record.displayName}</h3>
          <p className="mb-0 mt-1">{record.description}</p>
        </div>
      </div>
      <JoiningDate date={record.createdAt} />
    </div>
  );
}

function JoiningDate({ date }: { date: string | undefined }) {
  if (!date) {
    return null;
  }

  const daysSinceJoined = differenceInDays(parseISO(date), new Date());

  return (
    <p className="my-0">
      Joined {new Intl.RelativeTimeFormat().format(daysSinceJoined, "days")}
    </p>
  );
}
