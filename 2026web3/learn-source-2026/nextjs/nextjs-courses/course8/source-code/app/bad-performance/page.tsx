// app/bad-performance/page.tsx
"use client" // 😱 毁了！整个页面都变成了客户端渲染

import { useState } from 'react'
import Header from '@/components/Header'
import HeavyChart from '@/components/HeavyChart'

export default function BadPerformancePage() {
  const [count, setCount] = useState(0)
  
  return (
    <div>
      <Header /> 
      <HeavyChart /> {/* 每次你点击+1，这个重型图表组件也会跟着重渲染！ */}
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
    </div>
  )
}