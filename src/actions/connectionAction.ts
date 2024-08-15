"use server";
import { eq, not } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db/system/drizzle";
import { connection } from "@/db/system/schema";

export const getData = async () => {
  const data = await db.select().from(connection);
  return data;
};

export const addConnection = async (id: number, connection_url: string) => {
  await db.insert(connection).values({
    id: id,
    connection_url: connection_url,
  });
};

export const deleteConnection = async (id: number) => {
  await db.delete(connection).where(eq(connection.id, id));

  revalidatePath("/");
};

export const editConnection = async (id: number, connection_url: string) => {
  await db
    .update(connection)
    .set({
      connection_url: connection_url,
    })
    .where(eq(connection.id, id));

  revalidatePath("/");
};