'use client' // 因为用到了 useRouter 和 onClick，所以需要是客户端组件

import Link from 'next/link'
import { useRouter } from 'next/navigation' // 注意是从 next/navigation 导入

export default function HomePage() {
  const router = useRouter()

  const goToRandomPost = () => {
    const postId = Math.floor(Math.random() * 1000)
    router.push(`/posts/${postId}`)
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">首页</h1>
      <div className="flex flex-col gap-2">
        <Link href="/posts/getting-started" className="text-blue-500 hover:underline">
          阅读文章：Getting Started
        </Link>
        <Link href="/posts/advanced-tips" className="text-blue-500 hover:underline">
          阅读文章：Advanced Tips
        </Link>
        <button 
          onClick={goToRandomPost}
          className="bg-blue-500 text-white p-2 rounded-md mt-4 w-fit"
        >
          跳转到一篇随机文章
        </button>
      </div>
    </main>
  )
}