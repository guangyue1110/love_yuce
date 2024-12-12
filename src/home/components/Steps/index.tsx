'use client'

import { FC } from 'react'
import StepItem from './StepItem'
import { motion } from 'framer-motion'

const Steps: FC = () => {
  const steps = [
    {
      title: '完成测评问卷',
      description: '约15-20分钟，了解你的性格特征和价值观',
    },
    {
      title: '获取个性化报告',
      description: '包含三大维度分析，全方位了解自己',
    },
    {
      title: '查看匹配建议',
      description: '获得核心建议和改善方向',
    },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#D946EF] to-[#8B5CF6]">
          使用流程
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-[#D946EF] to-[#8B5CF6] mx-auto rounded-full mt-4" />
      </motion.div>

      <div className="space-y-6">
        {steps.map((step, index) => (
          <StepItem
            key={index}
            number={index + 1}
            title={step.title}
            description={step.description}
          />
        ))}
      </div>
    </div>
  )
}

export default Steps