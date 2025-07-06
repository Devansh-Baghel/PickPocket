import { Hono } from "hono";
import { posts } from "./db/schema";
import { getDB } from "./db/db";

export interface Env extends CloudflareBindings {
  DB: D1Database;
}

const app = new Hono<{ Bindings: Env }>();

app.get("/posts", async (c) => {
  const db = getDB(c);
  const result = await db.select().from(posts).all();
  return c.json(result);
});

export default app;
