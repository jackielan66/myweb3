// app/theme/page.tsx
import { ThemeProvider } from '@/components/ThemeProvider'
import ThemeToggle from '@/components/ThemeToggle'

export default function ThemePage() {
  return (
    <ThemeProvider>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">主题切换演示</h1>
        <ThemeToggle />
      </div>
    </ThemeProvider>
  )
}