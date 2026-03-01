import 'server-only';
// 👆 这个包防止此文件被导入到客户端组件中。
// 如果你尝试在 `EnvironmentCheck.tsx` 中导入它，构建将会失败。

export async function getSensitiveData() {
    // 模拟数据库延迟
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
        message: "来自安全服务端的消息！",
        timestamp: new Date().toISOString(),
        secret: "THIS_SHOULD_NOT_LEAK_TO_CLIENT"
    };
}
