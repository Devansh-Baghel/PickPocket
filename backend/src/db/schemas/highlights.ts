import { index, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { articles } from "./articles";

export const highlights = sqliteTable(
  "highlights",
  {
    id: text("id").primaryKey().notNull(),
    content: text("content").notNull(),
    prefix: text("prefix").notNull(),
    suffix: text("suffix").notNull(),
    made_by: text("made_by").notNull(),
    article_id: text("article_id")
      .notNull()
      .references(() => articles.id, { onDelete: "cascade" }),
    timestamp: text("timestamp")
      .notNull()
      .default(sql`(current_timestamp)`),
  },
  (table) => [
    index("highlights_made_by_idx").on(table.made_by),
    index("highlights_article_id_idx").on(table.article_id),
    index("highlights_made_by_article_id_idx").on(
      table.made_by,
      table.article_id
    ),
  ]
);
