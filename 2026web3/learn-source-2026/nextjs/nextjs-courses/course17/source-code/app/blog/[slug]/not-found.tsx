import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center p-10">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">404 - 文章未找到</h2>
            <p className="text-gray-600 mb-8 max-w-md">
                抱歉，您访问的文章不存在或已被删除。
                <br />
                (演示：这是由 `not-found.tsx` 渲染的自定义 404 页面)
            </p>
            <Link href="/blog" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                返回博客列表
            </Link>
        </div>
    );
}
