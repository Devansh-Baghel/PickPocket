import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { HTTPException } from "hono/http-exception";
import { eq } from "drizzle-orm";

import { Env } from "..";
import { getDB } from "@/db/db";
import { articles } from "@/db/schemas/articles";
import { parseArticle } from "@/utils/utils";
import { articleIdSchema } from "@/validators/articles";
import { cache } from "hono/cache";
import { saveIdSchema } from "@/validators/saves";
import { saves } from "@/db/schemas/saves";

const articleRouter = new Hono<{ Bindings: Env }>();

// GET a single article by its ID
articleRouter.get(
  "/:articleId",
  zValidator("param", articleIdSchema),
  cache({
    cacheName: "articles-cache",
    cacheControl: "max-age=86400, public", // 24 hours
    keyGenerator: (c) => {
      const articleId = c.req.param("articleId");
      return `/articles/${articleId}`; // Clean, predictable cache keys
    },
    cacheableStatusCodes: [200, 404], // Cache successful fetches and not-found
    vary: ["Accept-Encoding"], // Respect compression preferences
    wait: false, // Cloudflare Workers default
  }),
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

articleRouter.get(
  "/save/:saveId",
  zValidator("param", saveIdSchema),
  // cache({
  //   cacheName: "saves-articles-cache",
  //   cacheControl: "max-age=86400, public", // 24 hours
  //   keyGenerator: (c) => {
  //     const saveId = c.req.param("saveId");
  //     return `/saves/${saveId}/article`;
  //   },
  //   cacheableStatusCodes: [200, 404],
  //   vary: ["Accept-Encoding"],
  //   wait: false,
  // }),
  async (c) => {
    const { saveId } = c.req.valid("param");
    const db = getDB(c);

    // First, fetch the save metadata
    const [save] = await db.select().from(saves).where(eq(saves.id, saveId));

    if (!save) {
      throw new HTTPException(404, { message: "Save not found" });
    }

    // Then, fetch the article using the articleId from the save
    const [article] = await db
      .select()
      .from(articles)
      .where(eq(articles.id, save.article_id));

    if (!article) {
      throw new HTTPException(404, { message: "Article not found" });
    }

    // Return both save metadata and article data
    return c.json({
      save,
      article,
    });
  }
);

export default articleRouter;