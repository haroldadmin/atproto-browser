import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { findBlobCIDs } from "@/lib/shiki/transformers";
import { createBlobURL } from "@/lib/uris";
import { lexToJson } from "@atproto/api";
import { ExternalLinkIcon } from "lucide-react";
import { CID } from "multiformats";
import Link from "next/link";

export type RecordMetadataProps = {
  cid: string | undefined;
  did: string;
  pds: string;
  record: object;
};

export default function RecordMetadata({
  did,
  pds,
  cid,
  record,
}: RecordMetadataProps) {
  const { $type } = record as Record<string, unknown>;
  let stringifiedType: string;
  if (typeof $type === "string" && $type.length > 0) {
    stringifiedType = $type;
  } else {
    stringifiedType = "unknown";
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <span className="font-bold text-muted-foreground">Metadata</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <span className="font-mono text-muted-foreground">$type</span>
            </TableCell>
            <TableCell>
              <span className="font-mono">{stringifiedType}</span>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <span className="font-mono text-muted-foreground">cid</span>
            </TableCell>
            <TableCell>
              {cid !== undefined ? (
                <Link
                  target="_blank"
                  referrerPolicy="no-referrer"
                  href={cidInspectionUrl(cid).toString()}
                >
                  <div className="flex flex-row items-center gap-2">
                    <ExternalLinkIcon className="size-3" />
                    <p className="font-mono text-sm underline">{cid}</p>
                  </div>
                </Link>
              ) : (
                <span>unknown</span>
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Blobs</TableCell>
            <TableCell>
              <BlobsCell did={did} pds={pds} record={record} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

function BlobsCell({
  record,
  did,
  pds,
}: {
  record: object;
  did: string;
  pds: string;
}) {
  const jsonRecord = lexToJson(record) as Record<string, unknown>;
  const blobs = findBlobCIDs(jsonRecord);

  if (!blobs.length) {
    return <p>No blobs</p>;
  }

  return <BlobsList cids={blobs} did={did} pds={pds} />;
}

function BlobsList({
  cids,
  did,
  pds,
}: {
  cids: string[];
  did: string;
  pds: string;
}) {
  if (!cids.length) {
    return null;
  }

  return (
    <ul>
      {cids.map((cid) => {
        const url = createBlobURL(CID.parse(cid), did, pds);
        return (
          <li key={cid}>
            <Link
              href={url.toString()}
              target="_blank"
              referrerPolicy="no-referrer"
            >
              <div className="flex flex-row items-center gap-2">
                <ExternalLinkIcon className="size-3" />
                <span className="underline underline-offset-4">{cid}</span>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function cidInspectionUrl(cid: string): URL {
  const url = new URL("https://cid.ipfs.tech");
  url.hash = cid;

  return url;
}
