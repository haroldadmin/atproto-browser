"use client";

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { zip } from "lodash";
import { usePathname } from "next/navigation";
import { Fragment, useMemo } from "react";

function getPathComponents(pathname: string): string[] {
  return pathname.split("/").filter((component) => component.length > 0);
}

/**
 * Takes a pathname  and converts it into a list of pathnames
 * that progressively include more components.
 *
 * @example Input: "/at/did-foo/collection-bar/record-baz"
 * Output: ["/at/", "/at/did-foo", "/at/did-foo/collection-bar", "/at/did-foo/collection-bar/record-baz"]
 */
function createProgressivePaths(pathname: string): string[] {
  const components = getPathComponents(pathname);
  const recursiveLinks: string[] = [];
  for (let i = 0; i <= components.length; i++) {
    const recursiveLink: string[] = [];

    for (let j = 0; j <= i; j++) {
      const component = components[j];
      recursiveLink.push(`/${component}`);
    }

    recursiveLinks.push(recursiveLink.join(""));
  }

  return recursiveLinks;
}

export default function ATPathCrumbs() {
  const pathname = usePathname();

  const crumbs = useMemo(() => {
    const components = getPathComponents(pathname);
    const recursiveLinks = createProgressivePaths(pathname);

    return zip(components, recursiveLinks)
      .map(([name, link], index, array) => {
        return (
          <Fragment key={name}>
            <BreadcrumbItem>
              <BreadcrumbLink href={link}>
                {decodeURIComponent(name as string)}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {index !== array.length - 2 && <BreadcrumbSeparator />}
          </Fragment>
        );
      })
      .slice(1, -1);
  }, [pathname]);

  return (
    <Breadcrumb className="my-4">
      <BreadcrumbList>{crumbs}</BreadcrumbList>
    </Breadcrumb>
  );
}
