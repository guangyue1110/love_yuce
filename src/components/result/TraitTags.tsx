'use client'

import { motion } from 'framer-motion'

interface Trait {
  label: string
  score: number
  icon: string
}

interface TraitTagsProps {
  traits: Trait[]
}

export function TraitTags({ traits }: TraitTagsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {traits.map((trait, index) => (
        <motion.div
          key={trait.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className="bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-full flex items-center gap-2 group hover:from-purple-200 hover:to-pink-200 transition-all cursor-pointer"
        >
          <span className="text-lg group-hover:scale-125 transition-transform">
            {trait.icon}
          </span>
          <span className="text-gray-700">{trait.label}</span>
          <span className="text-sm text-pink-500 font-medium">
            {trait.score}%
          </span>
        </motion.div>
      ))}
    </div>
  )
} 