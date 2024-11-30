"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <NavigationMenu className="my-4">
      <NavigationMenuList className="flex flex-row gap-4">
        <NavigationMenuItem>
          <NavigationLink href="/">Home</NavigationLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationLink href="/about">About</NavigationLink>
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

  return (
    <Link href={href}>
      <p
        className={clsx(
          "text-sm text-gray-400 hover:underline",
          pathname === href && "text-gray-50 pointer-events-none"
        )}
      >
        {children}
      </p>
    </Link>
  );
}
