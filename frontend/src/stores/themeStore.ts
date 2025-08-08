import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
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
  colors: {
    primary: string;
    secondary: string;
    background: string;
    accent: string;
    accentForeground: string;
  };
}> = [
  // Light themes
  {
    key: "solar",
    name: "Solar",
    description: "Warm and energetic light theme",
    colors: {
      primary: "oklch(0.7374 0.1036 74.05)",
      secondary: "oklch(0.5648 0.1224 53.29)",
      background: "oklch(0.9849 0.0077 64.83)",
      accent: "oklch(0.9699 0.0147 65.83)",
      accentForeground: "oklch(0.2686 0.0441 67.04)",
    },
  },
  {
    key: "citrus",
    name: "Citrus",
    description: "Fresh and vibrant green theme",
    colors: {
      primary: "oklch(0.8719 0.1829 125.59)",
      secondary: "oklch(0.5648 0.1224 53.29)",
      background: "oklch(0.9851 0 0)",
      accent: "oklch(0.97 0 0)",
      accentForeground: "oklch(0.269 0 0)",
    },
  },
  {
    key: "emerald",
    name: "Emerald",
    description: "Elegant emerald green theme",
    colors: {
      primary: "oklch(0.765 0.177 163.22)",
      secondary: "oklch(0.508 0.118 165.61)",
      background: "oklch(0.9849 0.0024 160.68)",
      accent: "oklch(0.9692 0.005 161.7)",
      accentForeground: "oklch(0.2742 0.0208 165.96)",
    },
  },
  {
    key: "sky",
    name: "Sky",
    description: "Clean sky blue theme",
    colors: {
      primary: "oklch(0.815 0.0757 230.32)",
      secondary: "oklch(0.9213 0.0126 230.32)",
      background: "oklch(0.9842 0.0032 228.71)",
      accent: "oklch(0.9682 0.0064 229.74)",
      accentForeground: "oklch(0.2779 0.0189 236.17)",
    },
  },
  {
    key: "lavender",
    name: "Lavender",
    description: "Soft purple theme",
    colors: {
      primary: "oklch(0.7123 0.1567 287.11)",
      secondary: "oklch(0.5923 0.0923 197.11)",
      background: "oklch(0.9834 0.0067 312.45)",
      accent: "oklch(0.9623 0.0134 312.78)",
      accentForeground: "oklch(0.2934 0.0423 315.45)",
    },
  },
  {
    key: "mint",
    name: "Mint",
    description: "Cool mint green theme",
    colors: {
      primary: "oklch(0.7456 0.1869 159.45)",
      secondary: "oklch(0.6234 0.0801 201.78)",
      background: "oklch(0.9845 0.0045 145.67)",
      accent: "oklch(0.9634 0.0089 145.89)",
      accentForeground: "oklch(0.2823 0.0245 148.12)",
    },
  },

  // Popular themes
  {
    key: "nord",
    name: "Nord",
    description: "Arctic, north-bluish clean theme",
    colors: {
      primary: "#88c0d0",
      secondary: "#2e3440",
      background: "#242933",
      accent: "#3b4252",
      accentForeground: "#88c0d0",
    },
  },
  {
    key: "catppuccin",
    name: "Catppuccin",
    description: "Soothing pastel theme",
    colors: {
      primary: "#cba6f7",
      secondary: "#7f849c",
      background: "#1e1e2e",
      accent: "#45475a",
      accentForeground: "#cdd6f4",
    },
  },
  {
    key: "github",
    name: "Github",
    description: "GitHub's signature theme",
    colors: {
      primary: "#41ce5c",
      secondary: "#788386",
      background: "#212830",
      accent: "#374151",
      accentForeground: "#ccdae6",
    },
  },
  {
    key: "serika",
    name: "Serika",
    description: "Warm yellow typing theme",
    colors: {
      primary: "#e2b714",
      secondary: "#aaaeb3",
      background: "#e1e1e3",
      accent: "#f0f0f0",
      accentForeground: "#323437",
    },
  },
  {
    key: "gruvbox-dark",
    name: "Gruvbox Dark",
    description: "Retro groove dark theme",
    colors: {
      primary: "#d79921",
      secondary: "#665c54",
      background: "#282828",
      accent: "#504945",
      accentForeground: "#ebdbb2",
    },
  },
  {
    key: "dracula",
    name: "Dracula",
    description: "Dark theme for vampires",
    colors: {
      primary: "#bd93f9",
      secondary: "#6272a4",
      background: "#282a36",
      accent: "#44475a",
      accentForeground: "#f8f8f2",
    },
  },

  // Dark themes
  {
    key: "sky-dark",
    name: "Sky Dark",
    description: "Dark variant of Sky theme",
    colors: {
      primary: "oklch(0.815 0.0757 230.32)",
      secondary: "oklch(0.3723 0.0221 234.88)",
      background: "oklch(0.1311 0.0164 238.31)",
      accent: "oklch(0.2779 0.0189 236.17)",
      accentForeground: "oklch(0.9213 0.0126 230.32)",
    },
  },
  {
    key: "midnight",
    name: "Midnight",
    description: "Deep dark blue theme",
    colors: {
      primary: "oklch(0.7456 0.1634 256.45)",
      secondary: "oklch(0.7823 0.1234 346.12)",
      background: "oklch(0.1234 0.0234 238.67)",
      accent: "oklch(0.1834 0.0312 238.23)",
      accentForeground: "oklch(0.9623 0.0178 235.89)",
    },
  },
  {
    key: "charcoal",
    name: "Charcoal",
    description: "Professional dark theme",
    colors: {
      primary: "oklch(0.7834 0.1245 68.89)",
      secondary: "oklch(0.7823 0.0989 46.67)",
      background: "oklch(0.1145 0.0089 91.78)",
      accent: "oklch(0.1745 0.0156 91.34)",
      accentForeground: "oklch(0.9234 0.0045 91.23)",
    },
  },
];

interface ThemeStore {
  theme: Theme;
  loading: boolean;
  error: string | null;
  setTheme: (theme: Theme) => Promise<void>;
  clearError: () => void;
}

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "solar"; // SSR safe

  try {
    const stored = localStorage.getItem("theme-storage");
    if (!stored) return "solar";

    const parsed = JSON.parse(stored);
    const theme = parsed?.state?.theme;

    console.log(theme);

    return theme || "solar";
  } catch {
    return "solar";
  }
}
export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: "solar", // SSR-safe default. Persist will overwrite after rehydrate.
      loading: false,
      error: null,

      setTheme: async (theme: Theme) => {
        if (get().theme === theme) return;

        set({ loading: true, error: null });

        try {
          if (!isThemeLoaded(theme as ThemeKey)) {
            await loadTheme(theme as ThemeKey);
          }
          set({ theme, loading: false });
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Failed to load theme";
          console.error(`Failed to set theme: ${theme}`, error);
          set({ loading: false, error: errorMessage });
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: "theme-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ theme: state.theme }),
      // Optional: callback after rehydrate to ensure theme assets are loaded
      onRehydrateStorage: () => (state) => {
        // After rehydrate, ensure the theme is really applied
        const t = state?.theme ?? "solar";
        if (typeof window !== "undefined") {
          // Fire and forget: load if not present, but don't block UI
          if (!isThemeLoaded(t as ThemeKey)) {
            loadTheme(t as ThemeKey).catch(() => {});
          }
        }
      },
    },
  ),
);