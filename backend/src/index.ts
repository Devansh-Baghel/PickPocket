import { Hono } from "hono";
import { logger } from "hono/logger";
import { trimTrailingSlash } from "hono/trailing-slash";
import { cors } from "hono/cors";
import { secureHeaders } from "hono/secure-headers";
import { timeout } from "hono/timeout";
import { customLogger } from "./utils/utils";

import savesRouter from "./routes/saves.routes";
import articleRouter from "./routes/articles.routes";

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
app.use(logger(customLogger));
app.use(trimTrailingSlash());
app.use(timeout(8000));

// Routes
app.route("/saves", savesRouter);
app.route("/articles", articleRouter);

export default app;
