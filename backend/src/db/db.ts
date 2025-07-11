import { Context } from "@/types/types";
import { drizzle } from "drizzle-orm/d1";

export function getDB(c: Context) {
  return drizzle(c.env.DB, { logger: true });
}
