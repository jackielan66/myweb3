/**
 * 📄 Dashboard 数据分析页面 - 演示嵌套布局
 * 
 * 💡 这个页面会自动继承两层布局：
 * 1. app/layout.tsx（根布局：顶部导航）
 * 2. app/dashboard/layout.tsx（Dashboard 布局：侧边栏）
 */

export default function AnalyticsPage() {
  return (
    <div>
      <h1>📊 数据分析</h1>
      
      <div className="card" style={{ marginTop: '1rem' }}>
        <h2>嵌套布局演示</h2>
        <p style={{ marginTop: '0.5rem', color: '#6b7280' }}>
          切换到「设置」页面，再切回来，你会发现页面切换非常流畅！
        </p>
        <p style={{ marginTop: '0.5rem', color: '#6b7280' }}>
          因为只有主内容区在变化，侧边栏和顶部导航都保持不变。
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginTop: '1rem' }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>今日访问</p>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#4f46e5' }}>1,234</p>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>页面浏览</p>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#059669' }}>5,678</p>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>跳出率</p>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#dc2626' }}>32%</p>
        </div>
      </div>

      <div className="card" style={{ marginTop: '1rem', background: '#fef3c7' }}>
        <h3>💡 Pages Router 的痛点</h3>
        <p style={{ marginTop: '0.5rem', color: '#92400e' }}>
          在 Pages Router 中，想要实现这样的嵌套布局需要：
        </p>
        <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem', color: '#78350f' }}>
          <li>手动在每个页面组件中包裹布局</li>
          <li>或使用 <code>getLayout</code> 模式（比较繁琐）</li>
          <li>页面切换时，布局组件仍然会重新渲染</li>
        </ul>
      </div>
    </div>
  );
}
