import { Context } from "hono";
import { Env } from "..";
import { drizzle } from "drizzle-orm/d1";

export function getDB(c: Context<{Bindings: Env}>) {
    return drizzle(c.env.DB, { logger: true });
}