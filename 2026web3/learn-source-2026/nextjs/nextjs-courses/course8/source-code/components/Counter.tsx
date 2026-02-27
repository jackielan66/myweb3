// components/Counter.tsx
"use client" // 👈 只有这个小组件是客户端的
import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>
}