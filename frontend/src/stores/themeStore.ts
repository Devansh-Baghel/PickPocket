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
  | "charcoal"
  | "theme-8008"
  | "serika"
  | "gruvbox-dark"
  | "dracula"
  | "github"
  | "nord"
  | "catppuccin";

export const themes: Array<{
  key: Theme;
  name: string;
}> = [
  // Original themes
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
    key: "nord",
    name: "Nord",
  },
  {
    key: "catppuccin",
    name: "Catppuccin",
  },
  {
    key: "github",
    name: "Github",
  },
  {
    key: "serika",
    name: "Serika",
  },
  {
    key: "gruvbox-dark",
    name: "Gruvbox Dark",
  },
  {
    key: "dracula",
    name: "Dracula",
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
