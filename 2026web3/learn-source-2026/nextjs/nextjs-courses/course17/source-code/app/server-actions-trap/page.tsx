import { updateProfile } from './actions';

export default function TrapPage() {
    const userId = "user_123456"; // 这是一个敏感数据，代表当前登录用户的 ID

    return (
        <div className="p-10 max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-red-600">Server Actions 安全陷阱演示</h1>
                <span className="text-xs text-gray-400 font-mono">
                    Last Rendered: {new Date().toLocaleTimeString()}
                </span>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg border border-red-200">
                <p className="mb-4 text-gray-700">
                    这个表单看似正常，隐式传递了 `userId`。
                    <br />
                    <strong>攻击演示：</strong>
                    打开 Chrome DevTools -&gt; Elements，找到隐藏的 input，将 value 修改为 `user_999`，然后点击提交。
                </p>
                {/* @ts-ignore */}
                <form action={updateProfile} className="space-y-4">
                    <div className="p-4 bg-gray-50 border rounded">
                        <label className="block text-sm font-medium text-gray-700">当前用户 ID (Hidden Field)</label>
                        {/* ❌ 错误示范：将敏感 ID 放在 hidden input 中 */}
                        <input type="hidden" name="userId" value={userId} />
                        <code className="block mt-1 p-1 bg-gray-200 rounded">{userId}</code>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition"
                    >
                        更新个人资料 (提交给 Server Action)
                    </button>
                    <p className="text-xs text-center text-gray-500 mt-2">
                        提交后会触发 <code>revalidatePath</code>，上方的时间戳会更新
                    </p>
                </form>
            </div>
        </div>
    );
}
