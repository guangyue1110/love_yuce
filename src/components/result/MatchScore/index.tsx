'use client'

import { motion } from "framer-motion"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

export function MatchScore() {
  const score = 85 // 这里应该从API获取
  
  const getMatchLevel = (score: number) => {
    if (score >= 90) return { text: '完美', color: '#10B981' }
    if (score >= 80) return { text: '优秀', color: '#3B82F6' }
    if (score >= 70) return { text: '良好', color: '#6366F1' }
    return { text: '一般', color: '#9CA3AF' }
  }

  const matchLevel = getMatchLevel(score)

  return (
    <section className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-8 text-center">缘分契合度</h2>
      
      <div className="w-48 h-48 mx-auto">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
        >
          <CircularProgressbar
            value={score}
            text={`${score}%`}
            styles={buildStyles({
              pathColor: matchLevel.color,
              textColor: matchLevel.color,
              trailColor: '#E5E7EB',
              pathTransitionDuration: 1,
            })}
          />
        </motion.div>
      </div>
      
      <motion.div 
        className="mt-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 
          className="text-xl font-semibold mb-2"
          style={{ color: matchLevel.color }}
        >
          {matchLevel.text}匹配
        </h3>
        <p className="text-gray-600">
          你们的缘分契合度达到了 {score}%，处于{matchLevel.text}水平
        </p>
        <p className="text-sm text-gray-500 mt-2">
          基于15道测试题的综合评估结果
        </p>
      </motion.div>
    </section>
  )
}
