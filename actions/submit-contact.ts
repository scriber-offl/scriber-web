"use server";

import { checkBotId } from "botid/server";
import { db } from "@/db";
import { contactSubmissions } from "@/db/schema/contact";
import { contactFormSchema } from "@/lib/schemas";
import { z } from "zod";

export async function submitContact(values: z.infer<typeof contactFormSchema>) {
  // 1. Bot Protection
  const verification = await checkBotId();

  if (verification.isBot) {
    throw new Error("Access denied: Bot detected");
  }

  // 2. Server-side Validation
  const validatedFields = contactFormSchema.safeParse(values);

  if (!validatedFields.success) {
    throw new Error("Invalid fields");
  }

  const { firstName, lastName, email, subject, message } = validatedFields.data;

  // 3. Database Insertion
  try {
    await db.insert(contactSubmissions).values({
      firstName,
      lastName,
      email,
      subject,
      message,
    });

    return { success: true, message: "Message sent successfully!" };
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to send message");
  }
}
