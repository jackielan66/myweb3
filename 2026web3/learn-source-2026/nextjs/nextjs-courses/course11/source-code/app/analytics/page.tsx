import { Suspense } from 'react'
import { connection } from 'next/server'
import GlobalStats from './components/GlobalStats' // 👈 引入带缓存的组件

async function UserVisits() {
    // 明确标记为动态组件
    await connection()
    
    // 模拟用户个性化数据 (动态，不缓存)
    const userVisits = Math.floor(Math.random() * 100)

    return (
        <div className="mb-8 p-6 border rounded-lg shadow-sm bg-white">
            <h2 className="text-lg font-semibold text-gray-700">
                Your Activity
            </h2>
            <div className="text-4xl font-bold text-gray-900 my-2">
                {userVisits}
            </div>
            <p className="text-gray-500 text-sm">Pages visited today</p>
            <p className="text-xs text-gray-400 mt-2">
                Real-time Data (Dynamic)
            </p>
        </div>
    )
}

export default function AnalyticsPage() {
    return (
        <div className="p-8 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>

            {/* 1. 动态内容：瞬间显示 -> 改为流式加载 */}
            <Suspense fallback={<div className="mb-8 h-40 bg-gray-50 animate-pulse rounded-lg border border-gray-100"></div>}>
                <UserVisits />
            </Suspense>

            {/* 2. 静态/缓存内容：流式加载 */}
            <div className="mb-4">
                <h2 className="text-lg font-semibold mb-3 text-gray-700">
                    Global Platform Stats
                </h2>
                <Suspense
                    fallback={
                        <div className="h-32 bg-gray-50 animate-pulse rounded-lg flex items-center justify-center text-gray-400 border border-gray-100">
                            Loading Market Data...
                        </div>
                    }
                >
                    <GlobalStats />
                </Suspense>
            </div>
        </div>
    )
}
