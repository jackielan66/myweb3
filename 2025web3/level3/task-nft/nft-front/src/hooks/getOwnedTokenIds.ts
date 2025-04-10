import { createPublicClient, erc721Abi, http } from 'viem'
import { mainnet } from 'viem/chains'
import { config } from '../wagmi';
import { count } from 'console';

const fromBlock = 'earliest' // 起始区块
const toBlock = 'latest' // 到最新区块
async function getOwnedTokenIds(contractAddress: `0x${string}`, ownerAddress: `0x${string}`) {

  const client = createPublicClient({
    chain: config.chains[0],
    transport: http()
  });

  const name = await client.readContract({
    address: contractAddress,
    abi: erc721Abi,
    functionName: 'name',
  });

  const symbol = await client.readContract({
    address: contractAddress,
    abi: erc721Abi,
    functionName: 'symbol',
  });


  // 1. 获取所有转入该地址的 Transfer 事件
  const incomingLogs = await client.getLogs({
    address: contractAddress,
    event: {
      type: 'event',
      name: 'Transfer',
      inputs: [
        { type: 'address', name: 'from', indexed: true },
        { type: 'address', name: 'to', indexed: true },
        { type: 'uint256', name: 'tokenId', indexed: true }
      ]
    },
    args: {
      to: ownerAddress
    },
    fromBlock: fromBlock,
    toBlock: toBlock
  })

  // 2. 获取所有转出该地址的 Transfer 事件
  const outgoingLogs = await client.getLogs({
    address: contractAddress,
    event: {
      type: 'event',
      name: 'Transfer',
      inputs: [
        { type: 'address', name: 'from', indexed: true },
        { type: 'address', name: 'to', indexed: true },
        { type: 'uint256', name: 'tokenId', indexed: true }
      ]
    },
    args: {
      from: ownerAddress
    },
    fromBlock: fromBlock,
    toBlock: toBlock
  })

  let mapTokenInfo: any = {}
  // console.log('incomingLogs', incomingLogs)
  // 处理转入事件
  incomingLogs.forEach(log => {
    if (log.args.tokenId !== undefined) {
      let tokenId = (log.args.tokenId).toString() as string;
      if (mapTokenInfo[tokenId]) {
        mapTokenInfo[tokenId].count += 1
      } else {
        mapTokenInfo[tokenId] = {
          tokenId: log.args.tokenId,
          count: 1,
          name,
          symbol,
          address: contractAddress
        }
      }
    }


  })
  // console.log('incomingLogs', incomingLogs)

  // 处理转出事件
  outgoingLogs.forEach(log => {
    // ownedTokens.delete(log.args.tokenId!)
    if (log.args.tokenId !== undefined) {
      let tokenId = (log.args.tokenId).toString()
      if (tokenId != undefined) {
        if (mapTokenInfo[tokenId]) {
          mapTokenInfo[tokenId].count -= 1
        }
      }
    }
  })
  // console.log('ownedTokens', ownedTokens)
  // console.log('mapTokenInfo', mapTokenInfo)
  return Object.values(mapTokenInfo).filter((item: any) => item.count > 0)
}

export { getOwnedTokenIds }