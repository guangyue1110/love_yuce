'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const adviceCategories = [
  {
    id: 'relationship',
    title: '关系维护建议',
    items: [
      '基于你们的性格特征，建议多进行户外活动增进感情',
      '定期安排约会时间，保持感情新鲜度',
      '学会欣赏对方的优点，包容对方的缺点'
    ]
  },
  {
    id: 'communication',
    title: '沟通相处建议',
    items: [
      '采用开放式对话方式，避免是非判断',
      '保持积极倾听的态度，理解对方感受',
      '适时表达关心和感谢，增进情感联系'
    ]
  },
  // ... 其他建议类别
]

export function CoreAdvice() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  return (
    <section className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">核心建议</h2>
      
      <div className="space-y-4">
        {adviceCategories.map(category => (
          <div key={category.id} className="border rounded-lg overflow-hidden">
            <button
              className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors"
              onClick={() => setExpandedCategory(
                expandedCategory === category.id ? null : category.id
              )}
            >
              <h3 className="text-lg font-semibold">{category.title}</h3>
            </button>
            
            <motion.div
              initial={false}
              animate={{
                height: expandedCategory === category.id ? 'auto' : 0,
                opacity: expandedCategory === category.id ? 1 : 0
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="p-6 space-y-3">
                {category.items.map((item, index) => (
                  <p key={index} className="text-gray-600">
                    • {item}
                  </p>
                ))}
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  )
} 