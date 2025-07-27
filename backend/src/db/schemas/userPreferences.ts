import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const userPreferences = sqliteTable("user_preferences", {
  id: text("id").primaryKey().notNull(),
  userId: text("user_id").notNull(),
  autoArchive: integer({ mode: "boolean" }).default(true),
  emailNotifications: integer({ mode: "boolean" }).default(false),
  readingReminders: integer({ mode: "boolean" }).default(true),
  timestamp: text("timestamp")
    .notNull()
    .default(sql`(current_timestamp)`),
});
