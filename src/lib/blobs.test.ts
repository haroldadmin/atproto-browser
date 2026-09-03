import { describe, it, expect, beforeEach, vi } from "vitest";
import { generateBlobs } from "./blobs";
import { Agent } from "@atproto/api";

type ListBlobsFn = Agent["com"]["atproto"]["sync"]["listBlobs"];

const listBlobsMock = vi.fn<ListBlobsFn>();

vi.mock("@atproto/api", () => ({
  Agent: vi.fn(function () {
    return {
      com: {
        atproto: {
          sync: {
            listBlobs: listBlobsMock,
          },
        },
      },
    };
  }),
}));

beforeEach(() => {
  vi.resetAllMocks();
});

describe(generateBlobs, () => {
  it("should yield nothing if there are no blobs", async () => {
    listBlobsMock.mockResolvedValueOnce({
      data: {
        cids: [],
      },
      success: true,
      headers: {},
    });

    const blobs = await Array.fromAsync(
      generateBlobs("did:plc:test", "https://example.org", 1000),
    );
    expect(blobs).toHaveLength(0);
  });

  it("should yield all blobs from the response", async () => {
    listBlobsMock.mockResolvedValueOnce({
      data: { cids: ["first", "second", "third"] },
      success: true,
      headers: {},
    });

    const blobs = await Array.fromAsync(
      generateBlobs("did:plc:test", "https://example.org", 1000),
    );

    expect(blobs).toEqual(["first", "second", "third"]);
  });

  it("should yield all blobs from all pages", async () => {
    listBlobsMock.mockResolvedValueOnce({
      data: { cids: ["first", "second"], cursor: "c1" },
      success: true,
      headers: {},
    });

    listBlobsMock.mockResolvedValueOnce({
      data: { cids: ["third", "fourth"], cursor: undefined },
      success: true,
      headers: {},
    });

    const blobs = await Array.fromAsync(
      generateBlobs("did:plc:test", "https://example.org", 1000),
    );

    expect(blobs).toEqual(["first", "second", "third", "fourth"]);
  });

  it("should stop polling for more blobs if the response does not have a cursor", async () => {
    listBlobsMock.mockResolvedValueOnce({
      data: { cids: ["first", "second"], cursor: undefined },
      success: true,
      headers: {},
    });

    listBlobsMock.mockResolvedValueOnce({
      data: { cids: ["third", "fourth"], cursor: "c2" },
      success: true,
      headers: {},
    });

    const blobs = await Array.fromAsync(
      generateBlobs("did:plc:test", "https://example.org", 1000),
    );

    expect(blobs).toEqual(["first", "second"]);
  });

  it("should stop polling for more blobs if limit is reached", async () => {
    listBlobsMock.mockResolvedValueOnce({
      data: { cids: ["first", "second"], cursor: "c1" },
      success: true,
      headers: {},
    });

    listBlobsMock.mockResolvedValueOnce({
      data: { cids: ["third", "fourth"], cursor: "c2" },
      success: true,
      headers: {},
    });

    listBlobsMock.mockResolvedValueOnce({
      data: { cids: ["fifth", "sixth"], cursor: "c3" },
      success: true,
      headers: {},
    });

    const blobs = await Array.fromAsync(
      generateBlobs("did:plc:test", "https://example.org", 4),
    );

    expect(blobs).toEqual(["first", "second", "third", "fourth"]);
  });

  it("should return <= limit records even if the page contains more", async () => {
    listBlobsMock.mockResolvedValueOnce({
      data: { cids: ["first", "second"] },
      success: true,
      headers: {},
    });

    const blobs = await Array.fromAsync(
      generateBlobs("did:plc:test", "https://example.org", 1),
    );

    expect(blobs).toEqual(["first"]);
  });

  it.each([{ limit: 0 }, { limit: -1 }])(
    "should throw for non positive limits",
    async ({ limit }) => {
      listBlobsMock.mockResolvedValueOnce({
        data: { cids: ["first", "second"] },
        success: true,
        headers: {},
      });

      const promise = Array.fromAsync(
        generateBlobs("did:plc:test", "https://example.org", limit),
      );

      expect(promise).rejects.toThrow("limit must be positive");
    },
  );
});
