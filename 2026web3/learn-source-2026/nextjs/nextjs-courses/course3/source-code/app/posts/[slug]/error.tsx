'use client' // 错误组件必须是客户端组件

import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // 可以将错误上报给日志服务
    console.error(error)
  }, [error])
 
  return (
    <div className="p-8">
      <h2 className="text-xl font-bold">加载文章失败了！</h2>
      <button
        onClick={() => reset()} // 尝试重新渲染该路由段
        className="bg-red-500 text-white p-2 rounded-md mt-4"
      >
        再试一次
      </button>
    </div>
  )
}