import { connect } from "@tursodatabase/serverless";
import { Kysely, SqliteDialect } from "kysely";
import { Migrator } from "kysely/migration";
import { TursoServerlessDialect } from "kysely-turso/serverless";
import { envOrThrow, resolveVercelEnv } from "@/lib/env";
import { once } from "lodash";
import Database from "better-sqlite3";

type KeyValueTable = {
  key: string;
  value: string;
};

type CookieTable = {
  session_id: string;
  did: string;
};

export type DatabaseSchema = {
  auth_state: KeyValueTable;
  auth_session: KeyValueTable;
  auth_cookie: CookieTable;
};

export const authDb = once(() => {
  const env = resolveVercelEnv();
  if (!env || env === "development") {
    return new Kysely<DatabaseSchema>({
      dialect: new SqliteDialect({
        database: new Database("auth.db"),
      }),
    });
  }

  const database = new Kysely<DatabaseSchema>({
    dialect: new TursoServerlessDialect({
      connection: connect({
        url: envOrThrow("ATPROTO_OAUTH_DATABASE_URL"),
        authToken: envOrThrow("ATPROTO_OAUTH_DATABASE_TOKEN"),
      }),
    }),
  });

  return database;
});

export function getMigrator() {
  const db = authDb();

  return new Migrator({
    db,
    provider: {
      getMigrations: async () => ({
        "001": {
          up: async (db: Kysely<unknown>) => {
            await db.schema
              .createTable("auth_state")
              .addColumn("key", "text", (col) => col.primaryKey())
              .addColumn("value", "text", (col) => col.notNull())
              .execute();

            await db.schema
              .createTable("auth_session")
              .addColumn("key", "text", (col) => col.primaryKey())
              .addColumn("value", "text", (col) => col.notNull())
              .execute();
          },
          down: async (db: Kysely<unknown>) => {
            await db.schema.dropTable("auth_session").execute();
            await db.schema.dropTable("auth_state").execute();
          },
        },
        "002": {
          up: async (db: Kysely<unknown>) => {
            await db.schema
              .createTable("auth_cookie")
              .addColumn("session_id", "text", (col) => col.primaryKey())
              .addColumn("did", "text", (col) => col.notNull())
              .execute();
          },
          down: async (db: Kysely<unknown>) => {
            await db.schema.dropTable("auth_cookie").execute();
          },
        },
      }),
    },
  });
}
