'use client';

// ============================================================
// 📌 知识点：Hydration Mismatch（水合不匹配）
// ============================================================
// Client Component 会经历"双重渲染"：
//   1. 预渲染阶段 (SSR)：在服务端生成初始 HTML
//   2. 注水阶段 (Hydration)：在浏览器端重新执行，绑定事件
//
// 如果两次渲染结果不一致，React 会报错：
//   "Text content does not match server-rendered HTML"
//
// 常见原因：Math.random()、Date.now()、typeof window 判断
// ============================================================

import { useState, useEffect } from 'react';

export default function HydrationDemo() {
    // ============================================================
    // ❌ 错误示范：直接渲染随机值
    // ============================================================
    // 下面这行代码会导致 Hydration Mismatch！
    // 因为服务端渲染出的数字 ≠ 客户端 Hydration 时的数字
    const dangerousRandom = Math.random().toFixed(4);

    // ============================================================
    // ✅ 正确做法 1：使用 useEffect 延迟到客户端
    // ============================================================
    const [safeRandom, setSafeRandom] = useState<string>('--');

    useEffect(() => {
        // useEffect 仅在浏览器端 Hydration 完成后执行
        // 所以不会导致服务端/客户端渲染结果不一致
        setSafeRandom(Math.random().toFixed(4));
    }, []);

    // ============================================================
    // ✅ 正确做法 2：suppressHydrationWarning
    // ============================================================
    // 对于时间戳等"差异无害"的情况，可以用此属性抑制警告
    const currentTime = new Date().toLocaleTimeString();

    // ============================================================
    // 📌 双重渲染验证
    // ============================================================
    // 这行 log 会在 SSR 时出现在终端，Hydration 时出现在浏览器控制台
    // 刷新页面时：终端 + 浏览器 都会打印
    // SPA 导航时：仅浏览器打印
    console.log('[HydrationDemo] Rendering...（刷新页面时，终端和浏览器都会看到此日志）');

    return (
        <section className="p-4 border-2 border-red-200 rounded-lg bg-red-50">
            <h2 className="text-xl font-semibold text-red-800 mb-4">
                ⚠️ Hydration Mismatch 演示
            </h2>

            <div className="space-y-4">
                {/* ❌ 错误示范 */}
                <div className="bg-white p-4 rounded shadow border-l-4 border-red-400">
                    <h3 className="font-medium text-red-700 mb-1">
                        ❌ 错误示范：直接渲染 Math.random()
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                        服务端渲染的值 ≠ 客户端 Hydration 的值 → 触发 Mismatch 报错
                    </p>
                    <code className="text-lg font-mono bg-red-100 px-2 py-1 rounded">
                        {dangerousRandom}
                    </code>
                </div>

                {/* ✅ 正确做法 1 */}
                <div className="bg-white p-4 rounded shadow border-l-4 border-green-400">
                    <h3 className="font-medium text-green-700 mb-1">
                        ✅ 修复方案 1：useEffect 延迟赋值
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                        初始值为 "--"（服务端和客户端一致），Hydration 后通过 useEffect 更新
                    </p>
                    <code className="text-lg font-mono bg-green-100 px-2 py-1 rounded">
                        {safeRandom}
                    </code>
                </div>

                {/* ✅ 正确做法 2 */}
                <div className="bg-white p-4 rounded shadow border-l-4 border-yellow-400">
                    <h3 className="font-medium text-yellow-700 mb-1">
                        ✅ 修复方案 2：suppressHydrationWarning
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                        对于时间戳等无害差异，可抑制警告
                    </p>
                    <time
                        suppressHydrationWarning
                        className="text-lg font-mono bg-yellow-100 px-2 py-1 rounded"
                    >
                        {currentTime}
                    </time>
                </div>
            </div>
        </section>
    );
}
