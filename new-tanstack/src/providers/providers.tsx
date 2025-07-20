import { useEffect } from "react";
import { useThemeStore } from "@/stores/themeStore";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useThemeStore((state) => state.theme);

  const THEME_CLASSES = ["citrus"] as const;

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
