import { Hono } from "hono";
import { getDB } from "./db/db";
import { verifyAuth } from "./middlewares/verifyAuth";
import { saves } from "./db/schemas/saves";

export interface Env extends CloudflareBindings {
  DB: D1Database;
  AUTH_TOKEN: string;
}

const app = new Hono<{ Bindings: Env }>();

app.get(
  "/saves",
  // verifyAuth,
  async (c) => {
    const db = getDB(c);
    const result = await db.select().from(saves).all();
    return c.json(result);
  }
);

export default app;
