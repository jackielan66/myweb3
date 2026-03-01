/**
 * 📄 loading.tsx - 自动加载状态
 * 
 * 🔄 迁移对照：
 * - Pages Router: 需要手动管理 loading 状态
 * - App Router: 只需创建这个文件，Next.js 自动处理！
 * 
 * 💡 原理：利用 React Suspense，在数据加载时显示此组件
 */

export default function Loading() {
  return (
    <div>
      <h1>⏳ Loading UI 演示</h1>
      
      <div className="card" style={{ background: '#f3f4f6' }}>
        <p style={{ textAlign: 'center', color: '#6b7280' }}>
          ⏳ 正在加载数据...
        </p>
        <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.5rem' }}>
          (这是 loading.tsx 组件，会自动显示)
        </p>
      </div>

      {/* 骨架屏效果 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginTop: '1rem' }}>
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="card" style={{ background: '#f3f4f6' }}>
            <div style={{ 
              height: '1rem', 
              width: '40%', 
              background: '#e5e7eb', 
              borderRadius: '4px',
              marginBottom: '0.5rem'
            }} />
            <div style={{ 
              height: '2rem', 
              width: '60%', 
              background: '#e5e7eb', 
              borderRadius: '4px' 
            }} />
          </div>
        ))}
      </div>
    </div>
  );
}
