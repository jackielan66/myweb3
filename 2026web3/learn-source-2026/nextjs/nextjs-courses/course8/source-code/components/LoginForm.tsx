// components/LoginForm.tsx
"use client"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod' // 你的校验规则库

// 定义规则：不仅 TS 能用，表单校验也能用
const schema = z.object({
  email: z.string().email("邮箱格式不对哦"),
  password: z.string().min(6, "密码太短啦")
})
type LoginFormData = z.infer<typeof schema>

export default function LoginForm() {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema)
  })

  const onSubmit = async (data: LoginFormData) => {
    // 这里可以直接调用 Server Action！
    // await loginAction(data)
  }

  return (
    <form className='' onSubmit={handleSubmit(onSubmit)}>
      {/* 注册 Input，一行代码搞定双向绑定和校验 */}
      <input {...register('email')} placeholder="Email" />
      {/* 显示错误信息 */}
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      <input type="password" {...register('password')} placeholder="Password" />
      {errors.password && <p className="text-red-500">{errors.password.message}</p>}
      
      <button disabled={isSubmitting}>
        {isSubmitting ? '登录中...' : '登录'}
      </button>
    </form>
  )
}
