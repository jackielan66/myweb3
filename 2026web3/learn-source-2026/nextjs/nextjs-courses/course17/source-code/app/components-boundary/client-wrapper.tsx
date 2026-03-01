'use client';

import { useState } from 'react';

export default function ClientWrapper({
    children
}: {
    children: React.ReactNode
}) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="p-6 border-2 border-dashed border-purple-300 rounded-xl my-4">
            <div className="mb-4">
                <h2 className="text-xl font-bold text-purple-700 mb-2">我是客户端组件 (Client Component)</h2>
                <p className="text-gray-600 mb-4">
                    我有状态 (useState) 和交互能力。但我可以通过 `children` 属性接收服务端组件渲染好的内容。
                </p>

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
                >
                    {isOpen ? '收起内容' : '展开内容'}
                </button>
            </div>

            {isOpen && (
                <div className="p-4 bg-gray-50 rounded border border-gray-200">
                    <p className="text-sm text-gray-500 mb-2 font-semibold">下面是 children 内容：</p>
                    {children}
                </div>
            )}
        </div>
    );
}
