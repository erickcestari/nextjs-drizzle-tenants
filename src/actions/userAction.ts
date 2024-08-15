"use server";
import { db } from "@/db/system/drizzle";
import { user } from "@/db/system/schema";
import { userType } from "@/types/userType";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const getUsers = async (connectionId?: number) => {
  if (connectionId) {
    const data = await db.select().from(user).where(eq(user.connectionId, connectionId));
    return data;
  }
  const data = await db.select().from(user);
  return data;
};

export const addUser = async (newUser: userType) => {
  await db.insert(user).values({...newUser});
};

export const deleteUser = async (id: number) => {
  await db.delete(user).where(eq(user.id, id));

  revalidatePath("/");
};

export const editUser = async (userEdited: userType) => {
  await db
    .update(user)
    .set({
      ...userEdited,
    })
    .where(eq(user.id, userEdited.id));
  revalidatePath("/");
};