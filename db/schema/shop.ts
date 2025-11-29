import {
  pgTable,
  text,
  timestamp,
  integer,
  uuid,
  json,
} from "drizzle-orm/pg-core";

export const shopProducts = pgTable("shop_products", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  specs: text("specs").notNull(), // Storing as text for simplicity, or could be JSON
  minOrderQuantity: integer("min_order_quantity").notNull().default(1),
  image: text("image"), // Nullable initially for step 2 upload
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const shopEnquiries = pgTable("shop_enquiries", {
  id: uuid("id").defaultRandom().primaryKey(),
  productId: uuid("product_id")
    .notNull()
    .references(() => shopProducts.id, { onDelete: "cascade" }),
  quantity: integer("quantity").notNull(),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: text("customer_phone").notNull(),
  status: text("status").notNull().default("pending"), // pending, contacted, completed
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
