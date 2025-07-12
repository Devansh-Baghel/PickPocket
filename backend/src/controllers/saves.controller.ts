import { getDB } from "@/db/db";
import { articles } from "@/db/schemas/articles";
import { saves } from "@/db/schemas/saves";
import { Context } from "@/types/types";
import { Readability } from "@paoramen/cheer-reader";
import * as cheerio from "cheerio";
import { and, eq, getTableColumns, InferInsertModel } from "drizzle-orm";
import { HTTPException } from "hono/http-exception";


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

export async function getSavesByUser(c: Context) {
  const userId = c.req.param("userId");

  if (!userId) throw new HTTPException(400, { message: "userId is required" });

  // This is required to exclude the article content from the response
  const { content, ...rest } = getTableColumns(articles);

  const db = getDB(c);
  const result = await db
    .select({ save: saves, article: { ...rest } })
    .from(saves)
    .leftJoin(articles, eq(saves.article_id, articles.id))
    .where(eq(saves.made_by, userId))
    .all();

  return c.json(result);
}

async function parseArticle(url: string) {
  const htmlString = await fetch(url).then((res) => res.text());
  const $ = cheerio.load(htmlString);
  const parsedArticle = new Readability($).parse();

  console.log(parsedArticle.title);
  console.log(parsedArticle.content);
  console.log(parsedArticle.siteName);
  console.log(parsedArticle.excerpt);

  return parsedArticle;
}

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

  return c.json(updatedSave);
}

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

  return c.json(updatedSave);
}