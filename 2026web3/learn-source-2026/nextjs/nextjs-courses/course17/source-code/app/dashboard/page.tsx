import { Suspense } from 'react';

async function SlowDataComponent() {
    // 模拟慢速请求
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return <div className="p-4 bg-blue-100 rounded">📊 慢速数据加载完成！</div>;
}

export default function Dashboard() {
    // throw new Error('Dashboard 组件出错了！');
    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold mb-4">Dashboard (Streaming Demo)</h1>
            <p className="mb-4 text-gray-600">
                下面的组件需要 3 秒钟才能加载完成。<br />
                注意观察由 `loading.tsx` 提供的骨架屏。
            </p>

            <section className="border p-4 rounded-lg bg-white shadow-sm">
                <h2 className="text-xl font-semibold mb-2">仪表盘数据</h2>
                {/* 这里的加载不会阻塞整个页面显示 */}
                <Suspense fallback={<div className="text-gray-400">Loading component inside Suspense...</div>}>
                    <SlowDataComponent />
                </Suspense>
            </section>
        </div>
    );
}
