import { randomBytes } from "node:crypto";
import { authDb } from "@/lib/auth/database";

export const SESSION_COOKIE_NAME = "sid";

export async function createCookieSession(did: string): Promise<string> {
  const sessionId = randomBytes(32).toString("base64url");
  await authDb()
    .insertInto("auth_cookie")
    .values({ session_id: sessionId, did })
    .execute();
  return sessionId;
}

export async function resolveSessionDid(
  sessionId: string,
): Promise<string | undefined> {
  const row = await authDb()
    .selectFrom("auth_cookie")
    .select("did")
    .where("session_id", "=", sessionId)
    .executeTakeFirst();

  return row?.did;
}

export async function deleteSession(sessionId: string) {
  await authDb()
    .deleteFrom("auth_cookie")
    .where("session_id", "=", sessionId)
    .execute();
}
