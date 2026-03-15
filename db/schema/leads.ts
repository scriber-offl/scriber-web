import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const leads = pgTable("leads", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  serviceType: text("service_type"),
  requirements: text("requirements").notNull(),
  institutionName: text("institution_name"),
  positionInInstitution: text("position_in_institution"),
  institutionAddress: text("institution_address"),
  collaborationType: text("collaboration_type"),
  otherCollaboration: text("other_collaboration"),
  gradeLevel: text("grade_level"),
  preferredContact: text("preferred_contact"),
  collaborationDescription: text("collaboration_description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
