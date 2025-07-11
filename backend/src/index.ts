import { Hono } from "hono";
import savesRouter from "./routes/saves.routes";

export interface Env extends CloudflareBindings {
  DB: D1Database;
  AUTH_TOKEN: string;
}

const app = new Hono<{ Bindings: Env }>();

app.route("/saves", savesRouter);

export default app;
