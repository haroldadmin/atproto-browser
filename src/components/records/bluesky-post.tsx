import {
  Accordion,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cachedResolveDidDoc } from "@/lib/did";
import { cachedFetchRecord, extractPDSUrl } from "@/lib/records";
import { AppBskyFeedPost, AtUri } from "@atproto/api";
import { AccordionItem } from "@radix-ui/react-accordion";
import { Info, Reply } from "lucide-react";
import Link from "next/link";
import { use } from "react";
import LinkSpan from "../link-span";

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
});

export default function BlueskyPostRecord({
  record,
  depth = 0,
}: {
  record: AppBskyFeedPost.Record;
  depth?: number;
}) {
  return (
    <div>
      <div className="prose dark:prose-invert">
        <h4>Post</h4>
        <blockquote>
          <p>{record.text}</p>
        </blockquote>
        <p className="text-sm font-light">
          {dateFormatter.format(new Date(record.createdAt))}
        </p>
      </div>
      {record.reply?.parent && <ReplyParent record={record} depth={depth} />}
    </div>
  );
}

function ReplyParent({
  record,
  depth,
}: {
  record: AppBskyFeedPost.Record;
  depth: number;
}) {
  if (depth > 4 && record.reply?.parent) {
    const { host, collection, rkey } = new AtUri(record.reply.parent.uri);

    return (
      <Alert className="my-4">
        <AlertTitle>
          <div className="flex flex-row items-center gap-2">
            <Info className="h-3 w-3" />
            More replies available
          </div>
        </AlertTitle>
        <AlertDescription className="ml-5">
          Visit the{" "}
          <Link href={`/at/${host}/${collection}/${rkey}`}>
            <LinkSpan>parent</LinkSpan>
          </Link>{" "}
          of this post to view more replies.
        </AlertDescription>
      </Alert>
    );
  }

  if (!record.reply?.parent) {
    return null;
  }

  const { host, collection, rkey } = new AtUri(record.reply.parent.uri);
  if (collection !== "app.bsky.feed.post") {
    return null;
  }

  const didDoc = use(cachedResolveDidDoc(host));
  if (!didDoc) {
    return null;
  }

  const pdsUrl = extractPDSUrl(didDoc);
  if (!pdsUrl) {
    return null;
  }

  const post = use(
    cachedFetchRecord({
      did: host,
      collection,
      rkey,
      pds: pdsUrl,
    })
  );

  if (!AppBskyFeedPost.isRecord(post.value)) {
    return null;
  }

  return (
    <Accordion className="border-t px-4 mt-4" type="single" collapsible>
      <AccordionItem value={post.uri}>
        <AccordionTrigger>
          <p className="flex flex-row items-center gap-1 text-muted-foreground">
            <Reply className="h-3 w-3" />
            <span>In reply to </span>
            <Link href={`/at/${host}/${collection}/${rkey}`}>
              <LinkSpan>{rkey}</LinkSpan>
            </Link>
          </p>
        </AccordionTrigger>
        <AccordionContent className="ml-2">
          <BlueskyPostRecord record={post.value} depth={depth + 1} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
