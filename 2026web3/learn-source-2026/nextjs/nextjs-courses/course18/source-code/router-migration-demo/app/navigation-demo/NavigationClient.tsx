'use client'; // ⚠️ 使用 Hooks 必须是 Client Component

/**
 * 📄 路由钩子实战示例
 * 
 * 🔄 迁移对照（与文档 3.2 节一致）：
 * - ❌ 错误：import { useRouter } from 'next/router';
 * - ✅ 正确：import { useRouter, usePathname, useSearchParams, useParams } from 'next/navigation';
 * 
 * ⚠️ 注意：
 * - 所有路由钩子都需要 'use client'
 * - 从 next/navigation 导入，不是 next/router！
 */

import { useRouter, usePathname, useSearchParams, useParams } from 'next/navigation';
import { useState } from 'react';

export default function NavigationClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = useParams(); // 获取动态路由参数，如 /blog/[id] 中的 id
  
  const [destination, setDestination] = useState('/posts/2');

  // 获取当前查询参数
  const currentTab = searchParams.get('tab') || '(无)';

  return (
    <div className="card" style={{ marginTop: '1rem' }}>
      <h2>
        <span className="badge badge-client">Client Component</span>
        &nbsp;实时路由信息
      </h2>
      
      <div style={{ marginTop: '1rem', padding: '1rem', background: '#f9fafb', borderRadius: '8px' }}>
        <p><strong>当前路径 usePathname():</strong> <code>{pathname}</code></p>
        <p><strong>查询参数 useSearchParams().get(&apos;tab&apos;):</strong> <code>{currentTab}</code></p>
        <p><strong>动态参数 useParams():</strong> <code>{JSON.stringify(params) || '(当前页面无动态参数)'}</code></p>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <h4>🧪 测试路由跳转</h4>
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
          <button onClick={() => router.push('/navigation-demo?tab=settings')}>
            添加 ?tab=settings
          </button>
          <button onClick={() => router.push('/navigation-demo?tab=profile')}>
            添加 ?tab=profile
          </button>
          <button onClick={() => router.push('/navigation-demo')} style={{ background: '#6b7280' }}>
            清除参数
          </button>
        </div>
      </div>

      <div style={{ marginTop: '1.5rem' }}>
        <h4>🚀 编程式跳转</h4>
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', alignItems: 'center' }}>
          <input 
            type="text" 
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            aria-label="跳转目标路径"
            placeholder="输入目标路径"
            style={{ 
              padding: '0.5rem', 
              border: '1px solid #d1d5db', 
              borderRadius: '6px',
              flex: 1
            }}
          />
          <button onClick={() => router.push(destination)}>
            router.push()
          </button>
        </div>
      </div>

      <div style={{ marginTop: '1rem', padding: '1rem', background: '#fffbeb', borderRadius: '8px' }}>
        <p style={{ fontSize: '0.875rem' }}>
          💡 <strong>提示：</strong>在 App Router 中，<code>router.query</code> 被拆分成了：
        </p>
        <ul style={{ fontSize: '0.875rem', marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
          <li><code>useSearchParams()</code> - 获取查询参数（?id=1）</li>
          <li><code>useParams()</code> - 获取动态路由参数（[id]）</li>
        </ul>
        <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
          👉 访问 <a href="/posts/1" style={{ color: '#4f46e5' }}>/posts/1</a> 页面可以看到 useParams 返回 {'{id: "1"}'}
        </p>
      </div>
    </div>
  );
}
