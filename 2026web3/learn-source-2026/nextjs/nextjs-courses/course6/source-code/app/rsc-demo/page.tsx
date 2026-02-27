// app/rsc-demo/page.tsx
// 这是一个 RSC 页面，直接在服务器取数并渲染
export default async function RscDemo() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    next: { revalidate: 60 },
  })
  const posts = await res.json()
  return (
    <div className="p-6">
      <h1>最新文章（每 60s 重新验证）</h1>
      <ul>
        {posts.map((p: any) => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul>
    </div>
  )
}