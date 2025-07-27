import { BetterAuthOptions } from 'better-auth';
import { magicLink } from 'better-auth/plugins';

/**
 * Custom options for Better Auth
 *
 * Docs: https://www.better-auth.com/docs/reference/options
 */
export const betterAuthOptions: BetterAuthOptions = {
  /**
   * The name of the application.
   */
  appName: "PickPocket",
  /**
   * Base path for Better Auth.
   * @default "/api/auth"
   */
  basePath: "/api",
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, token, url }, request) => {
        // send email to user
      },
    }),
  ],
  // .... More options
};