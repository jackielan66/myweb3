// 子组件，无需重复 'use client'
import { useState } from 'react'

export default function Child() {
    const [count, setCount] = useState(0)
    return <button onClick={() => setCount(count + 1)}>子组件计数 {count}</button>
}