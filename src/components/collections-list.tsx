import { cachedFetchCollections } from "@/lib/records";
import { Bookmark } from "lucide-react";
import Link from "next/link";
import { use } from "react";
import LinkSpan from "./link-span";

type CollectionsListProps = {
  did: string;
  pds: string;
};

export default function CollectionsList({ did, pds }: CollectionsListProps) {
  const collections = use(cachedFetchCollections({ did, pds }));

  return (
    <div>
      <h3 className="text-xl font-bold">Collections</h3>
      <ul className="flex flex-col gap-2 mt-4">
        {collections.map((collection) => (
          <li className="flex flex-row items-center gap-2" key={collection}>
            <Bookmark className="w-4 h-4 mt-1" />
            <Link href={`/at/${did}/${collection}`}>
              <LinkSpan>{collection}</LinkSpan>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
