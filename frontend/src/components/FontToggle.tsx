import { useEffect } from "react";
import { useFontStore, fontFamilies, Font } from "@/stores/fontStore";

export function FontToggle() {
  const { font, setFont } = useFontStore();

  useEffect(() => {
    document.body.style.fontFamily = fontFamilies[font];
  }, [font]);

  return (
    <label className="flex items-center gap-2">
      <span className="text-sm">Font:</span>
      <select
        value={font}
        onChange={(e) => setFont(e.target.value as Font)}
        className="border rounded p-1"
      >
        {Object.keys(fontFamilies).map((f) => (
          <option key={f} value={f}>
            {f}
          </option>
        ))}
      </select>
    </label>
  );
}
