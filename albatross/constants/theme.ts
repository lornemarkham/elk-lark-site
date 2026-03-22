/**
 * Design tokens — iPad-first, warm neutral palette.
 * Adjust here as product visual language evolves.
 */
export const theme = {
  colors: {
    background: '#F7F4F0',
    surface: '#FFFCFA',
    surfaceElevated: '#FFFFFF',
    text: '#3D3835',
    textMuted: '#827A74',
    accent: '#C4A59A',
    accentSoft: '#EBE0DC',
    accentMuted: '#D9C4BC',
    border: 'rgba(61, 56, 53, 0.08)',
    borderStrong: 'rgba(61, 56, 53, 0.12)',
    dotInactive: '#D9C4BC',
    dotActive: '#B8958A',
    shadow: 'rgba(61, 56, 53, 0.12)',
    /** My Morning sliders — thin track, muted warm active, soft neutral inactive */
    sliderRail: '#F1EBE6',
    sliderTrackActive: '#B9A096',
    sliderTrackInactive: '#E2DED9',
    sliderThumb: '#FFFFFF',
  },
  radii: {
    sm: 10,
    md: 16,
    lg: 22,
    xl: 28,
    full: 999,
  },
  spacing: {
    xs: 6,
    sm: 10,
    md: 16,
    lg: 22,
    xl: 28,
    xxl: 40,
  },
  layout: {
    /** Max content width on tablets / large phones */
    maxContentWidth: 560,
    /** Horizontal padding on compact devices */
    padCompact: 20,
    /** Horizontal padding on wide layouts */
    padWide: 32,
  },
  typography: {
    display: {
      fontFamily: 'Fraunces_600SemiBold',
      fontSize: 28,
      lineHeight: 34,
    },
    title: {
      fontFamily: 'Fraunces_500Medium',
      fontSize: 20,
      lineHeight: 26,
    },
    eyebrow: {
      fontFamily: 'DMSans_500Medium',
      fontSize: 11,
      letterSpacing: 2,
      textTransform: 'uppercase' as const,
    },
    body: {
      fontFamily: 'DMSans_400Regular',
      fontSize: 15,
      lineHeight: 22,
    },
    bodyMedium: {
      fontFamily: 'DMSans_500Medium',
      fontSize: 15,
      lineHeight: 22,
    },
    caption: {
      fontFamily: 'DMSans_400Regular',
      fontSize: 13,
      lineHeight: 18,
    },
  },
} as const;

export type Theme = typeof theme;
