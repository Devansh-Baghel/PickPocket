import { useEffect } from "react";
import { fontFamilies, useFontStore } from "@/stores/fontStore";

export function FontProvider({ children }: { children: React.ReactNode }) {
  const font = useFontStore((state) => state.font);

  useEffect(() => {
    document.body.style.fontFamily = fontFamilies[font];
  }, [font]);

  return <>{children}</>;
}
