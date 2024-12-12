import { ThemeConfig } from '../types/theme'

export const defaultTheme: ThemeConfig = {
  colors: {
    primary: '#8B5CF6',
    secondary: '#EC4899',
    background: '#FFFFFF',
    foreground: '#171717',
    accent: '#F472B6'
  },
  fonts: {
    sans: 'var(--font-geist-sans)',
    mono: 'var(--font-geist-mono)'
  }
};

export const darkTheme: ThemeConfig = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    background: '#0A0A0A',
    foreground: '#EDEDED'
  }
}; 