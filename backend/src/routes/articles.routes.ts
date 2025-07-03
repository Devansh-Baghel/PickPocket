import { Hono } from "hono";
import { Env } from "..";

const articleRouter = new Hono<{ Bindings: Env }>();

/*
    Article API
    GET / get all articles
    POST / add one article
    GET /:id get article with id


*/

articleRouter.get("/", async (c) => {});
