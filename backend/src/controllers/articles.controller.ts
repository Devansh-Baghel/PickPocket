import { getDB } from "@/db/db";
import { articles } from "@/db/schemas/articles";
import { Context } from "@/types/types";
import { eq } from "drizzle-orm";
import { HTTPException } from "hono/http-exception";

export async function getArticle(c: Context) {
  const articleId = c.req.param("articleId");

  if (!articleId)
    throw new HTTPException(400, { message: "articleId is required" });

  const db = getDB(c);
  const [article] = await db
    .select()
    .from(articles)
    .where(eq(articles.id, articleId))
    .limit(1);

  if (!article) throw new HTTPException(404, { message: "Article not found" });

  return c.json(article);
}
