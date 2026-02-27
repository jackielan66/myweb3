// app/comments/actions-inline.ts（函数内声明示例）
import { revalidateTag } from 'next/cache'

export async function addCommentInline(formData: FormData) {
  // 在函数体顶部声明，仅把该函数标记为服务器函数
  'use server'
  const content = String(formData.get('content') || '')
  if (!content.trim()) return
  // 刷新评论列表的缓存
  revalidateTag('comments')
}