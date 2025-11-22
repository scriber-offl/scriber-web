"use server";

import { db } from "@/db";
import { services } from "@/db/schema/services";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getServices(stream?: string) {
  try {
    if (stream) {
      return await db
        .select()
        .from(services)
        .where(eq(services.stream, stream));
    }
    return await db.select().from(services);
  } catch (error) {
    console.error("Failed to fetch services:", error);
    return [];
  }
}

export async function createService(data: {
  name: string;
  description?: string;
  stream: string;
}) {
  try {
    await db.insert(services).values(data);
    revalidatePath("/admin");
    revalidatePath("/contact");
    revalidatePath("/branding");
    revalidatePath("/tlm");
    revalidatePath("/labs");
    return { success: true, message: "Service created successfully" };
  } catch (error) {
    console.error("Failed to create service:", error);
    return { success: false, message: "Failed to create service" };
  }
}

export async function deleteService(id: string) {
  try {
    await db.delete(services).where(eq(services.id, id));
    revalidatePath("/admin");
    revalidatePath("/contact");
    revalidatePath("/branding");
    revalidatePath("/tlm");
    revalidatePath("/labs");
    return { success: true, message: "Service deleted successfully" };
  } catch (error) {
    console.error("Failed to delete service:", error);
    return { success: false, message: "Failed to delete service" };
  }
}
