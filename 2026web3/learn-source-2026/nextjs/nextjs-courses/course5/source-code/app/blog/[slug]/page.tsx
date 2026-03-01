export async function generateMetadata({
    params,
}: {
    params: { slug: string }
}) {
    const { slug } = await params

    return { title: `博客：${slug}` }
}

export default async function Page({ params }: { params: { slug: string } }) {
    // next.js 15+，从 params 中提取 slug，需要使用 await或者其它异步操作
    // 参考 https://nextjs.org/docs/messages/sync-dynamic-apis
    const { slug } = await params

    return (
        <article>
            <div>当前文章：{slug}</div>
        </article>
    )
}
