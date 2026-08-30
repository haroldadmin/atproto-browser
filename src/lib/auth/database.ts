import { connect } from "@tursodatabase/serverless";
import { Kysely } from "kysely";
import { Migrator } from "kysely/migration";
import { TursoServerlessDialect } from "kysely-turso/serverless";
import { envOrThrow } from "@/lib/env";
import { once } from "lodash";

type KeyValueTable = {
  key: string;
  value: string;
};

export type DatabaseSchema = {
  auth_state: KeyValueTable;
  auth_session: KeyValueTable;
};

export const authDb = once(() => {
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
      }),
    },
  });
}
