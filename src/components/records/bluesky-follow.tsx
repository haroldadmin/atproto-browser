import LinkSpan from "@/components/link-span";
import { AppBskyGraphFollow } from "@atproto/api";
import Link from "next/link";
import { Suspense, use } from "react";
import { cachedFetchProfile } from "@/lib/records";
import { BskyAvatar } from "../bsky-avatar";

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "full",
});

export default function BlueskyFollowRecord({
  record,
  pds,
}: {
  record: AppBskyGraphFollow.Record;
  pds: string;
}) {
  return (
    <div>
      <p className="text-sm italic text-gray-300 my-2">
        {dateFormatter.format(new Date(record.createdAt))}
      </p>
      <p>
        Followed{" "}
        <Link href={`/at/${record.subject}`}>
          <LinkSpan>{record.subject}</LinkSpan>
        </Link>{" "}
      </p>
      <Suspense fallback={<p>Loading profile...</p>}>
        <EmbeddedProfile did={record.subject} pds={pds} />
      </Suspense>
    </div>
  );
}

function EmbeddedProfile({ did, pds }: { did: string; pds: string }) {
  const profile = use(cachedFetchProfile(did, pds));

  return (
    <div className="flex flex-row gap-4 my-8">
      {profile.avatar && (
        <BskyAvatar
          avatarCID={profile.avatar.ref.toString()}
          mimeType={profile.avatar.mimeType}
          did={did}
        />
      )}
      <div className="flex flex-col justify-center max-w-lg">
        <h3 className="my-0">{profile.displayName}</h3>
        <p className="mb-0 mt-1">{profile.description}</p>
      </div>
    </div>
  );
}
