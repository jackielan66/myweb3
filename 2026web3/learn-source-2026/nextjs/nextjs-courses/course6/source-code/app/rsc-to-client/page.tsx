// app/rsc-to-client/page.tsx
import ClientCounter from '@/components/ClientCounter'

export default async function Page() {
  const label = '点击次数'
  return <ClientCounter label={label} />
}