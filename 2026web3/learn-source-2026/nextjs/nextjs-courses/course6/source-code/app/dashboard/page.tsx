// app/dashboard/page.tsx
export default async function Dashboard() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    cache: 'no-store',
  })
  const metrics = await res.json()
  return (
    <div className="p-6">
      <h1>实时指标（不缓存）</h1>
      <pre>{JSON.stringify(metrics, null, 2)}</pre>
    </div>
  )
}