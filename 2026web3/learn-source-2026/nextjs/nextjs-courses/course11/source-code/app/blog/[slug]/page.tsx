import { Suspense } from 'react'

// 定义参数类型
type Props = {
    params: Promise<{ slug: string }>
}

// 1. 模拟数据获取函数（使用 JSONPlaceholder 公共 API，slug 传入 '1', '2' 等 ID 即可）
async function getPost(slug: string) {
    console.log(
        `[Server] Fetching post: ${slug} at ${new Date().toISOString()}`
    )
    // 👇 使用真实的公共 API，确保代码可运行
    const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${slug}`
    )

    if (!res.ok) throw new Error('Post not found')
    return res.json()
}

// 2. 这里的组件负责获取数据，必须包裹在 Suspense 中以避免阻塞整个页面渲染
async function PostContent({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const post = await getPost(slug)
    
    return (
        <>
            <h1 className="capitalize">{post.title}</h1>
            <div className="text-gray-500 text-sm mb-4">
                {/* API 不返回日期，我们模拟一个 */}
                发布时间: 2024-01-01 | 生成时间:{' '}
                {new Date().toLocaleTimeString()}
            </div>
            <p>{post.body}</p>
        </>
    )
}

// 3. 页面组件：作为 Shell，使用 Suspense 包裹数据获取部分
export default function BlogPost({ params }: Props) {
    return (
        <article className="prose lg:prose-xl mx-auto mt-10">
            <Suspense fallback={<div className="p-4 text-gray-500">正在加载文章内容...</div>}>
                <PostContent params={params} />
            </Suspense>
        </article>
    )
}
