import { useAccount, useWatchContractEvent } from "wagmi"
import { ABI_CONTRACT, ADDRESS_CONTRACT } from "../utils/contractConfig"
import { createPublicClient, createWalletClient, http, Log } from 'viem'
import { config } from '../wagmi'
import { use, useEffect, useMemo, useState } from "react"
import { OrderStatue, IOrder } from "../types/global"

const fromBlock = 'earliest' // 起始区块
const toBlock = 'latest' // 到最新区块

const client = createPublicClient({
  chain: config.chains[0],
  transport: http()
});



// 定义事件日志的类型
type LogMakeArgs = {
  orderKey: string;
  maker: string;
  status?: OrderStatue;
  _sortKey?: number;
};

type LogCancelArgs = {
  orderKey: string;
};


type LogMatchArgs = {
  makeOrderKey: string;
  takeOrderKey: string;
  makeOrder: IOrder & { _sortKey?: number };
  takeOrder: IOrder & { _sortKey?: number };
  _sortKey?: number;
};

// 监听合约事件，返回我的订单,所有的订单
const useGetEventLog = () => {
  const account = useAccount()
  const [makeOrders, setMakeOrders] = useState<(IOrder & { _sortKey?: number })[]>([]);
  const [cancelOrders, setCancelOrders] = useState<LogCancelArgs[]>([]);
  const [matchOrders, setMatchOrders] = useState<LogMatchArgs[]>([]);
  // 获取创建订单日志，所有订单列表
  async function getLogMakeLogs() {
    const logMakeEventAbi = ABI_CONTRACT.EasySwapOrderBook.filter(item => item.name === 'LogMake');
    const orderLogs = await client.getLogs({
      address: ADDRESS_CONTRACT.EasySwapOrderBook,
      // @ts-ignore
      event: (logMakeEventAbi[0]),
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
      // @ts-ignore
      event: eventAbi[0],
      fromBlock,
      toBlock,
    })
    let _order = orderLogs.map((item: any) => {
      return item.args
    })
    // @ts-ignore
    setCancelOrders(_order)
  }

  // 
  async function getMatchOrder() {
    const eventAbi = ABI_CONTRACT.EasySwapOrderBook.filter(item => item.name === 'LogMatch');
    const orderLogs = await client.getLogs({
      address: ADDRESS_CONTRACT.EasySwapOrderBook,
      // @ts-ignore
      event: eventAbi[0],
      fromBlock,
      toBlock,
    })
    let _order = orderLogs.map((item: any) => {
      // console.log('item make order', item);
      return item.args
    })
    // @ts-ignore
    setMatchOrders(_order)
  }

  const refetch = () => {
    getLogMakeLogs()
    getLogCancel()
    getMatchOrder()
  }

  useEffect(() => {
    refetch()
  }, [account.address])


  // @ts-ignore
  const allOrderList = useMemo(() => {
    let tempObj: Record<string, IOrder & { _sortKey?: number }> = {}
    makeOrders.forEach((item, index) => {
      item.status = OrderStatue.Process;
      item._sortKey = index;
      if (item.orderKey != undefined) {
        tempObj[item.orderKey] = item;
      }
    })
    // @ts-ignore
    matchOrders.forEach((item) => {
      // @ts-ignore
      let _sortKeyFromTemp = tempObj[item.takeOrderKey]?._sortKey ?? tempObj[item.makeOrderKey]?._sortKey
      // @ts-ignore
      const extraObj = {
        // @ts-ignore
        seller: item.takeOrder.maker,
        // @ts-ignore
        buyer: item.makeOrder.maker,
      }
      // console.log('item extraObj', extraObj);
      item.makeOrder.status = OrderStatue.Complete;
      item.makeOrder.seller = extraObj.seller;
      item.makeOrder.buyer = extraObj.buyer;
      item.makeOrder._sortKey = _sortKeyFromTemp;
      tempObj[item.makeOrderKey] = item.makeOrder;
      item.takeOrder.status = OrderStatue.Complete;
      tempObj[item.takeOrderKey] = item.takeOrder;
      item.takeOrder.seller = extraObj.seller;
      item.takeOrder.buyer = extraObj.buyer;
      item.takeOrder._sortKey = _sortKeyFromTemp

    })

    cancelOrders.forEach((item) => {
      // @ts-ignore
      if (tempObj[item.orderKey]) {
        tempObj[item.orderKey].status = OrderStatue.Cancel;
      }
    })

    return Object.values(tempObj).sort((a, b) => b._sortKey! - a._sortKey!)
  }, [makeOrders, cancelOrders, matchOrders])

  // console.log('makeOrders', makeOrders)
  // console.log('cancelOrders', cancelOrders);
  // console.log('matchOrders', matchOrders);
  // console.log('allOrderList', allOrderList);




  const sellOrderList = useMemo(() => {
    return [...makeOrders]
  }, [makeOrders])





  return {
    makeOrders,
    sellOrderList,
    allOrderList,
    refetch
  }


}

export default useGetEventLog