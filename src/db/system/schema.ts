import { integer, text, pgTable } from "drizzle-orm/pg-core";
export const connection = pgTable("connection", {
  id: integer("id").primaryKey(),
  connectionUrl: text("connection_url").notNull(),
});

export const user = pgTable("user", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  connectionId: integer("connection_id").references(() => connection.id)
});