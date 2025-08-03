import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Theme =
  | "solar"
  | "citrus"
  | "emerald"
  | "sky"
  | "sky-dark"
  | "lavender"
  | "mint"
  | "midnight"
  | "charcoal";

export const themes: Array<{
  key: Theme;
  name: string;
}> = [
  {
    key: "solar",
    name: "Solar",
  },
  {
    key: "citrus",
    name: "Citrus",
  },
  {
    key: "emerald",
    name: "Emerald",
  },
  {
    key: "sky",
    name: "Sky",
  },
  {
    key: "lavender",
    name: "Lavender",
  },
  {
    key: "mint",
    name: "Mint",
  },
  {
    key: "sky-dark",
    name: "Sky Dark",
  },
  {
    key: "midnight",
    name: "Midnight",
  },
  {
    key: "charcoal",
    name: "Charcoal",
  },
];

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
