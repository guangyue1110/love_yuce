'use client'

import { FC } from 'react'
import { motion } from 'framer-motion'

const KeyboardHints: FC = () => {
  const hints = [
    { key: '←', desc: '上一题' },
    { key: '→', desc: '下一题' },
    { key: '1-6', desc: '选择选项' },
    { key: 'Enter', desc: '提交' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg"
    >
      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
        {hints.map(({ key, desc }) => (
          <div key={key} className="flex items-center gap-1">
            <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs font-mono">
              {key}
            </kbd>
            <span>{desc}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default KeyboardHints 