'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import useQuizStore from '@/store/quiz'
import { motion } from 'framer-motion'
import type { Question, QuestionCategory } from '@/store/quiz'

// 定义权重对象的类型
const categoryWeights: Record<QuestionCategory, number> = {
  '基础信息': 0.2,
  '个性特征': 0.3,
  '生活习惯': 0.25,
  '伴侣期望': 0.25
}

export default function ResultPage() {
  const router = useRouter()
  const { answers, questions } = useQuizStore()

  // 如果没有答案，重定向到测试页面
  useEffect(() => {
    if (!answers || answers.length === 0) {
      router.push('/quiz')
    }
  }, [answers, router])

  // 计算匹配度和评级
  const calculateMatchScore = () => {
    if (!answers || !questions) return { score: 0, level: '未完成' }

    // 按类别分组计算得分
    const categoryScores = {
      '基础信息': 0,
      '个性特征': 0,
      '生活习惯': 0,
      '伴侣期望': 0
    }

    // 计算每个类别的得分
    answers.forEach(answer => {
      const question = questions.find(q => q.id === answer.questionId)
      if (!question?.category) return

      // 根据题目类型计算分数
      let score = 0
      switch (question.type) {
        case '单选题':
          // 根据选项的位置计算分数
          const optionIndex = question.options.findIndex(opt => opt === answer.value)
          score = Math.max(100 - optionIndex * 20, 0) // 第一个选项100分，依次递减20分
          break
        
        case '多选题':
          // 多选题根据选择数量计算得分
          const selectedCount = Array.isArray(answer.value) ? answer.value.length : 1
          const maxOptions = question.options.length
          score = (selectedCount / maxOptions) * 100
          break
        
        case '量表题':
          // 量表题直接使用选项索引作为得分基础
          const scaleIndex = question.options.findIndex(opt => opt === answer.value)
          score = ((scaleIndex + 1) / question.options.length) * 100
          break
        
        default:
          score = 0
      }

      categoryScores[question.category] += score
    })

    // 计算每个类别的平均分
    const categories = Object.keys(categoryScores) as QuestionCategory[]
    categories.forEach(category => {
      const categoryQuestions = questions.filter(q => q.category === category)
      if (categoryQuestions.length > 0) {
        categoryScores[category] = categoryScores[category] / categoryQuestions.length
      }
    })

    // 计算加权总分
    const totalScore = Object.entries(categoryScores).reduce((total, [category, score]) => {
      return total + score * categoryWeights[category as QuestionCategory]
    }, 0)

    // 确定匹配等级
    let level = ''
    if (totalScore >= 90) level = '完美匹配'
    else if (totalScore >= 80) level = '极佳匹配'
    else if (totalScore >= 70) level = '良好匹配'
    else if (totalScore >= 60) level = '基础匹配'
    else level = '需要努力'

    return {
      score: Math.round(totalScore),
      level,
      categoryScores
    }
  }

  const matchResult = calculateMatchScore()

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 py-8 relative overflow-hidden">
      {/* 添加浮动的装饰元素 */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-[10%] text-4xl"
        >
          💝
        </motion.div>
        <motion.div
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
          className="absolute top-40 right-[15%] text-3xl"
        >
          ✨
        </motion.div>
        <motion.div
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 3, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-40 left-[20%] text-3xl"
        >
          🌸
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        {/* 结果标题 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 relative"
        >
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-5xl"
            >
              💖
            </motion.div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600">
              缘分测试结果
            </span>
          </h1>
          <p className="text-gray-600 text-lg tracking-wide">
            基于您的回答，我们为您生成了专属的匹配报告 ✨
          </p>
        </motion.div>

        {/* 总分展示卡片 */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-white rounded-2xl p-8 md:p-10 shadow-lg mb-12 relative overflow-hidden"
        >
          {/* 爱心背景装饰 */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-full h-full">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-pink-500"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    fontSize: `${Math.random() * 20 + 10}px`,
                    transform: `rotate(${Math.random() * 360}deg)`
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 360, 0]
                  }}
                  transition={{
                    duration: Math.random() * 2 + 2,
                    repeat: Infinity,
                    delay: Math.random() * 2
                  }}
                >
                  ❤️
                </motion.div>
              ))}
            </div>
          </div>

          {/* 分数展示 */}
          <div className="relative">
            <div className="text-center mb-10">
              <motion.div 
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.8, type: "spring" }}
                className="relative inline-block"
              >
                <span className="text-8xl md:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500">
                  {matchResult.score}%
                </span>
                {/* 添加闪烁的星星 */}
                <motion.div 
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -right-8 -top-8 text-3xl"
                >
                  ✨
                </motion.div>
              </motion.div>
              <div className="mt-6">
                <div className="text-lg md:text-xl text-gray-600 mb-3 tracking-wide">匹配度</div>
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"
                >
                  {matchResult.level} 
                  <span className="ml-2">💫</span>
                </motion.div>
              </div>
            </div>

            {/* 分类得分展示 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {Object.entries(matchResult.categoryScores || {}).map(([category, score], index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="relative overflow-hidden group"
                >
                  <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-5 md:p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xl md:text-2xl">{getCategoryEmoji(category)}</span>
                      <div className="text-sm md:text-base font-medium text-gray-700">{category}</div>
                    </div>
                    <div className="flex items-end gap-2 mb-3">
                      <div className="text-2xl md:text-3xl font-bold text-gray-800">
                        {Math.round(score)}%
                      </div>
                      <div className="text-xs md:text-sm text-gray-500 mb-1 tracking-wide">
                        匹配度
                      </div>
                    </div>
                    {/* 进度条 */}
                    <div className="mt-3 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${score}%` }}
                        transition={{ delay: 1 + index * 0.1, duration: 0.8 }}
                        className="h-full bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 relative"
                      >
                        <motion.div
                          animate={{ x: [0, 10, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100"
                        >
                          ✨
                        </motion.div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 建议卡片标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 tracking-wide">
            💝 为您定制的专属建议
          </h2>
          <p className="text-base md:text-lg text-gray-600 tracking-wide">
            基于您的匹配结果，我们为您准备了以下建议
          </p>
        </motion.div>

        {/* 建议卡片区域 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 关系维护建议 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all h-full"
          >
            <div className="flex items-center gap-3 mb-8">
              <motion.span
                animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-3xl"
              >
                💝
              </motion.span>
              <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                关系维护建议
              </h3>
            </div>
            
            <div className="space-y-6">
              <div className="p-6 bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl">
                <h4 className="font-medium text-pink-600 mb-4 flex items-center gap-2">
                  <span>🌟</span>
                  <span className="text-base">个性化相处指南</span>
                </h4>
                <ul className="space-y-4">
                  <motion.li 
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-3"
                  >
                    <span className="text-pink-400 mt-1.5 text-lg">•</span>
                    <span className="text-gray-600 leading-relaxed">重视对方的个性空间和独处需求，给予适当的自由度</span>
                  </motion.li>
                  <motion.li 
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-3"
                  >
                    <span className="text-pink-400 mt-1.5 text-lg">•</span>
                    <span className="text-gray-600 leading-relaxed">保持适度的情感表达和交流，创造温馨的相处氛围</span>
                  </motion.li>
                </ul>
              </div>

              <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                <h4 className="font-medium text-purple-600 mb-4 flex items-center gap-2">
                  <span>✨</span>
                  <span className="text-base">感情培养建议</span>
                </h4>
                <ul className="space-y-4">
                  <motion.li 
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-3"
                  >
                    <span className="text-purple-400 mt-1.5 text-lg">•</span>
                    <span className="text-gray-600 leading-relaxed">创造共同的兴趣爱好和话题，增进彼此了解</span>
                  </motion.li>
                  <motion.li 
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-3"
                  >
                    <span className="text-purple-400 mt-1.5 text-lg">•</span>
                    <span className="text-gray-600 leading-relaxed">建立专属的情侣仪式，留下美好的共同回忆</span>
                  </motion.li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* 沟通相处建议 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.6 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all h-full"
          >
            <div className="flex items-center gap-3 mb-8">
              <motion.span
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-3xl"
              >
                💭
              </motion.span>
              <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                沟通相处建议
              </h3>
            </div>

            <div className="space-y-6">
              <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
                <h4 className="font-medium text-blue-600 mb-4 flex items-center gap-2">
                  <span>💫</span>
                  <span className="text-base">有效沟通技巧</span>
                </h4>
                <ul className="space-y-4">
                  <motion.li 
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-3"
                  >
                    <span className="text-blue-400 mt-1.5 text-lg">•</span>
                    <span className="text-gray-600 leading-relaxed">学会倾听和理解对方的感受，建立情感共鸣</span>
                  </motion.li>
                  <motion.li 
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-3"
                  >
                    <span className="text-blue-400 mt-1.5 text-lg">•</span>
                    <span className="text-gray-600 leading-relaxed">使用积极正面的表达方式，增进感情交流</span>
                  </motion.li>
                </ul>
              </div>

              <div className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl">
                <h4 className="font-medium text-purple-600 mb-4 flex items-center gap-2">
                  <span>🌈</span>
                  <span className="text-base">情感交流提示</span>
                </h4>
                <ul className="space-y-4">
                  <motion.li 
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-3"
                  >
                    <span className="text-purple-400 mt-1.5 text-lg">•</span>
                    <span className="text-gray-600 leading-relaxed">注意避免消极的沟方式，保持开放态度</span>
                  </motion.li>
                  <motion.li 
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-3"
                  >
                    <span className="text-purple-400 mt-1.5 text-lg">•</span>
                    <span className="text-gray-600 leading-relaxed">创造轻松愉快的交流氛围，增进感情</span>
                  </motion.li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* 生活协调建议 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.8 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all h-full"
          >
            <div className="flex items-center gap-3 mb-8">
              <motion.span
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="text-3xl"
              >
                💝🌟
              </motion.span>
              <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-pink-600">
                生活协调建议
              </h3>
            </div>

            <div className="space-y-6">
              <div className="p-6 bg-gradient-to-br from-amber-50 to-pink-50 rounded-xl">
                <h4 className="font-medium text-amber-600 mb-4 flex items-center gap-2">
                  <span>⏰</span>
                  <span className="text-base">作息时间调适</span>
                </h4>
                <ul className="space-y-4">
                  <motion.li 
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-3"
                  >
                    <span className="text-amber-400 mt-1.5 text-lg">•</span>
                    <span className="text-gray-600 leading-relaxed">尊重彼此的生活习惯，建立共同的休息时间</span>
                  </motion.li>
                  <motion.li 
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-3"
                  >
                    <span className="text-amber-400 mt-1.5 text-lg">•</span>
                    <span className="text-gray-600 leading-relaxed">合理安排约会和独处时间，保持生活平衡</span>
                  </motion.li>
                </ul>
              </div>

              <div className="p-6 bg-gradient-to-br from-pink-50 to-amber-50 rounded-xl">
                <h4 className="font-medium text-pink-600 mb-4 flex items-center gap-2">
                  <span>🌟</span>
                  <span className="text-base">兴趣爱好共享</span>
                </h4>
                <ul className="space-y-4">
                  <motion.li 
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-3"
                  >
                    <span className="text-pink-400 mt-1.5 text-lg">•</span>
                    <span className="text-gray-600 leading-relaxed">发现和培养共同兴趣，创造美好回忆</span>
                  </motion.li>
                  <motion.li 
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-3"
                  >
                    <span className="text-pink-400 mt-1.5 text-lg">•</span>
                    <span className="text-gray-600 leading-relaxed">相互分享各自的爱好，拓展生活乐趣</span>
                  </motion.li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* 成长发展建议 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all h-full"
          >
            <div className="flex items-center gap-3 mb-8">
              <motion.div
                animate={{ 
                  y: [0, -5, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-3xl"
              >
                💝
              </motion.div>
              <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600">
                成长发展建议
              </h3>
            </div>

            <div className="space-y-6">
              <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                <h4 className="font-medium text-green-600 mb-4 flex items-center gap-2">
                  <span>📚</span>
                  <span className="text-base">共同学习计划</span>
                </h4>
                <ul className="space-y-4">
                  <motion.li 
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-3"
                  >
                    <span className="text-green-400 mt-1.5 text-lg">•</span>
                    <span className="text-gray-600 leading-relaxed">制定共同的学习目标，互相督促进步</span>
                  </motion.li>
                  <motion.li 
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-3"
                  >
                    <span className="text-green-400 mt-1.5 text-lg">•</span>
                    <span className="text-gray-600 leading-relaxed">分享学习心得，共同提升能力</span>
                  </motion.li>
                </ul>
              </div>

              <div className="p-6 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl">
                <h4 className="font-medium text-emerald-600 mb-4 flex items-center gap-2">
                  <span>🌟</span>
                  <span className="text-base">目标规划</span>
                </h4>
                <ul className="space-y-4">
                  <motion.li 
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-3"
                  >
                    <span className="text-emerald-400 mt-1.5 text-lg">•</span>
                    <span className="text-gray-600 leading-relaxed">规划共同的未来蓝图，携手前进</span>
                  </motion.li>
                  <motion.li 
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-3"
                  >
                    <span className="text-emerald-400 mt-1.5 text-lg">•</span>
                    <span className="text-gray-600 leading-relaxed">互相支持各自的梦想，共同成长</span>
                  </motion.li>
                </ul>
              </div>

              {/* 添加浮动的装饰元素 */}
              <motion.div
                className="absolute -bottom-4 -right-4 text-2xl opacity-30"
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                🌿
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* 感情培养实践指南 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2 }}
          className="mt-16 bg-white rounded-2xl p-8 shadow-lg"
        >
          {/* 标题区域 */}
          <div className="text-center mb-12">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block relative"
            >
              <span className="text-4xl">💝</span>
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -right-3 -top-3 text-xl"
              >
                ✨
              </motion.span>
            </motion.div>
            <h2 className="text-2xl font-bold mt-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              感情培养实践指南
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 每日甜蜜互动 */}
            <div className="space-y-6">
              <div className="p-6 bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl">
                <h3 className="flex items-center gap-3 font-semibold text-lg mb-6">
                  <span className="text-2xl">💌</span>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600">
                    每日甜蜜互动
                  </span>
                </h3>
                <ul className="space-y-4">
                  <motion.li
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-4 p-4 bg-white/60 rounded-xl hover:bg-white/80 transition-all"
                  >
                    <span className="text-xl shrink-0">🌅</span>
                    <div>
                      <p className="font-medium text-gray-700 mb-1">早安晚安仪式</p>
                      <p className="text-sm text-gray-500">温暖的问候开启美好一天</p>
                    </div>
                  </motion.li>
                  <motion.li
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-4 p-4 bg-white/60 rounded-xl hover:bg-white/80 transition-all"
                  >
                    <span className="text-xl shrink-0">💭</span>
                    <div>
                      <p className="font-medium text-gray-700 mb-1">日常分享时刻</p>
                      <p className="text-sm text-gray-500">分享生活中的趣事和感动</p>
                    </div>
                  </motion.li>
                </ul>
              </div>

              {/* 感情储蓄计划 */}
              <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                <h3 className="flex items-center gap-3 font-semibold text-lg mb-6">
                  <span className="text-2xl">💖</span>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                    感情储蓄计划
                  </span>
                </h3>
                <ul className="space-y-4">
                  <motion.li
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-4 p-4 bg-white/60 rounded-xl hover:bg-white/80 transition-all"
                  >
                    <span className="text-xl shrink-0">✨</span>
                    <div>
                      <p className="font-medium text-gray-700 mb-1">每日感恩记录</p>
                      <p className="text-sm text-gray-500">记录生活中的感动瞬间</p>
                    </div>
                  </motion.li>
                  <motion.li
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-4 p-4 bg-white/60 rounded-xl hover:bg-white/80 transition-all"
                  >
                    <span className="text-xl shrink-0">🎁</span>
                    <div>
                      <p className="font-medium text-gray-700 mb-1">惊喜准备清单</p>
                      <p className="text-sm text-gray-500">定期准备小惊喜传递爱意</p>
                    </div>
                  </motion.li>
                </ul>
              </div>
            </div>

            {/* 共同成长计划 */}
            <div className="space-y-6">
              <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
                <h3 className="flex items-center gap-3 font-semibold text-lg mb-6">
                  <span className="text-2xl">🌱</span>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                    共同成长计划
                  </span>
                </h3>
                <ul className="space-y-4">
                  <motion.li
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-4 p-4 bg-white/60 rounded-xl hover:bg-white/80 transition-all"
                  >
                    <span className="text-xl shrink-0">📚</span>
                    <div>
                      <p className="font-medium text-gray-700 mb-1">学习型约会</p>
                      <p className="text-sm text-gray-500">一起参与学习和分享</p>
                    </div>
                  </motion.li>
                  <motion.li
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-4 p-4 bg-white/60 rounded-xl hover:bg-white/80 transition-all"
                  >
                    <span className="text-xl shrink-0">🎯</span>
                    <div>
                      <p className="font-medium text-gray-700 mb-1">目标达成</p>
                      <p className="text-sm text-gray-500">共同完成成长目标</p>
                    </div>
                  </motion.li>
                </ul>
              </div>

              {/* 情感深化练习 */}
              <div className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl">
                <h3 className="flex items-center gap-3 font-semibold text-lg mb-6">
                  <span className="text-2xl">💫</span>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
                    情感深化练习
                  </span>
                </h3>
                <ul className="space-y-4">
                  <motion.li
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-4 p-4 bg-white/60 rounded-xl hover:bg-white/80 transition-all"
                  >
                    <span className="text-xl shrink-0">💭</span>
                    <div>
                      <p className="font-medium text-gray-700 mb-1">深度对话时光</p>
                      <p className="text-sm text-gray-500">定期进行心灵对话</p>
                    </div>
                  </motion.li>
                  <motion.li
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-4 p-4 bg-white/60 rounded-xl hover:bg-white/80 transition-all"
                  >
                    <span className="text-xl shrink-0">🌈</span>
                    <div>
                      <p className="font-medium text-gray-700 mb-1">关系回顾</p>
                      <p className="text-sm text-gray-500">共同回顾和规划未来</p>
                    </div>
                  </motion.li>
                </ul>
              </div>
            </div>
          </div>

          {/* 温馨提示 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
            className="mt-10 p-5 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl text-center"
          >
            <p className="text-gray-600 text-sm tracking-wider flex items-center justify-center gap-3">
              <span className="text-xl">💝</span>
              <span>坚持每一个小习惯，让爱情日渐升温</span>
              <span className="text-xl">✨</span>
            </p>
          </motion.div>
        </motion.div>

        {/* 底部按钮组 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="mt-16 space-y-8"
        >
          {/* 主操作按钮 */}
          <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 text-white text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all tracking-wide"
              onClick={() => router.push('/quiz')}
            >
              重新测试
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-gray-700 text-lg font-medium rounded-xl shadow-md hover:shadow-lg transition-all tracking-wide"
              onClick={() => router.push('/')}
            >
              返回首页
            </motion.button>
          </div>

          {/* 分享和保存按钮 */}
          <div className="flex justify-center gap-4 md:gap-6">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 px-6 py-3 bg-white rounded-xl shadow hover:shadow-md transition-all"
            >
              <span className="text-xl">🔗</span>
              <span className="text-gray-600 font-medium tracking-wide">分享结果</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 px-6 py-3 bg-white rounded-xl shadow hover:shadow-md transition-all"
            >
              <span className="text-xl">📑</span>
              <span className="text-gray-600 font-medium tracking-wide">保存报告</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </main>
  )
}

// 辅助函数：根据类别返回对应的表情
function getCategoryEmoji(category: string) {
  switch (category) {
    case '基础信息': return '📝'
    case '个性特征': return '🧠'
    case '生活习惯': return '🌟'
    case '伴侣期望': return '💝'
    default: return '✨'
  }
}