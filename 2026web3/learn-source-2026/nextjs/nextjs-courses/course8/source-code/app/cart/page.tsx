// app/cart/page.tsx
import AddToCartBtn from '@/components/AddToCartBtn'
import Header from '@/components/Header'

export default function CartPage() {
  return (
    <div className="p-8">
      <Header />
      <h1>商品列表</h1>
      <div className="border p-4 rounded mt-4">
        <h2>Awesome Product</h2>
        <AddToCartBtn product={{ id: 1, name: 'Next.js Book', price: 20 }} />
      </div>
    </div>
  )
}
