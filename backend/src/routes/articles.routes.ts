import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { HTTPException } from "hono/http-exception";
import { eq } from "drizzle-orm";

import { Env } from "..";
import { getDB } from "@/db/db";
import { articles } from "@/db/schemas/articles";
import { parseArticle } from "@/utils/utils";
import { articleIdSchema } from "@/validators/articles";

const articleRouter = new Hono<{ Bindings: Env }>();

// GET a single article by its ID
articleRouter.get(
  "/:articleId",
  zValidator("param", articleIdSchema),
  async (c) => {
    const { articleId } = c.req.valid("param");
    const db = getDB(c);

    const [article] = await db
      .select()
      .from(articles)
      .where(eq(articles.id, articleId));

    if (!article) {
      throw new HTTPException(404, { message: "Article not found" });
    }

    return c.json(article);
  }
);

// PATCH to refresh/re-parse an article's content
articleRouter.patch(
  "/:articleId",
  zValidator("param", articleIdSchema),
  async (c) => {
    const { articleId } = c.req.valid("param");
    const db = getDB(c);

    // 1. Get the article's URL to re-parse it
    const [article] = await db
      .select({ url: articles.url })
      .from(articles)
      .where(eq(articles.id, articleId));

    if (!article) {
      throw new HTTPException(404, { message: "Article not found" });
    }

    // 2. Re-parse the article from the original URL
    const parsedArticle = await parseArticle(article.url);

    if (
      !parsedArticle?.title ||
      !parsedArticle?.content ||
      !parsedArticle?.excerpt
    ) {
      throw new HTTPException(400, { message: "Unable to re-parse article" });
    }

    // 3. Update the article in the database with the new content
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
);

export default articleRouter;