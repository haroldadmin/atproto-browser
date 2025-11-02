"use client";

import { Input } from "@/components/ui/input";
import { ListFilter } from "lucide-react";
import { useContext } from "react";
import { FeedContext } from "./feed-context";
import clsx from "clsx";

export default function FeedFilter() {
  const { settings, setFilterQuery } = useContext(FeedContext);

  return (
    <div className="relative my-4">
      <ListFilter
        className={clsx(
          "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4",
          settings.filterQuery && "text-blue-500",
        )}
      />
      <Input
        id="feed-filter"
        type="text"
        placeholder="Filter"
        value={settings.filterQuery}
        disabled={!settings.active}
        onChange={(e) => setFilterQuery(e.target.value)}
        className={clsx(
          "pl-10 shadow-none",
          settings.filterQuery && "border-blue-500 focus:border-blue-500",
        )}
        aria-description="Filter posts by text"
      />
    </div>
  );
}
