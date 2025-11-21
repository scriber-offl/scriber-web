"use server";

import { db } from "@/db";
import { contactSubmissions } from "@/db/schema/contact";
import { leads } from "@/db/schema/leads";
import { desc, eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

async function checkAdmin() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  // @ts-expect-error - role check
  if (!session || session.user.role !== "admin") {
    throw new Error("Unauthorized");
  }
}

export async function getContacts() {
  await checkAdmin();
  return await db
    .select()
    .from(contactSubmissions)
    .orderBy(desc(contactSubmissions.createdAt));
}

export async function deleteContact(id: string) {
  await checkAdmin();
  await db.delete(contactSubmissions).where(eq(contactSubmissions.id, id));
}

export async function getLeads() {
  await checkAdmin();
  return await db.select().from(leads).orderBy(desc(leads.createdAt));
}

export async function deleteLead(id: string) {
  await checkAdmin();
  await db.delete(leads).where(eq(leads.id, id));
}
