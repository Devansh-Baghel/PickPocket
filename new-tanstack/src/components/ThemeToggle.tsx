import { useThemeStore } from "@/stores/themeStore";

export function ThemeToggle() {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="flex gap-2">
      <label htmlFor="theme" className="text-sm">Theme:</label>
      <select
        id="theme"
        value={theme}
        onChange={(e) => setTheme(e.target.value as any)}
        className="border p-1 rounded"
      >
        <option value="solar">Solar</option>
        <option value="citrus">Citrus</option>
      </select>
    </div>
  );
}
