import { integer, text, boolean, pgTable } from "drizzle-orm/pg-core";
export const user = pgTable("user", {
  id: integer("id").primaryKey(),
  name: text("text").notNull(),
  cpf: text("cpf").notNull(), 
});