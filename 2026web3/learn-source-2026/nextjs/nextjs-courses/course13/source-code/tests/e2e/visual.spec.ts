import { test, expect } from '@playwright/test'

test('博客首页视觉回归测试', async ({ page }) => {
    // 1. 访问页面
    await page.goto('http://localhost:3000')

    // 2. 等待页面稳定 (重要！)
    // 确保字体、图片都加载完成，避免因为渲染延迟导致截图差异
    await page.waitForLoadState('networkidle')

    // 3. 像素级对比
    // 第一次运行时，Playwright 会自动生成一张截图作为“基准图 (Baseline)”
    // 之后的运行，都会拿新截图和基准图对比
    await expect(page).toHaveScreenshot('homepage.png', {
        maxDiffPixels: 100, // 允许微小的像素差异（比如抗锯齿渲染差异）
        threshold: 0.1,
    })
})
