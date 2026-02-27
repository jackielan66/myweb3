// pages/blog/[...slug].tsx
import { useRouter } from 'next/router'

export default function DocsCatchAll() {
  const { query } = useRouter()
  const segments = (query.slug as string[]) || []
  return (
    <div className="p-6">
      <h1>文档路径</h1>
      <p>{segments.join(' / ') || '根文档'}</p>
    </div>
  )
}