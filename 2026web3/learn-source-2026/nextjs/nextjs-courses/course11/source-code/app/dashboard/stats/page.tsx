import { Suspense } from 'react';
import { connection } from 'next/server';

// 模拟两个独立的耗时请求
async function getUser() {
  await new Promise(r => setTimeout(r, 1000)); // 1秒
  return { name: '同学' };
}

async function getStats() {
  await new Promise(r => setTimeout(r, 2000)); // 2秒
  return { views: 100, likes: 50 };
}

async function StatsContent() {
  // 必须调用 connection() 来通过动态 API 使得该页面变为动态渲染
  // 否则在构建时，Date.now() 会被静态计算为构建时间，导致后续请求显示的时间不再变化
  await connection();
  // 🕒 开始计时
  const startTime = Date.now();

  // // ❌ 错误示范：串行等待 (总耗时: 1s + 2s = 3s)
  // const user = await getUser();
  // const stats = await getStats();

  // ✅ 正确示范：并行启动 (总耗时: max(1s, 2s) = 2s)
  const userData = getUser();
  const statsData = getStats();
  // 等待所有请求完成
  const [user, stats] = await Promise.all([userData, statsData]);

  const duration = Date.now() - startTime;

  return (
    <>
      <p>总耗时: <span className="text-red-500 font-mono">{duration}ms</span> (理论值应接近 2000ms)</p>
      <div className="mt-4 border p-4 rounded">
        <p>用户: {user.name}</p>
        <p>浏览量: {stats.views}</p>
        <p>点赞数: {stats.likes}</p>
      </div>
    </>
  );
}

export default function StatsPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">并行数据获取演示</h1>
      <Suspense fallback={<div className="text-gray-500">加载数据中...</div>}>
        <StatsContent />
      </Suspense>
    </div>
  );
}
