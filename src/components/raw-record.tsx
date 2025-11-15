import { codeToHtml } from "shiki";
import { AtUriTransformer } from "@/lib/uris";

export default async function RawRecord({ record }: { record: object }) {
  const code = JSON.stringify(record, null, 2);
  const highlightedHtml = await codeToHtml(code, {
    lang: "json",
    theme: "github-dark-default",
    transformers: [AtUriTransformer],
  });

  return (
    <div
      className="prose dark:prose-invert"
      dangerouslySetInnerHTML={{ __html: highlightedHtml }}
    />
  );
}
