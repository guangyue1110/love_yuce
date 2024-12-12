'use client'

import { FC } from 'react'
import { motion } from 'framer-motion'
import StartButton from '../StartButton'

const Slogan: FC = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center">
      <div className="space-y-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-7xl font-bold tracking-wider text-black dark:text-white text-center transition-colors"
        >
          遇见心动，相守一生
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-gray-400 text-lg text-center transition-colors"
        >
          找到与你灵魂共的另一半
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="pt-6 flex justify-center"
        >
          <StartButton />
        </motion.div>
      </div>
    </div>
  )
}

export default Slogan