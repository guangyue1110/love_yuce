'use client'

import * as React from 'react'
import { Info } from 'lucide-react'

export function RulesButton() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-full p-2.5 bg-accent/50 hover:bg-accent/80 transition-colors ml-2"
        aria-label="使用规则"
      >
        <Info className="h-5 w-5 text-accent-foreground" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-background p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-4">使用规则</h2>
            <div className="space-y-2 text-muted-foreground">
              <p>1. 请如实回答所有问题</p>
              <p>2. 每个问题都需要选择一个答案</p>
              <p>3. 测试完成后将生成个性化报告</p>
              <p>4. 报告结果仅供参考</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="mt-6 w-full rounded-full gradient-primary text-white px-4 py-2 hover:opacity-90 transition-opacity"
            >
              我知道了
            </button>
          </div>
        </div>
      )}
    </>
  )
} 