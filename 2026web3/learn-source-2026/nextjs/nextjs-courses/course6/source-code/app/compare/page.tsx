 // app/compare/page.tsx
 import ClientPing from '@/components/ClientPing'
 
 export default async function Compare() {
   const now = new Date().toISOString()
   return (
     <main className="p-8">
       <p className="mb-2">服务器时间：{now}</p>
       <ClientPing />
     </main>
  )
}