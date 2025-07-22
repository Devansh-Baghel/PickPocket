import { getDB } from "@/db/db";
import { articles } from "@/db/schemas/articles";
import { Context } from "@/types/types";
import { parseArticle } from "@/utils/utils";
import { eq } from "drizzle-orm";
import { HTTPException } from "hono/http-exception";

export async function getArticle(c: Context) {
  const { articleId } = c.req.valid("param");

  const db = getDB(c);
  const [article] = await db
    .select()
    .from(articles)
    .where(eq(articles.id, articleId))
    .limit(1);

  if (!article) throw new HTTPException(404, { message: "Article not found" });

  return c.json(article);
}

export async function refreshArticle(c: Context) {
  const { articleId } = c.req.valid("param");

  const db = getDB(c);

  // Check if article exists
  const [article] = await db
    .select({ url: articles.url })
    .from(articles)
    .where(eq(articles.id, articleId))
    .limit(1);

  if (!article) throw new HTTPException(404, { message: "Article not found" });

  // Re-parse it using the saved URL
  const parsedArticle = await parseArticle(article.url);

  if (
    !parsedArticle ||
    !parsedArticle.title ||
    !parsedArticle.content ||
    !parsedArticle.excerpt
  ) {
    throw new HTTPException(400, { message: "Unable to parse article" });
  }

  // Update the article in DB
  const [updatedArticle] = await db
    .update(articles)
    .set({
      title: parsedArticle.title,
      content: parsedArticle.content,
      excerpt: parsedArticle.excerpt,
      lang: parsedArticle.lang,
      publishedTime: parsedArticle.publishedTime,
      siteName: parsedArticle.siteName || "",
    })
    .where(eq(articles.id, articleId))
    .returning();

  return c.json(updatedArticle);
}
