import { cookies } from "next/headers";
import { getOAuthClient } from "./client";
import { resolveSessionDid, SESSION_COOKIE_NAME } from "./cookie-session";
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
  const sessionCookies = await cookies();
  const sessionId = sessionCookies.get(SESSION_COOKIE_NAME);
  if (!sessionId) {
    return undefined;
  }

  return resolveSessionDid(sessionId.value);
}
