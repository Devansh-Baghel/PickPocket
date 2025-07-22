import { z } from 'zod';

export const postSaveSchema = z.object({
  url: z.string().url({ message: "Invalid URL format" }),
});

export const getSavesSchema = z.object({
    page: z.coerce.number().int().min(1).optional().default(1),
    limit: z.coerce.number().int().min(1).max(100).optional().default(10),
});

export const userIdSchema = z.object({
    userId: z.string(),
});

export const saveIdSchema = z.object({
    saveId: z.string(),
});
