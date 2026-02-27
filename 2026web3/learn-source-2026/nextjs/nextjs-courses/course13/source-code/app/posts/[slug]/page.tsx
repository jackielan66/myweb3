// app/posts/[slug]/page.tsx
import CommentForm from '@/components/CommentForm'

export default function PostPage({ params }: { params: { slug: string } }) {
    async function handleComment(text: string) {
        'use server'
        console.log('保存评论:', text)
        // 实际逻辑：写入数据库
    }

    return (
        <main className="p-10">
            <h1 className="text-3xl font-bold mb-4">文章: {params.slug}</h1>
            <p className="mb-8">这里是文章内容...</p>
            <CommentForm onSubmit={handleComment} />
        </main>
    )
}
