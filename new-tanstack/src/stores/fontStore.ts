import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Font = "Alexandria" | "Geist"; // extend easily later

export const fontFamilies: Record<Font, string> = {
  Alexandria: '"Alexandria", sans-serif',
  Geist: '"Geist", sans-serif',
  // Add more easily:
  // "Inter": '"Inter", sans-serif',
};

interface FontState {
  font: Font;
  setFont: (font: Font) => void;
}

export const useFontStore = create<FontState>()(
  persist(
    (set) => ({
      font: "Alexandria",
      setFont: (font) => set({ font }),
    }),
    { name: "app-font" }
  )
);
