import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { HTTPException } from "hono/http-exception";
import { eq, count, sql } from "drizzle-orm";

import { Env } from "..";
import { getDB } from "@/db/db";
import { saves } from "@/db/schemas/saves";
import { articles } from "@/db/schemas/articles";
import { highlights } from "@/db/schemas/highlights";
import { preferencesSchema, userIdSchema } from "@/validators/profile";

const profileRouter = new Hono<{ Bindings: Env }>();

// GET user profile statistics
profileRouter.get(
  "/:userId/stats",
  zValidator("param", userIdSchema),
  async (c) => {
    const { userId } = c.req.valid("param");
    const db = getDB(c);

    try {
      // Get total saves count
      const [totalSavesResult] = await db
        .select({ count: count() })
        .from(saves)
        .where(eq(saves.made_by, userId));

      // Get read articles count
      const [readArticlesResult] = await db
        .select({ count: count() })
        .from(saves)
        .where(sql`${saves.made_by} = ${userId} AND ${saves.is_read} = true`);

      // Get favorites count
      const [favoritesResult] = await db
        .select({ count: count() })
        .from(saves)
        .where(
          sql`${saves.made_by} = ${userId} AND ${saves.is_favorite} = true`
        );

      // Get archived count
      const [archivedResult] = await db
        .select({ count: count() })
        .from(saves)
        .where(
          sql`${saves.made_by} = ${userId} AND ${saves.is_archived} = true`
        );

      // Get highlights count
      const [highlightsResult] = await db
        .select({ count: count() })
        .from(highlights)
        .where(eq(highlights.made_by, userId));

      // Get recent reading activity (last 7 days)
      const sevenDaysAgo = new Date(
        Date.now() - 7 * 24 * 60 * 60 * 1000
      ).toISOString();
      const [recentReadsResult] = await db
        .select({ count: count() })
        .from(saves)
        .where(
          sql`${saves.made_by} = ${userId} AND ${saves.is_read} = true AND ${saves.read_at} >= ${sevenDaysAgo}`
        );

      // Get reading streak (simplified - you might want a more sophisticated calculation)
      const [firstSave] = await db
        .select({ timestamp: saves.timestamp })
        .from(saves)
        .where(eq(saves.made_by, userId))
        .orderBy(saves.timestamp)
        .limit(1);

      const stats = {
        totalSaves: totalSavesResult.count,
        articlesRead: readArticlesResult.count,
        favorites: favoritesResult.count,
        archived: archivedResult.count,
        highlights: highlightsResult.count,
        thisWeekReads: recentReadsResult.count,
        joinDate: firstSave?.timestamp || new Date().toISOString(),
        // These would need more complex calculations in a real app
        avgReadingTime: "12 min", // Placeholder
        readingStreak: 7, // Placeholder
      };

      return c.json(stats);
    } catch (error) {
      console.error("Error fetching profile stats:", error);
      throw new HTTPException(500, {
        message: "Failed to fetch profile statistics",
      });
    }
  }
);

// GET/PUT user preferences
profileRouter.get(
  "/:userId/preferences",
  zValidator("param", userIdSchema),
  async (c) => {
    // For now, return default preferences
    // In a real app, you'd store these in a database
    const preferences = {
      autoArchive: true,
      emailNotifications: false,
      readingReminders: true,
    };

    return c.json(preferences);
  }
);

profileRouter.put(
  "/:userId/preferences",
  zValidator("param", userIdSchema),
  zValidator("json", preferencesSchema),
  async (c) => {
    const { userId } = c.req.valid("param");
    const preferences = c.req.valid("json");

    // TODO: Store preferences in database
    // For now, just return the updated preferences

    return c.json({
      message: "Preferences updated successfully",
      preferences,
    });
  }
);

export default profileRouter;
