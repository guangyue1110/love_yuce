'use client'

import { FC } from 'react'
import { motion } from 'framer-motion'

interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
}

const StepIndicator: FC<StepIndicatorProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex justify-center gap-2 mt-4">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <motion.div
          key={index}
          className={`w-3 h-3 rounded-full ${index < currentStep ? 'bg-[var(--primary)]' : 'bg-gray-300'}`}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        />
      ))}
    </div>
  )
}

export default StepIndicator