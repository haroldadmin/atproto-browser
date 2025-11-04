import { Agent } from "@atproto/api";

export type ListBlobsParams = {
  pds: string;
  did: string;
  limit: number;
};

export async function listBlobs({ pds, did, limit }: ListBlobsParams) {
  const cids = await Array.fromAsync(streamBlobs(did, pds, limit));
  return cids;
}

async function* streamBlobs(did: string, pds: string, limit: number) {
  const agent = new Agent(pds);

  let cursor: string | undefined;
  let emitted = 0;
  while (emitted < limit) {
    const { data, success } = await agent.com.atproto.sync.listBlobs({
      did,
      cursor,
      limit: 20,
    });

    if (!success) {
      throw new Error(`Failed to list blobs for ${did} after ${cursor}`);
    }

    if (!data.cids.length) {
      break;
    }

    cursor = data.cursor;
    emitted += data.cids.length;

    yield* data.cids;
  }
}
