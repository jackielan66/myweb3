'use client';
import { useState } from 'react';

// 1. 预定义好所有的完整类名
const colorVariants = {
  blue: 'bg-blue-500 hover:bg-blue-600',
  red: 'bg-red-500 hover:bg-red-600',
  green: 'bg-green-500 hover:bg-green-600',
};

export function DynamicClassDemo() {
  const [color, setColor] = useState<'blue' | 'red' | 'green'>('blue');

  return (
    <div className="p-4 border rounded-lg space-y-4 bg-white shadow-sm">
      <div className="flex gap-2">
        {/* 切换颜色的按钮 */}
        {(Object.keys(colorVariants) as Array<keyof typeof colorVariants>).map((c) => (
          <button
            key={c}
            onClick={() => setColor(c)}
            className="px-3 py-1 rounded border capitalize hover:bg-gray-100 transition-colors"
          >
            {c}
          </button>
        ))}
      </div>

      {/* 2. 使用映射表来获取类名 */}
      <div className={`w-full h-24 rounded-lg text-white flex items-center justify-center transition-colors ${colorVariants[color]}`}>
        I am a {color} box
      </div>
      
      <p className="text-xs text-gray-500">
        原理：因为 &apos;bg-blue-500&apos; 等字符串完整出现在了 colorVariants 对象中，
        Tailwind 的扫描器(Scanner)能识别并生成 CSS。
      </p>
    </div>
  );
}
