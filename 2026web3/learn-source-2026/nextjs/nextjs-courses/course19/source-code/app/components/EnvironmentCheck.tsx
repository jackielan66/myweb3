'use client';

// ============================================================
// 📌 知识点：Client Component + 'use client' 边界 + 双重渲染
// ============================================================
// 'use client' 不是"只在客户端运行"的意思！
// 它声明了一个边界 (Boundary)：
//   - Server Compiler 遇到此文件时停止深入，生成引用
//   - Client Compiler 接管此文件及其所有子依赖
//
// 双重渲染：
//   1. SSR 阶段：在服务端执行一次（生成初始 HTML）
//   2. Hydration 阶段：在浏览器端再次执行（绑定事件）
// ============================================================

import { useState, useEffect } from 'react';
import { trackPageView } from '../../lib/analytics'; // 使用 client-only 保护的模块

interface Props {
    serverMessage: string; // 跨边界传递的 props 必须可序列化
}

export default function EnvironmentCheck({ serverMessage }: Props) {
    const [browserInfo, setBrowserInfo] = useState<string>('加载中...');
    const [count, setCount] = useState(0);
    const [viewCount, setViewCount] = useState(0);

    // 📌 双重渲染验证：
    // 刷新页面时，终端和浏览器控制台都会打印此日志
    // SPA 导航时，仅浏览器控制台打印
    console.log('[EnvironmentCheck] Rendering...（观察终端 vs 浏览器控制台）');

    useEffect(() => {
        // ✅ useEffect 仅在浏览器端 Hydration 完成后执行
        console.log('[Client] ✅ Hydrated! 现在可以安全访问浏览器 API');
        setBrowserInfo(navigator.userAgent);

        // 使用 client-only 保护的 analytics 模块
        const views = trackPageView('course19-demo');
        setViewCount(views);
    }, []);

    return (
        <section className="p-4 border-2 border-green-200 rounded-lg bg-green-50">
            <h2 className="text-xl font-semibold text-green-800 mb-2">
                🟢 客户端组件 (Client Component)
            </h2>

            <div className="space-y-4">
                {/* 跨边界数据传递 */}
                <div className="bg-white p-4 rounded shadow">
                    <p className="text-sm text-gray-600 mb-2">
                        <strong>来自服务端的 Prop（可序列化数据）:</strong> {serverMessage}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                        <strong>浏览器 User Agent:</strong> {browserInfo}
                    </p>
                    <p className="text-sm text-gray-600">
                        <strong>页面浏览次数（来自 client-only analytics）:</strong> {viewCount}
                    </p>
                </div>

                {/* 交互演示 */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setCount(c => c + 1)}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                    >
                        点击次数: {count}
                    </button>
                    <span className="text-sm text-gray-500">
                        （此交互仅更新客户端岛屿，不触发服务端重新渲染）
                    </span>
                </div>
            </div>
        </section>
    );
}
