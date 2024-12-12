import { cn } from "@/lib/utils"

export function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] opacity-[0.15]">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/50 via-pink-400/50 to-pink-500/50 blur-3xl animate-gradient" />
      </div>
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] mix-blend-overlay" />
    </div>
  )
} 