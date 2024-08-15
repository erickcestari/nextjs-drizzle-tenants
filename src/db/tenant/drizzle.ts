import { config } from "dotenv";
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from "postgres";
config({ path: ".env" }); // or .env.local

const queryClient = postgres();
export const db = drizzle(queryClient);
