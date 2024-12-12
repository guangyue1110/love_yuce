'use client'

import { FC } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

interface BackButtonProps {
  onBack?: () => void
}

const BackButton: FC<BackButtonProps> = ({ onBack }) => {
  const router = useRouter()

  const handleClick = () => {
    if (onBack) {
      onBack()
    } else {
      router.back()
    }
  }

  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.05, x: -5 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className="group fixed top-4 left-4 sm:top-8 sm:left-8 flex items-center gap-2 px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
    >
      <svg 
        className="w-5 h-5 transform transition-transform group-hover:-translate-x-1" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      <span className="text-sm font-medium">返回</span>
    </motion.button>
  )
}

export default BackButton 