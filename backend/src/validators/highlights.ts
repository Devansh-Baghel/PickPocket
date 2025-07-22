import { z } from 'zod';

export const postHighlightSchema = z.object({
  content: z.string(),
  prefix: z.string(),
  suffix: z.string(),
  article_id: z.string(),
});

export const getHighlightsSchema = z.object({
    page: z.coerce.number().int().min(1).optional().default(1),
    limit: z.coerce.number().int().min(1).max(100).optional().default(10),
});

export const userIdSchema = z.object({
    userId: z.string(),
});

export const highlightIdSchema = z.object({
    highlightId: z.string(),
});

export const articleIdSchema = z.object({
    articleId: z.string(),
});
