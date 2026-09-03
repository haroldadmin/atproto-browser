import { Agent } from "@atproto/api";
import assert from "assert";

export async function* generateBlobs(
  did: string,
  pds: string,
  limit = Number.POSITIVE_INFINITY,
) {
  assert(limit > 0, "limit must be positive");

  const agent = new Agent(pds);
  const pageSize = Math.min(50, limit);

  let emitted = 0;
  let cursor: string | undefined;
  while (emitted < limit) {
    const { data, success } = await agent.com.atproto.sync.listBlobs({
      did,
      cursor,
      limit: pageSize,
    });

    if (!success) {
      throw new Error(`Failed to list blobs for ${did} after ${cursor}`);
    }

    if (!data.cids.length) {
      break;
    }

    const remainingLimit = Math.max(0, limit - emitted);
    yield* data.cids.slice(0, remainingLimit);

    if (!data.cursor) {
      break;
    }

    cursor = data.cursor;
    emitted += data.cids.length;
  }
}
