import { useEffect } from "react";
import { useThemeStore } from "@/stores/themeStore";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    const root = document.documentElement;

    // Remove all possible theme classes first
    root.classList.remove("citrus");

    if (theme !== "solar") {
      root.classList.add(theme);
    }
  }, [theme]);

  return <>{children}</>;
}
