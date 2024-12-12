'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

export function Hero() {
  const router = useRouter()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center">
      <motion.h1 
        className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        遇见心动，相守一生
      </motion.h1>
      
      <motion.p
        className="mt-4 text-lg md:text-xl text-muted-foreground"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        找到与你灵魂共鸣的另一半
      </motion.p>

      <motion.button
        onClick={() => router.push('/quiz')}
        className="mt-8 rounded-full gradient-primary px-8 py-3 text-white hover:opacity-90 transition-opacity"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        开始测试
      </motion.button>
    </div>
  )
} 