import { themes, useThemeStore } from "@/stores/themeStore";
import { CheckIcon, LoaderIcon, AlertCircleIcon } from "lucide-react";

export function ThemeSelector() {
  const {
    theme: currentTheme,
    loading,
    error,
    setTheme,
    clearError,
  } = useThemeStore();

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Choose Theme</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Select your preferred color scheme
        </p>

        {/* Loading indicator */}
        {loading && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <LoaderIcon className="size-4 animate-spin" />
            Loading theme...
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="flex items-center gap-2 text-sm text-destructive mb-2 p-2 bg-destructive/10 rounded">
            <AlertCircleIcon className="size-4" />
            <span>{error}</span>
            <button
              onClick={clearError}
              className="ml-auto text-xs underline hover:no-underline"
            >
              Dismiss
            </button>
          </div>
        )}
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
              ${loading ? "opacity-50 pointer-events-none" : ""}
            `}
            onClick={() => !loading && setTheme(themeOption.key)}
            style={{ backgroundColor: themeOption.colors.background, color: themeOption.colors.accentForeground}}
          >
            {/* Selected indicator */}
            {currentTheme === themeOption.key && (
              <div className="absolute -top-2 -right-2 size-6 rounded-full bg-primary flex items-center justify-center">
                <CheckIcon className="size-4 text-primary-foreground" />
              </div>
            )}

            <div className="space-y-2 flex items-center justify-between">
              {/* Theme name */}
              <h4 className="font-semibold text-sm">{themeOption.name}</h4>

              {/* Color swatches */}
              <div className="flex gap-1">
                <div
                  className="size-3 rounded-full border border-gray-300"
                  style={{ backgroundColor: themeOption.colors.primary }}
                  title="Primary"
                />
                <div
                  className="size-3 rounded-full border border-gray-300"
                  style={{ backgroundColor: themeOption.colors.secondary }}
                  title="Secondary"
                />
                <div
                  className="size-3 rounded-full border border-gray-300"
                  style={{ backgroundColor: themeOption.colors.accent }}
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
