import { Hono } from "hono";
import { logger } from "hono/logger";
import { trimTrailingSlash } from "hono/trailing-slash";

import savesRouter from "./routes/saves.routes";
import articleRouter from "./routes/articles.routes";

export interface Env extends CloudflareBindings {
  DB: D1Database;
  AUTH_TOKEN: string;
}

const app = new Hono<{ Bindings: Env }>();

// Middlewares
app.use(logger());
app.use(trimTrailingSlash());

// Routes
app.route("/saves", savesRouter);
app.route("/articles", articleRouter);

export default app;
