import { Theme, useThemeStore } from "@/stores/themeStore";

export function ThemeToggle() {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="flex gap-2">
      <label htmlFor="theme" className="text-sm">Theme:</label>
      <select
        id="theme"
        value={theme}
        onChange={(e) => setTheme(e.target.value as Theme)}
        className="border p-1 rounded"
      >
        <option value="solar">Solar</option>
        <option value="citrus">Citrus</option>
        <option value="emerald">Emerald</option>
        <option value="sky">Sky</option>
        <option value="sky-dark">Sky Dark</option>
      </select>
    </div>
  );
}
