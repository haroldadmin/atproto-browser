"use client";

import clsx from "clsx";
import { Radio } from "lucide-react";
import Link from "next/link";
import LinkSpan from "../link-span";
import FeedItem from "./feed-item";
import { useJetstream } from "./useJetstream";

type LiveFeedProps = {
  sampleRate: number;
  displayedPosts: number;
};

export default function LiveFeed({
  sampleRate,
  displayedPosts,
}: LiveFeedProps) {
  const { posts, paused, togglePause } = useJetstream(
    sampleRate,
    displayedPosts
  );

  return (
    <div className="max-w-lg">
      <div className="flex flex-row gap-2 items-center">
        <Radio
          className={clsx(
            paused && "text-gray-300",
            !paused && "animate-pulse text-blue-500"
          )}
          onClick={togglePause}
        />
        <div>
          <h2 className="text-lg font-bold">Firehose</h2>
          <p className="text-sm text-gray-400">
            Live posts from the Bluesky{" "}
            <Link
              href="https://github.com/bluesky-social/jetstream"
              target="_blank"
            >
              <LinkSpan>Jetstream</LinkSpan>
            </Link>
          </p>
        </div>
      </div>
      <ul className="flex flex-col gap-4 py-4">
        {posts.map(({ record, rkey }) => (
          <li key={rkey}>
            <FeedItem post={record} />
          </li>
        ))}
      </ul>
      <div className="mt-4">
        {paused ? (
          <p className="text-sm text-gray-400 italic">Paused</p>
        ) : (
          <p className="text-sm text-gray-400 italic">
            Sampling at {Math.round(sampleRate * 100)}%
          </p>
        )}
      </div>
    </div>
  );
}
