import { useEffect } from "react";
import { useThemeStore } from "@/stores/themeStore";
import { fontFamilies, useFontStore } from "@/stores/fontStore";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useThemeStore((state) => state.theme);

  const THEME_CLASSES = ["citrus", "emerald", "sky", "sky-dark"] as const;

  useEffect(() => {
    const root = document.documentElement;

    // Remove all possible theme classes first
    THEME_CLASSES.forEach((themeClass) => root.classList.remove(themeClass));

    if (theme !== "solar") {
      root.classList.add(theme);
    }
  }, [theme]);

  return <>{children}</>;
}

export function FontProvider({ children }: { children: React.ReactNode }) {
  const font = useFontStore((state) => state.font);

  useEffect(() => {
    document.body.style.fontFamily = fontFamilies[font];
  }, [font]);

  return <>{children}</>;
}
