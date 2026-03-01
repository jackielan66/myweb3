// Force dynamic rendering to simulate SSR behavior
export const dynamic = 'force-dynamic';

export default function SSRPage() {
    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold mb-4">SSR Demo (Server-Side Rendering)</h1>
            <div className="p-6 bg-green-100 rounded-lg shadow-md">
                <p className="text-lg mb-2">Request Time: <span className="font-mono font-bold text-green-700">{new Date().toLocaleString()}</span></p>
                <p className="text-gray-700">
                    此页面在每次请求时在服务端生成。
                    <br />
                    试着刷新页面，你会发现时间在变。
                </p>
            </div>
        </div>
    );
}
