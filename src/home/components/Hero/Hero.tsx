import { BaseProps } from "@/types"
import { cn } from "@/lib/utils"

interface HeroProps {
  // 你的接口定义
}

export const Hero: React.FC<HeroProps> = () => {
  return (
    <section className={cn("min-h-[70vh] flex flex-col items-center justify-center px-4")}>
      <h1 className="text-4xl md:text-6xl font-bold text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
        遇见心动，相守一生
      </h1>
      <p className="mt-6 text-lg md:text-xl text-muted-foreground text-center max-w-[600px] animate-in fade-in slide-in-from-bottom-5 duration-700 delay-200">
        开启你的心动之旅，找寻属于你的另一半
      </p>
    </section>
  )
}