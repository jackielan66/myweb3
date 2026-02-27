// 客户端组件中使用
'use client'
import { useEffect } from 'react'
import { showNotice } from '@/lib/client-widget'

export default function ClientWidgetDemo() {
    useEffect(() => {
        showNotice('仅客户端模块已加载')
    }, [])

    return (
        <button className="px-3 py-2 border rounded">触发客户端提示</button>
    )
}
