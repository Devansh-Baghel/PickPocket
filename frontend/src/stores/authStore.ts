import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authClient } from "@/lib/auth-client";

interface AuthState {
  session: any | null;
  loading: boolean;
  getSession: () => Promise<void>;
  signInGithub: () => void;
  signInGoogle: () => void;
  signInMagicLink: (
    email: string,
    name?: string
  ) => Promise<{ success: boolean; error?: string }>;
  signOut: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      session: null,
      loading: true,

      getSession: async () => {
        set({ loading: true });
        const { data } = await authClient.getSession();
        set({ session: data, loading: false });
      },

      signInGithub: () => {
        authClient.signIn.social({
          provider: "github",
          callbackURL: "http://localhost:3000/app",
        });
      },

      signInGoogle: () => {
        authClient.signIn.social({
          provider: "google",
          callbackURL: "http://localhost:3000/app",
        });
      },

      signInMagicLink: async (email: string, name?: string) => {
        try {
          const { data, error } = await authClient.signIn.magicLink({
            email,
            name,
            callbackURL: "http://localhost:3000/app",
          });

          if (error) {
            return { success: false, error: error.message };
          }

          return { success: true };
        } catch (error) {
          return { success: false, error: "Failed to send magic link" };
        }
      },

      signOut: async () => {
        await authClient.signOut({});
        set({ session: null });
      },
    }),
    {
      name: "auth-store",
      partialize: (state) => ({ session: state.session }),
    }
  )
);
