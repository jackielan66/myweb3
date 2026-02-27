// 仅客户端模块
import 'client-only'

export function showNotice(message: string) {
  const div = document.createElement('div')
  div.textContent = message
  div.style.cssText = 'position:fixed;right:16px;bottom:16px;background:#111;color:#fff;padding:8px 12px;border-radius:6px'
  document.body.appendChild(div)
  setTimeout(() => div.remove(), 2000)
}