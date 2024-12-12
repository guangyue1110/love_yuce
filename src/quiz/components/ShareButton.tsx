'use client'

import { FC, useState } from 'react'
import { motion } from 'framer-motion'

interface ShareButtonProps {
  score: number
}

const ShareButton: FC<ShareButtonProps> = ({ score }) => {
  const [showToast, setShowToast] = useState(false)

  const shareText = `我在爱情测试中获得了${score}分！快来测测你的分数吧~ ${window.location.origin}`

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '爱情测试结果',
          text: shareText,
          url: window.location.href,
        })
      } catch (error) {
        console.error('分享失败:', error)
        handleCopy()
      }
    } else {
      handleCopy()
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText)
      setShowToast(true)
      setTimeout(() => setShowToast(false), 2000)
    } catch (error) {
      console.error('复制失败:', error)
    }
  }

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleShare}
        className="w-full px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors flex items-center justify-center gap-2"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
          />
        </svg>
        分享结果
      </motion.button>

      {/* Toast 提示 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: showToast ? 1 : 0, y: showToast ? 0 : 10 }}
        className="absolute left-1/2 -translate-x-1/2 -bottom-12 bg-gray-800 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap"
      >
        分享链接已复制到剪贴板
      </motion.div>
    </div>
  )
}

export default ShareButton 