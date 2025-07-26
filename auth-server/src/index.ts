import { Hono } from "hono";
import { auth } from "./lib/better-auth";
import { cors } from "hono/cors";

const app = new Hono<{ Bindings: CloudflareBindings }>();

// Middlewares
app.use(
  "*",
  cors({
    // TODO: add CORS origins for the frontend
    origin: ["http://localhost:3000"],
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  })
);

app.on(["GET", "POST"], "/api/*", (c) => {
  return auth(c.env).handler(c.req.raw);
});

export default app;
