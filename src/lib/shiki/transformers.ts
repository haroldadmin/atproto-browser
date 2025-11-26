import { CID } from "multiformats/cid";
import { h } from "hastscript";
import type { ShikiTransformer } from "shiki";
import { atUriToBrowserUri, createBlobURL } from "../uris";
import { visit } from "unist-util-visit";
import { isObject } from "lodash";
import { AtUri } from "@atproto/api";

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
        h(
          "a",
          {
            href: atUriToBrowserUri(uri),
            class: "underline-offset-4 text-accent dark:text-foreground",
          },
          [element],
        ),
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
        h(
          "a",
          {
            class: "underline-offset-4 text-accent dark:text-foreground",
            href: didUri,
          },
          [element],
        ),
      ];
    });
  },
};

/**
 * A Shiki transform to make Blob CIDs clickable in syntax
 * highlighted code. Extracts all CIDs in the code block
 * in the `preprocess` step, and formats them correctly
 * when visiting each `line`.
 */
export const BlobLinkTransformer: (
  did: string,
  pds: string,
) => ShikiTransformer = (did, pds) => {
  let cids: string[] = [];

  return {
    name: "blob-linker",
    preprocess: (code) => {
      try {
        cids = findBlobCIDs(JSON.parse(code));
      } catch {
        cids = [];
      }
    },
    line: (node) => {
      if (!cids.length) {
        return;
      }

      visit(node, ["text"], (element, _, parent) => {
        if (element.type !== "text") {
          return;
        }

        if (!parent) {
          return;
        }

        const value = unquote(element.value);
        if (!cids.includes(value)) {
          return;
        }

        parent.children = [
          h(
            "a",
            {
              class: "underline-offset-4 text-accent dark:text-foreground",
              target: "_blank",
              href: createBlobURL(CID.parse(value), did, pds).toString(),
            },
            [element],
          ),
        ];
      });
    },
  };
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

function findBlobCIDs(obj: object): string[] {
  const cids: string[] = [];
  const queue = [obj];

  while (queue.length) {
    const current = queue.shift();
    if (!isObject(current)) {
      continue;
    }

    if (!isPossiblyBlobRef(current)) {
      Object.values(current).forEach((val) => queue.push(val));
      continue;
    }

    cids.push(current.ref.$link);
  }

  return cids;
}

function isPossiblyBlobRef(
  data: unknown,
): data is { $type: "blob"; ref: { $link: string } } {
  if (typeof data !== "object") {
    return false;
  }

  if (!data) {
    return false;
  }

  const $type = Object.getOwnPropertyDescriptor(data, "$type")?.value;
  if ($type !== "blob") {
    return false;
  }

  const ref = Object.getOwnPropertyDescriptor(data, "ref")?.value;
  if (!ref) {
    return false;
  }

  const $link = Object.getOwnPropertyDescriptor(ref, "$link")?.value;
  if (typeof $link !== "string") {
    return false;
  }

  return true;
}
