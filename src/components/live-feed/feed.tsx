"use client";

import { Separator } from "@/components/ui/separator";
import clsx from "clsx";
import { Radio } from "lucide-react";
import { useContext } from "react";
import FeedProvider, { FeedContext } from "./feed-context";
import { FeedItem, FeedItemSkeleton } from "./feed-item";
import FeedSettings from "./feed-settings";
import { useJetstream } from "./useJetstream";

export default function LiveFeed() {
  return (
    <FeedProvider>
      <div className="max-w-lg">
        <FeedHeader />
        <FeedStatus />
        <Separator className="my-4" />
        <FeedPosts />
      </div>
    </FeedProvider>
  );
}

function FeedHeader() {
  const { settings, setActive } = useContext(FeedContext);

  return (
    <div className="flex flex-row gap-2 items-center">
      <button onClick={() => setActive(!settings.active)}>
        <Radio
          aria-label={settings.active ? "Pause" : "Resume"}
          className={clsx(
            !settings.active && "text-gray-300",
            settings.active && "animate-pulse text-blue-500"
          )}
        />
      </button>
      <FeedSettings />
      <div className="flex flex-row gap-2 items-center">
        <h2 className="text-lg font-bold">Live feed</h2>
      </div>
    </div>
  );
}

function FeedStatus() {
  const { settings } = useContext(FeedContext);
  return (
    <div className="mt-4">
      {settings.active ? (
        <p className="text-sm text-gray-700 dark:text-gray-400 italic">
          Sampling at {Math.floor(settings.samplingRate * 100)}%
        </p>
      ) : (
        <p className="text-sm text-gray-700 dark:text-gray-400 italic">
          Paused
        </p>
      )}
    </div>
  );
}

function FeedPosts() {
  const { settings } = useContext(FeedContext);

  const { posts } = useJetstream(
    settings.samplingRate,
    settings.bufferSize,
    settings.active,
    settings.host
  );

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
