import { describe, it, vi, expect, beforeAll } from "vitest";
import {
  createCookieSession,
  deleteSession,
  resolveSessionDid,
} from "./cookie-session";
import * as db from "@/lib/auth/database";
import { Kysely, SqliteDialect } from "kysely";
import Database from "better-sqlite3";

const testDatabase = new Database(":memory:");

vi.mock("@lib/auth/database", async (importOriginal) => {
  const original = await importOriginal<typeof import("@/lib/auth/database")>();

  const testKysely = new Kysely<db.DatabaseSchema>({
    dialect: new SqliteDialect({
      database: testDatabase,
    }),
  });

  return {
    ...original,
    authDb: vi.fn().mockImplementation(() => {
      return testKysely;
    }),
  };
});

beforeAll(async () => {
  await db.getMigrator().migrateToLatest();
});

describe(createCookieSession, () => {
  it("create a new session when requested", async () => {
    const sessionId = await createCookieSession("did:plc:test");
    const session = await db
      .authDb()
      .selectFrom("auth_cookie")
      .selectAll()
      .where("session_id", "=", sessionId)
      .executeTakeFirst();

    expect(session).toBeDefined();
    expect(session?.did).toEqual("did:plc:test");
  });

  it("should create each session with a unique ID", async () => {
    const sessionOneId = await createCookieSession("did:plc:test");
    const sessionTwoId = await createCookieSession("did:plc:test");
    expect(sessionOneId).not.toEqual(sessionTwoId);
  });
});

describe(resolveSessionDid, () => {
  it("should return nothing if there is no existing session", async () => {
    const session = await resolveSessionDid("nonexistent");
    expect(session).toBeUndefined();
  });

  it("should return a session when it exists", async () => {
    const sessionId = await createCookieSession("did:plc:test");
    const did = await resolveSessionDid(sessionId);
    expect(did).toEqual("did:plc:test");
  });
});

describe(deleteSession, () => {
  it("should be noop when the session does not exist", async () => {
    const promise = deleteSession("nonexistent");
    await expect(promise).resolves.toEqual(undefined);
  });

  it("should delete a session if it exists", async () => {
    const sessionId = await createCookieSession("did:plc:test");
    await deleteSession(sessionId);

    const did = await resolveSessionDid(sessionId);
    expect(did).toBeUndefined();
  });
});
