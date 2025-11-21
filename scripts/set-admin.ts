import { db } from "../db";
import { user } from "../db/schema/auth";
import { eq } from "drizzle-orm";

const email = process.argv[2];

if (!email) {
  console.error("Please provide an email address.");
  process.exit(1);
}

async function main() {
  console.log(`Setting admin role for user with email: ${email}`);

  const [foundUser] = await db.select().from(user).where(eq(user.email, email));

  if (!foundUser) {
    console.error("User not found.");
    process.exit(1);
  }

  await db.update(user).set({ role: "admin" }).where(eq(user.id, foundUser.id));

  console.log(`Successfully set ${email} as admin.`);
}

main().catch(console.error);
