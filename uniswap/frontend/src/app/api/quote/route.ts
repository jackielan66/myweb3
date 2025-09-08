import { NextResponse } from 'next/server'
import { createPublicClient, http } from 'viem'
import { sepolia } from 'viem/chains'
import { CONTRACTS, TOKENS } from '@/lib/constants'
import { SWAP_ROUTER_ABI, POOL_MANAGER_ABI } from '@/lib/contracts'

// 创建公共客户端连接
const client = createPublicClient({
  chain: sepolia,
  transport: http('https://sepolia.infura.io/v3/d8ed0bd1de8242d998a1405b6932ab33'),
})

export async function POST(request: Request) {
  try {
    // 解析请求数据
    const body = await request.json()
    let { tokenIn, tokenOut } = body
    const { amountIn, sqrtPriceLimitX96 } = body
    let indexPath = body.indexPath || [0]

    if (!tokenIn || !tokenOut || !amountIn) {
      return NextResponse.json(
        { success: false, error: '缺少必要参数' },
        { status: 400 }
      )
    }

    // 处理原生ETH - 使用WETH替代
    if (tokenIn === TOKENS.ETH.address) {
      console.log('使用WETH替代原生ETH作为输入代币')
      tokenIn = TOKENS.ETH.wrappedAddress
    }
    
    if (tokenOut === TOKENS.ETH.address) {
      console.log('使用WETH替代原生ETH作为输出代币')
      tokenOut = TOKENS.ETH.wrappedAddress
    }

    // 获取可用池子列表来确定正确的indexPath
    try {
      // 先检查是否有匹配的池子
      const poolsData = await client.readContract({
        address: CONTRACTS.POOL_MANAGER as `0x${string}`,
        abi: POOL_MANAGER_ABI,
        functionName: 'getAllPools',
      })
      
      type PoolInfo = {
        pool: string;
        token0: string;
        token1: string;
        index: number;
      }
      
      const pools = (poolsData as unknown) as PoolInfo[]

      console.log('pools:::', pools)
      
      // 找到匹配的池子
      const matchingPool = pools.find(p => {
        const t0 = p.token0.toLowerCase()
        const t1 = p.token1.toLowerCase()
        const tIn = tokenIn.toLowerCase()
        const tOut = tokenOut.toLowerCase()
        
        return (t0 === tIn && t1 === tOut) || (t0 === tOut && t1 === tIn)
      })
      
      if (matchingPool) {
        console.log(`找到匹配的池子，索引: ${matchingPool.index}`)
        indexPath = [matchingPool.index]
      } else {
        // 没有找到匹配的池子，返回模拟数据
        console.warn('未找到匹配的交易对池子，返回模拟数据')
        
        // 解析输入金额并计算模拟输出
        const inAmount = BigInt(amountIn)
        const simulatedAmountOut = inAmount * BigInt(98) / BigInt(100) // 模拟2%滑点
        
        return NextResponse.json({
          success: true,
          amountOut: simulatedAmountOut.toString(),
          priceImpact: '0.5',
          simulated: true,
        })
      }
    } catch (poolError) {
      console.error('获取池子列表失败:', poolError)
      
      // 获取池子失败，返回模拟数据
      const inAmount = BigInt(amountIn)
      const simulatedAmountOut = inAmount * BigInt(98) / BigInt(100)
      
      return NextResponse.json({
        success: true,
        amountOut: simulatedAmountOut.toString(),
        priceImpact: '0.5',
        simulated: true,
      })
    }

    // 调用合约的 quoteExactInput 函数
    const quoteParams = {
      tokenIn: tokenIn as `0x${string}`,
      tokenOut: tokenOut as `0x${string}`, 
      indexPath,
      amountIn,
      sqrtPriceLimitX96: sqrtPriceLimitX96 || '0',
    }

    console.log('调用合约quoteExactInput，参数:', JSON.stringify(quoteParams))
    
    try {
      const amountOut = await client.readContract({
        address: CONTRACTS.SWAP_ROUTER as `0x${string}`,
        abi: SWAP_ROUTER_ABI,
        functionName: 'quoteExactInput',
        args: [quoteParams],
      }) as bigint
  
      // 计算价格影响
      // 这里可以根据输入和输出金额计算价格影响，暂时使用简单估算
      // 实际项目中应该计算与当前市场价格的偏差
      const priceImpact = '0.5' // 0.5%
  
      return NextResponse.json({
        success: true,
        amountOut: amountOut.toString(),
        priceImpact,
        simulated: false,
      })
    } catch (quoteError: unknown) {
      console.error('合约调用quoteExactInput失败:', quoteError)
      
      // 合约调用失败，返回模拟数据
      const inAmount = BigInt(amountIn)
      const simulatedAmountOut = inAmount * BigInt(98) / BigInt(100)
      
      // 提取错误信息
      let errorMessage = '获取预估价格失败'
      if (quoteError && typeof quoteError === 'object' && 'shortMessage' in quoteError) {
        errorMessage = String(quoteError.shortMessage)
      }
      
      return NextResponse.json({
        success: true,
        amountOut: simulatedAmountOut.toString(),
        priceImpact: '0.5',
        simulated: true,
        error: errorMessage
      })
    }
  } catch (error: unknown) {
    console.error('Quote API error:', error)
    
    const errorMessage = error instanceof Error ? error.message : '获取报价失败'
    
    return NextResponse.json(
      { 
        success: false, 
        error: errorMessage
      },
      { status: 500 }
    )
  }
} 