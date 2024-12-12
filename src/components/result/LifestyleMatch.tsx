'use client'

import { motion } from 'framer-motion'

const LifestyleMatch = () => {
  const lifestyles = [
    {
      aspect: '作息时间',
      compatibility: 75,
      description: '早睡早起的习惯比较接近',
      icon: '⏰'
    },
    {
      aspect: '饮食习惯',
      compatibility: 90,
      description: '都喜欢尝试美食，饮食习惯很合拍',
      icon: '🍽️'
    }
  ]

  const hobbies = [
    { name: '看电影', icon: '🎬' },
    { name: '听音乐', icon: '🎵' },
    { name: '美食探店', icon: '🍜' },
    { name: '旅行', icon: '✈️' }
  ]

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {lifestyles.map((item, index) => (
          <motion.div
            key={item.aspect}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/50 backdrop-blur-sm rounded-lg p-4"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{item.icon}</span>
              <div className="flex-1">
                <h4 className="font-medium text-gray-700 mb-1">{item.aspect}</h4>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-purple-400 to-pink-400"
                    initial={{ width: 0 }}
                    animate={{ width: `${item.compatibility}%` }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                  />
                </div>
              </div>
              <span className="text-sm font-medium text-pink-500">
                {item.compatibility}%
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
          <span>✨</span> 共同的兴趣爱好
        </h4>
        <div className="flex flex-wrap gap-2">
          {hobbies.map((hobby, index) => (
            <motion.div
              key={hobby.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm"
            >
              <span>{hobby.icon}</span>
              <span className="text-sm text-gray-700">{hobby.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LifestyleMatch 