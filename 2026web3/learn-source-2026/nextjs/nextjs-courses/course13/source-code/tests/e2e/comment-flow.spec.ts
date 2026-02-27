import { test, expect } from '@playwright/test'

test('访客可以成功发布评论', async ({ page }) => {
    // 1. 访问页面
    await page.goto('http://localhost:3000/posts/hello-world')

    // 2. 录制的操作
    await page.getByPlaceholder('写下你的评论...').click()
    await page
        .getByPlaceholder('写下你的评论...')
        .fill('来自 Playwright 的 E2E 测试')
    await page.getByRole('button', { name: '发布评论' }).click()

    // 3. 手动添加断言 (Codegen 也可以生成断言，但这里我们演示手动添加以确保精确)
    await expect(page.getByText('评论发布成功！')).toBeVisible()
})

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/posts/hello-world');
  await page.locator('html').click();
  await expect(page.getByRole('button', { name: '发布评论' })).toBeVisible();
  await page.getByText('这里是文章内容').click();
  await page.getByText('文章: 这里是文章内容...发布评论').click();
  await page.getByRole('form').click();
  await page.getByRole('textbox', { name: 'comment-input' }).click();
  await page.getByRole('textbox', { name: 'comment-input' }).fill('输入评论');
  await page.getByText('输入评论发布评论').click();
  await page.locator('html').click();
  await page.getByRole('button', { name: '发布评论' }).click();
});