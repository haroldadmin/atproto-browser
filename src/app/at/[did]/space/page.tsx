import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";
import Link from "next/link";

export default function SpacePage() {
  return (
    <Alert className="max-w-lg">
      <AlertTitle className="flex flex-row gap-2 items-center">
        <Info className="h-3 w-3" />
        <p className="font-semibold">Spaces are not currently supported</p>
      </AlertTitle>
      <AlertDescription>
        We&apos;re working on adding support for ATProto Spaces.{" "}
        <Link
          target="_blank"
          referrerPolicy="no-referrer"
          href="https://bsky.app/profile/atproto-browser.dev"
        >
          <span className="text-blue-500 underline">Follow</span>
        </Link>{" "}
        us for development updates!
      </AlertDescription>
    </Alert>
  );
}
