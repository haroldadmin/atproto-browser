import { AppBskyFeedPost } from "@atproto/api";
import { Separator } from "../ui/separator";

type FeedItemProps = {
  post: AppBskyFeedPost.Record;
};

export default function FeedItem({ post }: FeedItemProps) {
  return (
    <div className="space-y-2">
      <PostText text={post.text} />
      <Separator />
    </div>
  );
}

function PostText({ text }: { text: string }) {
  if (!text) {
    return <p className="text-sm text-gray-400">&lt;&lt; No text &gt;&gt;</p>;
  }

  return <p className="line-clamp-1 text-gray-300">{text}</p>;
}
