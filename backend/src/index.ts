import { drizzle } from "drizzle-orm/d1";
import { Hono } from "hono";
import { posts } from "./db/schema";

export interface Env extends CloudflareBindings {
  DB: D1Database;
}

const app = new Hono<{ Bindings: Env }>();

app.get("/posts", async (c) => {
  const db = drizzle(c.env.DB, { logger: true });
  const result = await db.select().from(posts).all();
  return c.json(result);
});

export default app;
