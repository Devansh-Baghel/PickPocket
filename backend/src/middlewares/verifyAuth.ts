import { Context, Next } from "hono";
import { bearerAuth } from "hono/bearer-auth";
import { Env } from "..";

export async function verifyAuth(c: Context<{ Bindings: Env }>, next: Next) {
  const auth = bearerAuth({ token: c.env.AUTH_TOKEN });
  return auth(c, next);
}
