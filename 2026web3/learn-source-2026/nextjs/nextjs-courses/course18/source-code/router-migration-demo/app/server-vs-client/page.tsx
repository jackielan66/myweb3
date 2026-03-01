/**
 * 📄 Server vs Client Component 演示
 * 
 * 🔄 迁移对照：
 * - Pages Router: 所有组件代码最终都会发送到浏览器
 * - App Router: 默认是 Server Component，代码不会发送到浏览器
 * 
 * 💡 核心区别：
 * - Server Component: 只在服务器运行，可以直接访问数据库
 * - Client Component: 在浏览器运行，可以使用 Hooks 和事件
 */

import ClientCounter from './ClientCounter';

// 这是一个 Server Component（默认）
export default function ServerVsClientPage() {
  // ✅ Server Component 可以直接 await 异步操作
  const serverTime = new Date().toLocaleTimeString('zh-CN');
  
  // 这条日志只在服务器终端打印
  console.log('🖥️ Server Component 渲染中...');

  return (
    <div>
      <h1>⚡ Server vs Client Component</h1>
      
      {/* Server Component 部分 */}
      <div className="card">
        <h2>
          <span className="badge badge-server">Server Component</span>
          &nbsp;服务器组件
        </h2>
        <p style={{ marginTop: '1rem' }}>
          服务器渲染时间：<code>{serverTime}</code>
        </p>
        <p style={{ marginTop: '0.5rem', color: '#6b7280', fontSize: '0.875rem' }}>
          ⚠️ 刷新页面才会更新时间（因为这是服务器渲染的）
        </p>
        <p style={{ marginTop: '0.5rem', color: '#6b7280', fontSize: '0.875rem' }}>
          ✅ 可以直接访问数据库、读取文件、调用内部 API
        </p>
        <p style={{ marginTop: '0.5rem', color: '#dc2626', fontSize: '0.875rem' }}>
          ❌ 不能使用 useState、useEffect、onClick 等
        </p>
      </div>

      {/* Client Component 部分 - 从外部导入 */}
      <ClientCounter />
      
      <div className="card" style={{ background: '#fffbeb' }}>
        <h3>🧠 记忆口诀</h3>
        <p style={{ marginTop: '0.5rem' }}>
          <strong>有交互、有状态</strong> → 用 Client<br/>
          <strong>只展示、读数据</strong> → 用 Server
        </p>
      </div>
    </div>
  );
}
