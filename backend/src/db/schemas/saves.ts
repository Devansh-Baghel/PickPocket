import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { articles } from "./articles";

export const saves = sqliteTable(
  "saves",
  {
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
  },
  (table) => [
    index("saves_made_by_idx").on(table.made_by),
    index("saves_article_id_idx").on(table.article_id),
    index("saves_made_by_article_id_idx").on(table.made_by, table.article_id),
  ]
);
