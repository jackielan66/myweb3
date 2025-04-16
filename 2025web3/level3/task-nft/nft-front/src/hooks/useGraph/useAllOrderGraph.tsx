import { useQuery } from '@tanstack/react-query'
import { gql, request } from 'graphql-request'
import { OrderStatue, IOrder } from '../../types/global'
const query = gql`{
  logMakes {
    expiry
    id
    maker
    nft_amount
    nft_collection
    nft_tokenId
    orderKey
    price
    saleKind
    salt
    side
  }
  logMatches {
    id
    fillPrice
    makeOrderKey
    makeOrder_expiry
    makeOrder_maker
    makeOrder_nft_amount
    makeOrder_nft_collection
    makeOrder_nft_tokenId
    makeOrder_saleKind
    makeOrder_price
    makeOrder_salt
    makeOrder_side
    takeOrderKey
    takeOrder_expiry
    takeOrder_maker
    takeOrder_nft_amount
    takeOrder_nft_collection
    takeOrder_nft_tokenId
    takeOrder_price
    takeOrder_saleKind
    takeOrder_salt
    takeOrder_side
  }
  logCancels {
    id
    maker
    orderKey
  }
}`
const url = 'https://api.studio.thegraph.com/query/109241/my-01/version/latest'
const headers = { Authorization: 'Bearer 674c89e765e754d7fc54ad5ddf41e95e' }

type H_ORDER = IOrder & { _sortKey?: number };

type MatchItem = {
    makeOrder: H_ORDER,
    takeOrder: H_ORDER,
    fillPrice: string,
    makeOrderKey: string,
    takeOrderKey: string,
}

type CancelItem = {
    id: string,
    maker: string,
    orderKey: string,
}
function getAllOrder({
    makeOrders,
    cancelOrders,
    matchOrders,
}: {
    makeOrders: H_ORDER[],
    cancelOrders: CancelItem[],
    matchOrders: MatchItem[],
}) {
   

    let tempObj: Record<string, H_ORDER> = {}
    makeOrders.forEach((item, index) => {
        item.status = OrderStatue.Process;
        item._sortKey = index;
        if (item.orderKey != undefined) {
            tempObj[item.orderKey] = item;
        }
    })
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

}

const useAllOrderGraph = () => {
    const { data,refetch } = useQuery({
        queryKey: ['useAllOrderGraph'],
        async queryFn() {
            return await request(url, query, {}, headers)
        }
    })

    function convertLogMatches(data = []) {
        function transformToMakerOrder(data: any, field = 'makeOrder_') {
            // 移除前缀 "makeOrder_"
            const transformKey = (key: string) => key.replace(field, '');

            const result: any = {};

            for (const [key, value] of Object.entries(data)) {
                if (key.startsWith(field)) {
                    const newKey = transformKey(key);
                    // 特殊处理：将字符串数字转换为数字类型（可选）
                    result[newKey] = value;
                }

            }
            result.nft = {
                collection: result.nft_collection,
                tokenId: result.nft_tokenId,
                amount: result.nft_amount,
            }
            return result;
        }

        return data.map((item: any, index) => {
            let makeOrder = transformToMakerOrder(item);
            let takeOrder = transformToMakerOrder(item, 'takeOrder_');
            return {
                fillPrice: item.fillPrice,
                makeOrderKey: item.makeOrderKey,
                makeOrder,
                takeOrderKey: item.takeOrderKey,
                takeOrder
            }
        })
    }

    function convertLogMakes(data = []) {
        return data.map((item: H_ORDER & { nft_collection: string, nft_tokenId: string, nft_amount: number }, index) => {
            return {
                ...item,
                nft: {
                    collection: item.nft_collection,
                    tokenId: item.nft_tokenId,
                    amount: item.nft_amount,
                }
            }
        })
    }
    // console.log(data, "data")

    const allOrderList = getAllOrder({
        // @ts-ignore
        makeOrders: convertLogMakes(data?.logMakes),
        // @ts-ignore
        cancelOrders: data?.logCancels ?? [],
        // @ts-ignore
        matchOrders: convertLogMatches(data?.logMatches),
    })
    console.log(allOrderList, "allOrderList graph")
    return { data,
        allOrderListUseGraph:allOrderList,
        refetch,
     }
}

export default useAllOrderGraph 