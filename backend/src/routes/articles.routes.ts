import { Hono } from "hono";
import { Env } from "..";
import { getArticle, refreshArticle } from "@/controllers/articles.controller";

const articleRouter = new Hono<{ Bindings: Env }>();

articleRouter.get("/:articleId", getArticle);
articleRouter.patch("/:articleId", refreshArticle);

export default articleRouter;
