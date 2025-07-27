import { z } from 'zod';

export const userIdSchema = z.object({
  userId: z.string(),
});

export const preferencesSchema = z.object({
  autoArchive: z.boolean(),
  emailNotifications: z.boolean(),
  readingReminders: z.boolean(),
});

export const updateProfileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
});
