// app/info/page.tsx
import { headers, cookies } from 'next/headers'

export default async function Info() {
    const h = headers()
    const lang = (await h).get('accept-language')

    //   __next_hmr_refresh_hash__
    const hash = (await cookies()).get('__next_hmr_refresh_hash__')?.value

    return (
        <main className="p-8">
            <h1 className="text-2xl font-bold mb-4">请求头与 Cookie</h1>
            <pre>{JSON.stringify({ lang, __next_hmr_refresh_hash__: hash }, null, 2)}</pre>
        </main>
    )
}
