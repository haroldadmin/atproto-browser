"use server";

import { getSession } from "@/lib/auth/session";
import { Agent } from "@atproto/api";
import { redirect } from "next/navigation";

export async function deleteRecordAction(
  collection: string,
  rkey: string,
): Promise<void> {
  const session = await getSession();
  if (!session) {
    return;
  }

  const agent = new Agent(session);

  let deleted = false;
  try {
    await agent.com.atproto.repo.deleteRecord({
      repo: session.did,
      collection,
      rkey,
    });
    deleted = true;
  } catch (error) {
    console.error("Failed to delete record", error);
  }

  if (!deleted) {
    return;
  }

  redirect(`/at/${session.did}/${collection}`);
}
