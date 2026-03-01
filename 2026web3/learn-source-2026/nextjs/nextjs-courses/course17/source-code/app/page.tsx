import Link from 'next/link';

export default function Home() {
    // 
    const demos = [
        { title: '1. SSG 静态生成 (Blog)', path: '/blog', desc: '[⚠️ 需 Build] 构建时生成，Dev 模式下会退化为 SSR' },
        { title: '2. SSR 服务端渲染 (Stock)', path: '/stock', desc: '[Dev/Prod] 请求时生成，适合实时数据' },
        { title: '3. ISR 增量静态再生', path: '/rendering/isr', desc: '[⚠️ 需 Build] 演示 export const revalidate = 10，Dev 模式下不生效' },
        { title: '4. Streaming 流式渲染 (Dashboard)', path: '/dashboard', desc: '[Dev/Prod] Suspense + Loading UI，解决白屏问题' },
        { title: '5. Server Actions 安全陷阱', path: '/server-actions-trap', desc: '[Dev/Prod] 演示 Hidden Input 篡改攻击 + On-Demand Revalidation' },
        { title: '6. Hydration Mismatch', path: '/hydration-mismatch', desc: '[✅ 推荐 Dev] 演示随机数导致的水合错误，Dev 模式下报错更明显' },
        { title: '7. Web3 行业应用', path: '/profile/0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', desc: '[Dev/Prod] 服务端直接读取链上数据 (查 V 神钱包)' },
        { title: '8. 动态路由 + 404', path: '/blog/999999', desc: '[Dev/Prod] 演示 not-found.tsx' },
        { title: '9. Server Component & Client Component', path: '/components-boundary', desc: '[Dev/Prod] 演示 Server Component 和 Client Component 的边界' },
    ];

    return (
        <div className="min-h-screen p-10 font-[family-name:var(--font-geist-sans)]">
            <main className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-4 text-center">Next.js 面试通关指南 - 演示项目</h1>
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-8 text-sm text-yellow-800">
                    <p className="font-bold">⚠️ 演示注意：</p>
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                        <li>SSG 和 ISR 的缓存效果只在 <code>npm run build && npm run start</code> (Production) 模式下生效。</li>
                        <li>在 <code>npm run dev</code> 模式下，Next.js 默认会对所有页面进行动态渲染，方便开发调试。</li>
                    </ul>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {demos.map((demo) => (
                        <Link
                            key={demo.path}
                            href={demo.path}
                            className="block p-6 border rounded-lg hover:border-blue-500 hover:bg-blue-50 transition shadow-sm group"
                        >
                            <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition">{demo.title} &rarr;</h2>
                            <p className="text-gray-600 text-sm">
                                {demo.desc.startsWith('[') ? (
                                    <>
                                        <span className={`font-bold mr-1 ${demo.desc.includes('需 Build') ? 'text-orange-600' : 'text-green-600'}`}>
                                            {demo.desc.split(']')[0] + ']'}
                                        </span>
                                        {demo.desc.split(']')[1]}
                                    </>
                                ) : demo.desc}
                            </p>
                        </Link>
                    ))}
                </div>

                <footer className="mt-16 text-center text-gray-400 text-sm">
                    Generated for Course 17 Recording
                </footer>
            </main>
        </div>
    );
}
