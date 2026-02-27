'use client'

import dynamic from 'next/dynamic'

const ChartLazy = dynamic(() => import('@/components/ChartClient'), {
  ssr: false,
  loading: () => <div className="p-4">chart图表加载中…</div>,
})

export default function ClientChartLazy() {
  return <ChartLazy />
}