'use client'

import { FC } from 'react';
import { motion } from 'framer-motion';

interface ResultSection {
  title: string;
  content: string;
  score?: number;
}

interface QuizResultProps {
  sections: ResultSection[];
  totalScore: number;
}

const QuizResult: FC<QuizResultProps> = ({ sections, totalScore }) => {
  return (
    <div className="space-y-6">
      {/* 总分展示 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-left"
      >
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          您的个性化报告已生成
        </h2>
        <div className="text-4xl font-bold text-gray-900 dark:text-white">
          {totalScore}分
        </div>
      </motion.div>

      {/* 分析报告 */}
      <div className="space-y-6">
        {sections.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {section.title}
              </h3>
              {section.score !== undefined && (
                <div className="text-xl font-bold text-gray-900 dark:text-white">
                  {section.score}分
                </div>
              )}
            </div>
            <p className="text-base text-gray-600 dark:text-gray-400 whitespace-pre-line">
              {section.content}
            </p>
          </motion.div>
        ))}
      </div>

      {/* 建议提示 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-sm text-gray-500 dark:text-gray-400 mt-8"
      >
        * 以上分析仅供参考，建议您结合实际情况做出判断
      </motion.div>
    </div>
  );
};

export default QuizResult; 