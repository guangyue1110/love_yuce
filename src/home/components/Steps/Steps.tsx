import { BaseProps } from "@/types"
import { cn } from "@/lib/utils"

interface Step {
  title: string
  description: string
}

const steps: Step[] = [
  {
    title: "完成测评问卷",
    description: "通过精心设计的问卷了解你的性格特征"
  },
  {
    title: "获取个性化报告",
    description: "基于你的答案生成详细的个性分析报告"
  },
  {
    title: "查看匹配建议",
    description: "获得与你性格相匹配的约会对象推荐"
  }
]

export interface StepsProps extends BaseProps {}

export function Steps({ className }: StepsProps) {
  return (
    <section className={cn("py-20 px-4", className)}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          三步找到真爱
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-lg bg-card animate-in fade-in slide-in-from-bottom-6 duration-700"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="w-12 h-12 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-xl font-bold mb-4">
                {index + 1}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 