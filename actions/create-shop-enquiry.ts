"use server";

import { db } from "@/db";
import { shopEnquiries, shopProducts } from "@/db/schema/shop";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createShopEnquiry(data: {
  productId: string;
  quantity: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}) {
  // Fetch product to check MOQ
  const [product] = await db
    .select()
    .from(shopProducts)
    .where(eq(shopProducts.id, data.productId));

  if (!product) {
    throw new Error("Product not found");
  }

  if (data.quantity < product.minOrderQuantity) {
    throw new Error(`Minimum order quantity is ${product.minOrderQuantity}`);
  }

  await db.insert(shopEnquiries).values(data);
  revalidatePath("/admin");
}
