"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

// 1. 定义校验规则 (Schema)
// Zod 的强大之处在于，它既定义了验证逻辑，又定义了 TypeScript 类型
const formSchema = z.object({
  username: z.string().min(2, {
    message: "用户名至少需要 2 个字符。",
  }),
})

export function ProfileForm() {
  // 2. 初始化 form 实例
  // useForm<z.infer<typeof formSchema>> 让我们的 form 实例拥有完整的类型提示
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema), // 绑定 zod 规则
    defaultValues: {
      username: "",
    },
  })

  // 3. 定义提交处理函数
  function onSubmit(values: z.infer<typeof formSchema>) {
    // 这里的 values 已经是类型安全的，并且通过了校验
    console.log(values)
    toast("提交成功", {
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                {/* {...field} 会自动处理 onChange, onBlur, value 等 props */}
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage /> {/* 自动显示错误信息 */}
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}