"use server";

import { db } from "@/db";
import { services } from "@/db/schema/services";
import { eq, and, ne, count } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { del } from "@vercel/blob";

export async function createService(data: {
  name: string;
  description?: string;
  image?: string;
}) {
  try {
    const [inserted] = await db
      .insert(services)
      .values(data)
      .returning({ id: services.id });
    revalidatePath("/admin");
    revalidatePath("/");
    revalidatePath("/contact");
    return {
      success: true,
      message: "Service created successfully",
      id: inserted.id,
    };
  } catch (error) {
    console.error("Failed to create service:", error);
    return { success: false, message: "Failed to create service" };
  }
}

export async function updateService(
  id: string,
  data: {
    name?: string;
    description?: string;
    image?: string;
    featured?: boolean;
  },
) {
  try {
    if (data.featured === true) {
      const [{ total }] = await db
        .select({ total: count() })
        .from(services)
        .where(and(eq(services.featured, true), ne(services.id, id)));
      if (total >= 4) {
        return {
          success: false,
          message: "Maximum 4 services can be featured at once",
        };
      }
    }
    await db.update(services).set(data).where(eq(services.id, id));
    revalidatePath("/admin");
    revalidatePath("/");
    revalidatePath("/contact");
    return { success: true, message: "Service updated successfully" };
  } catch (error) {
    console.error("Failed to update service:", error);
    return { success: false, message: "Failed to update service" };
  }
}

export async function deleteService(id: string) {
  try {
    const [service] = await db
      .select()
      .from(services)
      .where(eq(services.id, id));
    if (service && service.image) {
      await del(service.image);
    }
    await db.delete(services).where(eq(services.id, id));
    revalidatePath("/admin");
    revalidatePath("/");
    revalidatePath("/contact");
    return { success: true, message: "Service deleted successfully" };
  } catch (error) {
    console.error("Failed to delete service:", error);
    return { success: false, message: "Failed to delete service" };
  }
}

export async function deleteServiceImage(url: string) {
  try {
    await del(url);
    return { success: true, message: "Image deleted successfully" };
  } catch (error) {
    console.error("Failed to delete image:", error);
    return { success: false, message: "Failed to delete image" };
  }
}
