// app/bad/page.tsx
import ClientBox from '@/components/ClientBox'

export default function Bad() {
  const handler = () => {}
  return (
    <ClientBox onClick={handler as any} />
  )
}