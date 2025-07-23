import { betterAuth } from "better-auth";
import Database from "better-sqlite3";
import { reactStartCookies } from "better-auth/react-start";

export const auth = betterAuth({
  database: new Database("./sqlite.db"),
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [reactStartCookies()], // make sure this is the last plugin in the array
});
