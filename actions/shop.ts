"use server";

import { db } from "@/db";
import { shopEnquiries, shopProducts } from "@/db/schema/shop";
import { desc, eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";

async function checkAdmin() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  // @ts-expect-error - role check
  if (!session || session.user.role !== "admin") {
    throw new Error("Unauthorized");
  }
}

export async function getShopProducts() {
  return await db
    .select()
    .from(shopProducts)
    .orderBy(desc(shopProducts.createdAt));
}

export async function createProduct(data: {
  name: string;
  description: string;
  specs: string;
  minOrderQuantity: number;
}) {
  await checkAdmin();
  const [product] = await db.insert(shopProducts).values(data).returning();
  revalidatePath("/admin");
  revalidatePath("/tlm");
  return product;
}

export async function updateProductImage(id: string, imageUrl: string) {
  await checkAdmin();
  await db
    .update(shopProducts)
    .set({ image: imageUrl })
    .where(eq(shopProducts.id, id));
  revalidatePath("/admin");
  revalidatePath("/tlm");
}

export async function deleteProduct(id: string, imageUrl: string | null) {
  await checkAdmin();
  if (imageUrl) {
    try {
      await del(imageUrl);
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  }
  await db.delete(shopProducts).where(eq(shopProducts.id, id));
  revalidatePath("/admin");
  revalidatePath("/tlm");
}

export async function deleteProductImage(imageUrl: string) {
  await checkAdmin();
  try {
    await del(imageUrl);
  } catch (error) {
    console.error("Error deleting image:", error);
  }
}

export async function updateProduct(
  id: string,
  data: {
    name: string;
    description: string;
    specs: string;
    minOrderQuantity: number;
  }
) {
  await checkAdmin();
  await db.update(shopProducts).set(data).where(eq(shopProducts.id, id));
  revalidatePath("/admin");
  revalidatePath("/tlm");
}

export async function getShopEnquiries() {
  await checkAdmin();
  return await db
    .select({
      id: shopEnquiries.id,
      productId: shopEnquiries.productId,
      productName: shopProducts.name,
      quantity: shopEnquiries.quantity,
      customerName: shopEnquiries.customerName,
      customerEmail: shopEnquiries.customerEmail,
      customerPhone: shopEnquiries.customerPhone,
      status: shopEnquiries.status,
      createdAt: shopEnquiries.createdAt,
    })
    .from(shopEnquiries)
    .leftJoin(shopProducts, eq(shopEnquiries.productId, shopProducts.id))
    .orderBy(desc(shopEnquiries.createdAt));
}

export async function deleteShopEnquiry(id: string) {
  await checkAdmin();
  await db.delete(shopEnquiries).where(eq(shopEnquiries.id, id));
  revalidatePath("/admin");
}
