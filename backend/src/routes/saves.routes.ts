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
import { zValidator } from "@hono/zod-validator";
import { getSavesSchema, postSaveSchema, saveIdSchema, userIdSchema } from "@/validators/saves";

const savesRouter = new Hono<{ Bindings: Env }>();

savesRouter.get("/", zValidator("query", getSavesSchema), getSaves);
savesRouter.get("/:userId", zValidator("param", userIdSchema), zValidator("query", getSavesSchema), getSavesByUser);
savesRouter.post("/:userId", zValidator("param", userIdSchema), zValidator("json", postSaveSchema), postSave);
savesRouter.patch("/:saveId/archive", zValidator("param", saveIdSchema), async (c) => toggleArchived(c, true));
savesRouter.patch("/:saveId/unarchive", zValidator("param", saveIdSchema), async (c) => toggleArchived(c, false));
savesRouter.patch("/:saveId/favorite", zValidator("param", saveIdSchema), async (c) => toggleFavorite(c, true));
savesRouter.patch("/:saveId/unfavorite", zValidator("param", saveIdSchema), async (c) => toggleFavorite(c, false));
savesRouter.delete("/:saveId", zValidator("param", saveIdSchema), deleteSave);
savesRouter.patch("/:saveId/mark-read", zValidator("param", saveIdSchema), async (c) => toggleRead(c, true));
savesRouter.patch("/:saveId/mark-unread", zValidator("param", saveIdSchema), async (c) => toggleRead(c, false));

export default savesRouter;
