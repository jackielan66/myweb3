/**
 * 📄 路由钩子演示 - 从 next/router 迁移到 next/navigation
 * 
 * 🔄 迁移对照：
 * - Pages Router: 全部从 next/router 导入
 * - App Router: 从 next/navigation 导入，功能被拆分
 */

import NavigationClient from './NavigationClient';

export default function NavigationDemoPage() {
  return (
    <div>
      <h1>🧭 路由钩子演示</h1>
      
      <div className="card" style={{ background: '#fef2f2' }}>
        <h3>⚠️ 常见报错</h3>
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>
          <code>Cannot find module &apos;next/router&apos;</code>
        </p>
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>
          <strong>解决：</strong>改用 <code>import {'{ useRouter }'} from &apos;next/navigation&apos;</code>
        </p>
      </div>

      <div className="card" style={{ marginTop: '1rem', background: '#ecfdf5' }}>
        <h3>🔄 迁移对照表</h3>
        <table style={{ marginTop: '1rem', width: '100%', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ textAlign: 'left' }}>
              <th style={{ padding: '0.5rem' }}>功能</th>
              <th style={{ padding: '0.5rem' }}>Pages Router</th>
              <th style={{ padding: '0.5rem' }}>App Router</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '0.5rem' }}>跳转</td>
              <td style={{ padding: '0.5rem' }}><code>router.push()</code></td>
              <td style={{ padding: '0.5rem' }}><code>router.push()</code></td>
            </tr>
            <tr>
              <td style={{ padding: '0.5rem' }}>当前路径</td>
              <td style={{ padding: '0.5rem' }}><code>router.pathname</code></td>
              <td style={{ padding: '0.5rem' }}><code>usePathname()</code></td>
            </tr>
            <tr>
              <td style={{ padding: '0.5rem' }}>查询参数 (?id=1)</td>
              <td style={{ padding: '0.5rem' }}><code>router.query.id</code></td>
              <td style={{ padding: '0.5rem' }}><code>useSearchParams().get(&apos;id&apos;)</code></td>
            </tr>
            <tr>
              <td style={{ padding: '0.5rem' }}>动态参数 [id]</td>
              <td style={{ padding: '0.5rem' }}><code>router.query.id</code></td>
              <td style={{ padding: '0.5rem' }}><code>useParams().id</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Client Component - 使用路由钩子 */}
      <NavigationClient />
    </div>
  );
}
