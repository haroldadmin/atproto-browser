import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import LinkSpan from "../link-span";
import { JetstreamPost } from "./useJetstream";

type FeedItemProps = {
  post: JetstreamPost;
};

export function FeedItem({ post }: FeedItemProps) {
  return (
    <div className="space-y-0">
      <PostText text={post.record.text} />
      <Link href={`/at/${post.did}/${post.collection}/${post.rkey}`}>
        <LinkSpan className="text-xs">See post</LinkSpan>
      </Link>
    </div>
  );
}

export function FeedItemSkeleton() {
  return (
    <div className="space-y-1">
      <Skeleton className="w-full h-4" />
      <Skeleton className="w-1/2 h-4" />
    </div>
  );
}

function PostText({ text }: { text: string }) {
  if (!text) {
    return <p className="text-sm text-gray-400">&lt;&lt; No text &gt;&gt;</p>;
  }

  return <p className="line-clamp-1 text-gray-300">{text}</p>;
}
