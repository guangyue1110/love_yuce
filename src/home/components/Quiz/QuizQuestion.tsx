'use client'

import { FC } from 'react'
import { motion } from 'framer-motion'
import { Question } from '@/home/data/questions'

interface QuizQuestionProps {
  question: Question
  selectedAnswer: string | undefined
  onAnswer: (answer: string) => void
}

const QuizQuestion: FC<QuizQuestionProps> = ({ question, selectedAnswer, onAnswer }) => {
  return (
    <div className="mb-8">
      <motion.h2 
        className="text-xl font-semibold mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {question.text}
      </motion.h2>
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <motion.button
            key={index}
            className={`w-full p-4 text-left rounded-lg border-2 transition-colors
              ${selectedAnswer === option 
                ? 'border-[var(--primary)] bg-[var(--primary)] bg-opacity-10' 
                : 'border-gray-200 dark:border-gray-700 hover:border-[var(--primary)]'
              }`}
            onClick={() => onAnswer(option)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {option}
          </motion.button>
        ))}
      </div>
    </div>
  )
}

export default QuizQuestion 