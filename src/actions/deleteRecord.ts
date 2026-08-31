"use server";

import { getSession } from "@/lib/auth/session";
import { Agent } from "@atproto/api";

export async function deleteRecordAction(
  repo: string,
  collection: string,
  rkey: string,
): Promise<void> {
  const session = await getSession();
  if (!session) {
    throw new Error("No active auth session available");
  }

  if (session.did !== repo) {
    throw new Error("Can not delete records in a different repo");
  }

  const agent = new Agent(session);
  await agent.com.atproto.repo.deleteRecord({
    repo: session.did,
    collection,
    rkey,
  });
}
