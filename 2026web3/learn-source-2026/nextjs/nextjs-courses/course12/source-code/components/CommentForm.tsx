// 📄 文件路径：components/CommentForm.tsx
'use client'; // 👈 必须标记为 Client Component，因为它使用了 hooks

import { useActionState } from 'react';
import { submitComment, State } from '@/app/actions';

// 定义初始状态
const initialState: State = {
  success: false,
  message: '',
  errors: undefined
};

export function CommentForm() {
  const [state, formAction, isPending] = useActionState(submitComment, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="content" className="block text-sm font-medium">你的观点</label>
        <textarea 
          id="content" 
          name="content" 
          placeholder="写下你的想法..." 
          className={`w-full p-2 border rounded-md ${state?.errors?.content ? "border-red-500" : "border-gray-300"}`}
          rows={4}
        />
        {state?.errors?.content && (
          <p className="text-sm text-red-500">{state.errors.content[0]}</p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <button 
          type="submit" 
          disabled={isPending}
          className="px-4 py-2 bg-black text-white rounded-md disabled:opacity-50 hover:bg-gray-800"
        >
          {isPending ? '发布中...' : '提交评论'}
        </button>
        
        {state?.message && (
          <p className={`text-sm ${state.success ? 'text-green-600' : 'text-red-600'}`}>
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}