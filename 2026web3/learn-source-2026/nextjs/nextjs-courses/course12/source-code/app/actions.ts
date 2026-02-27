// 📄 文件路径：app/actions.ts
'use server'; // 👈 这一行是魔法的关键。标记这个文件内的所有函数都在服务端运行。

import { z } from 'zod';
import { revalidatePath } from 'next/cache'; // 引入缓存刷新工具

// 1. 复用 Course 10 学过的 Zod Schema
// 这里的 Schema 不仅用于前端校验，现在也用于后端校验，实现 DRY (Don't Repeat Yourself)
const CommentSchema = z.object({
  content: z.string().min(5, { message: "评论太短了，多写点吧" }),
  // authorId 在真实场景中通常从 session 获取，这里为了演示简化处理
});

// 定义 State 类型，确保类型安全
export type State = {
  success: boolean;
  message: string;
  errors?: {
    content?: string[];
  };
};

// 2. 定义操作函数
// 这是一个标准的 async 函数，但它只能在服务器端执行
export async function submitComment(prevState: State, formData: FormData): Promise<State> {
  // 模拟网络延迟 (1秒)，方便我们在前端看到 Pending 状态
  await new Promise(resolve => setTimeout(resolve, 1000));

  // 从 FormData 中提取数据
  const rawData = {
    content: formData.get('content'),
  };

  // 3. 服务端校验
  const validated = CommentSchema.safeParse(rawData);

  if (!validated.success) {
    return {
      success: false,
      message: "校验失败",
      errors: validated.error.flatten().fieldErrors
    };
  }

  // 4. 模拟数据库操作
  console.log('Saving to DB:', validated.data);

  // 5. 刷新缓存 (可选)
  // 如果你的评论列表也在这个页面，这行代码会让列表自动更新
  // revalidatePath('/comments');

  // 6. 返回结果
  return {
    success: true,
    message: "评论发布成功！",
    errors: undefined
  };
}