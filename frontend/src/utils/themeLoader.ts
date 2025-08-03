const loadedThemes = new Set<string>();

export const themeFiles = {
  // Core themes
  solar: () => import('@/styles/themes/solar.css'),
  citrus: () => import('@/styles/themes/citrus.css'),
  emerald: () => import('@/styles/themes/emerald.css'),
  sky: () => import('@/styles/themes/sky.css'),
  lavender: () => import('@/styles/themes/lavender.css'),
  mint: () => import('@/styles/themes/mint.css'),
  
  // Dark themes
  'sky-dark': () => import('@/styles/themes/sky-dark.css'),
  midnight: () => import('@/styles/themes/midnight.css'),
  charcoal: () => import('@/styles/themes/charcoal.css'),
  
  // Monkeytype-inspired themes
  serika: () => import('@/styles/themes/serika.css'),
  dracula: () => import('@/styles/themes/dracula.css'),
  nord: () => import('@/styles/themes/nord.css'),
  'gruvbox-dark': () => import('@/styles/themes/gruvbox-dark.css'),
  catppuccin: () => import('@/styles/themes/catppuccin.css'),
  github: () => import('@/styles/themes/github.css'),
} as const;

export type ThemeKey = keyof typeof themeFiles;

export async function loadTheme(themeKey: ThemeKey): Promise<void> {
  // Skip if already loaded or invalid theme key
  if (loadedThemes.has(themeKey) || !themeFiles[themeKey]) {
    return;
  }

  try {
    await themeFiles[themeKey]();
    loadedThemes.add(themeKey);
    console.log(`✅ Theme loaded: ${themeKey}`);
  } catch (error) {
    console.error(`❌ Failed to load theme: ${themeKey}`, error);
    throw error;
  }
}

// Preload function for popular themes
export function preloadTheme(themeKey: ThemeKey): void {
  if (loadedThemes.has(themeKey) || !themeFiles[themeKey]) {
    return;
  }

  // Create a preload link for the theme CSS
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'style';
  link.href = `./src/styles/themes/${themeKey}.css`;
  document.head.appendChild(link);
}

// Helper to check if theme is loaded
export function isThemeLoaded(themeKey: ThemeKey): boolean {
  return loadedThemes.has(themeKey);
}

// Preload popular themes after a delay
export async function preloadPopularThemes(): Promise<void> {
  // Wait a bit to not interfere with initial render
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const popularThemes: ThemeKey[] = ['citrus', 'emerald', 'sky', 'dracula', 'nord'];
  
  // Load in background without blocking
  Promise.all(
    popularThemes.map(theme => 
      loadTheme(theme).catch(() => {
        // Silently fail for preloading
      })
    )
  );
}
