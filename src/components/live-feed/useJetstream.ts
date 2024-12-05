import { collector, mapped, sampled } from "@/lib/streams/transforms";
import { streamMessages } from "@/lib/streams/web-socket";
import { AppBskyFeedPost } from "@atproto/api";
import { concat } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { useDocumentVisibility } from "./useDocumentVisibility";

const hosts = [
  "jetstream1.us-east.bsky.network", // US-East
  "jetstream2.us-east.bsky.network", // US-East
  "jetstream1.us-west.bsky.network", // US-West
  "jetstream2.us-west.bsky.network", // US-West
] as const;

function getRandomHost() {
  return hosts[Math.floor(Math.random() * hosts.length)];
}

function getJetstreamUrl() {
  const host = getRandomHost();
  const jetstreamUrl = new URL("subscribe", `wss://${host}`);
  jetstreamUrl.searchParams.append("wantedCollections", "app.bsky.feed.post");

  return jetstreamUrl;
}

export type JetstreamPost = {
  record: AppBskyFeedPost.Record;
  rkey: string;
  cid: string;
  did: string;
  collection: string;
};

export function useJetstream(sampleRate: number, bufferSize: number) {
  const [paused, setPaused] = useState(false);
  const [posts, setPosts] = useState<JetstreamPost[]>([]);

  const isVisible = useDocumentVisibility();

  const togglePause = useCallback(() => {
    setPaused((paused) => !paused);
  }, []);

  const onNewPost = useCallback(
    (post: JetstreamPost | undefined) => {
      if (post) {
        setPosts((posts) => concat(post, posts.slice(0, bufferSize)));
      }
    },
    [bufferSize]
  );

  useEffect(() => {
    if (!isVisible || paused) {
      return;
    }

    const controller = new AbortController();
    const ws = new WebSocket(getJetstreamUrl());

    streamMessages(ws)
      .pipeThrough(sampled(sampleRate))
      .pipeThrough(mapped(extractPost))
      .pipeTo(collector(onNewPost), { signal: controller.signal });

    return () => controller.abort();
  }, [isVisible, sampleRate, paused, onNewPost]);

  return { posts, paused, togglePause };
}

function extractPost(message: MessageEvent): JetstreamPost | undefined {
  if (!message.data) {
    return undefined;
  }

  const data = JSON.parse(message.data);
  if (data.kind !== "commit") {
    return undefined;
  }

  if (data.commit.operation !== "create") {
    return undefined;
  }

  const record = data.commit.record;
  if (!record || !AppBskyFeedPost.isRecord(record)) {
    return undefined;
  }

  return {
    record,
    rkey: data.commit.rkey,
    did: data.did,
    cid: data.commit.cid,
    collection: data.commit.collection,
  };
}
