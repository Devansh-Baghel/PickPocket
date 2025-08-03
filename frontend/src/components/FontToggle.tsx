import { useEffect } from "react";
import { useFontStore, fontFamilies, fontConfig } from "@/stores/fontStore";
import { CheckIcon, LoaderIcon } from "lucide-react";

export function FontSelector() {
  const { font: currentFont, loading, setFont } = useFontStore();

  useEffect(() => {
    document.body.style.fontFamily = fontFamilies[currentFont];
  }, [currentFont]);

  // Generate fonts array from the config
  const fonts = Object.entries(fontConfig).map(([key, config]) => ({
    key: key as keyof typeof fontConfig,
    name: config.name,
    preview: config.preview,
  }));

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-4">Choose Font</h3>
        {loading && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <LoaderIcon className="size-4 animate-spin" />
            Loading font...
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {fonts.map((fontOption) => (
          <div
            key={fontOption.key}
            className={`relative cursor-pointer rounded-lg border-2 p-3 transition-all hover:scale-[1.02] bg-background text-accent-foreground
              ${
                currentFont === fontOption.key
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-border hover:border-primary/50"
              }
              ${loading ? "opacity-50 pointer-events-none" : ""}
            `}
            onClick={() => !loading && setFont(fontOption.key)}
          >
            {/* Selected indicator */}
            {currentFont === fontOption.key && (
              <div className="absolute -top-2 -right-2 size-6 rounded-full bg-primary flex items-center justify-center">
                <CheckIcon className="size-4 text-primary-foreground" />
              </div>
            )}

            <div className="space-y-2">
              {/* Font name */}
              <h4
                className="font-semibold text-sm text-center"
                style={{ fontFamily: fontFamilies[fontOption.key] }}
              >
                {fontOption.name}
              </h4>

              {/* Font sample */}
              <div
                className="text-xs text-muted-foreground text-center"
                style={{ fontFamily: fontFamilies[fontOption.key] }}
              >
                AaBbCc 123
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
