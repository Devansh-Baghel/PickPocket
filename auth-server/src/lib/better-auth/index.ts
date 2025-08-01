import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { betterAuth } from 'better-auth';
import { betterAuthOptions, sendMagicLinkEmail } from "./options";
import { user, account, session, verification } from "../../db/schema";
import { magicLink } from "better-auth/plugins";

// Better Auth Instance
export const auth = (
  env: CloudflareBindings
): ReturnType<typeof betterAuth> => {
  const sql = neon(env.DATABASE_URL);
  const db = drizzle(sql);

  return betterAuth({
    ...betterAuthOptions,
    database: drizzleAdapter(db, {
      provider: "pg",
      schema: {
        user,
        session,
        account,
        verification,
      },
    }),
    baseURL: env.BETTER_AUTH_URL,
    secret: env.BETTER_AUTH_SECRET,
    socialProviders: {
      github: {
        clientId: env.GITHUB_CLIENT_ID,
        clientSecret: env.GITHUB_CLIENT_SECRET,
      },
      google: {
        clientId: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET,
      },
    },
    plugins: [
      magicLink({
        sendMagicLink: async ({ email, token, url }, request) => {
          await sendMagicLinkEmail(email, url, env.RESEND_API_KEY);
        },
        expiresIn: 10 * 60, // 10 minutes
      }),
    ],
    trustedOrigins: ["http://localhost:3000"],

    // Additional options that depend on env ...
  });
};