import { Hono } from "hono";
import { Env } from "..";
import { getArticle, refreshArticle } from "@/controllers/articles.controller";
import { zValidator } from "@hono/zod-validator";
import { articleIdSchema } from "@/validators/articles";

const articleRouter = new Hono<{ Bindings: Env }>();

articleRouter.get("/:articleId", zValidator("param", articleIdSchema), getArticle);
articleRouter.patch("/:articleId", zValidator("param", articleIdSchema), refreshArticle);

export default articleRouter;
