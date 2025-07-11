import { defineConfig } from "drizzle-kit";
import fs from "fs";
import path from "path";

// Have to setup this config in this stupid way because otherwise drizzle-kit just connects to the prod db
// https://github.com/drizzle-team/drizzle-orm/discussions/1545#discussioncomment-9642932
function getLocalD1DB() {
  try {
    const basePath = path.resolve(".wrangler");
    const dbFile = fs
      .readdirSync(basePath, { encoding: "utf-8", recursive: true })
      .find((f) => f.endsWith(".sqlite"));

    if (!dbFile) {
      throw new Error(`.sqlite file not found in ${basePath}`);
    }

    const url = path.resolve(basePath, dbFile);
    return url;
  } catch (err) {
    console.log(`Error  ${err}`);
  }
}

export default defineConfig({
  dialect: "sqlite",
  schema: "./src/db/schemas/*",
  out: "./src/db/migrations",
  verbose: true,
  strict: true,
  ...(process.env.NODE_ENV === "production"
    ? {
        driver: "d1-http",
        dbCredentials: {
          accountId: process.env.CLOUDFLARE_ACCOUNT_ID,
          databaseId: process.env.CLOUDFLARE_DATABASE_ID,
          token: process.env.CLOUDFLARE_D1_TOKEN,
        },
      }
    : {
        dbCredentials: {
          url: getLocalD1DB(),
        },
      }),
});
