import { sql } from "drizzle-orm";
import { sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const articles = sqliteTable(
  "articles",
  {
    id: text("id").primaryKey().notNull(),
    url: text("url").notNull(),
    title: text("title", { length: 255 }).notNull(),
    content: text("content").notNull(),
    excerpt: text("excerpt").notNull(),
    lang: text("lang").default("en"),
    publishedTime: text("published_time"),
    siteName: text("site_name").notNull(),
    timestamp: text("timestamp").default(sql`(current_timestamp)`),
  },
  (table) => [
    uniqueIndex("articles_url_unique_idx").on(table.url),
  ]
);
