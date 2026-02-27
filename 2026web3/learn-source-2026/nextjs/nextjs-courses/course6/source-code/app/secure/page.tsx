// app/secure/page.tsx
import ClientLeaks from '@/components/ClientLeaks'
// import { getSecret } from '@/lib/secret'

export default async function Secure() {
  // const secret = await getSecret()
 return <pre className="p-8">
    {/* Server Secure only - {secret} */}
    <ClientLeaks />
    </pre>
}