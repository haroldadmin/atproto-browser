import { cachedFetchCollections } from "@/lib/records";
import Link from "next/link";
import LinkSpan from "@/components/link-span";
import { NSID } from "@atproto/syntax";
import { groupBy } from "lodash";
import { ComponentIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

type CollectionsListProps = {
  did: string;
  pds: string;
};

export default async function CollectionsList({
  did,
  pds,
}: CollectionsListProps) {
  const collections = (await cachedFetchCollections({ did, pds })) ?? [];
  if (!collections.length) {
    return (
      <p className="italic text-muted-foreground mt-4">No collections found</p>
    );
  }

  const nsids = collections.map((c) => NSID.from(c));
  const collectionsByAuthority = groupBy(nsids, (nsid) => nsid.authority);

  return (
    <div>
      <h3 className="text-xl font-bold">Collections</h3>
      <ul className="flex flex-col gap-2 mt-4">
        {Object.entries(collectionsByAuthority).map(
          ([authority, collections]) => (
            <div key={authority}>
              <div className="flex flex-row items-center gap-2">
                <ComponentIcon className="size-3 stroke-muted-foreground" />
                <h4 className="text-sm text-muted-foreground font-mono">
                  {authority} ({collections.length})
                </h4>
              </div>
              <ul className="flex flex-col gap-1 my-2">
                {collections.map((collection) => (
                  <li key={collection.toString()}>
                    <Link href={`/at/${did}/${collection}`}>
                      <LinkSpan>{collection.toString()}</LinkSpan>
                    </Link>
                  </li>
                ))}
              </ul>
              <Separator className="my-2" />
            </div>
          ),
        )}
      </ul>
    </div>
  );
}
