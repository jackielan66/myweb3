/**
 * 📄 Dashboard 设置页面 - 演示嵌套布局
 * 
 * 💡 这个页面会自动继承两层布局：
 * 1. app/layout.tsx（根布局：顶部导航）
 * 2. app/dashboard/layout.tsx（Dashboard 布局：侧边栏）
 */

export default function SettingsPage() {
  return (
    <div>
      <h1>⚙️ 设置页面</h1>
      
      <div className="card" style={{ marginTop: '1rem' }}>
        <h2>嵌套布局演示</h2>
        <p style={{ marginTop: '0.5rem', color: '#6b7280' }}>
          注意观察：当你在 Dashboard 的子页面之间切换时，侧边栏保持不变！
        </p>
        <p style={{ marginTop: '0.5rem', color: '#6b7280' }}>
          这就是 App Router 嵌套布局的威力：<strong>父布局不会重新渲染</strong>。
        </p>
      </div>

      <div className="card" style={{ marginTop: '1rem', background: '#ecfdf5' }}>
        <h3>🗂️ 当前页面的布局层级</h3>
        <ol style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
          <li><code>app/layout.tsx</code> - 根布局（顶部导航）</li>
          <li><code>app/dashboard/layout.tsx</code> - Dashboard 布局（侧边栏）</li>
          <li><code>app/dashboard/settings/page.tsx</code> - 当前页面</li>
        </ol>
      </div>

      <div className="card" style={{ marginTop: '1rem' }}>
        <h3>⚙️ 用户设置</h3>
        <div style={{ marginTop: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>
            <strong>用户名</strong>
          </label>
          <input 
            type="text" 
            defaultValue="demo_user" 
            style={{ 
              padding: '0.5rem', 
              border: '1px solid #d1d5db', 
              borderRadius: '6px',
              width: '100%',
              maxWidth: '300px'
            }}
          />
        </div>
        <div style={{ marginTop: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>
            <strong>邮箱通知</strong>
          </label>
          <select style={{ 
            padding: '0.5rem', 
            border: '1px solid #d1d5db', 
            borderRadius: '6px' 
          }}>
            <option>开启</option>
            <option>关闭</option>
          </select>
        </div>
      </div>
    </div>
  );
}
