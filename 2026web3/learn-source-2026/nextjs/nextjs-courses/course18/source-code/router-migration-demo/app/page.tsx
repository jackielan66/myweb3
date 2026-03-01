/**
 * 📄 首页 - Server Component (默认)
 * 
 * 🔄 迁移对照：
 * - Pages Router: pages/index.tsx
 * - App Router: app/page.tsx
 * 
 * 💡 这是一个 Server Component，代码只在服务器运行！
 */

export default function HomePage() {
  // 这行代码只会在服务器的终端打印，浏览器控制台看不到
  console.log('🖥️ 这条日志只在服务器打印！');

  return (
    <div>
      <h1>🚀 App Router 迁移演示</h1>
      <p style={{ marginTop: '1rem', color: '#6b7280' }}>
        这个项目演示了从 Pages Router 迁移到 App Router 的核心知识点。
      </p>

      <div className="card" style={{ marginTop: '2rem' }}>
        <h2>📚 演示内容</h2>
        <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
          <li><strong>Server vs Client</strong> - 理解两种组件的区别</li>
          <li><strong>数据获取</strong> - 告别 getServerSideProps</li>
          <li><strong>动态路由</strong> - [id] 参数获取 + Metadata</li>
          <li><strong>Loading UI</strong> - loading.tsx 自动加载状态</li>
          <li><strong>路由钩子</strong> - usePathname, useParams 等</li>
        </ul>
      </div>

      <div className="card" style={{ background: '#f0fdf4' }}>
        <p>
          <span className="badge badge-server">Server Component</span>
          &nbsp;当前页面是 Server Component，打开浏览器控制台，你看不到上面的 console.log！
        </p>
      </div>
    </div>
  );
}
