// app/products/page.tsx

import SearchBar from "@/components/SearchBar";
import ProductList from '@/components/ProductList'

// Server Component 默认接收 searchParams 属性
// 注意：在 Next.js 15+ 中，searchParams 变成了 Promise，需要 await
export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; page?: string }>
}) {
  // 1. 等待解析 searchParams
  const { query = '', page = '1' } = await searchParams
  
  const currentPage = Number(page)
  
  // 2. 直接在服务端拿数据，没有 useEffect，没有 Loading 闪烁，SEO 友好
  const products = await fetchProducts(query, currentPage)

  return (
    <main>
      <SearchBar />
      <ProductList data={products} />
    </main>
  )
}


// 模拟数据获取函数
async function fetchProducts(query: string, page: number) {
  await new Promise((resolve) => setTimeout(resolve, 500)) // 模拟网络延迟
  
  // 生成 50 条模拟数据
  const allProducts = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1} ${query ? `(match: ${query})` : ''}`,
    price: Math.floor(Math.random() * 100) + 10,
  }))

  const pageSize = 10
  const start = (page - 1) * pageSize
  return allProducts.slice(start, start + pageSize)
}