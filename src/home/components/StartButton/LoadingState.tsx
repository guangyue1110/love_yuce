'use client'

import { FC } from 'react'

const LoadingState: FC = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:-0.3s]" />
      <div className="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:-0.15s]" />
      <div className="w-2 h-2 rounded-full bg-white animate-bounce" />
    </div>
  )
}

export default LoadingState 