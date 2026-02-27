import { Suspense } from 'react';

// 1. 定义数据获取函数
async function getUser() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users/1', {
    cache: 'no-store', // 👈 关键：显式禁用缓存，启用 SSR
  });
  return res.json();
}

// 2. 将数据获取和渲染逻辑提取到子组件
async function DashboardContent() {
  const user = await getUser();

  return (
    <>
      <h1>Hello, {user.name}</h1>
      <p>Email: {user.email}</p>
      <p>服务器时间: {new Date().toLocaleTimeString()}</p>
    </>
  );
}

// 3. 页面组件：作为 Shell
export default function Dashboard() {
  return (
    <div className="p-8">
      <Suspense fallback={<div>Loading dashboard...</div>}>
        <DashboardContent />
      </Suspense>
    </div>
  );
}
