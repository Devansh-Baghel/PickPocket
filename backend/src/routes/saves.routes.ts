import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { HTTPException } from "hono/http-exception";
import {
  and,
  desc,
  eq,
  getTableColumns,
  InferInsertModel,
  sql,
} from "drizzle-orm";

import { Env } from "..";
import { getDB } from "@/db/db";
import { articles } from "@/db/schemas/articles";
import { saves } from "@/db/schemas/saves";
import { parseArticle } from "@/utils/utils";
import {
  getSavesSchema,
  postSaveSchema,
  saveIdSchema,
  userIdSchema,
} from "@/validators/saves";
import {
  parsePocketCsv,
  convertUnixTimestamp,
  type PocketCsvRow,
} from "@/utils/csvImport";
import { importPocketSchema } from "@/validators/saves";

const savesRouter = new Hono<{ Bindings: Env }>();

// GET all saves (paginated)
savesRouter.get("/", zValidator("query", getSavesSchema), async (c) => {
  const db = getDB(c);
  const { page, limit } = c.req.valid("query");

  const offset = (page - 1) * limit;

  const result = await db.select().from(saves).limit(limit).offset(offset);

  return c.json({
    page: page,
    limit: limit,
    data: result,
  });
});

// GET all saves for a specific user (paginated)
savesRouter.get(
  "/:userId",
  zValidator("param", userIdSchema),
  zValidator("query", getSavesSchema),
  async (c) => {
    const { userId } = c.req.valid("param");
    const { page, limit } = c.req.valid("query");
    const offset = (page - 1) * limit;

    // Exclude the bulky 'content' column from the article data
    const { content, ...rest } = getTableColumns(articles);
    const db = getDB(c);

    const result = await db
      .select({ save: saves, article: { ...rest } })
      .from(saves)
      .leftJoin(articles, eq(saves.article_id, articles.id))
      .where(eq(saves.made_by, userId))
      .orderBy(desc(saves.timestamp)) // Sort by most recently created
      .limit(limit)
      .offset(offset);

    return c.json({
      page: page,
      limit: limit,
      data: result,
    });
  }
);

// POST a new save for a user
savesRouter.post(
  "/:userId",
  zValidator("param", userIdSchema),
  zValidator("json", postSaveSchema),
  async (c) => {
    const { userId } = c.req.valid("param");
    const { url } = c.req.valid("json");
    const db = getDB(c);

    // 1. Check if the article already exists in our database
    const [article] = await db
      .select()
      .from(articles)
      .where(eq(articles.url, url));

    if (article) {
      // Article exists, check if the user has already saved it
      const [checkSave] = await db
        .select()
        .from(saves)
        .where(
          and(eq(saves.made_by, userId), eq(saves.article_id, article.id))
        );

      if (checkSave) {
        throw new HTTPException(400, { message: "Article already saved" });
      }

      // Save the existing article to the user's saves
      const saveData: InferInsertModel<typeof saves> = {
        id: crypto.randomUUID(),
        made_by: userId,
        article_id: article.id,
      };

      const [savedSave] = await db.insert(saves).values(saveData).returning({
        id: saves.id,
      });

      return c.json(savedSave);
    } else {
      // Article does not exist, so parse it
      const parsedArticle = await parseArticle(url);

      if (
        !parsedArticle?.title ||
        !parsedArticle?.content ||
        !parsedArticle?.excerpt
      ) {
        throw new HTTPException(400, { message: "Unable to parse article" });
      }

      // 2. Save the newly parsed article to the 'articles' table
      const articleData: InferInsertModel<typeof articles> = {
        id: crypto.randomUUID(),
        url: url,
        title: parsedArticle.title,
        content: parsedArticle.content,
        excerpt: parsedArticle.excerpt,
        lang: parsedArticle.lang,
        publishedTime: parsedArticle.publishedTime,
        siteName: parsedArticle.siteName || "",
      };

      const [savedArticle] = await db
        .insert(articles)
        .values(articleData)
        .returning({ id: articles.id });

      // 3. Save the article reference to the 'saves' table for the user
      const saveData: InferInsertModel<typeof saves> = {
        id: crypto.randomUUID(),
        made_by: userId,
        article_id: savedArticle.id,
      };

      const [savedSave] = await db.insert(saves).values(saveData).returning({
        id: saves.id,
      });

      return c.json(savedSave);
    }
  }
);

// PATCH to archive a save
savesRouter.patch(
  "/:saveId/archive",
  zValidator("param", saveIdSchema),
  async (c) => {
    const { saveId } = c.req.valid("param");
    const db = getDB(c);

    const [updatedSave] = await db
      .update(saves)
      .set({ is_archived: true })
      .where(eq(saves.id, saveId))
      .returning({ save: saves });

    if (!updatedSave)
      throw new HTTPException(404, { message: "Save not found" });

    return c.json({
      message: "Save marked as archived",
      updatedSave,
    });
  }
);

// PATCH to unarchive a save
savesRouter.patch(
  "/:saveId/unarchive",
  zValidator("param", saveIdSchema),
  async (c) => {
    const { saveId } = c.req.valid("param");
    const db = getDB(c);

    const [updatedSave] = await db
      .update(saves)
      .set({ is_archived: false })
      .where(eq(saves.id, saveId))
      .returning({ save: saves });

    if (!updatedSave)
      throw new HTTPException(404, { message: "Save not found" });

    return c.json({
      message: "Save marked as unarchived",
      updatedSave,
    });
  }
);

// PATCH to favorite a save
savesRouter.patch(
  "/:saveId/favorite",
  zValidator("param", saveIdSchema),
  async (c) => {
    const { saveId } = c.req.valid("param");
    const db = getDB(c);

    const [updatedSave] = await db
      .update(saves)
      .set({ is_favorite: true })
      .where(eq(saves.id, saveId))
      .returning({ save: saves });

    if (!updatedSave)
      throw new HTTPException(404, { message: "Save not found" });

    return c.json({
      message: "Save marked as favorite",
      updatedSave,
    });
  }
);

// PATCH to unfavorite a save
savesRouter.patch(
  "/:saveId/unfavorite",
  zValidator("param", saveIdSchema),
  async (c) => {
    const { saveId } = c.req.valid("param");
    const db = getDB(c);

    const [updatedSave] = await db
      .update(saves)
      .set({ is_favorite: false })
      .where(eq(saves.id, saveId))
      .returning({ save: saves });

    if (!updatedSave)
      throw new HTTPException(404, { message: "Save not found" });

    return c.json({
      message: "Save marked as not favorite",
      updatedSave,
    });
  }
);

// PATCH to mark a save as read
savesRouter.patch(
  "/:saveId/mark-read",
  zValidator("param", saveIdSchema),
  async (c) => {
    const { saveId } = c.req.valid("param");
    const db = getDB(c);

    const [updatedSave] = await db
      .update(saves)
      .set({
        is_read: true,
        read_at: sql`CURRENT_TIMESTAMP`,
      })
      .where(eq(saves.id, saveId))
      .returning({ save: saves });

    if (!updatedSave)
      throw new HTTPException(404, { message: "Save not found" });

    return c.json({
      message: "Save marked as read",
      updatedSave: updatedSave.save,
    });
  }
);

// PATCH to mark a save as unread
savesRouter.patch(
  "/:saveId/mark-unread",
  zValidator("param", saveIdSchema),
  async (c) => {
    const { saveId } = c.req.valid("param");
    const db = getDB(c);

    const [updatedSave] = await db
      .update(saves)
      .set({
        is_read: false,
        read_at: null,
      })
      .where(eq(saves.id, saveId))
      .returning({ save: saves });

    if (!updatedSave)
      throw new HTTPException(404, { message: "Save not found" });

    return c.json({
      message: "Save marked as unread",
      updatedSave: updatedSave.save,
    });
  }
);

// DELETE a save
savesRouter.delete("/:saveId", zValidator("param", saveIdSchema), async (c) => {
  const { saveId } = c.req.valid("param");
  const db = getDB(c);

  const [deletedSave] = await db
    .delete(saves)
    .where(eq(saves.id, saveId))
    .returning({ id: saves.id });

  if (!deletedSave) {
    throw new HTTPException(404, { message: "Save not found" });
  }

  return c.json({
    message: "Save deleted successfully",
    deletedSave,
  });
});

// POST import from Pocket CSV
savesRouter.post(
  "/:userId/import",
  zValidator("param", userIdSchema),
  zValidator("json", importPocketSchema),
  async (c) => {
    const { userId } = c.req.valid("param");
    const { csvContent } = c.req.valid("json");
    const db = getDB(c);

    try {
      // Parse the CSV content
      const pocketData = parsePocketCsv(csvContent);

      if (pocketData.length === 0) {
        throw new HTTPException(400, { message: "No valid data found in CSV" });
      }

      let importedCount = 0;
      let skippedCount = 0;
      const errors: string[] = [];

      // Process each row
      for (const row of pocketData) {
        try {
          // Check if article already exists
          const [existingArticle] = await db
            .select()
            .from(articles)
            .where(eq(articles.url, row.url));

          let articleId: string;

          if (existingArticle) {
            articleId = existingArticle.id;
          } else {
            // Try to parse the article from the URL
            try {
              const parsedArticle = await parseArticle(row.url);

              if (!parsedArticle?.title || !parsedArticle?.content) {
                // If parsing fails, use the data from CSV
                const articleData: InferInsertModel<typeof articles> = {
                  id: crypto.randomUUID(),
                  url: row.url,
                  title: row.title || "Untitled",
                  content: `<p>Original article content could not be retrieved.</p><p><a href="${row.url}" target="_blank">View original article</a></p>`,
                  excerpt: row.title || "No excerpt available",
                  lang: "en",
                  publishedTime: null,
                  siteName: new URL(row.url).hostname,
                };

                const [newArticle] = await db
                  .insert(articles)
                  .values(articleData)
                  .returning({ id: articles.id });

                articleId = newArticle.id;
              } else {
                // Use parsed article data
                const articleData: InferInsertModel<typeof articles> = {
                  id: crypto.randomUUID(),
                  url: row.url,
                  title: parsedArticle.title,
                  content: parsedArticle.content,
                  excerpt: parsedArticle.excerpt || "",
                  lang: parsedArticle.lang,
                  publishedTime: parsedArticle.publishedTime,
                  siteName: parsedArticle.siteName || new URL(row.url).hostname,
                };

                const [newArticle] = await db
                  .insert(articles)
                  .values(articleData)
                  .returning({ id: articles.id });

                articleId = newArticle.id;
              }
            } catch (articleError) {
              // Fallback: create article with CSV data
              const articleData: InferInsertModel<typeof articles> = {
                id: crypto.randomUUID(),
                url: row.url,
                title: row.title || "Untitled",
                content: `<p>Original article content could not be retrieved.</p><p><a href="${row.url}" target="_blank">View original article</a></p>`,
                excerpt: row.title || "No excerpt available",
                lang: "en",
                publishedTime: null,
                siteName: new URL(row.url).hostname,
              };

              const [newArticle] = await db
                .insert(articles)
                .values(articleData)
                .returning({ id: articles.id });

              articleId = newArticle.id;
            }
          }

          // Check if user already has this article saved
          const [existingSave] = await db
            .select()
            .from(saves)
            .where(
              and(eq(saves.made_by, userId), eq(saves.article_id, articleId))
            );

          if (existingSave) {
            skippedCount++;
            continue;
          }

          // Create the save record
          const saveData: InferInsertModel<typeof saves> = {
            id: crypto.randomUUID(),
            made_by: userId,
            article_id: articleId,
            is_archived: row.status === "archive",
            is_favorite: false, // Pocket CSV doesn't include favorite status
            is_read: row.status === "archive", // Assume archived items were read
            read_at:
              row.status === "archive"
                ? convertUnixTimestamp(row.time_added)
                : null,
            timestamp: convertUnixTimestamp(row.time_added),
          };

          await db.insert(saves).values(saveData);
          importedCount++;
        } catch (rowError) {
          console.error(`Error processing row for URL ${row.url}:`, rowError);
          errors.push(`Failed to import: ${row.title || row.url}`);
        }
      }

      return c.json({
        success: true,
        message: `Import completed successfully!`,
        stats: {
          total: pocketData.length,
          imported: importedCount,
          skipped: skippedCount,
          errors: errors.length,
        },
        errors: errors.slice(0, 10), // Return first 10 errors
      });
    } catch (error) {
      console.error("Import error:", error);
      if (error instanceof HTTPException) {
        throw error;
      }
      throw new HTTPException(500, {
        message: "Failed to process import. Please try again.",
      });
    }
  }
);

export default savesRouter;
