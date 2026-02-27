// app/good-performance/page.tsx
// 依然是 Server Component，享受服务端渲染的所有好处
import Header from '@/components/Header'
import HeavyChart from '@/components/HeavyChart'
import Counter from '@/components/Counter'

export default function GoodPerformancePage() {
  return (
    <div>
      <Header />
      <HeavyChart /> {/* 即使计数器在变，我也不受影响，静静地做个美男子 */}
      <Counter />
    </div>
  )
}