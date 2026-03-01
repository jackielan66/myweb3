'use client'; // ⚠️ error.tsx 必须是 Client Component！

/**
 * 📄 error.tsx - 错误边界
 * 
 * 🔄 迁移对照：
 * - Pages Router: 需要手动包裹 ErrorBoundary
 * - App Router: 创建 error.tsx 文件，自动捕获错误！
 * 
 * ⚠️ 注意：error.tsx 必须是 Client Component
 */

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h1>❌ 出错了</h1>
      
      <div className="error" style={{ marginTop: '1rem' }}>
        <p><strong>错误信息：</strong>{error.message}</p>
      </div>

      <button onClick={reset} style={{ marginTop: '1rem' }}>
        🔄 重试
      </button>

      <div className="card" style={{ marginTop: '1rem' }}>
        <p style={{ fontSize: '0.875rem' }}>
          💡 <strong>App Router 优势：</strong>只需创建 <code>error.tsx</code> 文件，
          不需要手动包裹 ErrorBoundary！
        </p>
      </div>
    </div>
  );
}
