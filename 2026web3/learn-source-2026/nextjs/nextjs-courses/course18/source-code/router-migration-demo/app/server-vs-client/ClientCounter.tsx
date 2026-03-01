'use client'; // ⚠️ 必须在文件顶部声明！

/**
 * 📄 Client Component 示例
 * 
 * 💡 什么时候需要 'use client'？
 * - 使用 useState、useEffect 等 Hooks
 * - 使用 onClick、onChange 等事件处理
 * - 使用 window、localStorage 等浏览器 API
 */

import { useState } from 'react';

export default function ClientCounter() {
  // ✅ Client Component 可以使用 Hooks
  const [count, setCount] = useState(0);
  
  // 这条日志会在浏览器控制台打印
  console.log('💻 Client Component 渲染中...', count);

  return (
    <div className="card">
      <h2>
        <span className="badge badge-client">Client Component</span>
        &nbsp;客户端组件
      </h2>
      <p style={{ marginTop: '1rem' }}>
        计数器：<strong style={{ fontSize: '1.5rem' }}>{count}</strong>
      </p>
      <div style={{ marginTop: '1rem' }}>
        {/* ✅ Client Component 可以使用事件处理 */}
        <button onClick={() => setCount(c => c + 1)}>+1</button>
        <button onClick={() => setCount(0)} style={{ marginLeft: '0.5rem', background: '#6b7280' }}>
          重置
        </button>
      </div>
      <p style={{ marginTop: '1rem', color: '#6b7280', fontSize: '0.875rem' }}>
        ✅ 可以使用 useState、useEffect、onClick 等
      </p>
      <p style={{ marginTop: '0.5rem', color: '#dc2626', fontSize: '0.875rem' }}>
        ❌ 不能直接访问数据库（需要通过 API）
      </p>
    </div>
  );
}
