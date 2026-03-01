'use client'; // ⚠️ Error 组件必须是 Client Component

import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // 可以将错误上报到错误监控服务（如 Sentry）
        console.error('Error caught:', error);
    }, [error]);

    return (
        <div className="p-10 bg-red-50 text-red-700 rounded-lg">
            <h2 className="text-2xl font-bold mb-2">出错了！</h2>
            <p className="mb-4">{error.message}</p>
            <button
                onClick={reset}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
                重试
            </button>
        </div>
    );
}
