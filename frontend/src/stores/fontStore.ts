import { create } from "zustand";
import { persist } from "zustand/middleware";
import { loadFont, type FontKey } from "@/utils/fontLoader";

// Central font configuration - single source of truth
export const fontConfig = {
  // UI Fonts
  Alexandria: {
    fontFamily: '"Alexandria", sans-serif',
    name: "Alexandria",
    preview: "The quick brown fox jumps over the lazy dog",
  },
  Geist: {
    fontFamily: '"Geist", sans-serif',
    name: "Geist",
    preview: "The quick brown fox jumps over the lazy dog",
  },

  // Reading Fonts - Sans Serif
  Inter: {
    fontFamily: '"Inter", sans-serif',
    name: "Inter",
    preview: "Modern and clean typography for interfaces",
  },
  Lato: {
    fontFamily: '"Lato", sans-serif',
    name: "Lato",
    preview: "Friendly humanist design perfect for comfortable reading",
  },
  OpenSans: {
    fontFamily: '"Open Sans", sans-serif',
    name: "Open Sans",
    preview: "Optimized for exceptional legibility across all devices",
  },
  WorkSans: {
    fontFamily: '"Work Sans", sans-serif',
    name: "Work Sans",
    preview: "Designed specifically for on-screen text at medium sizes",
  },

  // Reading Fonts - Serif
  Merriweather: {
    fontFamily: '"Merriweather", serif',
    name: "Merriweather",
    preview: "Designed for optimal readability on screens and long articles",
  },
  PTSerif: {
    fontFamily: '"PT Serif", serif',
    name: "PT Serif",
    preview: "Excellent for digital reading with strong character definition",
  },
  SourceSerifPro: {
    fontFamily: '"Source Serif Pro", serif',
    name: "Source Serif Pro",
    preview: "Adobe's contribution to readable serif typography",
  },
  CrimsonText: {
    fontFamily: '"Crimson Text", serif',
    name: "Crimson Text",
    preview: "Elegant serif optimized for text-heavy applications",
  },
  LibreBaskerville: {
    fontFamily: '"Libre Baskerville", serif',
    name: "Libre Baskerville",
    preview: "Classical serif with exceptional screen legibility",
  },
  Bitter: {
    fontFamily: '"Bitter", serif',
    name: "Bitter",
    preview: "Contemporary slab serif optimized for screen reading",
  },
} as const;

// Derive types and objects from the config
export type Font = keyof typeof fontConfig;

export const fontFamilies: Record<Font, string> = Object.fromEntries(
  Object.entries(fontConfig).map(([key, value]) => [key, value.fontFamily])
) as Record<Font, string>;

interface FontState {
  font: Font;
  loading: boolean;
  setFont: (font: Font) => Promise<void>;
}

export const useFontStore = create<FontState>()(
  persist(
    (set, get) => ({
      font: "Alexandria",
      loading: false,
      setFont: async (font: Font) => {
        // Don't reload if already the current font
        if (get().font === font) return;

        set({ loading: true });

        try {
          // Load font dynamically before setting
          await loadFont(font as FontKey);
          set({ font, loading: false });
        } catch (error) {
          console.error(`Failed to set font: ${font}`, error);
          set({ loading: false });
          // Don't change the font if loading failed
        }
      },
    }),
    {
      name: "app-font",
      // Don't persist loading state
      partialize: (state) => ({ font: state.font }),
    }
  )
);
