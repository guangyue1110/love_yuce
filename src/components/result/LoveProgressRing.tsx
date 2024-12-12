'use client'

import { motion } from 'framer-motion'

interface LoveProgressRingProps {
  score: number
  size?: number
}

const LoveProgressRing = ({ score, size = 200 }: LoveProgressRingProps) => {
  const radius = 42
  const circumference = 2 * Math.PI * radius
  const progress = (100 - score) / 100 * circumference

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="w-full h-full -rotate-90">
        {/* 装饰性的小爱心背景 */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.path
            key={i}
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill="none"
            stroke="rgba(236, 72, 153, 0.1)"
            strokeWidth="1"
            transform={`translate(50, 50) rotate(${i * 45}) scale(0.8)`}
          />
        ))}
        
        {/* 主进度环 */}
        <circle
          className="text-pink-100"
          strokeWidth="8"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="50"
          cy="50"
        />
        <motion.circle
          className="text-pink-400"
          strokeWidth="8"
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="50"
          cy="50"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: progress }}
          transition={{ duration: 2, ease: "easeOut" }}
          style={{
            strokeDasharray: circumference
          }}
        />
        
        {/* 中心数字 */}
        <text
          x="50"
          y="50"
          className="text-3xl font-bold"
          textAnchor="middle"
          dy=".3em"
          fill="#EC4899"
        >
          {score}%
        </text>
      </svg>

      {/* 装饰元素 */}
      <motion.div 
        className="absolute -top-4 -right-4 text-2xl"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        ✨
      </motion.div>
      <motion.div 
        className="absolute -bottom-4 -left-4 text-2xl"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
      >
        💫
      </motion.div>
      
      {/* 漂浮的爱心 */}
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-pink-400 text-xl"
          style={{
            left: `${30 + i * 20}%`,
            top: `${20 + i * 30}%`
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 1, 0.2]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.8
          }}
        >
          💝
        </motion.div>
      ))}
    </div>
  )
}

export default LoveProgressRing 