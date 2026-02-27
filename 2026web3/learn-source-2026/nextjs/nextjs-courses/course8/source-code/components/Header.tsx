'use client';
import { useCartStore } from '@/store/cart'

export default function Header() {
    console.log('Header render')

  const count = useCartStore((s) => s.count)
  return (
    <header className="p-4 border-b font-bold flex items-center justify-between">
      <span>My App</span>
      <span className="text-sm">购物车：{count}</span>
    </header>
  )
}
