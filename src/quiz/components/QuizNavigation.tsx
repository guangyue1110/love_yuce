'use client'

import { FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface QuizNavigationProps {
  onPrevious: () => void;
  onNext: () => void;
  showPrevious: boolean;
  showNext: boolean;
  nextEnabled: boolean;
  isSubmitting?: boolean;
}

const LoadingSpinner = () => (
  <div className="flex items-center gap-2">
    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
    <span>提交中...</span>
  </div>
);

const QuizNavigation: FC<QuizNavigationProps> = ({
  onPrevious,
  onNext,
  showPrevious,
  showNext,
  nextEnabled,
  isSubmitting = false,
}) => {
  return (
    <div className="flex justify-between items-center mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
      <AnimatePresence mode="wait">
        {showPrevious && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            whileHover={{ scale: 1.02, x: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={onPrevious}
            disabled={isSubmitting}
            className="group px-6 py-2 rounded-lg text-gray-600 dark:text-gray-300 transition-all hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <svg 
              className="w-5 h-5 transform transition-transform group-hover:-translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            上一题
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {showNext ? (
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
            onClick={onNext}
            disabled={!nextEnabled || isSubmitting}
            className="group px-6 py-2 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2
              bg-violet-600 text-white hover:bg-violet-700 disabled:bg-gray-400"
          >
            下一题
            <svg 
              className="w-5 h-5 transform transition-transform group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        ) : (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onNext}
            disabled={!nextEnabled || isSubmitting}
            className="px-6 py-2 rounded-lg font-medium transition-all min-w-[120px] flex items-center justify-center
              bg-gradient-to-r from-violet-600 to-pink-500 text-white hover:from-violet-700 hover:to-pink-600
              disabled:from-gray-400 disabled:to-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? <LoadingSpinner /> : '提交问卷'}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuizNavigation; 