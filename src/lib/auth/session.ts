import { cookies } from "next/headers";
import { getOAuthClient } from "./client";
import type { OAuthSession } from "@atproto/oauth-client-node";

export async function getSession(): Promise<OAuthSession | undefined> {
  const did = await getDid();
  if (!did) return undefined;

  try {
    const client = await getOAuthClient();
    return await client.restore(did);
  } catch {
    return undefined;
  }
}

export async function getDid(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get("did")?.value;
}
