import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { articles } from "./articles";

export const saves = sqliteTable("saves", {
  id: text("id").primaryKey().notNull(),
  made_by: text("made_by").notNull(),
  is_archived: integer({ mode: "boolean" }).default(false),
  is_favorite: integer({ mode: "boolean" }).default(false),
  article_id: text("article_id")
    .notNull()
    .references(() => articles.id, { onDelete: "cascade" }),
  timestamp: text("timestamp")
    .notNull()
    .default(sql`(current_timestamp)`),
});
