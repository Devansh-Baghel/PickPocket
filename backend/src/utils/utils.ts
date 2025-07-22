import { Readability } from "@paoramen/cheer-reader";
import { HTTPException } from "hono/http-exception";
import * as cheerio from "cheerio";

export const customLogger = (message: string, ...rest: string[]) => {
  console.log(message, ...rest);
};

export async function parseArticle(url: string) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new HTTPException(400, {
        message: `Failed to fetch article with status: ${res.status}`,
      });
    }
    const htmlString = await res.text();

    const $ = cheerio.load(htmlString);
    const parsedArticle = new Readability($).parse();
    return parsedArticle;
  } catch (error) {
    if (error instanceof HTTPException) {
      throw error;
    }

    console.error("Error in parseArticle:", error);
    throw new HTTPException(500, {
      message: "Failed to parse the article content.",
    });
  }
}