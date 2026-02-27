// app/login/page.tsx
import LoginForm from '@/components/LoginForm'

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">用户登录</h1>
        <LoginForm />
      </div>
    </div>
  )
}