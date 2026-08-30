"use client";

import type { JsonValue } from "@atproto/lex-json";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import Link from "next/link";

export type RecordActionsMenuProps = {
  pds: string;
  did: string;
  collection: string;
  rkey: string;
  cid?: string;
  record: JsonValue;
};

export function RecordActionsMenu({
  pds,
  did,
  collection,
  rkey,
  record,
  cid,
}: RecordActionsMenuProps) {
  const onCopy = useCallback(async () => {
    const recordText = JSON.stringify(record, null, 2);
    await window.navigator.clipboard.write([
      new ClipboardItem({
        "text/plain": recordText,
      }),
    ]);
  }, [record]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <MenuIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={onCopy}>Copy</DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            href={recordDownloadUrl(pds, did, collection, rkey, cid)}
            target="_blank"
            referrerPolicy="no-referrer"
          >
            Download
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function recordDownloadUrl(
  pds: string,
  did: string,
  collection: string,
  rkey: string,
  cid?: string,
): URL {
  const url = new URL(`/xrpc/com.atproto.sync.getRecord`, pds);
  url.searchParams.append("did", did);
  url.searchParams.append("collection", collection);
  url.searchParams.append("rkey", rkey);

  if (cid) {
    url.searchParams.append("cid", cid);
  }

  return url;
}
