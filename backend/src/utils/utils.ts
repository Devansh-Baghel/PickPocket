import { Readability } from "@paoramen/cheer-reader";
import * as cheerio from "cheerio";

export const customLogger = (message: string, ...rest: string[]) => {
  console.log(message, ...rest);
};

export async function parseArticle(url: string) {
  const htmlString = await fetch(url).then((res) => res.text());
  const $ = cheerio.load(htmlString);
  const parsedArticle = new Readability($).parse();

  return parsedArticle;
}