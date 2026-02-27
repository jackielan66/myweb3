// 📄 文件路径：app/dashboard/components/RecentOrders.tsx
'use server';

// 👇 Next.js 16 新特性：声明此函数/组件的返回值是可以被缓存的
// `use cache`; 

// 模拟延时函数
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default async function RecentOrders() {
  // 模拟数据库慢查询 (3秒)
  await sleep(3000); 
  const orders = [
    { id: 1, item: 'Next.js 课程', price: 99 },
    { id: 2, item: 'React 进阶', price: 199 },
  ];

  return (
    <div className="border p-4 rounded shadow-sm bg-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">热销榜单 (Cached)</h2>
        <span className="text-xs text-gray-400">生成于: {new Date().toLocaleTimeString()}</span>
      </div>
      <ul>
        {orders.map((order) => (
          <li key={order.id} className="border-b py-2 flex justify-between">
            <span>{order.item}</span>
            <span className="font-mono">¥{order.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}