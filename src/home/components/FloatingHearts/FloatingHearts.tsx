import { useEffect, useState } from 'react'
import { cn } from "@/lib/utils"

interface HeartProps {
  className?: string
  style?: React.CSSProperties
}

function Heart({ className, style }: HeartProps) {
  return (
    <div className={cn("absolute animate-float-up opacity-0", className)} style={style}>
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        className="text-pink-400/20"
      >
        <path 
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
          fill="currentColor"
        />
      </svg>
    </div>
  )
}

export function FloatingHearts() {
  const [hearts, setHearts] = useState<{ id: number; style: any }[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      const left = Math.random() * 100
      const animationDuration = 3000 + Math.random() * 3000
      const size = 16 + Math.random() * 16

      setHearts(hearts => [...hearts, {
        id: Date.now(),
        style: {
          left: `${left}%`,
          animationDuration: `${animationDuration}ms`,
          width: `${size}px`,
          height: `${size}px`,
        }
      }])
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const cleanup = setInterval(() => {
      setHearts(hearts => hearts.filter(heart => 
        Date.now() - heart.id < 6000
      ))
    }, 1000)

    return () => clearInterval(cleanup)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {hearts.map(heart => (
        <Heart 
          key={heart.id} 
          className="animate-float-up"
          style={heart.style}
        />
      ))}
    </div>
  )
} 