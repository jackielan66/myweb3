import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { sepolia } from 'wagmi/chains'

// 配置支持的链
export const config = getDefaultConfig({
  appName: 'MetaNodeSwap',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || 'YOUR_PROJECT_ID', // 可选，用于 WalletConnect
  chains: [sepolia],
  ssr: true, // 如果你的 dApp 使用服务器端渲染 (SSR)
})

export { sepolia } 