"use client";

import Image from "next/image";

export function BskyAvatar({
  avatarCID,
  mimeType,
  did,
}: {
  avatarCID: string;
  mimeType: string;
  did: string;
}) {
  const [type] = mimeType.split("/");
  if (type !== "image") {
    return null;
  }

  const url = new URL(
    `/img/avatar/plain/${decodeURIComponent(did)}/${avatarCID}@jpeg`,
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
