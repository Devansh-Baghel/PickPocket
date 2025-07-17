import { getDB } from "@/db/db";
import { articles } from "@/db/schemas/articles";
import { saves } from "@/db/schemas/saves";
import { Context } from "@/types/types";
import { parseArticle } from "@/utils/utils";
import { and, eq, getTableColumns, InferInsertModel, sql } from "drizzle-orm";
import { HTTPException } from "hono/http-exception";

/**
 * Retrieves a paginated list of saves from the database.
 *
 * Parses and validates `page` and `limit` query parameters, applies pagination, and returns the corresponding saves as a JSON response.
 */
export async function getSaves(c: Context) {
  const db = getDB(c);

  // Parse `page` and `limit` from query params
  const page = parseInt(c.req.query("page") || "1", 10);
  const limit = parseInt(c.req.query("limit") || "10", 10);

  // Validate
  const safePage = page > 0 ? page : 1;
  const safeLimit = limit > 0 && limit <= 100 ? limit : 10;

  const offset = (safePage - 1) * safeLimit;

  const result = await db.select().from(saves).limit(safeLimit).offset(offset);

  return c.json({
    page: safePage,
    limit: safeLimit,
    data: result,
  });
}

/**
 * Retrieves a paginated list of saves for a specific user, including associated article metadata but excluding article content.
 *
 * Throws a 400 error if `userId` is missing from the route parameters.
 * Returns a JSON object containing the current page, limit, and an array of save-article pairs.
 */
export async function getSavesByUser(c: Context) {
  const userId = c.req.param("userId");
  if (!userId) throw new HTTPException(400, { message: "userId is required" });

  // Parse `page` and `limit` from query params
  const page = parseInt(c.req.query("page") || "1", 10);
  const limit = parseInt(c.req.query("limit") || "10", 10);

  // Validate
  const safePage = page > 0 ? page : 1;
  const safeLimit = limit > 0 && limit <= 100 ? limit : 10;

  const offset = (safePage - 1) * safeLimit;

  // Exclude article `content`
  const { content, ...rest } = getTableColumns(articles);

  const db = getDB(c);

  const result = await db
    .select({ save: saves, article: { ...rest } })
    .from(saves)
    .leftJoin(articles, eq(saves.article_id, articles.id))
    .where(eq(saves.made_by, userId))
    .limit(safeLimit)
    .offset(offset);

  return c.json({
    page: safePage,
    limit: safeLimit,
    data: result,
  });
}

/**
 * Saves an article for a user, parsing and storing the article if it does not already exist.
 *
 * If the article with the given URL exists, links it to the user unless already saved. If not, parses the article, stores its metadata, and then links it to the user. Throws a 400 error if required fields are missing or the article cannot be parsed, or if the article is already saved by the user.
 *
 * @returns The ID of the newly created save record as a JSON object.
 */
export async function postSave(c: Context) {
  const userId = c.req.param("userId");
  const { url } = await c.req.json<{ url: string }>();

  if (!url) throw new HTTPException(400, { message: "url is required" });
  if (!userId) throw new HTTPException(400, { message: "userId is required" });

  const db = getDB(c);

  // If articles is already parsed by @cheerio then just get it.
  const [article] = await db
    .select()
    .from(articles)
    .where(eq(articles.url, url));

  if (article) {
    // Check if article is already saved by user
    const [checkSave] = await db
      .select()
      .from(saves)
      .where(and(eq(saves.made_by, userId), eq(saves.article_id, article.id)));

    if (checkSave) {
      throw new HTTPException(400, { message: "Article already saved" });
    }
    // Save the article to saves table
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
    // Parse the article first by @cheerio then save it to articles table then to saves table
    const parsedArticle = await parseArticle(url);

    if (
      !parsedArticle ||
      !parsedArticle.title ||
      !parsedArticle.content ||
      // !parsedArticle.siteName ||
      !parsedArticle.excerpt
    ) {
      throw new HTTPException(400, { message: "Unable to parse article" });
    }

    // Save to articles table
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
      .returning({ id: articles.id, title: articles.title });

    // Save to saves table
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

/**
 * Updates the archived status of a save and returns the updated save with a status message.
 *
 * @param archived - Whether to mark the save as archived (`true`) or unarchived (`false`)
 * @returns An object containing a descriptive message and the updated save record
 */
export async function toggleArchived(c: Context, archived: boolean) {
  const saveId = c.req.param("saveId");

  if (!saveId) throw new HTTPException(400, { message: "saveId is required" });

  const db = getDB(c);

  const [updatedSave] = await db
    .update(saves)
    .set({ is_archived: archived })
    .where(eq(saves.id, saveId))
    .limit(1)
    .returning({ save: saves });

  if (!updatedSave) throw new HTTPException(404, { message: "Save not found" });

  return c.json({
    message: archived ? "Save marked as archived" : "Save marked as unarchived",
    updatedSave,
  });
}

/**
 * Updates the favorite status of a save and returns a message with the updated save.
 *
 * Throws a 400 error if `saveId` is missing and a 404 error if the save does not exist.
 *
 * @param favorite - Whether to mark the save as favorite (`true`) or not favorite (`false`)
 * @returns An object containing a descriptive message and the updated save record
 */
export async function toggleFavorite(c: Context, favorite: boolean) {
  const saveId = c.req.param("saveId");

  if (!saveId) throw new HTTPException(400, { message: "saveId is required" });

  const db = getDB(c);

  const [updatedSave] = await db
    .update(saves)
    .set({ is_favorite: favorite })
    .where(eq(saves.id, saveId))
    .limit(1)
    .returning({ save: saves });

  if (!updatedSave) throw new HTTPException(404, { message: "Save not found" });

  return c.json({
    message: favorite
      ? "Save marked as favorite"
      : "Save marked as not favorite",
    updatedSave,
  });
}

/**
 * Deletes a save record by its ID and returns a confirmation message with the deleted save's ID.
 *
 * Throws a 400 error if `saveId` is missing and a 404 error if the save does not exist.
 */
export async function deleteSave(c: Context) {
  const saveId = c.req.param("saveId");

  if (!saveId) throw new HTTPException(400, { message: "saveId is required" });

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
}

/**
 * Updates the read status and timestamp of a save by its ID.
 *
 * Marks the specified save as read or unread and updates the `read_at` timestamp accordingly. Returns a JSON response with a message and the updated save object.
 */
export async function toggleRead(c: Context, read: boolean) {
  const saveId = c.req.param("saveId");

  if (!saveId) throw new HTTPException(400, { message: "saveId is required" });

  const db = getDB(c);

  const [updatedSave] = await db
    .update(saves)
    .set({
      is_read: read,
      read_at: read ? sql`CURRENT_TIMESTAMP` : null,
    })
    .where(eq(saves.id, saveId))
    .limit(1)
    .returning({ save: saves });

  if (!updatedSave) throw new HTTPException(404, { message: "Save not found" });

  return c.json({
    message: read ? "Save marked as read" : "Save marked as unread",
    updatedSave: updatedSave.save,
  });
}
