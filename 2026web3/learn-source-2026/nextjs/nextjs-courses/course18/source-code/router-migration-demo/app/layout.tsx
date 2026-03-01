/**
 * 📄 Root Layout - App Router 的核心入口
 * 
 * 🔄 迁移对照：
 * - Pages Router: _app.tsx + _document.tsx 分开处理
 * - App Router: 合并成一个 layout.tsx，更直观
 * 
 * ⚠️ 注意：全局 CSS 只能在这里引入！
 */
import './globals.css';
import Link from 'next/link';
import type { Metadata } from 'next';

// ✅ 静态 Metadata（替代 Pages Router 的 <Head>）
export const metadata: Metadata = {
  title: 'App Router 迁移演示',
  description: '学习 Pages Router 到 App Router 的迁移',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>
        {/* 导航栏 - 演示各个知识点 */}
        <nav>
          <Link href="/">🏠 首页</Link>
          <Link href="/server-vs-client">⚡ Server vs Client</Link>
          <Link href="/data-fetching">📊 数据获取</Link>
          <Link href="/posts/1">📝 动态路由</Link>
          <Link href="/dashboard">⏳ Loading/嵌套布局</Link>
          <Link href="/navigation-demo">🧭 路由钩子</Link>
          <span style={{ borderLeft: '1px solid #e5e7eb', marginLeft: '0.5rem', paddingLeft: '1rem', color: '#9ca3af' }}>
            Pages Router:
          </span>
          <Link href="/old-home" style={{ color: '#f59e0b' }}>🕰️ 旧首页</Link>
          <Link href="/old-data-fetching" style={{ color: '#f59e0b' }}>📊 旧数据</Link>
          <Link href="/old-posts/1" style={{ color: '#f59e0b' }}>📝 旧动态</Link>
          <Link href="/old-about" style={{ color: '#f59e0b' }}>📖 旧关于</Link>
        </nav>
        
        <main className="container">
          {children}
        </main>
      </body>
    </html>
  );
}
