"use client"
import { useState } from 'react'

export default function LikeButton({ initialCount = 0 }: { initialCount?: number }) {
  const [count, setCount] = useState(initialCount)
  return (
    <button onClick={() => setCount((c) => c + 1)} className="px-3 py-2 border rounded">
      👍 点赞 {count}
    </button>
  )
}