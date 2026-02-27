import { cookies } from 'next/headers';
import { Suspense } from 'react';

async function CartContent() {
  // 👇 关键操作：读取 Cookies
  // 这一行代码会导致整个页面在请求时动态渲染 (SSR)
  const cookieStore = await cookies(); 
  const cartId = cookieStore.get('cartId');

  // 即使 fetch 是默认缓存的，由于页面是动态的，
  // 每次用户访问，组件都会在服务器重新执行。
  const products = await fetch('https://jsonplaceholder.typicode.com/photos?_limit=3')
    .then(res => res.json());

  return (
    <>
      <div className="text-sm text-orange-600 mb-4 font-mono">
        Session: {cartId?.value || 'Guest'}
      </div>
      
      <div className="grid gap-2">
        {products.map((p: any) => (
          <div key={p.id} className="flex items-center gap-2 bg-white p-2 rounded shadow-sm">
             <div className="w-8 h-8 bg-gray-200 rounded-full flex-shrink-0" />
             <span className="truncate text-sm">{p.title}</span>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-2 border-t border-orange-200 text-xs text-orange-400">
        Dynamic Rendered at: {new Date().toLocaleTimeString()}
      </div>
    </>
  );
}

export default function CartPage() {
  return (
    <div className="p-6 bg-orange-50 border border-orange-100 rounded-lg">
      <h1 className="text-2xl font-bold text-orange-800 mb-2">Shopping Cart</h1>
      <Suspense fallback={<div className="text-orange-400 animate-pulse">Loading cart...</div>}>
        <CartContent />
      </Suspense>
    </div>
  );
}
