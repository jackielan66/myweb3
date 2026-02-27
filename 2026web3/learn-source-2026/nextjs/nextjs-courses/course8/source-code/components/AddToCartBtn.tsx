// components/AddToCartBtn.tsx
"use client"
import { useCartStore } from '@/store/cart'

export default function AddToCartBtn({ product }: { product: { id: number; name: string; price: number } }) {
  // 只订阅 addItem 方法，不用担心其他状态变化引起重渲染
  const addItem = useCartStore((state) => state.addItem)
  
  return <button className='bg-blue-500 text-white px-4 py-2 rounded' onClick={() => addItem(product)}>加入购物车</button>
}
