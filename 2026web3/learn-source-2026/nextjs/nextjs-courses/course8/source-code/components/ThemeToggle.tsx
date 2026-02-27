// components/ThemeToggle.tsx
"use client"
import { useTheme } from '@/components/ThemeProvider'

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  return (
    <button className="px-3 py-2 border rounded" onClick={toggle}>
      主题：{theme === 'light' ? '浅色' : '深色'}
    </button>
  )
}