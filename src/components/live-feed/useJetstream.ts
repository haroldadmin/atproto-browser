import { collector, filtered, mapped, sampled } from "@/lib/streams/transforms";
import { streamMessages } from "@/lib/streams/web-socket";
import { AppBskyFeedPost } from "@atproto/api";
import { concat } from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDocumentVisibility } from "./useDocumentVisibility";

export const hosts = [
  "jetstream1.us-east.bsky.network", // US-East
  "jetstream2.us-east.bsky.network", // US-East
  "jetstream1.us-west.bsky.network", // US-West
  "jetstream2.us-west.bsky.network", // US-West
] as const;

function getJetstreamUrl(host: (typeof hosts)[number]) {
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

function createFilter(query: string) {
  try {
    const regex = new RegExp(query, "i");
    return (post: JetstreamPost | undefined): boolean => {
      if (!post) {
        return false;
      }

      return regex.test(post.record.text);
    };
  } catch {
    return (post: JetstreamPost | undefined): boolean => {
      if (!post) {
        return false;
      }

      return post.record.text.includes(query);
    };
  }
}

export function useJetstream(
  sampleRate: number,
  bufferSize: number,
  active: boolean,
  host: (typeof hosts)[number],
  filterQuery: string = ""
) {
  const isVisible = useDocumentVisibility();
  const [posts, setPosts] = useState<JetstreamPost[]>([]);

  const postFilter = useMemo(() => createFilter(filterQuery), [filterQuery]);

  const onNewPost = useCallback(
    (post: JetstreamPost | undefined) => {
      if (post) {
        setPosts((posts) => concat(post, posts.slice(0, bufferSize)));
      }
    },
    [bufferSize]
  );

  useEffect(() => {
    if (!active || !isVisible) {
      return;
    }

    const controller = new AbortController();
    const ws = new WebSocket(getJetstreamUrl(host));

    streamMessages(ws)
      .pipeThrough(sampled(sampleRate))
      .pipeThrough(mapped(extractPost))
      .pipeThrough(filtered(postFilter))
      .pipeTo(collector(onNewPost), { signal: controller.signal });

    return () => controller.abort();
  }, [active, isVisible, sampleRate, onNewPost, host, postFilter]);

  return { posts };
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
