/**
 * 📄 Pages Router 示例 - 关于页面
 * 
 * 💡 演示：
 * - 全局布局的效果（导航栏、页脚自动包裹）
 * - 静态页面生成 (SSG)
 * - 页面间导航时布局保持不变
 */

import Head from 'next/head';
import Link from 'next/link';

export default function OldAboutPage() {
  return (
    <>
      <Head>
        <title>关于我们 - Pages Router 演示</title>
        <meta name="description" content="Pages Router 关于页面示例" />
      </Head>

      <div style={{ padding: '2rem 0' }}>
        <h1>📖 关于页面</h1>
        
        <div style={{ 
          background: '#fef3c7', 
          padding: '1rem', 
          borderRadius: '8px',
          marginTop: '1rem'
        }}>
          <p><strong>当前位置：</strong><code>pages/old-about.tsx</code></p>
        </div>

        <div style={{ 
          background: 'white', 
          padding: '1.5rem', 
          borderRadius: '8px',
          marginTop: '1.5rem',
          border: '1px solid #e5e7eb'
        }}>
          <h2>🎯 全局布局演示</h2>
          <p style={{ color: '#6b7280', marginTop: '0.5rem' }}>
            注意观察：当你在不同页面间切换时，顶部导航栏和底部页脚始终保持不变。
            这就是 <code>_app.tsx</code> 提供的全局布局功能。
          </p>
          
          <div style={{ 
            background: '#fef3c7', 
            padding: '1rem', 
            borderRadius: '6px',
            marginTop: '1rem'
          }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#92400e' }}>
              ⚠️ Pages Router 布局的局限性
            </h3>
            <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#78350f' }}>
              <li>只能有一个全局布局</li>
              <li>无法为不同路由段设置不同布局</li>
              <li>布局嵌套需要手动处理</li>
              <li>布局变化会导致整个页面重新渲染</li>
            </ul>
          </div>
        </div>

        <div style={{ 
          background: '#dcfce7', 
          padding: '1.5rem', 
          borderRadius: '8px',
          marginTop: '1.5rem',
          border: '1px solid #86efac'
        }}>
          <h2 style={{ color: '#166534', margin: '0 0 1rem 0' }}>
            ✅ App Router 的布局优势
          </h2>
          <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#15803d' }}>
            <li><strong>嵌套布局：</strong>每个路由段可以有自己的 layout.tsx</li>
            <li><strong>局部更新：</strong>子路由变化时，父布局不会重新渲染</li>
            <li><strong>并行路由：</strong>同一布局内可以显示多个页面</li>
            <li><strong>更好的代码组织：</strong>布局和页面就近放置</li>
          </ul>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>🔗 快速导航</h3>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
            <Link href="/old-home" style={{ color: '#4f46e5' }}>
              ← 首页
            </Link>
            <Link href="/old-data-fetching" style={{ color: '#4f46e5' }}>
              数据获取示例
            </Link>
            <Link href="/old-posts/1" style={{ color: '#4f46e5' }}>
              文章详情
            </Link>
            <Link href="/" style={{ color: '#059669' }}>
              对比 App Router 版本 →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
