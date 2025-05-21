import { codeToHtml } from "shiki";

export default async function RawRecord({ record }: { record: object }) {
  const code = JSON.stringify(record, null, 2);
  const highlightedHtml = await codeToHtml(code, {
    lang: "json",
    theme: "github-dark-default",
  });

  return (
    <div
      className="prose dark:prose-invert"
      dangerouslySetInnerHTML={{ __html: highlightedHtml }}
    />
  );
}
