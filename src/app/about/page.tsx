import LinkSpan from "@/components/link-span";
import Link from "next/link";

export default function About() {
  return (
    <section className="max-w-lg">
      <article className="space-y-4">
        <p>
          ATProto browser is an experimental tool to browse files stored on the
          decentralised social media protocol{" "}
          <Link
            href="https://atproto.com"
            target="_blank"
            referrerPolicy="no-referrer"
          >
            <LinkSpan>ATProto</LinkSpan>
          </Link>
          , similar to the existing tool{" "}
          <Link
            href="https://atproto-browser.vercel.app"
            target="_blank"
            referrerPolicy="no-referrer"
          >
            <LinkSpan>atproto-browser</LinkSpan>
          </Link>
          .
        </p>
        <p>
          This tool is not affiliated with{" "}
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
          It is a side project that I build in my spare time to help me learn
          more about the protocol, and decentralised social media.
        </p>
        <p>
          If you like this tool, please consider contributing to the project on{" "}
          <Link
            href="https://github.com/haroldadmin/atproto-browser"
            target="_blank"
            referrerPolicy="no-referrer"
          >
            <LinkSpan>GitHub</LinkSpan>
          </Link>
          , and follow me on Bluesky{" "}
          <Link
            href="https://bsky.app/profile/haroldadmin.com"
            target="_blank"
            referrerPolicy="no-referrer"
          >
            <LinkSpan>@haroldadmin.com</LinkSpan>
          </Link>
        </p>
      </article>
    </section>
  );
}
