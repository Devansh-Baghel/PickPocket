import { Hono } from "hono";
import { Env } from "..";
import { getArticle } from "@/controllers/articles.controller";

const articleRouter = new Hono<{ Bindings: Env }>();

articleRouter.get("/:articleId", getArticle);

export default articleRouter;
