import { useState, useCallback } from 'react'
import { useAccount, useWriteContract, useReadContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseUnits, formatUnits } from 'viem'
import { contractConfig, ERC20_ABI } from '@/lib/contracts'
import { TOKENS } from '@/lib/constants'

export interface SwapParams {
  tokenIn: string
  tokenOut: string
  amountIn: string
  slippage: number
}

export function useSwap() {
  const { address } = useAccount()
  const { writeContract, data: hash, isPending } = useWriteContract()
  const [lastSwapParams, setLastSwapParams] = useState<SwapParams | null>(null)

  // 等待交易确认
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  // 获取价格预估 - 使用合约调用
  const getQuote = useCallback(async (params: SwapParams) => {
    if (!params.amountIn || parseFloat(params.amountIn) === 0) {
      return null
    }

    try {
      // 找到对应的代币信息
      const tokenIn = Object.values(TOKENS).find(t => t.address === params.tokenIn)
      const tokenOut = Object.values(TOKENS).find(t => t.address === params.tokenOut)
      
      if (!tokenIn || !tokenOut) {
        throw new Error('Token not found')
      }

      const amountInWei = parseUnits(params.amountIn, tokenIn.decimals)
      
      // 调用合约的 quoteExactInput 函数
      const result = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tokenIn: params.tokenIn,
          tokenOut: params.tokenOut,
          amountIn: amountInWei.toString(),
          indexPath: [0], // 简化：使用第一个池子的索引
          sqrtPriceLimitX96: '0',
        }),
      }).then(res => res.json())
      
      if (!result.success) {
        throw new Error(`Quote failed: ${result.error}`)
      }
      
      const amountOut = BigInt(result.amountOut)
      const priceImpact = result.priceImpact || '0.5' // 默认价格影响
      
      return {
        amountOut: formatUnits(amountOut, tokenOut.decimals),
        priceImpact,
        simulated: result.simulated || false,
      }
    } catch (error) {
      console.error('Quote failed:', error)
      
      // 如果API调用失败，回退到模拟数据（仅用于开发）
      try {
        const tokenIn = Object.values(TOKENS).find(t => t.address === params.tokenIn)
        const tokenOut = Object.values(TOKENS).find(t => t.address === params.tokenOut)
        
        if (!tokenIn || !tokenOut) {
          throw new Error('Token not found')
        }
        
        const amountInWei = parseUnits(params.amountIn, tokenIn.decimals)
        const simulatedAmountOut = amountInWei * BigInt(98) / BigInt(100) // 模拟 2% 的滑点
        
        console.warn('使用模拟数据，实际生产环境应使用合约调用')
        return {
          amountOut: formatUnits(simulatedAmountOut, tokenOut.decimals),
          priceImpact: '2.0', // 模拟价格影响
          simulated: true,
        }
      } catch (fallbackError) {
        console.error('Fallback quote also failed:', fallbackError)
        return null
      }
    }
  }, [])

  // 检查代币授权
  const useTokenAllowance = (tokenAddress: string) => {
    return useReadContract({
      address: tokenAddress as `0x${string}`,
      abi: ERC20_ABI,
      functionName: 'allowance',
      args: address ? [address, contractConfig.swapRouter.address] : undefined,
      query: {
        enabled: Boolean(address && tokenAddress),
      },
    })
  }

  // 授权代币
  const approveToken = useCallback(async (tokenAddress: string, amount: string) => {
    if (!address) return

    const token = Object.values(TOKENS).find(t => t.address === tokenAddress)
    if (!token) throw new Error('Token not found')

    const amountWei = parseUnits(amount, token.decimals)

    writeContract({
      address: tokenAddress as `0x${string}`,
      abi: ERC20_ABI,
      functionName: 'approve',
      args: [contractConfig.swapRouter.address, amountWei],
    })
  }, [address, writeContract])

  // 执行交换
  const executeSwap = useCallback(async (params: SwapParams) => {
    if (!address) {
      throw new Error('Wallet not connected')
    }

    const tokenIn = Object.values(TOKENS).find(t => t.address === params.tokenIn)
    const tokenOut = Object.values(TOKENS).find(t => t.address === params.tokenOut)
    
    if (!tokenIn || !tokenOut) {
      throw new Error('Token not found')
    }

    const amountInWei = parseUnits(params.amountIn, tokenIn.decimals)
    
    // 获取价格预估来计算最小输出
    const quote = await getQuote(params)
    if (!quote) {
      throw new Error('Failed to get quote')
    }

    const amountOutWei = parseUnits(quote.amountOut, tokenOut.decimals)
    const minAmountOut = amountOutWei * BigInt(Math.floor((100 - params.slippage) * 100)) / BigInt(10000)

    // 检查是否是原生ETH交易
    const isNativeTokenIn = 'isNative' in tokenIn && tokenIn.isNative
    
    // 如果是ETH交易，则使用wrappedAddress(WETH)
    const actualTokenIn = isNativeTokenIn && 'wrappedAddress' in tokenIn 
      ? tokenIn.wrappedAddress as string
      : params.tokenIn

    const actualTokenOut = tokenOut.address === TOKENS.ETH.address && 'wrappedAddress' in TOKENS.ETH
      ? TOKENS.ETH.wrappedAddress as string
      : params.tokenOut

    const swapParams = {
      tokenIn: actualTokenIn as `0x${string}`,
      tokenOut: actualTokenOut as `0x${string}`,
      indexPath: [0], // 简化：使用第一个池子的索引
      recipient: address,
      deadline: BigInt(Math.floor(Date.now() / 1000) + 1200), // 20分钟后过期
      amountIn: amountInWei,
      amountOutMinimum: minAmountOut,
      sqrtPriceLimitX96: BigInt(0),
    }

    setLastSwapParams(params)

    // 如果是ETH交易，增加value参数
    const value = isNativeTokenIn ? amountInWei : BigInt(0)

    writeContract({
      ...contractConfig.swapRouter,
      functionName: 'exactInput',
      args: [swapParams],
      value,
    })
  }, [address, writeContract, getQuote])

  return {
    executeSwap,
    approveToken,
    getQuote,
    useTokenAllowance,
    isPending,
    isConfirming,
    isConfirmed,
    hash,
    lastSwapParams,
  }
} 