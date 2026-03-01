export default function SSGPage() {
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">SSG Demo (Static Site Generation)</h1>
      <div className="p-6 bg-gray-100 rounded-lg shadow-md">
        <p className="text-lg mb-2">Build Time: <span className="font-mono font-bold text-blue-600">{new Date().toLocaleString()}</span></p>
        <p className="text-gray-600">
          此页面在构建时生成。无论你刷新多少次，上面的时间都不会变（在生产环境中）。
          <br/>
          (在开发环境 `npm run dev` 下，Next.js 仍然会每次渲染，这是符合预期的)
        </p>
      </div>
    </div>
  );
}
