import { z } from 'zod';

export const postSaveSchema = z.object({
  url: z.string().url({ message: "Invalid URL format" }),
});

export const getSavesSchema = z.object({
    page: z.string().optional().default("1"),
    limit: z.string().optional().default("10"),
});

export const userIdSchema = z.object({
    userId: z.string(),
});

export const saveIdSchema = z.object({
    saveId: z.string(),
});
