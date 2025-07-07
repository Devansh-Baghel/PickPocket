import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const articles = sqliteTable("articles", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  url: text("url").unique().notNull(),
  title: text("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
});
