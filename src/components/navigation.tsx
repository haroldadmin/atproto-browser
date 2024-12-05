"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import clsx from "clsx";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  return (
    <NavigationMenu className="my-4">
      <NavigationMenuList className="flex flex-row gap-4">
        <NavigationMenuItem>
          <NavigationLink href="/">Home</NavigationLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationLink href="/about">About</NavigationLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationLink href="https://github.com/haroldadmin/atproto-browser">
            Source code
          </NavigationLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationLink href="https://bsky.app/profile/haroldadmin.com">
            Author
          </NavigationLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function NavigationLink({
  href,
  children,
}: React.PropsWithChildren<{ href: string }>) {
  const pathname = usePathname();
  const isExternal = href.startsWith("http");

  return (
    <Link href={href} target={isExternal ? "_blank" : undefined}>
      <p
        className={clsx(
          "text-sm text-gray-600 dark:text-gray-400 hover:underline flex flex-row items-center gap-1",
          pathname === href &&
            "text-gray-900 dark:text-gray-50 pointer-events-none font-bold"
        )}
      >
        {children}
        {isExternal && <ExternalLink className="w-4 h-4" />}
      </p>
    </Link>
  );
}
