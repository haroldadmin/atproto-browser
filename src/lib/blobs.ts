import { Agent } from "@atproto/api";

export async function* generateBlobs(
  did: string,
  pds: string,
  limit = Number.POSITIVE_INFINITY,
) {
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

    if (!data.cids.length || data.cids.length < pageSize) {
      break;
    }

    cursor = data.cursor;

    emitted += data.cids.length;
    yield* data.cids;
  }
}
