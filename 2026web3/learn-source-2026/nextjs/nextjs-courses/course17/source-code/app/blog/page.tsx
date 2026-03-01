type Post = {
    id: number;
    title: string;
};

async function getPosts(): Promise<Post[]> {
    // fetch 默认就是 { cache: 'force-cache' } => SSG
    // 使用 jsonplaceholder 模拟数据
    const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
    if (!res.ok) return [];
    return res.json();
}

export default async function Blog() {
    const posts = await getPosts();
    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold mb-4">Blog (SSG Demo)</h1>
            <p className="mb-4 text-gray-600">
                此页面是静态生成的。构建时获取数据，之后访问直接返回 HTML。<br />
                数据来源: jsonplaceholder
            </p>
            <ul className="list-disc pl-5 space-y-2">
                {posts.map((p) => (
                    <li key={p.id} className="hover:underline">
                        <a href={`/blog/${p.id}`}>{p.title}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
