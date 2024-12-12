export type ThemeMode = 'light' | 'dark'

export interface ThemeColors {
  background: string
  foreground: string
  primary: string
  primaryHover: string
  textPrimary: string
  textSecondary: string
  gradientStart: string
  gradientMiddle: string
  gradientEnd: string
}

export interface ThemeConfig {
  colors: {
    light: ThemeColors
    dark: ThemeColors
  }
  fonts: {
    sans: string[]
    mono: string[]
  }
  breakpoints: {
    sm: string
    md: string
    lg: string
    xl: string
  }
} 