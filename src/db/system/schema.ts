import { integer, text, pgTable } from "drizzle-orm/pg-core";
export const connection = pgTable("connection", {
  id: integer("id").primaryKey(),
  connection_url: text("connection_url").notNull(),
});