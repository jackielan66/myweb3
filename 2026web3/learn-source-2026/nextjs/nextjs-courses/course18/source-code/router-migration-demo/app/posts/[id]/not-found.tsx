/**
 * 📄 not-found.tsx - 自定义 404 页面
 * 
 * 🔄 迁移对照：
 * - Pages Router: pages/404.tsx (全局唯一)
 * - App Router: 每个路由段都可以有自己的 not-found.tsx
 * 
 * 💡 触发方式：在 Server Component 中调用 notFound()
 */

import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '3rem' }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</h1>
      <h2>文章未找到</h2>
      <p style={{ color: '#6b7280', marginTop: '1rem' }}>
        抱歉，您访问的文章不存在。
      </p>
      <Link href="/" style={{ 
        display: 'inline-block', 
        marginTop: '1.5rem',
        padding: '0.5rem 1rem',
        background: '#4f46e5',
        color: 'white',
        borderRadius: '6px',
        textDecoration: 'none'
      }}>
        返回首页
      </Link>
      
      <div className="card" style={{ marginTop: '2rem', textAlign: 'left' }}>
        <p style={{ fontSize: '0.875rem' }}>
          💡 <strong>App Router 优势：</strong>每个路由段都可以有独立的 404 页面，
          不再是全局共用一个！
        </p>
      </div>
    </div>
  );
}
