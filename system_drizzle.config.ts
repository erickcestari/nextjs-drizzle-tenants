import { config } from 'dotenv';
import { defineConfig } from "drizzle-kit";
config({ path: '.env' });
export default defineConfig({
  schema: "./src/db/system/schema.ts",
  out: "./migrations/system",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.SYSTEM_DATABASE_URL!,
  },
});