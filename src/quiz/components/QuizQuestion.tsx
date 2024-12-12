'use client'

import { FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QuizQuestion as QuizQuestionType } from '../types/quiz';

interface QuizQuestionProps {
  question: QuizQuestionType;
  selectedOption?: string | string[];
  onSelect: (value: string) => void;
  questionNumber: number;
  totalQuestions: number;
}

const QuestionTypeTag: FC<{ type: 'single' | 'multiple' }> = ({ type }) => (
  <span className={`
    inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium
    ${type === 'single' 
      ? 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300' 
      : 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300'}
  `}>
    {type === 'single' ? (
      <>
        <span className="w-1.5 h-1.5 rounded-full bg-current"/>
        单选题
      </>
    ) : (
      <>
        <span className="w-1.5 h-1.5 rounded-md bg-current"/>
        多选题
      </>
    )}
  </span>
);

const QuizQuestion: FC<QuizQuestionProps> = ({
  question,
  selectedOption,
  onSelect,
  questionNumber,
  totalQuestions,
}) => {
  const isMultiple = question.type === 'multiple';
  const selectedOptions = Array.isArray(selectedOption) ? selectedOption : [selectedOption];

  const containerVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  };

  const optionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3
      }
    })
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.id}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                问题 {questionNumber}/{totalQuestions}
              </span>
              <QuestionTypeTag type={question.type} />
            </div>
            {question.required && (
              <span className="text-sm text-red-500 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                必答题
              </span>
            )}
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {question.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {question.options.map((option, index) => (
            <motion.button
              key={option.value}
              variants={optionVariants}
              initial="hidden"
              animate="visible"
              custom={index}
              onClick={() => onSelect(option.value)}
              className={`
                group flex items-center gap-3 px-4 py-4 rounded-xl border transition-all
                ${selectedOptions.includes(option.value)
                  ? 'border-violet-500 bg-violet-50 dark:bg-violet-900/20 shadow-lg'
                  : 'border-gray-200 dark:border-gray-700 hover:border-violet-200 dark:hover:border-violet-700'}
                hover:shadow-md hover:-translate-y-0.5 active:translate-y-0
              `}
            >
              <div className={`
                relative w-5 h-5 rounded-${isMultiple ? 'md' : 'full'} border-2 flex-shrink-0
                transition-colors duration-200 flex items-center justify-center
                ${selectedOptions.includes(option.value)
                  ? 'border-violet-500 bg-violet-500'
                  : 'border-gray-300 dark:border-gray-600 group-hover:border-violet-400'}
              `}>
                {selectedOptions.includes(option.value) && (
                  <motion.svg
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-3 h-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </motion.svg>
                )}
                <span className="absolute -right-6 -top-1 text-sm text-gray-400">
                  {index + 1}
                </span>
              </div>
              <span className={`text-base ${
                selectedOptions.includes(option.value)
                  ? 'text-violet-700 dark:text-violet-300 font-medium'
                  : 'text-gray-700 dark:text-gray-300'
              }`}>
                {option.label}
              </span>
            </motion.button>
          ))}
        </div>

        {isMultiple && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>提示：可以选择多个选项</span>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default QuizQuestion; 