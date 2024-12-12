'use client'

import { useRouter } from 'next/navigation'
import { BaseProps } from "@/types"
import { cn } from "@/lib/utils"

export interface StartButtonProps extends BaseProps {
  onClick?: () => void
}

export function StartButton({ className, onClick }: StartButtonProps) {
  const router = useRouter()

  const handleClick = () => {
    onClick?.()
    router.push('/quiz')
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        "group relative px-12 py-3 text-base md:text-lg font-medium text-white",
        "bg-gradient-to-r from-[#8B5CF6] to-[#EC4899]",
        "rounded-full shadow-sm",
        "hover:opacity-90 hover:shadow-md active:scale-98",
        "transform transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2",
        "motion-safe:hover:scale-[1.02]",
        className
      )}
    >
      <span className="relative z-10">开始测试</span>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-50" />
    </button>
  )
} 