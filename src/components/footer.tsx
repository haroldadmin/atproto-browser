import { Separator } from "@/components/ui/separator";
import Navigation from "./navigation";
import LinkSpan from "./link-span";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-8 text-gray-500 text-sm">
      <Separator />
      <Navigation />
      <p>
        &copy; {new Date().getFullYear()}{" "}
        <Link
          href="https://bsky.app/profile/haroldadmin.com"
          target="_blank"
          referrerPolicy="no-referrer"
        >
          <LinkSpan className="text-blue-600">Kshitij Chauhan</LinkSpan>
        </Link>
      </p>
    </footer>
  );
}
