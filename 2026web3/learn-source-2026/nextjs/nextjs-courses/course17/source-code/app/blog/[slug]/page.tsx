import { notFound } from 'next/navigation';

type Post = {
    id: number;
    title: string;
    body: string;
};

// 动态路由
export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // 模拟从 API 获取单个文章
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${slug}`);

    if (!res.ok) {
        // 如果文章不存在 (比如 slug 是 99999)，触发 404
        notFound();
    }

    const post: Post = await res.json();

    return (
        <div className="p-10 max-w-2xl">
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            <div className="text-gray-600 mb-6">Article ID: {slug}</div>
            <p className="leading-relaxed text-lg">{post.body}</p>

            <div className="mt-10 pt-6 border-t">
                <a href="/blog" className="text-blue-600 hover:underline">&larr; Back to Blog List</a>
            </div>
        </div>
    );
}

// 配合 SSG 生成动态路由 (Optional)
export async function generateStaticParams() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
    const posts: Post[] = await res.json();

    return posts.map((post) => ({
        slug: post.id.toString(),
    }));
}
