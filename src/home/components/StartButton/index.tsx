'use client'

import { FC, useState } from 'react'
import { useRouter } from 'next/navigation'
import LoadingState from './LoadingState'

const StartButton: FC = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = () => {
    setIsLoading(true)
    router.push('/quiz')
  }

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className="relative overflow-hidden bg-[#8B5CF6] text-white font-medium text-xl py-4 px-16 rounded-full transition-all transform hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[200px] disabled:hover:scale-100"
      aria-label={isLoading ? '加载中...' : '开始测试'}
    >
      {isLoading ? (
        <LoadingState />
      ) : (
        '开始测试'
      )}
    </button>
  )
}

export default StartButton 