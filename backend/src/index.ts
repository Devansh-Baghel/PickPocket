import { Hono } from "hono";
import { posts } from "./db/schema";
import { getDB } from "./db/db";
import { verifyAuth } from "./middlewares/verifyAuth";
import { bearerAuth } from "hono/bearer-auth";

export interface Env extends CloudflareBindings {
  DB: D1Database;
  AUTH_TOKEN: string;
}

const app = new Hono<{ Bindings: Env }>();

app.get(
  "/posts",
  verifyAuth,
  async (c) => {
    console.log("You are authenticated");
    const db = getDB(c);
    const result = await db.select().from(posts).all();
    return c.json(result);
  }
);

export default app;
