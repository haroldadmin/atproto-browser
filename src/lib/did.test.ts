import { describe, it, expect, vi, beforeEach } from "vitest";
import { resolveDidDoc } from "./did";
import type { DidDocument } from "@atproto/identity";

const fetchMock = vi.fn<typeof fetch>(fetch);

vi.stubGlobal("fetch", fetchMock);

beforeEach(() => {
  vi.clearAllMocks();
});

// TODO: Re-enable once `cacheLife()` works under Vitest. It throws because
// Vitest doesn't load the `cacheComponents` setting from next.config.ts.
describe.skip(resolveDidDoc, () => {
  it("should not resolve a document for an empty string", async () => {
    const doc = await resolveDidDoc("");
    expect(doc).toBeUndefined();
  });

  it("should not resolve a document for an unsupported did method", async () => {
    const doc = await resolveDidDoc("did:test:foobar");
    expect(doc).toBeUndefined();
  });

  describe("did:plc", () => {
    it("should not resolve a document for a malformed did:plc", async () => {
      fetchMock.mockRejectedValue(new Error("Invalid DID"));

      const doc = await resolveDidDoc("did:plc:invalid");
      expect(doc).toBeUndefined();
    });

    it("should resolve a document for a valid did:plc", async () => {
      fetchMock.mockResolvedValue(
        Response.json(
          {
            id: "did:plc:r7bnnxqejdsgapuagfc6dlz6",
            alsoKnownAs: ["at://haroldadmin.com"],
          } satisfies DidDocument,
          {
            status: 200,
            statusText: "OK",
          },
        ),
      );

      const doc = await resolveDidDoc("did:plc:r7bnnxqejdsgapuagfc6dlz6");

      expect(doc).toBeDefined();
      expect(doc?.id).toBe("did:plc:r7bnnxqejdsgapuagfc6dlz6");
      expect(doc?.alsoKnownAs).contains("at://haroldadmin.com");
    });
  });

  describe("did:web", () => {
    it("should not resolve a document for a malformed did:web", async () => {
      fetchMock.mockRejectedValue(new Error("Invalid DID"));

      const doc = await resolveDidDoc("did:web:invalid");
      expect(doc).toBeUndefined();
    });

    it("should resolve a document for a valid did:web", async () => {
      fetchMock.mockResolvedValue(
        Response.json(
          {
            id: "did:web:haroldadmin.com",
            alsoKnownAs: ["at://haroldadmin.com"],
          } satisfies DidDocument,
          {
            status: 200,
            statusText: "OK",
          },
        ),
      );

      const doc = await resolveDidDoc("did:web:haroldadmin.com");
      expect(doc).toBeDefined();
      expect(doc?.id).toBe("did:web:haroldadmin.com");
      expect(doc?.alsoKnownAs).contains("at://haroldadmin.com");
    });
  });
});
