import { describe, it, expect } from "vitest";
import { atUriToBrowserUri } from "./uris";
import { AtUri } from "@atproto/api";

describe(atUriToBrowserUri, () => {
  it.each([
    { aturi: AtUri.make("did:plc:test").toString(), uri: "/at/did:plc:test" },
    {
      aturi: AtUri.make("did:plc:test", "collection.test").toString(),
      uri: "/at/did:plc:test/collection.test",
    },
    {
      aturi: AtUri.make(
        "did:plc:test",
        "collection.test",
        "testrkey",
      ).toString(),
      uri: `/at/did:plc:test/collection.test/testrkey`,
    },
  ])("should convert $aturi to $uri", ({ aturi, uri }) => {
    const parsedAtUri = new AtUri(aturi);
    expect(atUriToBrowserUri(parsedAtUri).toString()).toEqual(uri);
  });
});
