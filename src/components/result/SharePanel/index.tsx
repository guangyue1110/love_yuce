'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export function SharePanel() {
  const [isGenerating, setIsGenerating] = useState(false)

  const handleShare = async () => {
    setIsGenerating(true)
    // 实现分享逻辑
    setTimeout(() => setIsGenerating(false), 1500)
  }

  const handleDownloadPDF = async () => {
    setIsGenerating(true)
    // 实现PDF下载逻辑
    setTimeout(() => setIsGenerating(false), 1500)
  }

  return (
    <section className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-center space-x-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-primary text-white rounded-lg"
          onClick={handleShare}
          disabled={isGenerating}
        >
          分享结果
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-accent text-white rounded-lg"
          onClick={handleDownloadPDF}
          disabled={isGenerating}
        >
          下载PDF报告
        </motion.button>
      </div>
      
      {isGenerating && (
        <p className="text-center mt-4 text-gray-600">
          正在生成...
        </p>
      )}
    </section>
  )
} 