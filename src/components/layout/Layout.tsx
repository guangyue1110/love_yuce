import { ThemeToggle } from '../theme/ThemeToggle'
import { RulesButton } from '../rules/RulesButton'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-background">
      <div className="fixed top-4 right-4 z-50 flex items-center">
        <ThemeToggle />
        <RulesButton />
      </div>
      <main>{children}</main>
    </div>
  )
} 