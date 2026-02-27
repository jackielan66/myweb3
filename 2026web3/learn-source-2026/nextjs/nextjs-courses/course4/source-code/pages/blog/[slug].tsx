// pages/blog/[...slug].tsx
import { useRouter } from 'next/router'

export default function DocsCatch() {
  const { query } = useRouter()
  const slug = (query.slug as string[]) || []
  console.log('slug data===', slug)
  
  return (
    <div className="p-6">
      <h1>文档路径</h1>
      <p>{slug}</p>
    </div>
  )
}