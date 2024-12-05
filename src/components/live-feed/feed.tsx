"use client";

import { Separator } from "@/components/ui/separator";
import clsx from "clsx";
import { Info, Radio } from "lucide-react";
import Link from "next/link";
import LinkSpan from "../link-span";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import { FeedItem, FeedItemSkeleton } from "./feed-item";
import { JetstreamPost, useJetstream } from "./useJetstream";

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
      <FeedHeader paused={paused} togglePause={togglePause} />
      <FeedStatus paused={paused} sampleRate={sampleRate} />
      <Separator className="my-4" />
      <FeedPosts posts={posts} />
    </div>
  );
}

type FeedHeaderProps = {
  paused: boolean;
  togglePause: () => void;
};

function FeedHeader({ paused, togglePause }: FeedHeaderProps) {
  return (
    <div className="flex flex-row gap-2 items-center">
      <button onClick={togglePause}>
        <Radio
          aria-label={paused ? "Resume" : "Pause"}
          className={clsx(
            paused && "text-gray-300",
            !paused && "animate-pulse text-blue-500"
          )}
        />
      </button>
      <Popover>
        <PopoverTrigger>
          <div className="flex flex-row gap-2 items-center">
            <h2 className="text-lg font-bold">Firehose</h2>
            <PopoverAnchor>
              <Info className="h-4 w-4" />
            </PopoverAnchor>
          </div>
        </PopoverTrigger>
        <PopoverContent className="mx-12 my-4">
          <div className="prose dark:prose-invert">
            <h4>What is this?</h4>
            <p className="text-sm">
              The firehose is a live stream of posts from the Bluesky network,
              built on top of{" "}
              <Link
                href="https://github.com/bluesky-social/jetstream"
                target="_blank"
              >
                <LinkSpan>Jetstream</LinkSpan>
              </Link>
              .
            </p>
            <p className="text-sm">
              Jetstream produces hundreds of commits every second. We sample the
              stream of updates to keep things manageable.
            </p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

type FeedStatusProps = {
  paused: boolean;
  sampleRate: number;
};

function FeedStatus({ paused, sampleRate }: FeedStatusProps) {
  return (
    <div className="mt-4">
      {paused ? (
        <p className="text-sm text-gray-700 dark:text-gray-400 italic">
          Paused
        </p>
      ) : (
        <p className="text-sm text-gray-700 dark:text-gray-400 italic">
          Sampling at {Math.round(sampleRate * 100)}%
        </p>
      )}
    </div>
  );
}

type FeedPostsProps = {
  posts: JetstreamPost[];
};

function FeedPosts({ posts }: FeedPostsProps) {
  if (!posts.length) {
    return <FeedItemSkeleton />;
  }

  return (
    <ul className="flex flex-col gap-4">
      {posts.map((post) => (
        <li key={post.rkey}>
          <FeedItem post={post} />
        </li>
      ))}
    </ul>
  );
}
