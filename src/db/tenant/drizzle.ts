import { config } from "dotenv";
import { drizzle } from 'drizzle-orm/postgres-js';
import { db as systemDb } from "../system/drizzle";
import postgres from "postgres";
import { connection } from "../system/schema";
import { eq } from "drizzle-orm";
config({ path: ".env" }); // or .env.local

export const getTenantDb = async (tenantId: number) => {
  const connectionUrl = await systemDb.select().from(connection).where(eq(connection.id, tenantId));
  const queryClient = postgres(connectionUrl[0].connectionUrl);
  const db = drizzle(queryClient);
  return db; 
}
