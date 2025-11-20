"use server";

import { checkBotId } from "botid/server";
import { db } from "@/db";
import { leads } from "@/db/schema/leads";
import { leadFormSchema } from "@/lib/schemas";
import { z } from "zod";

export async function createLead(values: z.infer<typeof leadFormSchema>) {
  // 1. Bot Protection
  const verification = await checkBotId();

  if (verification.isBot) {
    throw new Error("Access denied: Bot detected");
  }

  // 2. Server-side Validation
  const validatedFields = leadFormSchema.safeParse(values);

  if (!validatedFields.success) {
    throw new Error("Invalid fields");
  }

  const { name, email, phone, serviceType, requirements } =
    validatedFields.data;

  // 3. Database Insertion
  try {
    await db.insert(leads).values({
      name,
      email,
      phone,
      serviceType,
      requirements,
    });

    return { success: true, message: "Lead submitted successfully!" };
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to submit lead");
  }
}
