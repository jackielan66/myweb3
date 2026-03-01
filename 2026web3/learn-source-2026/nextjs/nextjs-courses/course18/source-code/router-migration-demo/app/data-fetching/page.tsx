/**
 * 📄 数据获取演示 - 告别 getServerSideProps
 * 
 * 🔄 迁移对照：
 * - Pages Router: 必须使用 getServerSideProps / getStaticProps
 * - App Router: 直接在组件里 await fetch()！
 * 
 * 💡 核心变化：
 * - getServerSideProps → fetch(..., { cache: 'no-store' })
 * - getStaticProps     → fetch(...) 或 fetch(..., { cache: 'force-cache' })
 * - revalidate (ISR)   → fetch(..., { next: { revalidate: 60 } })
 */

// 模拟数据获取函数
async function getPosts() {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // 返回模拟数据（实际项目中这里是 fetch API 调用）
  return [
    { id: 1, title: '理解 Server Components', views: 1234 },
    { id: 2, title: 'App Router 数据获取指南', views: 567 },
    { id: 3, title: '从 Pages Router 迁移实战', views: 890 },
  ];
}

// ✅ 组件可以直接是 async 的！
export default async function DataFetchingPage() {
  // ✅ 直接 await，不需要 getServerSideProps
  const posts = await getPosts();
  const fetchTime = new Date().toLocaleTimeString('zh-CN');

  return (
    <div>
      <h1>📊 数据获取演示</h1>
      
      <div className="card" style={{ background: '#ecfdf5' }}>
        <h3>🔄 迁移对照表</h3>
        <table style={{ marginTop: '1rem', width: '100%', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ textAlign: 'left' }}>
              <th style={{ padding: '0.5rem' }}>Pages Router</th>
              <th style={{ padding: '0.5rem' }}>App Router</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '0.5rem' }}><code>getServerSideProps</code></td>
              <td style={{ padding: '0.5rem' }}><code>fetch(..., {'{ cache: "no-store" }'})</code></td>
            </tr>
            <tr>
              <td style={{ padding: '0.5rem' }}><code>getStaticProps</code></td>
              <td style={{ padding: '0.5rem' }}><code>fetch(...)</code> (默认缓存)</td>
            </tr>
            <tr>
              <td style={{ padding: '0.5rem' }}><code>revalidate: 60</code></td>
              <td style={{ padding: '0.5rem' }}><code>{'{ next: { revalidate: 60 } }'}</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="card">
        <h2>📝 文章列表</h2>
        <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
          数据获取时间：<code>{fetchTime}</code>（刷新页面更新）
        </p>
        <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
          {posts.map(post => (
            <li key={post.id} style={{ marginBottom: '0.5rem' }}>
              <strong>{post.title}</strong>
              <span style={{ color: '#6b7280', marginLeft: '0.5rem' }}>
                👁️ {post.views} 次阅读
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="card" style={{ background: '#fef3c7' }}>
        <h3>💡 代码对比</h3>
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>
          <strong>以前 (Pages Router):</strong><br/>
          <code>export async function getServerSideProps() {'{ ... }'}</code>
        </p>
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>
          <strong>现在 (App Router):</strong><br/>
          <code>export default async function Page() {'{ const data = await fetch(...) }'}</code>
        </p>
      </div>
    </div>
  );
}
