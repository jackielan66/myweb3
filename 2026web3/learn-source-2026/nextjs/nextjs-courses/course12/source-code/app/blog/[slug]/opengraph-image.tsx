// 📄 文件路径：app/blog/[slug]/opengraph-image.tsx
import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export default async function Image({ params }: { params: { slug: string } }) {
  const slug = (await params).slug
  
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        Next.js Course: {slug}
      </div>
    ),
    { width: 1200, height: 600 }
  )
}