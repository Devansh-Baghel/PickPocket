import { Hono } from "hono";
import { Env } from "..";
import { zValidator } from "@hono/zod-validator";
import {
  articleIdSchema,
  getHighlightsSchema,
  highlightIdSchema,
  postHighlightSchema,
  userIdSchema,
} from "@/validators/highlights";
import { getDB } from "@/db/db";
import { highlights } from "@/db/schemas/highlights";
import { and, eq, InferInsertModel } from "drizzle-orm";
import { HTTPException } from "hono/http-exception";
import { articles } from "@/db/schemas/articles";

const highlightsRouter = new Hono<{ Bindings: Env }>();

highlightsRouter.get(
  "/:userId",
  zValidator("param", userIdSchema),
  zValidator("query", getHighlightsSchema),
  async (c) => {
    const { userId } = c.req.valid("param");
    const { page, limit } = c.req.valid("query");

    const offset = (page - 1) * limit;

    const db = getDB(c);

    const result = await db
      .select()
      .from(highlights)
      .where(eq(highlights.made_by, userId))
      .limit(limit)
      .offset(offset);

    return c.json({
      page: page,
      limit: limit,
      data: result,
    });
  }
);

highlightsRouter.get(
  "/:userId/:articleId",
  zValidator("param", userIdSchema.extend(articleIdSchema.shape)),
  zValidator("query", getHighlightsSchema),
  async (c) => {
    const { userId, articleId } = c.req.valid("param");
    const { page, limit } = c.req.valid("query");

    const offset = (page - 1) * limit;

    const db = getDB(c);

    const result = await db
      .select()
      .from(highlights)
      .where(
        and(
          eq(highlights.made_by, userId),
          eq(highlights.article_id, articleId)
        )
      )
      .limit(limit)
      .offset(offset);

    return c.json({
      page: page,
      limit: limit,
      data: result,
    });
  }
);

highlightsRouter.post(
  "/:userId",
  zValidator("param", userIdSchema),
  zValidator("json", postHighlightSchema),
  async (c) => {
    const { userId } = c.req.valid("param");
    const { content, prefix, suffix, article_id } = c.req.valid("json");

    const db = getDB(c);

    const articleExists = await db
      .select({ id: articles.id })
      .from(articles)
      .where(eq(articles.id, article_id))
      .limit(1);

    if (articleExists.length === 0) {
      throw new HTTPException(404, { message: "Article not found" });
    }

    const highlightData: InferInsertModel<typeof highlights> = {
      id: crypto.randomUUID(),
      content,
      prefix,
      suffix,
      article_id,
      made_by: userId,
    };

    const [savedHighlight] = await db
      .insert(highlights)
      .values(highlightData)
      .returning({
        id: highlights.id,
      });

    return c.json(savedHighlight);
  }
);

highlightsRouter.delete(
  "/:highlightId",
  zValidator("param", highlightIdSchema),
  async (c) => {
    const { highlightId } = c.req.valid("param");

    const db = getDB(c);

    const [deletedHighlight] = await db
      .delete(highlights)
      .where(eq(highlights.id, highlightId))
      .returning({ id: highlights.id });

    if (!deletedHighlight) {
      throw new HTTPException(404, { message: "Highlight not found" });
    }

    return c.json({
      message: "Highlight deleted successfully",
      deletedHighlight,
    });
  }
);

export default highlightsRouter;
