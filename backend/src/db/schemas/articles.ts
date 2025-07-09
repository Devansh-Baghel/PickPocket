import { sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const articles = sqliteTable("articles", {
  id: text("id").primaryKey().notNull(),
  url: text("url").unique().notNull(),
  title: text("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  timestamp: text("timestamp")
    .notNull()
    .default(sql`(current_timestamp)`),
});
