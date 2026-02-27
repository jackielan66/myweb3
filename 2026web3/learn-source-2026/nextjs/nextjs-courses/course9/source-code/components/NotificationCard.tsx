export function NotificationCard() {
  return (
    <div className="mx-auto max-w-sm rounded-xl bg-white p-6 shadow-lg flex items-center space-x-4">
      <div className="shrink-0">
        <div className="h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
          👋
        </div>
      </div>
      <div>
        <div className="text-xl font-medium text-black">Hello Tailwind!</div>
        <p className="text-slate-500">构建 UI 从未如此简单。</p>
      </div>
    </div>
  )
}
