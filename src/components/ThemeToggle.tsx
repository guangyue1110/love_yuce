'use client'

import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="fixed bottom-6 right-6 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:scale-110 z-50"
      aria-label="切换主题"
    >
      {theme === 'dark' ? (
        <Sun className="w-6 h-6 text-yellow-500 transition-transform hover:rotate-90" />
      ) : (
        <Moon className="w-6 h-6 text-violet-500 transition-transform hover:-rotate-90" />
      )}
    </motion.button>
  )
}
