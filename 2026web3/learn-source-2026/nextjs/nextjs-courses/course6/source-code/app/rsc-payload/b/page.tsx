import { Suspense } from 'react'

export default function B() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">B</h1>
      <Suspense fallback={<div>加载中…</div>}>
        <Slow />
      </Suspense>
    </main>
  )
}

async function Slow() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', { cache: 'no-store' })
  const data = await res.json()
  return <pre>{JSON.stringify(data, null, 2)}</pre>
}