import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { articles } from "./articles";
import { sql } from "drizzle-orm";

export const saves = sqliteTable("saves", {
  id: text("id").primaryKey().notNull(),
  made_by: text("made_by").notNull(),
  article_id: text("article_id")
    .notNull()
    .references(() => articles.id, { onDelete: "cascade" }),
  timestamp: text("timestamp")
    .notNull()
    .default(sql`(current_timestamp)`),
});
