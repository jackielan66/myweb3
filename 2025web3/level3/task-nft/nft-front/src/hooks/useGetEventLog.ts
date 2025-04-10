import { useAccount, useWatchContractEvent } from "wagmi"
import { ABI_CONTRACT, ADDRESS_CONTRACT } from "../utils/contractConfig"
import { createPublicClient, createWalletClient, http } from 'viem'
import { config } from '../wagmi'
import { use, useEffect, useMemo, useState } from "react"
import { parseAbiItem } from 'viem'
import { OrderStatue, IOrder } from "../types/global"

const fromBlock = 'earliest' // 起始区块
const toBlock = 'latest' // 到最新区块

const client = createPublicClient({
  chain: config.chains[0],
  transport: http()
});

// 监听合约事件，返回我的订单,所有的订单
const useGetEventLog = () => {
  const [makeOrders, setMakeOrders] = useState<IOrder[]>([]);
  const [cancelOrders, setCancelOrders] = useState([]);
  const [matchOrders, setMatchOrders] = useState([]);
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

  const refetch = () => {
    getLogMakeLogs()
    getLogCancel()
    getMatchOrder()
  }

  useEffect(() => {
    refetch()
  }, [])


  // @ts-ignore
  const allOrderList = useMemo(() => {
    let tempObj: Record<string, IOrder> = {}
    makeOrders.forEach((item) => {
      item.status = OrderStatue.Process;
      tempObj[item.orderKey] = item;
    })
    // @ts-ignore
    matchOrders.forEach((item) => {
      // @ts-ignore
      item.makeOrder.status = OrderStatue.Complete;
      // @ts-ignore
      tempObj[item.makeOrder.orderKey] = item.makeOrder;
      // @ts-ignore
      tempObj[item.takeOrder.orderKey].status = OrderStatue.Complete;
    })

    cancelOrders.forEach((item) => {
      // @ts-ignore
      if (tempObj[item.orderKey]) {
        tempObj[item.orderKey].status = OrderStatue.Cancel;
      }
    })
    return Object.values(tempObj)
  }, [makeOrders, cancelOrders, matchOrders])

  console.log('makeOrders', makeOrders)
  console.log('cancelOrders', cancelOrders);
  console.log('matchOrders', matchOrders);
  console.log('allOrderList', allOrderList);




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
    bidOrderList,
    allOrderList,
    refetch
  }


}

export default useGetEventLog