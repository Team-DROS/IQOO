import { Platform } from 'react-native';

/**
 * VaidyaVani design system — "Apothecary"
 * A warm, editorial clinical aesthetic: deep pine-teal, turmeric gold,
 * bone-paper backgrounds. Fraunces (display serif) + Hanken Grotesk (body).
 * Deliberately avoids the cold hospital-blue SaaS look.
 */

export const colors = {
  // Primary — deep pine teal (trust, health, herbal-clinical)
  pine: '#0B3B36',
  pineDeep: '#072A26',
  pineSoft: '#12524B',

  // Interactive teal / jade
  jade: '#0E9C8B',
  jadeBright: '#17B7A3',
  jadeSoft: '#D7EFEA',
  jadeGhost: '#EAF6F3',

  // Accent — turmeric / saffron (the single sharp accent)
  turmeric: '#E0A43B',
  turmericDeep: '#C98A22',
  turmericSoft: '#F7E7C4',
  turmericGlow: 'rgba(224,164,59,0.18)',

  // Neutrals — warm bone paper, not pure white
  bone: '#F6F3EB',
  boneDeep: '#EFEADD',
  surface: '#FFFFFF',
  surfaceAlt: '#FBF9F3',
  border: '#E8E1D1',
  borderStrong: '#D9CFB9',

  // Ink — near-black with a green cast
  ink: '#14211E',
  inkSoft: '#4C5A55',
  inkFaint: '#8A958F',
  inkGhost: '#B7BEB9',

  // Semantic
  sage: '#3E8E6E',
  sageSoft: '#E2F0E8',
  clay: '#C2583E',
  claySoft: '#F6E2DB',

  // On-dark text
  onDark: '#F4F1E8',
  onDarkSoft: 'rgba(244,241,232,0.72)',
  onDarkFaint: 'rgba(244,241,232,0.48)',

  white: '#FFFFFF',
};

// Per-language identity color (used on chips / badges)
export const languageColors = {
  english: { fg: '#0E9C8B', bg: '#EAF6F3', label: 'English', tag: 'EN' },
  hinglish: { fg: '#C98A22', bg: '#F7E7C4', label: 'Hinglish', tag: 'हि' },
  tanglish: { fg: '#B4553B', bg: '#F3E1DA', label: 'Tanglish', tag: 'த' },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
  huge: 64,
};

export const radius = {
  sm: 10,
  md: 14,
  lg: 20,
  xl: 28,
  pill: 999,
};

// Font family keys are registered in App.js via useFonts.
export const font = {
  display: 'Display', // Fraunces 600
  displayBold: 'DisplayBold', // Fraunces 700
  displayBlack: 'DisplayBlack', // Fraunces 900
  displayItalic: 'DisplayItalic', // Fraunces 500 italic
  body: 'Body', // Hanken 400
  bodyMed: 'BodyMed', // Hanken 500
  bodySemi: 'BodySemi', // Hanken 600
  bodyBold: 'BodyBold', // Hanken 700
};

// Type scale — pairs family + size + spacing for headings/body
export const type = {
  hero: { fontFamily: font.displayBlack, fontSize: 40, lineHeight: 44, letterSpacing: -0.8 },
  h1: { fontFamily: font.displayBold, fontSize: 30, lineHeight: 36, letterSpacing: -0.5 },
  h2: { fontFamily: font.display, fontSize: 23, lineHeight: 29, letterSpacing: -0.3 },
  h3: { fontFamily: font.display, fontSize: 19, lineHeight: 25, letterSpacing: -0.2 },
  title: { fontFamily: font.bodySemi, fontSize: 17, lineHeight: 23, letterSpacing: -0.1 },
  body: { fontFamily: font.body, fontSize: 15, lineHeight: 23 },
  bodyMed: { fontFamily: font.bodyMed, fontSize: 15, lineHeight: 23 },
  small: { fontFamily: font.body, fontSize: 13, lineHeight: 19 },
  smallMed: { fontFamily: font.bodyMed, fontSize: 13, lineHeight: 19 },
  caption: { fontFamily: font.bodyMed, fontSize: 11.5, lineHeight: 15, letterSpacing: 0.3 },
  overline: { fontFamily: font.bodySemi, fontSize: 11, lineHeight: 14, letterSpacing: 1.6 },
  mono: { fontFamily: Platform.select({ web: 'ui-monospace, SFMono-Regular, Menlo, monospace', default: 'monospace' }), fontSize: 13 },
};

// Layered soft shadows. Web uses boxShadow (demo target); native falls back to elevation.
export function shadow(level = 1) {
  const webShadows = {
    0: 'none',
    1: '0 1px 2px rgba(20,33,30,0.04), 0 2px 8px rgba(20,33,30,0.05)',
    2: '0 2px 6px rgba(20,33,30,0.06), 0 10px 24px rgba(20,33,30,0.08)',
    3: '0 6px 16px rgba(20,33,30,0.08), 0 20px 48px rgba(20,33,30,0.12)',
    turmeric: '0 8px 24px rgba(224,164,59,0.35)',
    jade: '0 10px 30px rgba(14,156,139,0.32)',
    pine: '0 14px 40px rgba(7,42,38,0.35)',
  };
  return Platform.select({
    web: { boxShadow: webShadows[level] ?? webShadows[1] },
    default: {
      shadowColor: '#14211E',
      shadowOffset: { width: 0, height: level === 3 ? 12 : 4 },
      shadowOpacity: 0.12,
      shadowRadius: level === 3 ? 24 : 10,
      elevation: level === 3 ? 12 : level === 2 ? 6 : 2,
    },
  });
}

// Convenience layout metrics for the phone frame on web.
export const layout = {
  maxPhoneWidth: 440,
  screenPadding: spacing.xl,
};

export default { colors, languageColors, spacing, radius, font, type, shadow, layout };
