import LinkSpan from "@/components/link-span";
import Link from "next/link";

export default function About() {
  return (
    <section className="max-w-xl prose dark:prose-invert">
      <article className="space-y-4">
        <p>
          ATProto Browser is an experimental tool to browse files stored on the
          decentralised social media protocol{" "}
          <Link
            href="https://atproto.com"
            target="_blank"
            referrerPolicy="no-referrer"
          >
            <LinkSpan>ATProto</LinkSpan>
          </Link>
          . This tool is <strong>NOT</strong> affiliated with{" "}
          <Link
            as="a"
            href="https://bluesky.social"
            target="_blank"
            referrerPolicy="no-referrer"
          >
            <LinkSpan>Bluesky</LinkSpan>
          </Link>
          .
        </p>
        <p>
          If you like this project, please consider{" "}
          <Link
            href="https://github.com/haroldadmin/atproto-browser"
            target="_blank"
            referrerPolicy="no-referrer"
          >
            <LinkSpan>contributing</LinkSpan>
          </Link>
          .
        </p>

        <p></p>
      </article>
    </section>
  );
}
