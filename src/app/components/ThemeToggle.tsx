'use client'

import { FC, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const ThemeToggle: FC = () => {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // 初始化为亮色模式
    setIsDark(false)
    document.documentElement.classList.remove('dark')
    document.documentElement.classList.add('light')
    localStorage.setItem('theme', 'light')
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(newTheme ? 'dark' : 'light')
    localStorage.setItem('theme', newTheme ? 'dark' : 'light')
  }

  if (!mounted) return null

  return (
    <motion.button
      className="fixed top-4 right-4 p-2 rounded-full bg-[var(--primary)] text-white shadow-lg z-50"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
    >
      {isDark ? '🌞' : '🌙'}
    </motion.button>
  )
}

export default ThemeToggle