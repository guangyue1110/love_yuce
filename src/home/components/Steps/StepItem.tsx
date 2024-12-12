'use client'

import { FC } from 'react';
import { motion } from 'framer-motion';

interface StepItemProps {
  number: number;
  title: string;
  description: string;
}

const StepItem: FC<StepItemProps> = ({ number, title, description }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: number * 0.1 }}
      viewport={{ once: true }}
      className="flex items-start gap-6 p-6 rounded-2xl bg-gray-100/50 dark:bg-gray-700/50 backdrop-blur-sm transition-colors"
    >
      <div className="w-12 h-12 rounded-full bg-[#8B5CF6] flex items-center justify-center text-white font-bold text-xl shrink-0">
        {number}
      </div>
      <div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 transition-colors">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed transition-colors">{description}</p>
      </div>
    </motion.div>
  );
};

export default StepItem;