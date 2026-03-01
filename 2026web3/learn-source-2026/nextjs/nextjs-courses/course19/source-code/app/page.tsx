import { getSensitiveData } from '../lib/db';
import EnvironmentCheck from './components/EnvironmentCheck';
import HydrationDemo from './components/HydrationDemo';

export default async function Page() {
    // 1. 服务端数据获取
    // 仅在构建时 (SSG) 或请求时 (SSR) 在服务器上运行
    console.log('[Server] 正在获取数据... (此日志仅出现在终端)');
    const data = await getSensitiveData();

    return (
        <main className="p-8 font-sans max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">
                Next.js 构建体系与分层逻辑 — 示例代码
            </h1>
            <p className="text-gray-500 mb-8">
                Course 19: 内部构建体系与分层逻辑解析 (Webpack / Turbopack)
            </p>

            {/* ==========================================
          知识点 1: Server Component 数据获取
          ========================================== */}
            <section className="mb-8 p-4 border-2 border-blue-200 rounded-lg bg-blue-50">
                <h2 className="text-xl font-semibold text-blue-800 mb-2">
                    🔵 服务端组件 (Server Component)
                </h2>
                <p className="mb-4 text-gray-700">
                    此区域由 <strong>Server Compiler</strong> 编译，在服务器上渲染。
                    可直接访问数据库、环境变量等敏感资源。
                </p>
                <div className="bg-white p-4 rounded shadow">
                    <p><strong>来自 DB 的消息:</strong> {data.message}</p>
                    <p><strong>时间戳:</strong> {data.timestamp}</p>
                </div>
            </section>

            {/* ==========================================
          知识点 2: Client Component 边界 + 双重渲染
          ========================================== */}
            <EnvironmentCheck serverMessage={data.message} />

            {/* ==========================================
          知识点 3: Hydration Mismatch 演示
          ========================================== */}
            <div className="mt-8">
                <HydrationDemo />
            </div>

            {/* ==========================================
          知识点 4: Edge Middleware (独立文件)
          ========================================== */}
            <section className="mt-8 p-4 border-2 border-purple-200 rounded-lg bg-purple-50">
                <h2 className="text-xl font-semibold text-purple-800 mb-2">
                    🟣 Edge Middleware（参见 middleware.ts）
                </h2>
                <p className="text-gray-700">
                    <code>middleware.ts</code> 由 <strong>Edge Compiler</strong> 单独编译，
                    运行在 Edge Runtime 中。请查看源码文件了解 Edge 环境限制。
                </p>
                <p className="text-sm text-gray-500 mt-2">
                    💡 尝试访问 <code>/admin</code> 路径，Middleware 会将你重定向到 <code>/login</code>
                </p>
            </section>

            {/* ==========================================
          知识点 5: client-only 包（参见 lib/analytics.ts）
          ========================================== */}
            <section className="mt-8 p-4 border-2 border-orange-200 rounded-lg bg-orange-50">
                <h2 className="text-xl font-semibold text-orange-800 mb-2">
                    🟠 client-only 保护（参见 lib/analytics.ts）
                </h2>
                <p className="text-gray-700">
                    <code>lib/analytics.ts</code> 使用 <code>import &apos;client-only&apos;</code> 保护，
                    与 <code>server-only</code> 形成对称。如果 Server Component 尝试导入它，构建会失败。
                </p>
                <p className="text-sm text-gray-500 mt-2">
                    💡 在 EnvironmentCheck 组件中已集成了 analytics 调用，查看浏览器控制台观察输出。
                </p>
            </section>
        </main>
    );
}

