import { themes, useThemeStore } from "@/stores/themeStore";
import { CheckIcon } from "lucide-react";

export function ThemeSelector() {
  const { theme: currentTheme, setTheme } = useThemeStore();

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Choose Theme</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Select your preferred color scheme
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {themes.map((themeOption) => (
          <div
            key={themeOption.key}
            className={`${themeOption.key}
              relative cursor-pointer rounded-lg border-2 p-4 transition-all hover:scale-105 bg-background text-accent-foreground
              ${
                currentTheme === themeOption.key
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-border hover:border-primary/50"
              }
            `}
            onClick={() => setTheme(themeOption.key)}
          >
            {/* Selected indicator */}
            {currentTheme === themeOption.key && (
              <div className="absolute -top-2 -right-2 size-6 rounded-full bg-primary flex items-center justify-center">
                <CheckIcon className="size-4 text-primary-foreground" />
              </div>
            )}

            <div className="flex justify-between">
              <h4 className="font-semibold text-sm mb-1">{themeOption.name}</h4>

              {/* Color swatches */}
              <div className="flex gap-1 mt-2">
                <div
                  className="size-3 rounded-full border border-gray-300 bg-primary"
                  title="Primary"
                />
                <div
                  className="size-3 rounded-full border border-gray-300 bg-secondary"
                  title="Secondary"
                />
                <div
                  className="size-3 rounded-full border border-gray-300 bg-accent"
                  title="Accent"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
