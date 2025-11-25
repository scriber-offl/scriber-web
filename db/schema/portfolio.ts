import {
  pgTable,
  text,
  timestamp,
  integer,
  json,
  uuid,
} from "drizzle-orm/pg-core";
import { user } from "./auth";

export const portfolio = pgTable("portfolio", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  category: text("category").notNull(), // e.g., "Brand Identity", "Logo Design"
  stream: text("stream").notNull(), // "branding", "tlm"
  image: text("image").notNull(),
  description: text("description").notNull(),
  fullDescription: text("full_description").notNull(),
  serviceType: text("service_type").notNull(), // For the form prefill
  customerEmails: json("customer_emails").$type<string[]>().default([]), // List of emails allowed to review
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const reviews = pgTable("reviews", {
  id: uuid("id").defaultRandom().primaryKey(),
  portfolioId: uuid("portfolio_id")
    .notNull()
    .references(() => portfolio.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  rating: integer("rating").notNull(),
  comment: text("comment").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
