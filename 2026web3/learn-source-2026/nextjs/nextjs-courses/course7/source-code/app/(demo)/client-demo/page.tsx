// app/(demo)/client-demo/page.tsx（服务器组件）
import dynamic from 'next/dynamic'

// const ChartLazy = dynamic(() => import('@/components/ChartClient'), {
//   ssr: false,
//   loading: () => <div className="p-4">图表加载中…</div>,
// })

export default function ClientDemo() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-2">客户端组件示例</h1>
      <p className="mb-4">这个图表组件在客户端渲染，避免了不必要的 SSR 负担。</p>
      {/* <ChartLazy /> */}
    </main>
  )
}