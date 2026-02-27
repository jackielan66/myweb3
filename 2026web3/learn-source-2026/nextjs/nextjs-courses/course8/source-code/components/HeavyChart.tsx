'use client';

export default function HeavyChart() {
    console.log('HeavyChart render')

    return (
        <div className="p-4 my-4 bg-gray-50 rounded border">
            <h3 className="text-sm font-bold mb-2">数据趋势</h3>
            <div className="flex items-end gap-2 h-20">
                <div className="w-6 bg-blue-500 h-[40%]" />
                <div className="w-6 bg-blue-500 h-[70%]" />
                <div className="w-6 bg-blue-500 h-[50%]" />
                <div className="w-6 bg-blue-500 h-[90%]" />
                <div className="w-6 bg-blue-500 h-[60%]" />
                <div className="w-6 bg-blue-500 h-[60%]" />
                <div className="w-6 bg-blue-500 h-[60%]" />
                <div className="w-6 bg-blue-500 h-[60%]" />
                <div className="w-6 bg-blue-500 h-[60%]" />
                <div className="w-6 bg-blue-500 h-[60%]" />
                <div className="w-6 bg-blue-500 h-[60%]" />
            </div>
        </div>
    )
}
