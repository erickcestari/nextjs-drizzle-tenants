import { integer, text, pgTable } from "drizzle-orm/pg-core";
export const company = pgTable("company", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
});