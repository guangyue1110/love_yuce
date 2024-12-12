import { ThemeMode, ThemeColors } from '../types/theme'

export const getThemeColors = (mode: ThemeMode): ThemeColors => {
  return {
    light: {
      background: '#ffffff',
      foreground: '#171717',
      primary: '#8b5cf6',
      primaryHover: '#7c3aed',
      textPrimary: '#171717',
      textSecondary: '#4b5563',
      gradientStart: '#f5f3ff',
      gradientMiddle: '#fce7f3',
      gradientEnd: '#dbeafe',
    },
    dark: {
      background: '#0a0a0a',
      foreground: '#ffffff',
      primary: '#a78bfa',
      primaryHover: '#8b5cf6',
      textPrimary: '#ffffff',
      textSecondary: '#d1d5db',
      gradientStart: '#2e1065',
      gradientMiddle: '#831843',
      gradientEnd: '#172554',
    },
  }[mode]
}

export const applyThemeColors = (colors: ThemeColors) => {
  const root = document.documentElement
  Object.entries(colors).forEach(([key, value]) => {
    root.style.setProperty(`--${key}`, value)
  })
}

export const getSystemTheme = (): ThemeMode => {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
} 