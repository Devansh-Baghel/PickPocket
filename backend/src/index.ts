import { Hono } from "hono";
import { logger } from "hono/logger";
import { trimTrailingSlash } from "hono/trailing-slash";
import { cors } from "hono/cors";
import { secureHeaders } from "hono/secure-headers";
import { timeout } from "hono/timeout";
import { customLogger } from "./utils/utils";
import { verifyAuth } from "./middlewares/verifyAuth";

import savesRouter from "./routes/saves.routes";
import articleRouter from "./routes/articles.routes";
import highlightsRouter from "./routes/highlights.routes";
import profileRouter from "./routes/profile.routes";

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

// Global auth middleware
app.use(verifyAuth);

// Routes
app.route("/saves", savesRouter);
app.route("/articles", articleRouter);
app.route("/highlights", highlightsRouter);
app.route("/profile", profileRouter);

export default app;
