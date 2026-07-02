export const theme = {
  colors: {
    background: "#F6F8F7",
    surface: "#FFFFFF",
    surfaceMuted: "#EEF3F0",
    surfaceStrong: "#1D2B27",
    text: "#182420",
    textMuted: "#6C7A74",
    textOnDark: "#F6FAF7",
    border: "#E3EAE5",
    brand: "#4ADE80",
    brandDark: "#166534",
    brandSoft: "#E8F9EE",
    accent: "#F6C768",
    carbs: "#E8C26B",
    fat: "#E88B6F",
    water: "#7BB7E8",
    danger: "#D9605A",
    overlay: "rgba(12, 18, 16, 0.24)",
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  radius: {
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24,
    pill: 999,
  },
  shadow: {
    card: {
      shadowColor: "#142019",
      shadowOpacity: 0.08,
      shadowRadius: 20,
      shadowOffset: { width: 0, height: 10 },
      elevation: 5,
    },
  },
} as const;

export type AppTheme = typeof theme;
