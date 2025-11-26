import { codeToHtml } from "shiki";
import {
  AtUriTransformer,
  BlobLinkTransformer,
  DidTransformer,
} from "@/lib/shiki/transformers";

export default async function RawRecord({
  record,
  did,
  pds,
}: {
  record: object;
  did: string;
  pds: string;
}) {
  const code = JSON.stringify(record, null, 2);
  const highlightedHtml = await codeToHtml(code, {
    lang: "json",
    theme: "github-dark-default",
    transformers: [
      AtUriTransformer,
      DidTransformer,
      BlobLinkTransformer(did, pds),
    ],
  });

  return (
    <div
      className="prose dark:prose-invert"
      dangerouslySetInnerHTML={{ __html: highlightedHtml }}
    />
  );
}
