import { AtUri } from "@atproto/api";
import { join } from "lodash";
import type { ShikiTransformer } from "shiki";
import { visit } from "unist-util-visit";

export function atUriToBrowserUri(uri: AtUri): string {
  const { host, collection, rkey } = uri;
  const segments = join([host, collection, rkey], "/");
  return `/at/${segments}`;
}

/**
 * A Shiki transform to make AT URIs clickable in syntax
 * highlighted code.
 */
export const AtUriTransformer: ShikiTransformer = {
  name: "at-uri-linker",
  line: (node) => {
    visit(node, ["text"], (element, _, parent) => {
      if (element.type !== "text") {
        return;
      }

      if (!element.value.startsWith(`"at://`)) {
        return;
      }

      const uri = parseATURI(element.value.replaceAll(`"`, ""));
      if (!uri || !parent) {
        return;
      }

      parent.children = [
        {
          type: "element",
          tagName: "a",
          children: [element],
          properties: {
            class: "underline-offset-4 text-accent dark:text-foreground",
            href: atUriToBrowserUri(uri),
          },
        },
      ];
    });
  },
};

function parseATURI(value: string): AtUri | undefined {
  try {
    return new AtUri(value);
  } catch {
    return undefined;
  }
}
