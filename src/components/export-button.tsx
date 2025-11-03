import { Download } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export type ExportButtonProps = {
  did: string;
  pds: string;
};

export default function ExportButton({ did, pds }: ExportButtonProps) {
  const exportUrl = new URL(`/xrpc/com.atproto.sync.getRepo`, pds);
  exportUrl.searchParams.append("did", did);

  return (
    <Link href={exportUrl.toString()} target="_blank">
      <Button variant="ghost">
        <Download />
        Export
      </Button>
    </Link>
  );
}
