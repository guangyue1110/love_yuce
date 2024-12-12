'use client'

import { motion } from 'framer-motion'

interface PersonalityTrait {
  trait: string
  self: string
  ideal: string
  match: number
  isStrength: boolean
}

const PersonalityMatch = () => {
  const traits = [
    {
      trait: '性格外向程度',
      self: '偏外向，喜欢社交',
      ideal: '适度外向',
      match: 85,
      isStrength: true
    },
    {
      trait: '决策方式',
      self: '理性分析为主',
      ideal: '感性直觉为主',
      match: 70,
      isStrength: true
    },
    {
      trait: '生活态度',
      self: '追求稳定',
      ideal: '适度冒险',
      match: 75,
      isStrength: false
    }
  ]

  return (
    <div className="space-y-4">
      {traits.map((trait, index) => (
        <motion.div
          key={trait.trait}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white/50 backdrop-blur-sm rounded-lg p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-gray-700">{trait.trait}</span>
            <span className={`text-sm px-2 py-0.5 rounded-full ${
              trait.isStrength ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'
            }`}>
              {trait.match}% 匹配
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500 block mb-1">你的特质</span>
              <p className="text-purple-600">{trait.self}</p>
            </div>
            <div>
              <span className="text-gray-500 block mb-1">理想特质</span>
              <p className="text-pink-600">{trait.ideal}</p>
            </div>
          </div>
          {trait.isStrength && (
            <div className="mt-2 text-sm text-green-600 flex items-center gap-1">
              <span>✨</span> 这是你们的优势互补点
            </div>
          )}
        </motion.div>
      ))}
    </div>
  )
}

export default PersonalityMatch