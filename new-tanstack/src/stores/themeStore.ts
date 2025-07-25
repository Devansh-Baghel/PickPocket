import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Theme = "solar" | "citrus";

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: "solar",
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "theme-storage", // key in localStorage
    }
  )
);
