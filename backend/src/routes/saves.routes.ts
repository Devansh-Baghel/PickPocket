import { Hono } from "hono";
import { Env } from "..";
import {
  deleteSave,
  getSaves,
  getSavesByUser,
  postSave,
  toggleArchived,
  toggleFavorite,
} from "@/controllers/saves.controller";

const savesRouter = new Hono<{ Bindings: Env }>();

/*
    SAVES API
    GET / get all saves
    POST /:userid add one save
*/

// TODO: add auth middleware to all of these, rando user shoud'nt see all saves
savesRouter.get("/", getSaves);
savesRouter.get("/:userId", getSavesByUser);
savesRouter.post("/:userId", postSave);
savesRouter.patch("/:saveId/archive", async (c) => toggleArchived(c, true));
savesRouter.patch("/:saveId/unarchive", async (c) => toggleArchived(c, false));
savesRouter.patch("/:saveId/favorite", async (c) => toggleFavorite(c, true));
savesRouter.patch("/:saveId/unfavorite", async (c) => toggleFavorite(c, false));
savesRouter.delete("/:saveId", deleteSave);

// Protected Routes

export default savesRouter;
