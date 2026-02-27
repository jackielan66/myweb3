import Link from 'next/link'

export default async function A() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', { next: { revalidate: 60 } })
  const data = await res.json()
  
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">A</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <Link href="/rsc-payload/b" className="underline">前往 B</Link>
    </main>
  )
}