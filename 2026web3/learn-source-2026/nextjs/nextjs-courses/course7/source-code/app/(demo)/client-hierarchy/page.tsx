// 服务器组件，引用父组件以完成调用栈
import ClientIsland from '@/components/ClientIsland'

export default function ClientHierarchyDemo() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-2">客户端层级示例</h1>
      <ClientIsland />
    </main>
  )
}