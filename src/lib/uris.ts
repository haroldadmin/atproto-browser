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

      const uri = parseATURI(unquote(element.value));
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

/**
 * DID rules:
 * - Must start with "did:"
 * - Must have a method name
 * - Must have an identifier
 * - Must not end with ":"
 * @see https://www.w3.org/TR/did-core/#did-syntax
 */
const DID_REGEX = /^did:[a-z]+:[a-zA-Z0-9._:%-]*[a-zA-Z0-9._%-]$/;

/**
 * A Shiki transformer to make DIDs clickable in syntax
 * highlighted code.
 */
export const DidTransformer: ShikiTransformer = {
  name: "did-linker",
  line: (node) => {
    visit(node, ["text"], (element, _, parent) => {
      if (element.type !== "text") {
        return;
      }

      if (!parent) {
        return;
      }

      const isDid = DID_REGEX.test(unquote(element.value));
      if (!isDid) {
        return;
      }

      const didUri = `/at/${unquote(element.value)}`;

      parent.children = [
        {
          type: "element",
          tagName: "a",
          children: [element],
          properties: {
            class: "underline-offset-4 text-accent dark:text-foreground",
            href: didUri,
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

function unquote(value: string): string {
  if (!value.length) {
    return value;
  }

  if (value === `"`) {
    return "";
  }

  let start = 0;
  let end = value.length;
  if (value.startsWith(`"`)) {
    start = 1;
  }

  if (value.endsWith(`"`)) {
    end = value.length - 1;
  }

  return value.slice(start, end);
}
