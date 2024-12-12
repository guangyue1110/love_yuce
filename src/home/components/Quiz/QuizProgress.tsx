'use client'

import { FC } from 'react'
import { motion } from 'framer-motion'

interface QuizProgressProps {
  progress: number
  currentQuestion: number
  totalQuestions: number
}

const QuizProgress: FC<QuizProgressProps> = ({ 
  progress,
  currentQuestion,
  totalQuestions
}) => {
  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
        <span>问题 {currentQuestion + 1}/{totalQuestions}</span>
        <span>{Math.round(progress)}%</span>
      </div>
      
      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-[var(--primary)]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>
    </div>
  )
}

export default QuizProgress 