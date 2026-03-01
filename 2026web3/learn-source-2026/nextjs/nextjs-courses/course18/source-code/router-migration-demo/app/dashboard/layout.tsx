/**
 * 📄 Dashboard 专属布局 - 演示嵌套布局
 * 
 * 🔄 迁移对照：
 * - Pages Router: 只能有一个全局布局 (_app.tsx)，嵌套布局需要手动处理
 * - App Router: 每个文件夹都可以有自己的 layout.tsx，自动嵌套
 * 
 * 💡 核心优势：
 * - 子页面切换时，父布局不会重新渲染
 * - 侧边栏状态得以保留
 * - 代码组织更清晰
 */

import Link from 'next/link';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex', gap: '2rem' }}>
      {/* 侧边栏 - 只在 /dashboard/* 页面显示 */}
      <aside style={{ 
        width: '200px', 
        background: '#f8fafc', 
        padding: '1rem',
        borderRadius: '8px',
        border: '1px solid #e2e8f0'
      }}>
        <h3 style={{ margin: '0 0 1rem 0', color: '#475569' }}>📊 Dashboard</h3>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Link 
            href="/dashboard" 
            style={{ 
              padding: '0.5rem', 
              borderRadius: '4px',
              color: '#4f46e5',
              textDecoration: 'none'
            }}
          >
            📈 概览
          </Link>
          <Link 
            href="/dashboard/settings" 
            style={{ 
              padding: '0.5rem', 
              borderRadius: '4px',
              color: '#6b7280',
              textDecoration: 'none'
            }}
          >
            ⚙️ 设置
          </Link>
          <Link 
            href="/dashboard/analytics" 
            style={{ 
              padding: '0.5rem', 
              borderRadius: '4px',
              color: '#6b7280',
              textDecoration: 'none'
            }}
          >
            📊 数据分析
          </Link>
        </nav>
        
        <div style={{ 
          marginTop: '1.5rem', 
          padding: '0.75rem', 
          background: '#fef3c7', 
          borderRadius: '6px',
          fontSize: '0.75rem',
          color: '#92400e'
        }}>
          💡 这个侧边栏来自 <code>dashboard/layout.tsx</code>，只在 /dashboard/* 路径下显示
        </div>
      </aside>
      
      {/* 主内容区 */}
      <main style={{ flex: 1 }}>
        {children}
      </main>
    </div>
  );
}
