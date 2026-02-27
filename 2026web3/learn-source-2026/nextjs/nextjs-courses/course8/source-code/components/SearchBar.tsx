// components/SearchBar.tsx
"use client"
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { useCallback } from 'react'

export default function SearchBar() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  // 重点：我们修改的是 URL，而不是 State
  const handleSearch = useCallback((term: string) => {
    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set('query', term)
    } else {
      params.delete('query')
    }
    
    // 💡 核心知识点：replace vs push
    // - 用 replace：搜索/筛选场景。用户只是在调整当前内容的“视图”，不希望每输一个字就产生一条历史记录（否则后退键会按到手软）。
    // - 用 push：分页/跳转场景。比如点击“下一页”或进入详情页，用户希望点后退能回到上一步。
    replace(`${pathname}?${params.toString()}`)
  }, [])

  return (
    <input
      // input 的初始值来自 URL，确保刷新后还在
      defaultValue={searchParams.get('query')?.toString()}
      onChange={(e) => handleSearch(e.target.value)}
      className="border p-2 rounded"
      placeholder="搜索..."
    />
  )
}