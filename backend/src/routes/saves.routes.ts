import { Hono } from "hono";
import { Env } from "..";
import {
  deleteSave,
  getSaves,
  getSavesByUser,
  postSave,
  toggleArchived,
  toggleFavorite,
  toggleRead,
} from "@/controllers/saves.controller";

const savesRouter = new Hono<{ Bindings: Env }>();

savesRouter.get("/", getSaves);
savesRouter.get("/:userId", getSavesByUser);
savesRouter.post("/:userId", postSave);
savesRouter.patch("/:saveId/archive", async (c) => toggleArchived(c, true));
savesRouter.patch("/:saveId/unarchive", async (c) => toggleArchived(c, false));
savesRouter.patch("/:saveId/favorite", async (c) => toggleFavorite(c, true));
savesRouter.patch("/:saveId/unfavorite", async (c) => toggleFavorite(c, false));
savesRouter.delete("/:saveId", deleteSave);
savesRouter.patch("/:saveId/mark-read", async (c) => toggleRead(c, true));
savesRouter.patch("/:saveId/mark-unread", async (c) => toggleRead(c, false));

export default savesRouter;
