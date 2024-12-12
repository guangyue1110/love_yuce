'use client'

import { motion } from 'framer-motion'

interface Badge {
  title: string
  description: string
  icon: string
}

interface AchievementBadgesProps {
  badges: Badge[]
}

export function AchievementBadges({ badges }: AchievementBadgesProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {badges.map((badge, index) => (
        <motion.div
          key={badge.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
          className="bg-white rounded-lg p-4 text-center shadow-lg hover:shadow-xl transition-shadow"
        >
          <div className="text-3xl mb-2">{badge.icon}</div>
          <h4 className="font-medium text-gray-700 mb-1">{badge.title}</h4>
          <p className="text-sm text-gray-500">{badge.description}</p>
        </motion.div>
      ))}
    </div>
  )
} 