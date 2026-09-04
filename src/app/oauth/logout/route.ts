import {
  deleteSession,
  resolveSessionDid,
  SESSION_COOKIE_NAME,
} from "@/lib/auth/cookie-session";
import { getOAuthClient } from "@/lib/auth/client";
import { cookies } from "next/headers";

export async function POST() {
  const sessionCookies = await cookies();
  const sessionId = sessionCookies.get(SESSION_COOKIE_NAME);
  if (!sessionId) {
    return Response.json({ success: true });
  }

  const did = await resolveSessionDid(sessionId.value);
  if (!did) {
    return Response.json({ success: true });
  }

  try {
    const client = await getOAuthClient();
    await client.revoke(did);
  } catch (error) {
    console.error("Failed to revoke session", error);
  }

  try {
    await deleteSession(sessionId.value);
  } catch (error) {
    console.error("Failed to delete session", error);
  }

  return Response.json({ success: true });
}
