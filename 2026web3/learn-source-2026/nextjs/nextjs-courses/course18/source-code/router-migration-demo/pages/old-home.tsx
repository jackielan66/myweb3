/**
 * 📄 Pages Router 示例 - 首页
 * 
 * 🔄 对比路径：
 * - Pages Router: /old-home (pages/old-home.tsx)
 * - App Router:   / (app/page.tsx)
 * 
 * 💡 文件即路由：文件名就是 URL 路径
 */

import Head from 'next/head';

export default function OldHomePage() {
  return (
    <>
      {/* Pages Router 使用 <Head> 设置 SEO */}
      <Head>
        <title>Pages Router 演示 - 首页</title>
        <meta name="description" content="这是 Pages Router 的写法" />
      </Head>

      <div style={{ padding: '2rem 0' }}>
        <h1>🕰️ Pages Router 示例</h1>
        
        <div style={{ 
          background: '#fef3c7', 
          padding: '1rem', 
          borderRadius: '8px',
          marginTop: '1rem'
        }}>
          <p><strong>当前位置：</strong><code>pages/old-home.tsx</code></p>
          <p style={{ marginTop: '0.5rem', color: '#92400e' }}>
            ⚠️ 这是传统的 Pages Router 写法，仅作对比参考
          </p>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h2>📋 Pages Router 特点</h2>
          <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
            <li>文件即路由：<code>pages/about.tsx</code> → <code>/about</code></li>
            <li>使用 <code>&lt;Head&gt;</code> 组件设置 SEO</li>
            <li>使用 <code>getServerSideProps</code> / <code>getStaticProps</code> 获取数据</li>
            <li>所有组件代码最终都会发送到浏览器</li>
          </ul>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <a href="/" style={{ color: '#4f46e5' }}>
            → 返回 App Router 首页对比
          </a>
        </div>
      </div>
    </>
  );
}
