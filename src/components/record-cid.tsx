import { ExternalLink } from "lucide-react";
import Link from "next/link";

export default function RecordCID({ cid }: { cid: string }) {
  const inspectUrl = new URL("https://cid.ipfs.tech/");
  inspectUrl.hash = cid;

  return (
    <div className="my-4">
      <Link
        target="_blank"
        referrerPolicy="no-referrer"
        href={inspectUrl.toString()}
      >
        <div className="border border-dashed p-2 rounded-md flex items-center gap-2 max-w-fit">
          <h2 className="font-bold text-sm">CID</h2>
          <p className="font-mono text-sm underline overflow-hidden">{cid}</p>
          <ExternalLink className="h-4 w-4 mb-0.5" />
        </div>
      </Link>
    </div>
  );
}
