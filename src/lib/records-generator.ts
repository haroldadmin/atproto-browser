import { Agent } from "@atproto/api";

export async function* generateRecords(
  did: string,
  collection: string,
  pds: string,
  limit = Number.POSITIVE_INFINITY,
) {
  const agent = new Agent(pds);
  const pageSize = Math.min(50, limit);

  let emitted = 0;
  let cursor: string | undefined;

  while (emitted < limit) {
    const { data, success } = await agent.com.atproto.repo.listRecords({
      collection,
      repo: did,
      cursor,
      limit: pageSize,
    });

    if (!success) {
      throw new Error(`Failed to list records for ${did} after ${cursor}`);
    }

    if (!data.records.length) {
      break;
    }

    yield* data.records;

    if (!data.cursor) {
      break;
    }

    cursor = data.cursor;
    emitted += data.records.length;
  }
}