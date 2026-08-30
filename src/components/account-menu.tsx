"use client";

import { UserIcon } from "lucide-react";
import { getHandle } from "@atproto/common-web";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { DidDocument } from "@atproto/identity";
import { useLogout } from "@/hooks/useLogout";

export type AccountMenuProps = {
  did: DidDocument;
};

export default function AccountMenu({ did }: AccountMenuProps) {
  const router = useRouter();

  const [logout, isLoggingOut] = useLogout();

  const onViewRepo = useCallback(() => {
    router.push(`/at/${did.id}`);
  }, [router, did]);

  const handle = getHandle(did);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" disabled={isLoggingOut}>
          {handle ? (
            <span className="text-sm md:text-base font-semibold max-w-20 truncate">
              @{handle}
            </span>
          ) : (
            <>
              <UserIcon className="size-4" />
              <span>Account</span>{" "}
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={onViewRepo}>
          View repository
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout} disabled={isLoggingOut}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
