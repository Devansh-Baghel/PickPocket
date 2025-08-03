const loadedFonts = new Set<string>();

export const fontUrls = {
  // UI Fonts
  Alexandria: 'https://fonts.googleapis.com/css2?family=Alexandria:wght@400;600&display=swap',
  Geist: 'https://fonts.googleapis.com/css2?family=Geist:wght@400;600&display=swap',
  
  // Reading Fonts - Sans Serif
  Inter: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
  Lato: 'https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap',
  OpenSans: 'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600;1,700&display=swap',
  WorkSans: 'https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap',
  
  // Reading Fonts - Serif
  Merriweather: 'https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap',
  PTSerif: 'https://fonts.googleapis.com/css2?family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap',
  SourceSerifPro: 'https://fonts.googleapis.com/css2?family=Source+Serif+Pro:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap',
  CrimsonText: 'https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap',
  LibreBaskerville: 'https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap',
  Bitter: 'https://fonts.googleapis.com/css2?family=Bitter:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600;1,700&display=swap',
} as const;

export type FontKey = keyof typeof fontUrls;

export async function loadFont(fontKey: FontKey) {
  if (loadedFonts.has(fontKey) || !fontUrls[fontKey]) {
    return;
  }

  try {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = fontUrls[fontKey];
    
    // Wait for font to load before marking as loaded
    await new Promise((resolve, reject) => {
      link.onload = resolve;
      link.onerror = reject;
      document.head.appendChild(link);
    });
    
    loadedFonts.add(fontKey);
    console.log(`✅ Font loaded: ${fontKey}`);
  } catch (error) {
    console.error(`❌ Failed to load font: ${fontKey}`, error);
  }
}

// Preload critical fonts (optional)
export function preloadFont(fontKey: FontKey) {
  if (loadedFonts.has(fontKey) || !fontUrls[fontKey]) {
    return;
  }

  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'style';
  link.href = fontUrls[fontKey];
  document.head.appendChild(link);
}
