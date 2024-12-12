'use client'

import { FC } from 'react'
import { motion } from 'framer-motion'

interface QuizNavigationProps {
  onPrevious: () => void
  onNext: () => void
  showPrevious: boolean
  showNext: boolean
  nextEnabled: boolean
}

const QuizNavigation: FC<QuizNavigationProps> = ({
  onPrevious,
  onNext,
  showPrevious,
  showNext,
  nextEnabled
}) => {
  return (
    <div className="flex justify-between mt-8">
      {showPrevious ? (
        <motion.button
          className="px-6 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onPrevious}
        >
          上一题
        </motion.button>
      ) : <div />}
      
      {showNext && (
        <motion.button
          className={`px-6 py-2 text-sm rounded-lg bg-[var(--primary)] text-white
            ${!nextEnabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[var(--primary-hover)]'}`}
          whileHover={nextEnabled ? { scale: 1.02 } : {}}
          whileTap={nextEnabled ? { scale: 0.98 } : {}}
          onClick={nextEnabled ? onNext : undefined}
          disabled={!nextEnabled}
        >
          下一题
        </motion.button>
      )}
    </div>
  )
}

export default QuizNavigation 