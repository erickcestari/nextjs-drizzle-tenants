"use server";
import { getTenantDb } from "@/db/tenant/drizzle";
import { company } from "@/db/tenant/schema";

export const getCompany = async (connectionId: number) => {
  const db = await getTenantDb(connectionId);
  const data = await db.select().from(company);
  return data;
};