import { Hono } from "hono";
import { logger } from "hono/logger";
import { trimTrailingSlash } from "hono/trailing-slash";

import savesRouter from "./routes/saves.routes";
import articleRouter from "./routes/articles.routes";
import { cors } from "hono/cors";
import { secureHeaders } from "hono/secure-headers";

export interface Env extends CloudflareBindings {
  DB: D1Database;
  AUTH_TOKEN: string;
}

const app = new Hono<{ Bindings: Env }>();

// Middlewares
app.use(
  cors({
    // TODO: add CORS origins for the frontend
    origin: ["http://localhost:5173"],
  })
);
app.use(secureHeaders());
app.use(logger());
app.use(trimTrailingSlash());

// Routes
app.route("/saves", savesRouter);
app.route("/articles", articleRouter);

export default app;
