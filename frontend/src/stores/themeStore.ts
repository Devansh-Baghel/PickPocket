import { create } from "zustand";
import { persist } from "zustand/middleware";
import { loadTheme, isThemeLoaded, type ThemeKey } from "@/utils/themeLoader";

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
  | "serika"
  | "gruvbox-dark"
  | "dracula"
  | "github"
  | "nord"
  | "catppuccin";

export const themes: Array<{
  key: Theme;
  name: string;
  description?: string;
}> = [
  // Light themes
  {
    key: "solar",
    name: "Solar",
    description: "Warm and energetic light theme",
  },
  {
    key: "citrus",
    name: "Citrus",
    description: "Fresh and vibrant green theme",
  },
  {
    key: "emerald",
    name: "Emerald",
    description: "Elegant emerald green theme",
  },
  { key: "sky", name: "Sky", description: "Clean sky blue theme" },
  { key: "lavender", name: "Lavender", description: "Soft purple theme" },
  { key: "mint", name: "Mint", description: "Cool mint green theme" },

  // Popular themes
  {
    key: "nord",
    name: "Nord",
    description: "Arctic, north-bluish clean theme",
  },
  {
    key: "catppuccin",
    name: "Catppuccin",
    description: "Soothing pastel theme",
  },
  { key: "github", name: "Github", description: "GitHub's signature theme" },
  { key: "serika", name: "Serika", description: "Warm yellow typing theme" },
  {
    key: "gruvbox-dark",
    name: "Gruvbox Dark",
    description: "Retro groove dark theme",
  },
  { key: "dracula", name: "Dracula", description: "Dark theme for vampires" },

  // Dark themes
  {
    key: "sky-dark",
    name: "Sky Dark",
    description: "Dark variant of Sky theme",
  },
  { key: "midnight", name: "Midnight", description: "Deep dark blue theme" },
  { key: "charcoal", name: "Charcoal", description: "Professional dark theme" },
];

interface ThemeStore {
  theme: Theme;
  loading: boolean;
  error: string | null;
  setTheme: (theme: Theme) => Promise<void>;
  clearError: () => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: "solar",
      loading: false,
      error: null,

      setTheme: async (theme: Theme) => {
        // Don't reload if already the current theme
        if (get().theme === theme) return;

        set({ loading: true, error: null });

        try {
          // Check if theme is already loaded to avoid duplicate requests
          if (!isThemeLoaded(theme as ThemeKey)) {
            await loadTheme(theme as ThemeKey);
          }

          set({ theme, loading: false });
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Failed to load theme";
          console.error(`Failed to set theme: ${theme}`, error);
          set({
            loading: false,
            error: errorMessage,
          });
          // Don't change the theme if loading failed
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: "theme-storage",
      // Don't persist loading state or errors
      partialize: (state) => ({ theme: state.theme }),
    }
  )
);
