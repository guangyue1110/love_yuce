'use client'

import { motion } from 'framer-motion'

const ValueMatch = () => {
  const values = [
    {
      aspect: '婚姻观念',
      self: '向往稳定的家庭生活',
      ideal: '重视家庭责任',
      isMatch: true,
      suggestion: '你们对家庭的理解很一致，这是感情稳定的基础'
    },
    {
      aspect: '事业态度',
      self: '追求事业发展',
      ideal: '平衡工作与生活',
      isMatch: false,
      suggestion: '建议多沟通工作与生活的平衡问题'
    }
  ]

  return (
    <div className="space-y-4">
      {values.map((value, index) => (
        <motion.div
          key={value.aspect}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`rounded-lg p-4 ${
            value.isMatch ? 'bg-green-50/70' : 'bg-yellow-50/70'
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">
              {value.isMatch ? '💚' : '💛'}
            </span>
            <h4 className="font-medium text-gray-700">{value.aspect}</h4>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-2 text-sm">
            <div>
              <span className="text-gray-500 block mb-1">你的观点</span>
              <p className="text-gray-700">{value.self}</p>
            </div>
            <div>
              <span className="text-gray-500 block mb-1">对方期待</span>
              <p className="text-gray-700">{value.ideal}</p>
            </div>
          </div>
          {value.suggestion && (
            <p className="text-sm text-gray-600 mt-2 border-t border-gray-100 pt-2">
              💡 {value.suggestion}
            </p>
          )}
        </motion.div>
      ))}
    </div>
  )
}

export default ValueMatch 