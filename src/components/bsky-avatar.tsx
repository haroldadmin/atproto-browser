"use client";

import { TypedJsonBlobRef } from "@atproto/lexicon";
import Image from "next/image";

export function BskyAvatar({
  avatar,
  did,
}: {
  avatar: TypedJsonBlobRef | undefined;
  did: string;
}) {
  if (!avatar || !did) {
    return null;
  }

  const [type] = avatar.mimeType.split("/");
  if (type !== "image") {
    return null;
  }

  const url = new URL(
    `/img/avatar/plain/${decodeURIComponent(did)}/${avatar.ref.$link}@jpeg`,
    "https://cdn.bsky.app",
  );

  return (
    <Image
      className="rounded-full"
      width={100}
      height={100}
      src={url.toString()}
      alt="User avatar"
      unoptimized
    />
  );
}
