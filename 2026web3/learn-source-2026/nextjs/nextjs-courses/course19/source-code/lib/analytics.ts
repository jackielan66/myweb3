import 'client-only';
// ============================================================
// 📌 知识点：client-only 包（与 server-only 对称）
// ============================================================
// `client-only` 确保此文件只能在客户端组件中导入。
// 如果 Server Component 尝试导入此文件，构建会立即报错。
//
// 典型用途：
//   - 访问 window / document / localStorage 等浏览器 API
//   - 第三方分析 SDK（如 Google Analytics）
//   - 依赖 DOM 的工具函数
// ============================================================

/**
 * 记录页面浏览事件（模拟分析上报）
 * 此函数必须在浏览器环境中调用
 */
export function trackPageView(pageName: string) {
    // 安全地访问浏览器 API
    const screenWidth = window.innerWidth;
    const userAgent = navigator.userAgent;

    console.log(`[Analytics] 📊 页面浏览: ${pageName}`);
    console.log(`[Analytics] 屏幕宽度: ${screenWidth}px`);
    console.log(`[Analytics] UA: ${userAgent.slice(0, 50)}...`);

    // 模拟存储到 localStorage
    const viewCount = parseInt(localStorage.getItem(`views_${pageName}`) || '0');
    localStorage.setItem(`views_${pageName}`, String(viewCount + 1));

    return viewCount + 1;
}

/**
 * 获取页面浏览次数
 */
export function getPageViews(pageName: string): number {
    return parseInt(localStorage.getItem(`views_${pageName}`) || '0');
}
