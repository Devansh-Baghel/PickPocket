import { Hono } from "hono";
import { Env } from "..";
import { getSaves, getSavesByUser } from "@/controllers/saves.controller";

const savesRouter = new Hono<{ Bindings: Env }>();

/*
    SAVES API
    GET / get all saves
    POST /:userid add one save
*/

// TODO: add auth middleware to all of these, rando user shoud'nt see all saves
savesRouter.get("/", getSaves);
savesRouter.get("/:userId", getSavesByUser);
// savesRouter.post("/:userId", postSave);

// Protected Routes

export default savesRouter;
