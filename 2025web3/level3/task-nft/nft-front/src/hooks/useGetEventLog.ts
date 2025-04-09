import { useAccount, useWatchContractEvent } from "wagmi"
import { ABI_CONTRACT, ADDRESS_CONTRACT } from "../utils/contractConfig"
import { createPublicClient, createWalletClient, http } from 'viem'
import { config } from '../wagmi'
import { use, useEffect, useMemo, useState } from "react"
import { parseAbiItem } from 'viem'

const fromBlock = 'earliest' // 起始区块
const toBlock = 'latest' // 到最新区块

type address = `0x${string}`;
interface IOrder {
  orderKey: string,
  side: 0 | 1,
  saleKind: 0 | 1,
  maker: address,
  nft: []
  price: number,
  expiry: number,
  salt: number
}

// 监听合约事件，返回我的订单,所有的订单
const useGetEventLog = () => {
  const account = useAccount()
  const [makeOrders, setMakeOrders] = useState([]);
  const [cancelOrders, setCancelOrders] = useState([]);
  const [matchOrders, setMatchOrders] = useState([]);

  const client = createPublicClient({
    chain: config.chains[0],
    transport: http()
  });
  // 获取创建订单日志，所有订单列表
  async function getLogMakeLogs() {
    const logMakeEventAbi = ABI_CONTRACT.EasySwapOrderBook.filter(item => item.name === 'LogMake');
    const orderLogs = await client.getLogs({
      address: ADDRESS_CONTRACT.EasySwapOrderBook,
      event: logMakeEventAbi[0],
      fromBlock,
      toBlock,
    })
    let _order = orderLogs.map((item: any) => {
      return item.args
    })
    setMakeOrders(_order)
  }
  // 获取创建订单日志，所有订单列表
  async function getLogCancel() {
    const eventAbi = ABI_CONTRACT.EasySwapOrderBook.filter(item => item.name === 'LogCancel');
    const orderLogs = await client.getLogs({
      address: ADDRESS_CONTRACT.EasySwapOrderBook,
      event: eventAbi[0],
      fromBlock,
      toBlock,
    })
    let _order = orderLogs.map((item: any) => {
      return item.args
    })
    setCancelOrders(_order)
  }

  // 
  async function getMatchOrder() {
    const eventAbi = ABI_CONTRACT.EasySwapOrderBook.filter(item => item.name === 'LogMatch');
    const orderLogs = await client.getLogs({
      address: ADDRESS_CONTRACT.EasySwapOrderBook,
      event: eventAbi[0],
      fromBlock,
      toBlock,
    })
    let _order = orderLogs.map((item: any) => {
      return item.args
    })
    setMatchOrders(_order)
  }
  useEffect(() => {
    getLogMakeLogs()
    getLogCancel()
    getMatchOrder()
  }, [])

  console.log('makeOrders', makeOrders)
  console.log('cancelOrders', cancelOrders);
  console.log('matchOrders', matchOrders);



  const sellOrderList = useMemo(() => {
    return [...makeOrders]
  }, [makeOrders])

  const bidOrderList = useMemo(() => {
    return matchOrders.map((item) => {
      return item.makeOrder
    })
  }, [matchOrders]);



  return {
    makeOrders,
    sellOrderList,
    bidOrderList
  }


}

export default useGetEventLog