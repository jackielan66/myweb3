export const revalidate = 10; // 10秒 ISR

export default function ISRPage() {
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">ISR Demo (Incremental Static Regeneration)</h1>
      <div className="p-6 bg-yellow-50 rounded-lg shadow-md border border-yellow-200">
        <p className="text-lg mb-2">Generated At: <span className="font-mono font-bold text-yellow-700">{new Date().toLocaleString()}</span></p>
        <p className="text-gray-700 mt-4">
          此页面使用了 <code>export const revalidate = 10;</code>
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-600">
          <li>初次访问：显示生成时间。</li>
          <li>10秒内刷新：时间<b>不会变</b>（命中缓存）。</li>
          <li>10秒后刷新：
            <ul className="list-circle pl-5 mt-1">
              <li>第1个人：看到旧时间（Stale），但在后台触发更新。</li>
              <li>第2个人：看到新时间。</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}
