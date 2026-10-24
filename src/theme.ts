/**
 * TalentCred Video Motion Color Palette & Design Tokens
 * Brand Guidelines for Launch Teaser
 */

export const PALETTE = {
  // Base backgrounds
  background: {
    dark: "#0b0f17", // Main dark canvas & dashboard background
    surface: "#111827", // Elevated card / surface
    border: "#1e293b", // Subtle boundary lines
    panelLight: "#fdfbf7", // Light accent UI panels
  },

  // Brand Accents
  primary: {
    red: "#b91c1c", // Primary Accent Red (Buttons / Highlights)
    redHover: "#dc2626",
    gold: "#eab308", // Primary Accent Gold (Launch Date Highlight / Badges)
    goldAlt: "#f59e0b", // Secondary warm CTA gold
    lightAccent: "#fdfbf7", // Light UI panels & crisp accents
  },

  // Supporting Text Colors
  text: {
    primary: "#ffffff",
    secondary: "#94a3b8",
    muted: "#64748b",
    dark: "#0b0f17",
  },

  // Typography
  fontFamily:
    "'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",

  // Gradients
  gradients: {
    gold: "linear-gradient(135deg, #eab308 0%, #f59e0b 100%)",
    goldText: "linear-gradient(135deg, #fde047 0%, #eab308 50%, #d97706 100%)",
    red: "linear-gradient(135deg, #b91c1c 0%, #991b1b 100%)",
    redVibrant: "linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)",
    glassDark: "linear-gradient(135deg, rgba(17, 24, 39, 0.85) 0%, rgba(11, 15, 23, 0.95) 100%)",
    glassLight: "linear-gradient(135deg, rgba(253, 251, 247, 0.95) 0%, rgba(243, 240, 233, 0.9) 100%)",
    glowRed: "radial-gradient(circle, rgba(185, 28, 28, 0.35) 0%, rgba(11, 15, 23, 0) 70%)",
    glowGold: "radial-gradient(circle, rgba(234, 179, 8, 0.35) 0%, rgba(11, 15, 23, 0) 70%)",
  },

  // Box shadows
  shadows: {
    card: "0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 1px 1px rgba(255, 255, 255, 0.08)",
    goldGlow: "0 0 40px rgba(234, 179, 8, 0.4), 0 10px 25px rgba(234, 179, 8, 0.2)",
    redGlow: "0 0 40px rgba(185, 28, 28, 0.45), 0 10px 25px rgba(185, 28, 28, 0.25)",
  },
} as const;

export const COLORS = {
  darkBackground: PALETTE.background.dark,
  primaryRed: PALETTE.primary.red,
  primaryGold: PALETTE.primary.gold,
  goldAlt: PALETTE.primary.goldAlt,
  lightAccent: PALETTE.primary.lightAccent,
} as const;

export type Palette = typeof PALETTE;
