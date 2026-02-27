// pages/index.tsx
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()

  const goToRandomPost = () => {
    const ids = ['getting-started', 'advanced-tips']
    const slug = ids[Math.floor(Math.random() * ids.length)]
    router.push(`/blog/${slug}`)
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">首页</h1>
      <div className="flex flex-col gap-2">
        <Link href="/blog/getting-started" className="text-blue-600 hover:underline">Getting Started</Link>
        <Link href="/blog/advanced-tips" className="text-blue-600 hover:underline">Advanced Tips</Link>
        <button onClick={goToRandomPost} className="bg-blue-600 text-white px-3 py-2 rounded w-fit mt-4">
          随机跳转一篇文章
        </button>
      </div>
    </main>
  )
}