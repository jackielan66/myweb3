'use client';

import { useReportWebVitals } from 'next/web-vitals';

export default function WebVitalsReporter() {
  /**
   * 核心原理：
   * 1. 使用 Performance Observer API 监听性能事件
   * 2. 收集 Web Vitals 指标：CLS、FCP、FID、LCP、TTFB、INP
   * 3. 指标在页面生命周期不同阶段触发，可能多次调用
   * 4. keepalive 确保页面卸载时数据仍能发送
   */
  useReportWebVitals((metric) => {
    // 只在生产环境发送指标
    // if (process.env.NODE_ENV !== 'production') return;

    fetch('/api/web-vitals', {
      method: 'POST',
      body: JSON.stringify(metric),
      headers: {
        'content-type': 'application/json'
      },
      keepalive: true
    }).catch(() => { });
  });

  return null;
}