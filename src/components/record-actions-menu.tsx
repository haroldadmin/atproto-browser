"use client";

import { toast } from "sonner";
import type { JsonValue } from "@atproto/lex-json";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCallback, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { deleteRecordAction } from "@/actions/deleteRecord";

export type RecordActionsMenuProps = {
  pds: string;
  did: string;
  collection: string;
  rkey: string;
  cid?: string;
  record: JsonValue;
  sessionDid?: string;
};

export function RecordActionsMenu({
  pds,
  did,
  collection,
  rkey,
  record,
  cid,
  sessionDid,
}: RecordActionsMenuProps) {
  const [isDeleting, startDeleteRecord] = useTransition();

  const onCopy = useCallback(async () => {
    const recordText = JSON.stringify(record, null, 2);
    await window.navigator.clipboard.write([
      new ClipboardItem({
        "text/plain": recordText,
      }),
    ]);
  }, [record]);

  const onDelete = useCallback(() => {
    startDeleteRecord(async () => {
      try {
        await deleteRecordAction(did, collection, rkey);
      } catch (error) {
        let message = "Failed to delete record";
        if (error instanceof Error) {
          message += ": " + error.message;
        }
        toast.error(message);
      }
    });
  }, [did, collection, rkey]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <MenuIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
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
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {sessionDid !== undefined && (
          <DropdownMenuGroup>
            <DropdownMenuItem
              disabled={did === sessionDid || isDeleting}
              onClick={onDelete}
            >
              <span className="text-destructive">Delete</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        )}
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
