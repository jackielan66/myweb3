'use client'

import { useState } from 'react'
import { usePools } from '@/hooks/usePools'
import { useAccount } from 'wagmi'
import { formatNumber } from '@/lib/utils'
import { NetworkChecker } from '@/components/NetworkChecker'
import { CreatePoolModal } from '@/components/pools/CreatePoolModal'
import { Loader2, Droplets, Plus, TrendingUp, DollarSign, Activity, Zap } from 'lucide-react'

export default function PoolsPage() {
  const { isConnected } = useAccount()
  const { pools, loading, error, totalStats, refetch } = usePools()
  const [showCreateModal, setShowCreateModal] = useState(false)

  // 格式化大数字
  const formatLargeNumber = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(2)}M`
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(2)}K`
    }
    return `$${value.toFixed(2)}`
  }

  return (
    <div className="max-w-6xl mx-auto">
      <NetworkChecker>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">流动性池</h1>
          <p className="text-gray-600">
            查看所有流动性池的实时数据，包括TVL、交易量和费用收入。
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {loading ? (
                    <div className="flex items-center">
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                      -
                    </div>
                  ) : (
                    totalStats.totalPools
                  )}
                </div>
                <div className="text-sm text-gray-600">总池数</div>
              </div>
              <Droplets className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {loading ? (
                    <div className="flex items-center">
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                      -
                    </div>
                  ) : (
                    formatLargeNumber(totalStats.totalTVL)
                  )}
                </div>
                <div className="text-sm text-gray-600">总锁仓价值</div>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {loading ? (
                    <div className="flex items-center">
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                      -
                    </div>
                  ) : (
                    formatLargeNumber(totalStats.totalVolume24h)
                  )}
                </div>
                <div className="text-sm text-gray-600">24小时交易量</div>
              </div>
              <Activity className="h-8 w-8 text-purple-500" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {loading ? (
                    <div className="flex items-center">
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                      -
                    </div>
                  ) : (
                    formatLargeNumber(totalStats.totalFeesGenerated)
                  )}
                </div>
                <div className="text-sm text-gray-600">累计费用收入</div>
              </div>
              <Zap className="h-8 w-8 text-yellow-500" />
            </div>
          </div>
        </div>

        {/* Pools Table */}
        <div className="bg-white rounded-lg border overflow-hidden">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">所有流动性池</h2>
              <button 
                onClick={() => setShowCreateModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                创建新池
              </button>
            </div>
          </div>

          {!isConnected ? (
            <div className="p-12 text-center">
              <Droplets className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">请连接钱包</h3>
              <p className="text-gray-600">连接钱包以查看流动性池数据</p>
            </div>
          ) : error ? (
            <div className="p-12 text-center">
              <div className="text-red-500 text-lg font-medium mb-2">加载失败</div>
              <p className="text-gray-600 mb-4">{error}</p>
              <button
                onClick={refetch}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                重新加载
              </button>
            </div>
          ) : loading ? (
            <div className="p-12 text-center">
              <Loader2 className="h-8 w-8 text-blue-600 mx-auto mb-4 animate-spin" />
              <p className="text-gray-600">正在加载流动性池数据...</p>
            </div>
          ) : pools.length === 0 ? (
            <div className="p-12 text-center">
              <Droplets className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">暂无流动性池</h3>
              <p className="text-gray-600 mb-4">
                成为第一个创建流动性池的用户
              </p>
              <button 
                onClick={() => setShowCreateModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors inline-flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                创建新池
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      交易对
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      费率
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      TVL
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      代币余额
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      24小时交易量
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      累计费用
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      流动性
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pools.map((pool) => (
                    <tr key={pool.pool} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex -space-x-2 mr-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center border-2 border-white">
                              <span className="text-white text-xs font-bold">{pool.token0Symbol.charAt(0)}</span>
                            </div>
                            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center border-2 border-white">
                              <span className="text-white text-xs font-bold">{pool.token1Symbol.charAt(0)}</span>
                            </div>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{pool.pair}</div>
                            <div className="text-xs text-gray-500">#{pool.index}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {pool.feePercent}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{pool.tvl}</div>
                        <div className="text-xs text-gray-500">
                          {pool.tvlUSD >= 1000 ? `$${formatNumber(pool.tvlUSD)}` : `$${pool.tvlUSD.toFixed(2)}`}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-xs text-gray-900">
                          <div>{parseFloat(pool.token0Balance).toFixed(2)} {pool.token0Symbol}</div>
                          <div>{parseFloat(pool.token1Balance).toFixed(2)} {pool.token1Symbol}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{pool.volume24h}</div>
                        <div className="text-xs text-gray-500 flex items-center">
                          <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                          基于链上活动
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatLargeNumber(pool.feesUSD)}
                        </div>
                        <div className="text-xs text-gray-500">总费用收入</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatNumber(parseFloat(pool.liquidity))}
                        </div>
                        <div className="text-xs text-gray-500">LP 代币</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Create Pool Modal */}
        <CreatePoolModal 
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
        />
      </NetworkChecker>
    </div>
  )
} 