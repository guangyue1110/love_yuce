import { useState, useEffect } from 'react'
import { ThemeMode } from '../types/theme'
import { getThemeColors, applyThemeColors, getSystemTheme } from '../utils/theme'

export const useTheme = () => {
  const [theme, setTheme] = useState<ThemeMode>('light')

  useEffect(() => {
    // 获取保存的主题或系统主题
    const savedTheme = localStorage.getItem('theme') as ThemeMode
    const initialTheme = savedTheme || getSystemTheme()
    setTheme(initialTheme)
    applyThemeColors(getThemeColors(initialTheme))

    // 监听系统主题变化
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light'
        setTheme(newTheme)
        applyThemeColors(getThemeColors(newTheme))
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    applyThemeColors(getThemeColors(newTheme))
    localStorage.setItem('theme', newTheme)
  }

  return { theme, toggleTheme }
} 