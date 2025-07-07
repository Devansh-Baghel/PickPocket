import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authClient } from "~/lib/auth-client";

interface AuthState {
  session: any | null;
  loading: boolean;
  getSession: () => Promise<void>;
  signIn: () => void;
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

      signIn: () => {
        authClient.signIn.social({ provider: "github" });
      },

      signOut: async () => {
        await authClient.signOut({});
        set({ session: null });
      },
    }),
    {
      name: "auth-store", // localStorage key
      partialize: (state) => ({ session: state.session }), // only persist session
    }
  )
);
