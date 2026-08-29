import { getMigrator } from "@/lib/auth/database.ts";

console.log("Running migrations...");

const migrator = getMigrator();
const { error } = await migrator.migrateToLatest();
if (error) {
  throw error;
}

console.log("Migrations complete.");
