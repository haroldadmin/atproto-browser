import { BskyAvatar } from "@/components/bsky-avatar";
import { AppBskyActorProfile } from "@atproto/api";
import { Temporal } from "temporal-polyfill";

export default function BlueskyProfileRecord({
  record,
  did,
}: {
  record: AppBskyActorProfile.Record;
  did: string;
}) {
  return (
    <div className="py-4">
      <div className="flex flex-row items-center gap-4 mb-4">
        {record.avatar && (
          <BskyAvatar
            avatarCID={record.avatar.ref.toString()}
            mimeType={record.avatar.mimeType}
            did={did}
          />
        )}
        <div>
          <h3 className="text-lg font-bold">{record.displayName}</h3>
          <p className="mt-1">{record.description}</p>
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

  const joinedAt = Temporal.Instant.from(date)
    .toZonedDateTimeISO("UTC")
    .toPlainDate();

  const today = Temporal.Now.plainDateISO();

  return (
    <p className="my-0">
      Joined{" "}
      {new Intl.RelativeTimeFormat().format(joinedAt.since(today).days, "days")}
    </p>
  );
}
