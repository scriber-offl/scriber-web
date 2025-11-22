import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const services = pgTable("services", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  stream: text("stream").notNull(), // 'branding', 'labs', 'tlm'
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
