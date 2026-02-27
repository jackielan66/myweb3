// app/(demo)/client-actions/page.tsx（服务器组件，渲染客户端表单）
import CommentClientForm from '@/components/CommentClientForm'

export default function ClientActionsDemo() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-2">客户端调用 Server Actions</h1>
      <CommentClientForm />
    </main>
  )
}