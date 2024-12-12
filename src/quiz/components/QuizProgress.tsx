'use client'

import { FC } from 'react';
import { motion } from 'framer-motion';

interface QuizProgressProps {
  currentQuestion: number;
  totalQuestions: number;
}

const QuizProgress: FC<QuizProgressProps> = ({ currentQuestion, totalQuestions }) => {
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div className="mb-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center mb-2"
      >
        <motion.span 
          key={currentQuestion}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm font-medium text-gray-600 dark:text-gray-400"
        >
          问题 {currentQuestion + 1}/{totalQuestions}
        </motion.span>
        <motion.span 
          key={progress}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-sm font-medium text-violet-600 dark:text-violet-400"
        >
          {progress.toFixed(0)}%
        </motion.span>
      </motion.div>
      
      <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-violet-500 to-pink-500"
          initial={{ width: 0 }}
          animate={{ 
            width: `${progress}%`,
            transition: { 
              duration: 0.5,
              ease: "easeOut"
            }
          }}
        >
          <motion.div
            className="absolute top-0 right-0 h-full w-4 bg-gradient-to-r from-transparent to-white/20"
            animate={{
              opacity: [0, 1, 0],
              x: [-20, 0, 20],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center"
      >
        {progress === 100 ? '已完成所有问题' : '继续加油！'}
      </motion.div>
    </div>
  );
};

export default QuizProgress; 