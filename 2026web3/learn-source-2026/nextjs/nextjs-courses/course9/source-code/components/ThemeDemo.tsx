"use client"
import { useTheme } from "next-themes"

export default function ThemeDemo() {
  const { theme, setTheme } = useTheme()
  return (
    <div className="max-w-md mx-auto rounded-xl shadow-lg p-6 transition-colors duration-200 dark:bg-slate-800 dark:border dark:border-slate-700">
      <h3 className="text-lg font-medium dark:text-white">
        暗黑模式适配 --- 当前模式为: {theme}
      </h3>
      <p className="mt-2 text-slate-500 dark:text-slate-400">
        Tailwind 的暗黑模式是基于类的。当父元素（通常是 html 标签）有 `dark` 类名时，
        所有 `dark:` 前缀的样式都会自动生效。
      </p>
      <div className="mt-4">
        <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-900/30 dark:text-blue-400 dark:ring-blue-400/30">
          Badge
        </span>
      </div>
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
      >
        切换主题
      </button>
    </div>
  )
}
