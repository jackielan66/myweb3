import SwapInterface from '@/components/swap/SwapInterface'
import { NetworkChecker } from '@/components/NetworkChecker'
import { WalletGuide } from '@/components/WalletGuide'

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            MetaNodeSwap
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            安全、快速、去中心化的代币交换平台。在 Sepolia 测试网络上体验最新的 DeFi 技术。
          </p>
        </div>
        
        <NetworkChecker>
          <SwapInterface />
        </NetworkChecker>
        
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>连接您的钱包开始交易</p>
          <p className="mt-1">支持的网络: Sepolia 测试网</p>
        </div>
      </div>
      
      <WalletGuide />
    </>
  )
}
