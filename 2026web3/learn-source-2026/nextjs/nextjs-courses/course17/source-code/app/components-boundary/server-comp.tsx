export default async function MyServerComp() {
    // 模拟服务端操作，比如读取数据库或使用私钥
    console.log('MyServerComp 正在服务端运行...');

    return (
        <div className="p-4 my-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-bold text-blue-800">我是服务端组件 (Server Component)</h3>
            <p className="text-blue-600 text-sm mt-1">
                我的代码只会运行在服务器上，不会被打包发送到浏览器。
            </p>
            <div className="mt-2 text-xs text-gray-500 font-mono">
                Server Time: {new Date().toISOString()}
            </div>
        </div>
    );
}
