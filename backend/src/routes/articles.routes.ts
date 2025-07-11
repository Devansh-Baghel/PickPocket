import { Hono } from "hono";
import { Env } from "..";

const articleRouter = new Hono<{ Bindings: Env }>();

articleRouter.get("/", async (c) => {});
