import Image from 'next/image';

export default function ProductCard() {
  return (
    <div className="group max-w-sm rounded-xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl overflow-hidden border border-gray-100">
      
      {/* 2. 图片区域：使用 Next.js Image 组件，配合 aspect-video 保持比例 */}
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1517336714731-489689fd1ca4"
          alt="Coding Setup"
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* 3. 内容区域：Padding 布局 */}
      <div className="p-5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
            热销中
          </span>
          <span className="text-sm text-gray-400">3分钟前发布</span>
        </div>

        <h3 className="mt-3 text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
          MacBook Pro M3 Max 深度评测
        </h3>

        <p className="mt-2 text-sm text-gray-500 line-clamp-2">
          这一代 Apple Silicon 芯片带来的性能提升简直令人发指，无论是视频剪辑还是大型代码编译，都能轻松应对...
        </p>

        {/* 4. 底部栏：Flex 布局 + 按钮交互 */}
        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-gray-200" />
            <span className="text-sm font-medium text-gray-700">CodeMaster</span>
          </div>
          
          <button className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600 active:scale-95">
            阅读更多
          </button>
        </div>
      </div>
    </div>
  );
}
