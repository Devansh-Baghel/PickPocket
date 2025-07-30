import { useEffect } from "react";
import { useFontStore, fontFamilies, Font } from "@/stores/fontStore";
import { CheckIcon } from "lucide-react";

export function FontSelector() {
  const { font: currentFont, setFont } = useFontStore();

  useEffect(() => {
    document.body.style.fontFamily = fontFamilies[currentFont];
  }, [currentFont]);

  const fonts: Array<{
    key: Font;
    name: string;
    preview: string;
  }> = [
    {
      key: "Alexandria",
      name: "Alexandria",
      preview: "The quick brown fox jumps over the lazy dog",
    },
    {
      key: "Geist",
      name: "Geist",
      preview: "The quick brown fox jumps over the lazy dog",
    },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Choose Font</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Select your preferred application font
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {fonts.map((fontOption) => (
          <div
            key={fontOption.key}
            className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all hover:scale-[1.02] bg-background text-accent-foreground
              ${
                currentFont === fontOption.key
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-border hover:border-primary/50"
              }
            `}
            onClick={() => setFont(fontOption.key)}
          >
            {/* Selected indicator */}
            {currentFont === fontOption.key && (
              <div className="absolute -top-2 -right-2 size-6 rounded-full bg-primary flex items-center justify-center">
                <CheckIcon className="size-4 text-primary-foreground" />
              </div>
            )}

            <div className="space-y-3">
              {/* Font name */}
              <h4
                className="font-semibold text-sm"
                style={{ fontFamily: fontFamilies[fontOption.key] }}
              >
                {fontOption.name}
              </h4>

              {/* Font preview */}
              <div
                className="text-sm text-muted-foreground leading-relaxed"
                style={{ fontFamily: fontFamilies[fontOption.key] }}
              >
                {fontOption.preview}
              </div>

              {/* Font details */}
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span style={{ fontFamily: fontFamilies[fontOption.key] }}>
                  AaBbCc 123
                </span>
                <span
                  className="opacity-60"
                  style={{ fontFamily: fontFamilies[fontOption.key] }}
                >
                  {fontOption.key}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
