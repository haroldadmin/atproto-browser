"use client";

import { toast } from "sonner";
import type { JsonValue } from "@atproto/lex-json";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCallback, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { deleteRecordAction } from "@/actions/deleteRecord";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

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
              variant="destructive"
              disabled={did !== sessionDid}
              onSelect={(e) => e.preventDefault()}
            >
              <DeleteRecordDialog
                did={did}
                collection={collection}
                rkey={rkey}
              />
            </DropdownMenuItem>
          </DropdownMenuGroup>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function DeleteRecordDialog({
  did,
  collection,
  rkey,
}: {
  did: string;
  collection: string;
  rkey: string;
}) {
  const router = useRouter();
  const [isDeleting, startDeleteRecord] = useTransition();

  const onDelete = useCallback(() => {
    startDeleteRecord(async () => {
      try {
        await deleteRecordAction(did, collection, rkey);
        toast.success(`${rkey} deleted`);
        router.push(`/at/${did}/${collection}`);
      } catch (error) {
        let message = "Failed to delete record";
        if (error instanceof Error) {
          message += ": " + error.message;
        }
        toast.error(message);
      }
    });
  }, [did, collection, rkey, router]);

  return (
    <Dialog>
      <DialogTrigger>Delete</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete record</DialogTitle>
          <DialogDescription className="py-4">
            Are you sure you want to delete {rkey} from this repository? This
            action is irreversible.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={onDelete}
            disabled={isDeleting}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
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
