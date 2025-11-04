import { listBlobs } from "@/lib/blobs";
import { ArrowRight, File } from "lucide-react";
import Link from "next/link";
import LinkSpan from "./link-span";

export type BlobsListProps = {
  did: string;
  pds: string;
};

export default async function BlobsList({ did, pds }: BlobsListProps) {
  const blobs = await listBlobs({ pds, did, limit: 20 });
  return (
    <div>
      <div className="flex flex-row items-center gap-8">
        <h3 className="text-xl font-bold">Blobs</h3>
      </div>
      {blobs.length > 0 && (
        <ul className="flex flex-col gap-2 mt-4">
          {blobs.map((cid) => (
            <li className="flex flex-row items-center gap-2" key={cid}>
              <File className="w-4 h-4 mt-1" />
              <Link href={`/at/${did}/blobs/${cid}`}>
                <LinkSpan>{cid}</LinkSpan>
              </Link>
            </li>
          ))}
          <p className="text-sm hover:underline mt-4">
            <Link href={`/at/${did}/blobs`}>
              View all <ArrowRight className="w-4 h-4 inline ml-1 mb-0.5" />
            </Link>
          </p>
        </ul>
      )}
      {blobs.length === 0 && (
        <p className="italic text-muted-foreground mt-4">No blobs found</p>
      )}
    </div>
  );
}
