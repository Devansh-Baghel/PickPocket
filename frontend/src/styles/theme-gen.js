// theme-generator.js
import { themes } from './themes.ts';
import fs from 'fs';

/**
 * Convert theme name from snake_case to kebab-case to match your TypeScript definitions
 */
function convertToKebabCase(themeName) {
  return themeName.replace(/_/g, '-');
}

/**
 * Convert hex color to HSL for better color manipulation
 */
function hexToHsl(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
}

/**
 * Convert HSL back to hex
 */
function hslToHex(h, s, l) {
  h /= 360;
  s /= 100;
  l /= 100;

  const hue2rgb = (p, q, t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  };

  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  const toHex = (c) => {
    const hex = Math.round(c * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Generate color shades from a base color
 */
function generateColorShades(baseHex, isForDarkTheme = false) {
  const hsl = hexToHsl(baseHex);
  const shades = {};
  
  const lightnessMaps = {
    light: {
      50: 95, 100: 90, 200: 85, 300: 80, 400: 70, 500: 60,
      600: 50, 700: 40, 800: 30, 900: 20, 950: 15, 1000: 10
    },
    dark: {
      50: 85, 100: 80, 200: 75, 300: 70, 400: 60, 500: 50,
      600: 40, 700: 30, 800: 25, 900: 20, 950: 15, 1000: 10
    }
  };

  const map = isForDarkTheme ? lightnessMaps.dark : lightnessMaps.light;

  Object.entries(map).forEach(([shade, lightness]) => {
    let adjustedSaturation = hsl.s;
    if (lightness > 85) adjustedSaturation *= 0.3;
    if (lightness < 15) adjustedSaturation *= 0.5;
    
    shades[shade] = hslToHex(hsl.h, adjustedSaturation, lightness);
  });

  return shades;
}

/**
 * Determine if a theme should be treated as dark
 */
function isDarkTheme(bgColor) {
  const hsl = hexToHsl(bgColor);
  return hsl.l < 50;
}

/**
 * Helper function to adjust color lightness
 */
function adjustLightness(hex, adjustment) {
  const hsl = hexToHsl(hex);
  hsl.l = Math.max(0, Math.min(100, hsl.l + adjustment));
  return hslToHex(hsl.h, hsl.s, hsl.l);
}

/**
 * Generate CSS variables for a single theme
 */
function generateThemeCSS(originalThemeName, themeData) {
  const { bgColor, mainColor, subColor, textColor } = themeData;
  const kebabCaseName = convertToKebabCase(originalThemeName);
  const isThemeDark = isDarkTheme(bgColor);
  
  // Generate color shades
  const baseShades = generateColorShades(bgColor, isThemeDark);
  const primaryShades = generateColorShades(mainColor, isThemeDark);
  const secondaryShades = generateColorShades(subColor, isThemeDark);

  // Determine semantic colors
  const semanticColors = {
    background: bgColor,
    foreground: textColor,
    card: isThemeDark ? adjustLightness(bgColor, 5) : '#ffffff',
    cardForeground: textColor,
    popover: isThemeDark ? adjustLightness(bgColor, 5) : '#ffffff',
    popoverForeground: textColor,
    primary: mainColor,
    primaryForeground: isThemeDark ? '#ffffff' : '#000000',
    secondary: subColor,
    secondaryForeground: isThemeDark ? '#ffffff' : '#000000',
    muted: isThemeDark ? adjustLightness(bgColor, 10) : adjustLightness(bgColor, -5),
    mutedForeground: adjustLightness(textColor, isThemeDark ? -20 : 20),
    accent: isThemeDark ? adjustLightness(bgColor, 10) : adjustLightness(bgColor, -5),
    accentForeground: textColor,
    destructive: isThemeDark ? '#ff5555' : '#dc3545',
    border: isThemeDark ? adjustLightness(bgColor, 15) : adjustLightness(bgColor, -10),
    input: isThemeDark ? adjustLightness(bgColor, 15) : adjustLightness(bgColor, -10),
    ring: mainColor
  };

  let css = `\n/* ======== ${kebabCaseName.charAt(0).toUpperCase() + kebabCaseName.slice(1).replace(/-/g, ' ')} Theme ======== */\n`;
  css += `.${kebabCaseName} {\n`;

  // Base color variables
  Object.entries(baseShades).forEach(([shade, color]) => {
    css += `  --base-${shade}: ${color};\n`;
  });

  css += '\n';

  // Primary color variables
  Object.entries(primaryShades).forEach(([shade, color]) => {
    css += `  --primary-${shade}: ${color};\n`;
  });

  css += '\n';

  // Secondary color variables
  Object.entries(secondaryShades).forEach(([shade, color]) => {
    css += `  --secondary-${shade}: ${color};\n`;
  });

  css += '\n';

  // Semantic color variables
  Object.entries(semanticColors).forEach(([key, color]) => {
    const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
    css += `  --${cssKey}: ${color};\n`;
  });

  // Additional variables
  css += `  --chart-1: ${mainColor};\n`;
  css += `  --chart-2: ${subColor};\n`;
  css += `  --chart-3: ${adjustLightness(mainColor, 20)};\n`;
  css += `  --chart-4: ${adjustLightness(subColor, 20)};\n`;
  css += `  --chart-5: ${adjustLightness(mainColor, 40)};\n`;
  css += `  --radius: 0.5rem;\n`;
  css += `  --sidebar: ${semanticColors.card};\n`;
  css += `  --sidebar-foreground: ${semanticColors.cardForeground};\n`;
  css += `  --sidebar-primary: ${semanticColors.primary};\n`;
  css += `  --sidebar-primary-foreground: ${semanticColors.primaryForeground};\n`;
  css += `  --sidebar-accent: ${semanticColors.accent};\n`;
  css += `  --sidebar-accent-foreground: ${semanticColors.accentForeground};\n`;
  css += `  --sidebar-border: ${semanticColors.border};\n`;
  css += `  --sidebar-ring: ${semanticColors.ring};\n`;

  css += '}\n';

  return css;
}

/**
 * Generate all themes and save to CSS file
 */
function generateAllThemes() {
  let allCSS = '/* ======== Auto-generated Monkeytype Themes ======== */\n';
  allCSS += '/* Generated from themes.ts - Synced with TypeScript definitions */\n';

  // Sort themes alphabetically by original name
  const sortedThemes = Object.keys(themes).sort();

  sortedThemes.forEach(originalName => {
    const themeData = themes[originalName];
    allCSS += generateThemeCSS(originalName, themeData);
  });

  // Save to file
  fs.writeFileSync('generated-themes.css', allCSS);
  
  console.log(`✅ Generated ${sortedThemes.length} themes successfully!`);
  console.log('📁 Output: generated-themes.css');
  
  // Generate TypeScript theme list for verification
  const kebabCaseNames = sortedThemes.map(name => `"${convertToKebabCase(name)}"`);
  const typeScriptTypes = kebabCaseNames.join('\n  | ');
  
  const tsOutput = `// Generated theme type - verify this matches your Theme type
export type GeneratedTheme = 
  | ${typeScriptTypes};

// Generated theme array - verify this matches your themes array
export const generatedThemes = [
${sortedThemes.map(name => {
  const kebabName = convertToKebabCase(name);
  const displayName = kebabName.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
  return `  { key: "${kebabName}", name: "${displayName}" },`;
}).join('\n')}
];
`;
  
  fs.writeFileSync('generated-theme-types.ts', tsOutput);
  console.log('📁 TypeScript verification: generated-theme-types.ts');
}

// Run the generator
generateAllThemes();
