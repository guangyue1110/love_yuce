'use client'

import { FC } from 'react'
import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  className?: string
}

const LoadingSpinner: FC<LoadingSpinnerProps> = ({ className }) => {
  return (
    <div
      className={cn(
        'inline-block border-4 border-current border-t-transparent rounded-full animate-spin',
        className
      )}
      role="status"
      aria-label="加载中"
    >
      <span className="sr-only">加载中...</span>
    </div>
  )
}

export default LoadingSpinner 