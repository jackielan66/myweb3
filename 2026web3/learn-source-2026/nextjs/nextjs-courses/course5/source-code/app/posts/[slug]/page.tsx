import Link from 'next/link'

export default async function PostPage({ params }: { params: { slug: string } }) {
    const { slug } = await params

    return (
        <article className='m-4 bg-blue-100 p-4'>
            <h1>文章：{slug}</h1>
            <p>这里是 {slug} 的正文内容……</p>
            <hr />
            <p>
                切换文章：
                <Link href="/posts/next">下一篇</Link> ·{' '}
                <Link href="/posts/prev">上一篇</Link>
            </p>
        </article>
    )
}
