'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Heart, ArrowRight, CheckCircle2, Clock, AlertCircle } from 'lucide-react'

export default function HomePage() {
  const router = useRouter()

  const steps = [
    {
      icon: <Heart className="w-5 h-5" />,
      title: "完成测试",
      desc: "回答精心设计的问题",
      color: "from-pink-400 to-purple-400"
    },
    {
      icon: <CheckCircle2 className="w-5 h-5" />,
      title: "获取结果",
      desc: "了解你的灵魂特质",
      color: "from-purple-400 to-pink-400"
    },
    {
      icon: <ArrowRight className="w-5 h-5" />,
      title: "找到真爱",
      desc: "遇见命中注定的人",
      color: "from-pink-400 to-purple-400"
    }
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 flex items-center justify-center relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-200/20"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0.2, 0.5, 0.2], 
              scale: [1, 1.2, 1],
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: 5,
              delay: i * 0.2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            {['💝', '💖', '💗', '💓', '💕'][Math.floor(Math.random() * 5)]}
          </motion.div>
        ))}
      </div>

      {/* 主要内容 */}
      <div className="text-center z-10 max-w-4xl mx-auto px-4 py-12 md:py-16">
        {/* 主标题区域 */}
        <motion.h1 
          className="text-4xl md:text-5xl font-bold text-gray-700 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          遇见心动，相守一生
        </motion.h1>
        
        <motion.p
          className="text-lg text-gray-600 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          找到与你灵魂共鸣的另一半
        </motion.p>

        {/* 使用规则 - 更轻量化的设计 */}
        <motion.div
          className="bg-white/30 backdrop-blur-sm rounded-xl p-6 mb-16 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-xl font-medium text-gray-700 mb-4 flex items-center justify-center gap-2">
            <Heart className="w-5 h-5 text-pink-400" />
            <span>使用说明</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <motion.div 
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/20 transition-all"
              whileHover={{ scale: 1.02, x: 2 }}
            >
              <CheckCircle2 className="w-4 h-4 text-pink-400 flex-shrink-0" />
              <p className="text-sm text-gray-600">认真回答每个问题</p>
            </motion.div>
            <motion.div 
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/20 transition-all"
              whileHover={{ scale: 1.02, x: 2 }}
            >
              <Clock className="w-4 h-4 text-pink-400 flex-shrink-0" />
              <p className="text-sm text-gray-600">测试约需3-5分钟</p>
            </motion.div>
            <motion.div 
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/20 transition-all"
              whileHover={{ scale: 1.02, x: 2 }}
            >
              <AlertCircle className="w-4 h-4 text-pink-400 flex-shrink-0" />
              <p className="text-sm text-gray-600">结果仅供参考娱乐</p>
            </motion.div>
          </div>
        </motion.div>

        {/* 三步流程说明 - 更突出的设计 */}
        <motion.div 
          className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative bg-white/40 backdrop-blur-sm rounded-xl p-6 flex flex-col items-center group"
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 10px 30px -10px rgba(236, 72, 153, 0.3)"
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className={`bg-gradient-to-r ${step.color} p-3 rounded-full text-white mb-4 
                transform group-hover:scale-110 transition-transform duration-300`}>
                {step.icon}
              </div>
              <h3 className="font-semibold text-gray-700 mb-2 text-lg">{step.title}</h3>
              <p className="text-sm text-gray-500">{step.desc}</p>
              <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-pink-300 to-purple-300 
                rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </motion.div>
          ))}
        </motion.div>

        {/* 开始测试按钮 - 移到最下方 */}
        <motion.button
          onClick={() => router.push('/quiz')}
          className="bg-gradient-to-r from-purple-400 to-pink-400 text-white px-10 py-4 rounded-full 
            hover:opacity-90 transition-all hover:scale-105 active:scale-95 mt-12 text-lg font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          whileHover={{ 
            boxShadow: "0 0 30px rgba(236, 72, 153, 0.4)"
          }}
        >
          <span className="flex items-center gap-3">
            开始测试 
            <motion.span 
              className="inline-block"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              💝
            </motion.span>
          </span>
        </motion.button>
      </div>

      {/* 装饰性元素 */}
      <div className="absolute bottom-10 left-10 text-pink-200/30 animate-bounce delay-100">
        💖
      </div>
      <div className="absolute top-10 right-10 text-pink-200/30 animate-bounce">
        💝
      </div>
      <div className="absolute bottom-20 right-20 text-pink-200/30 animate-bounce delay-200">
        💗
      </div>
    </main>
  )
}