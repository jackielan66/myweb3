'use client';

import { useState, useEffect } from 'react';

export default function MismatchPage() {
    // 为了让错误更明显，我们先注释掉正确的解法
    // const [mounted, setMounted] = useState(false);
    // useEffect(() => setMounted(true), []);

    return (
        <div className="p-10 text-center">
            <h1 className="text-3xl font-bold mb-8">Hydration Mismatch 演示</h1>

            <div className="grid grid-cols-2 gap-8">
                <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
                    <h2 className="text-xl font-semibold text-red-700 mb-4">❌ 错误示范</h2>
                    <p className="mb-2">Server 渲染时的随机数 != Client 渲染时的随机数</p>

                    <div className="text-4xl font-mono font-bold text-gray-800 my-6">
                        {/* 这会导致 Hydration Mismatch */}
                        {Math.random()}
                    </div>

                    <p className="text-sm text-red-500 font-bold animate-pulse">
                        👉 请刷新页面并打开控制台 (Console) 查看红色报错
                    </p>
                </div>

                <div className="p-6 bg-green-50 border border-green-200 rounded-lg opacity-50 pointer-events-none">
                    <h2 className="text-xl font-semibold text-green-700 mb-4">✅ 正确解法 (useEffect)</h2>
                    <p className="mb-2">只在客户端渲染动态内容</p>
                    <div className="text-4xl font-mono font-bold text-gray-800 my-6">
                        ---
                    </div>
                    <p className="text-sm text-green-600">
                        (取消代码注释以查看效果)
                    </p>
                </div>
            </div>
        </div>
    );
}
