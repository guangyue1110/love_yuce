'use client'

import LoadingSpinner from '@/components/LoadingSpinner'

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <LoadingSpinner className="w-12 h-12 mb-4" />
        <h2 className="text-xl font-medium text-foreground">加载中...</h2>
        <p className="text-muted-foreground mt-2">正在准备测试题目</p>
      </div>
    </div>
  )
} 