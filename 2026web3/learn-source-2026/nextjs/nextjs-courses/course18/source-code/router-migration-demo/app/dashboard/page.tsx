/**
 * 📄 Loading UI 演示 - loading.tsx 自动加载状态
 * 
 * 🔄 迁移对照：
 * - Pages Router: 手动管理 loading 状态 (useState + useEffect)
 * - App Router: 创建 loading.tsx 文件，自动显示加载状态！
 * 
 * 💡 原理：loading.tsx 利用 React Suspense 实现"流式渲染"
 */

// 模拟慢速数据获取
async function getSlowData() {
  // 延迟 2 秒，模拟慢速 API
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  return {
    revenue: '$12,345',
    orders: 89,
    users: 1234,
    growth: '+15%',
  };
}

export default async function DashboardPage() {
  // 这个请求会触发 loading.tsx 显示
  const data = await getSlowData();

  return (
    <div>
      <h1>⏳ Loading UI 演示</h1>
      
      <div className="card" style={{ background: '#ecfdf5' }}>
        <h3>🔄 迁移对照</h3>
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>
          <strong>Pages Router：</strong>手动写 <code>if (loading) return &lt;Spinner /&gt;</code><br/>
          <strong>App Router：</strong>创建 <code>loading.tsx</code> 文件即可！
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginTop: '1rem' }}>
        <div className="card">
          <p style={{ color: '#6b7280' }}>💰 总收入</p>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{data.revenue}</p>
        </div>
        <div className="card">
          <p style={{ color: '#6b7280' }}>📦 订单数</p>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{data.orders}</p>
        </div>
        <div className="card">
          <p style={{ color: '#6b7280' }}>👥 用户数</p>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{data.users}</p>
        </div>
        <div className="card">
          <p style={{ color: '#6b7280' }}>📈 增长率</p>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#16a34a' }}>{data.growth}</p>
        </div>
      </div>

      <div className="card" style={{ marginTop: '1rem', background: '#fef3c7' }}>
        <p>
          💡 <strong>试一试：</strong>刷新页面，观察 loading.tsx 的加载动画（持续 2 秒）
        </p>
      </div>
    </div>
  );
}
