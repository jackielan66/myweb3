'use client';
import { cn } from "@/lib/utils";
import React from "react";

// ❌ 错误示例：简单的字符串拼接
function BadButton({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <button className={`px-4 py-2 bg-blue-500 text-white rounded ${className || ''}`}>
      {children}
    </button>
  );
}

// ✅ 正确示例：使用 cn()
function GoodButton({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <button className={cn("px-4 py-2 bg-blue-500 text-white rounded", className)}>
      {children}
    </button>
  );
}

export default function CnDemo() {
  return (
    <div className="p-4 border rounded-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 错误示范 */}
        <div className="p-4 border border-red-200 rounded-lg">
          <div className="font-bold text-red-600 mb-2">不使用 cn()</div>
          <p className="text-sm text-slate-600 mb-4">
            尝试用 <code>bg-red-500</code> 覆盖 <code>bg-blue-500</code>。
          </p>
          <BadButton className="bg-red-500 hover:bg-red-600">
            应该是红色 (但可能是蓝色)
          </BadButton>
        </div>

        {/* 正确示范 */}
        <div className="p-4 border border-green-200 rounded-lg">
          <div className="font-bold text-green-600 mb-2">使用 cn()</div>
          <p className="text-sm text-slate-600 mb-4">
            尝试用 <code>bg-red-500</code> 覆盖 <code>bg-blue-500</code>。
          </p>
          <GoodButton className="bg-red-500 hover:bg-red-600">
            我是正确的红色
          </GoodButton>
        </div>
      </div>
    </div>
  );
}
